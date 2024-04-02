import { AnalyticsPlugin } from 'analytics';
import { AnalyticsTrackParams } from './types';

// TODO: @analytics/google-analytics と統合

const googleAnalyticsPlugin = (): AnalyticsPlugin => ({
  name: 'google-analytics-plugin',
  track: ({ payload }: AnalyticsTrackParams) => {
    window.gtag('event', payload.event, payload.properties);
  },
});

export default googleAnalyticsPlugin;
