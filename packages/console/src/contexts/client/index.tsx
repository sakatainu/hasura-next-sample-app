import { type FC } from 'react';
import AnalyticsProvider from './firebase/analytics';
import AppProvider from './firebase/app';
import AuthProvider from './firebase/auth';
import GQLProvider from './graphql';

const hasMeasureId =
  typeof process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID === 'string' &&
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID !== '';

const Wrapped: FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppProvider>
    <AuthProvider>
      <GQLProvider>
        {hasMeasureId ? (
          <AnalyticsProvider>{children}</AnalyticsProvider>
        ) : (
          <>{children}</>
        )}
      </GQLProvider>
    </AuthProvider>
  </AppProvider>
);

export default Wrapped;
