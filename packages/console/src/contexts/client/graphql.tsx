import { AuthConfig, authExchange, AuthUtilities } from '@urql/exchange-auth';
import { getAuth, getIdTokenResult, IdTokenResult } from 'firebase/auth';
import { decodeJwt, SignJWT } from 'jose';
import { useMemo, type FC } from 'react';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';

const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL;
if (baseUrl === undefined)
  throw new Error('GRAPHQL_BASE_URL must not be undefined.');
const url = `${baseUrl}/v1/graphql`;
const FETCH_TIMEOUT = 30000;

const getIdToken = async (): Promise<IdTokenResult | null> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user == null) return null;

  const idTokenResult = await getIdTokenResult(user);
  if (!idTokenResult.claims?.['https://hasura.io/jwt/claims']) return null;

  if (process.env.NODE_ENV === 'production') return idTokenResult;

  if (typeof process.env.NEXT_PUBLIC_GRAPHQL_JWT_SECRET !== 'string')
    throw new Error('GRAPHQL_JWT_SECRET must be string');

  const accessToken = idTokenResult?.token;

  if (typeof accessToken !== 'string') return null;

  const payload = decodeJwt(accessToken);
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_GRAPHQL_JWT_SECRET));
  idTokenResult.token = jwt;

  return idTokenResult;
};

const authConfig = async (utils: AuthUtilities): Promise<AuthConfig> => {
  let idTokenResult = await getIdToken();

  return {
    didAuthError: (error) =>
      // check if the error was an auth error
      // this can be implemented in various ways, e.g. 401 or a special error code
      error.graphQLErrors.some((e) => e.extensions?.code === 'FORBIDDEN'),
    refreshAuth: async () => {
      idTokenResult = await getIdToken();
    },
    willAuthError: () => {
      const auth = getAuth();

      const currentUid = auth.currentUser?.uid;
      const prevUid = idTokenResult?.claims.user_id;
      if (currentUid !== prevUid) return true;

      if (idTokenResult == null) return true;
      if (!idTokenResult.claims?.['https://hasura.io/jwt/claims']) return true;

      if (idTokenResult.expirationTime) {
        const expirationDate = new Date(idTokenResult.expirationTime);
        return expirationDate < new Date();
      }

      return !idTokenResult.token;
    },
    addAuthToOperation: (operation) => {
      if (!idTokenResult?.token) return operation;

      return utils.appendHeaders(operation, {
        authorization: `Bearer ${idTokenResult.token}`,
      });
    },
  };
};

const fetchWrapper: typeof fetch = async (input, opts) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    return await fetch(input, {
      ...opts,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(id);
  }
};

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = useMemo(
    () =>
      createClient({
        url,
        exchanges: [cacheExchange, authExchange(authConfig), fetchExchange],
        fetch: fetchWrapper,
      }),
    []
  );

  return <Provider value={client}>{children}</Provider>;
};

export default Wrapper;
