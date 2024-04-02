import { useScrollTrigger } from '@mui/material';
import { useMemo } from 'react';

const useScrollState: (options?: {
  threshold?: number;
  target?: HTMLElement | Window;
}) => {
  isDownScroll: boolean;
  isTrapOverTop: boolean;
} = (options) => {
  const threshold = options?.threshold ?? 0;
  const target = options?.target ?? window;

  const isDownScroll = useScrollTrigger({ target });
  const isTrapOverTop = useScrollTrigger({
    disableHysteresis: true,
    threshold,
    target,
  });

  return useMemo(
    () => ({
      isDownScroll,
      isTrapOverTop,
    }),
    [isDownScroll, isTrapOverTop]
  );
};

export default useScrollState;
