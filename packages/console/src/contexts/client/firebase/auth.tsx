import { assertBrandedString, type UuidString } from '@/generated/graphql';
import {
  connectAuthEmulator,
  getAuth,
  getIdTokenResult,
  onIdTokenChanged,
  type Auth,
} from 'firebase/auth';
import { useEffect, useMemo, useState, type FC, type ReactNode } from 'react';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { logger } from '~/common';
import {
  AuthContext,
  GraphqlAuth,
  Role,
  UserId,
} from '~/contexts/GqlAuthContext';

type Props = {
  auth: Auth;
  children: ReactNode;
};

export type Claims = {
  'https://hasura.io/jwt/claims': {
    'x-hasura-default-role': string;
    'x-hasura-user-id': UuidString;
  };
};

function assertRecord<X extends Record<string, never>>(
  obj: unknown
): asserts obj is X {
  if (obj === null) throw new Error('obj must not be null.');
  if (typeof obj !== 'object') throw new Error('arg must be object');
}

export const assertClaims: (a: unknown) => asserts a is Claims = (a) => {
  if (a == null) throw new Error('claims must not be null.');
  assertRecord(a);

  const c = a['https://hasura.io/jwt/claims'];

  if (c == null)
    throw new Error("'https://hasura.io/jwt/claims' must not be null.");
  assertRecord(c);

  const r = c['x-hasura-default-role'];

  if (typeof r !== 'string')
    throw new Error("'x-hasura-default-role' must be string.");

  const i = c['x-hasura-user-id'];

  assertBrandedString<UuidString>(i);
};

const GraphqlAuthProvider: FC<Props> = ({ children, auth }) => {
  const [role, setRole] = useState<Role>('anonymous');
  const [userId, setUserId] = useState<UserId>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user === null) {
        setRole('anonymous');
        setUserId(null);
        return;
      }

      (async () => {
        try {
          const { claims } = await getIdTokenResult(user);

          assertClaims(claims);

          const hasura = claims['https://hasura.io/jwt/claims'];

          const r = hasura['x-hasura-default-role'];
          if (r === 'staff') setRole('staff');
          else if (r === 'user') setRole('user');
          else setRole('anonymous');

          const i = hasura['x-hasura-user-id'];
          setUserId(i);
        } catch (e) {
          logger.warn(e);
        }
      })();
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const value = useMemo<GraphqlAuth>(() => ({ role, userId }), [role, userId]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const app = useFirebaseApp();

  const auth = useMemo(() => {
    const $auth = getAuth(app);

    $auth.languageCode = $env.LANG;

    if (
      process.env.NODE_ENV !== 'production' && // bundler will remove this code
      typeof process.env.NEXT_PUBLIC_AUTH_EMULATOR === 'string'
    ) {
      connectAuthEmulator($auth, process.env.NEXT_PUBLIC_AUTH_EMULATOR, {
        disableWarnings: true,
      });
    }

    return $auth;
  }, [app]);

  return (
    <AuthProvider sdk={auth}>
      <GraphqlAuthProvider auth={auth}>{children}</GraphqlAuthProvider>
    </AuthProvider>
  );
};

export default Provider;
