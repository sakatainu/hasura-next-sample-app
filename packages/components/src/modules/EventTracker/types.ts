export const TRACKER_CLASS = '_event-tracker';
export const TRACKER_EVENT_NAME = 'eventName';

export type AnalyticsTrackParams = {
  payload: {
    event: string;
    properties: Record<string, string>;
  };
};
