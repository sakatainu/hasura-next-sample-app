import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { useAsync } from 'react-use';

type Url = Parameters<NextRouter['push']>[0];
type TransitionOptions = Parameters<NextRouter['push']>[2];

export type NavigateProps = {
  type: 'push' | 'replace';
  url: Url;
  as?: Url;
  options?: TransitionOptions;
};

const Navigate: React.FC<NavigateProps> = ({ type, url, as, options }) => {
  const router = useRouter();

  useAsync(async () => {
    await router[type](url, as, options);
  }, []);

  return null;
};

export default Navigate;
