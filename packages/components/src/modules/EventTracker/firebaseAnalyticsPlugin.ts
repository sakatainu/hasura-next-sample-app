import { AnalyticsPlugin } from 'analytics';
import { Analytics, logEvent } from 'firebase/analytics';
import { AnalyticsTrackParams } from './types';

/**
 * @see https://github.com/DavidWells/analytics/issues/133#issuecomment-753689127
 */
const firebaseAnalyticsPlugin = (
  fireAnalytics: Analytics
): AnalyticsPlugin => ({
  name: 'firebase-analytics-plugin',
  track: ({ payload }: AnalyticsTrackParams) => {
    logEvent(fireAnalytics, payload.event, payload.properties);
  },
});

export default firebaseAnalyticsPlugin;
