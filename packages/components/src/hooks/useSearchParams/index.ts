import { useMemo } from 'react';
import useUrlQuery from '~/hooks/useUrlQuery';
import { fromEntries } from '~/utils';

const useSearchParams = (): Record<string, string | undefined> => {
  const query = useUrlQuery();

  return useMemo(() => {
    const flatList = Object.keys(query).map<[string, string]>((key) => [
      key,
      query[key]![0],
    ]);

    return fromEntries(flatList);
  }, [query]);
};

export default useSearchParams;
