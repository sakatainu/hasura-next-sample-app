import { useMemo } from 'react';
import { uniqueId } from '~/utils';

const useUniqueId = () => useMemo(() => uniqueId(), []);

export default useUniqueId;
