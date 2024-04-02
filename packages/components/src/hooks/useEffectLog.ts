import { useEffect } from 'react';
import { logger } from '~/common';

const useEffectLog = (value: Record<string, unknown>) => {
  const [[k, v]] = Object.entries(value);
  useEffect(() => logger.log(k), [k, v]);
};

export default useEffectLog;
