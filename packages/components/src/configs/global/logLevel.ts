import * as sentry from '@sentry/nextjs';
import loglevel from 'loglevel';

const isDev = process.env.NODE_ENV === 'development';

const loglevelToSentryLevel: Record<
  loglevel.LogLevelNames,
  sentry.SeverityLevel
> = {
  trace: 'debug',
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

const sendLogToSentry = (message: unknown, level: sentry.SeverityLevel) => {
  if (message instanceof Error) {
    sentry.withScope((scope) => {
      scope.setLevel(level);
      sentry.captureException(message);
    });
  } else {
    try {
      sentry.captureMessage(JSON.stringify(message), level);
    } catch (e) {
      sentry.captureException(e);
    }
  }
};

if (isDev) loglevel.setLevel('trace');

const originalFactory = loglevel.methodFactory;
loglevel.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (...messages) => {
    const message: unknown = messages?.length <= 1 ? messages[0] : messages;

    if (!isDev) {
      const sentryLevel = loglevelToSentryLevel[methodName];
      sendLogToSentry(message, sentryLevel);
    }

    rawMethod(message);
  };
};

// Be sure to call setLevel method in order to apply plugin
loglevel.setLevel(loglevel.getLevel());
