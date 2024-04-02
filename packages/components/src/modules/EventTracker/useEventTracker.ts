import Analytics, { AnalyticsInstance, AnalyticsPlugin } from 'analytics';
import { useEffect } from 'react';
import trackingConfigs from './trackingConfigs';
import { TRACKER_CLASS, TRACKER_EVENT_NAME } from './types';

const ref: {
  analytics?: AnalyticsInstance;
} = {};

export const trackEvent = (eventName: string, params: unknown) => {
  if (!ref.analytics) {
    // eslint-disable-next-line no-console
    console.warn('Analytics instance is not initialized');
    return;
  }

  (async () => {
    try {
      await ref.analytics?.track(eventName, params);
    } catch {
      // do nothing
    }
  })();
};

// Attribute based event tracking
// sample usage:
// <button class="_event-tracker" data-event-name="buttonClicked">Click me</button>
const onTrigger = (event: Event) => {
  const eventTarget = event.target;
  if (!(eventTarget instanceof Node)) return;

  const trackingCollections = document.getElementsByClassName(TRACKER_CLASS);
  if (!trackingCollections.length) return;

  const trackingTargets = Array.from(trackingCollections)
    .filter((v): v is HTMLElement => v instanceof HTMLElement)
    .filter((v) => v.contains(eventTarget));

  trackingTargets.forEach((target) => {
    const eventName = target.dataset[TRACKER_EVENT_NAME];
    if (!eventName) return;

    const trackingConfig = trackingConfigs[eventName];
    const params = trackingConfig?.getParams?.(target);

    trackEvent(eventName, params);
  });
};

const useEventTracker = ({ plugins }: { plugins: AnalyticsPlugin[] }) => {
  useEffect(() => {
    ref.analytics = Analytics({ plugins });
  }, [plugins]);

  useEffect(() => {
    document.addEventListener('click', onTrigger);
    return () => {
      document.removeEventListener('click', onTrigger);
    };
  }, []);
};

export default useEventTracker;
