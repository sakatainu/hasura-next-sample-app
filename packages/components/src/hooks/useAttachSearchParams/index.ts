import { useRouter } from 'next/router';
import { ParsedUrlQuery, encode } from 'querystring';
import { DependencyList } from 'react';
import { useAsync } from 'react-use';
import { Url } from 'url';

type RouterOption = {
  method: 'push' | 'replace';
  query: ParsedUrlQuery;
  as?: Url;
  options?: {
    shallow?: boolean | undefined;
  };
};

const useAttachSearchParams = (
  createOption: () => RouterOption,
  deps?: DependencyList
): void => {
  const router = useRouter();
  const $deps = deps || [];

  useAsync(async () => {
    const option = createOption();

    const prev = encode(router.query);
    const next = encode(option.query);

    if (prev === next) return;

    await router[option.method](
      {
        pathname: router.pathname,
        query: option.query,
      },
      option.as,
      option.options
    );
  }, [router, ...$deps]);
};

export default useAttachSearchParams;
