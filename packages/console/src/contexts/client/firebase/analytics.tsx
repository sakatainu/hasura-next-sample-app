import {
  getAnalytics,
  logEvent,
  setUserId,
  setUserProperties,
} from 'firebase/analytics';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import {
  AnalyticsProvider as FirebaseAnalyticsProvider,
  useAnalytics,
  useAuth,
  useFirebaseApp,
} from 'reactfire';
import { useGraphqlAuth } from '~/contexts/GqlAuthContext';
import {
  firebaseAnalyticsPlugin,
  useEventTracker,
} from '~/modules/EventTracker';

const PageViewLogger: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const analytics = useAnalytics();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      logEvent(analytics, 'page_view', { page_location: router.pathname });
    });

    return () => {
      router.events.off('routeChangeComplete', () => {
        logEvent(analytics, 'page_view', { page_location: router.pathname });
      });
    };
  }, [router, analytics, router.pathname]);

  return <>{children}</>;
};

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const app = useFirebaseApp();
  const analytics = getAnalytics(app);
  const auth = useAuth();
  const { userId } = useGraphqlAuth();

  useEventTracker({ plugins: [firebaseAnalyticsPlugin(analytics)] });

  useEffect(() => {
    setUserId(analytics, userId || '');

    const properties: Dictionary<string, unknown> = {};
    if (auth.currentUser) {
      properties.member_id = auth.currentUser.uid;
    }

    setUserProperties(analytics, properties);
  }, [analytics, auth.currentUser, userId]);

  return (
    <FirebaseAnalyticsProvider sdk={analytics}>
      <PageViewLogger>{children}</PageViewLogger>
    </FirebaseAnalyticsProvider>
  );
};

export default Provider;
