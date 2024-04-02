import { DependencyList, useRef } from 'react';
import { isShallowEqual } from '~/utils';

const isShallowEqualDeps = <T extends readonly unknown[]>(
  a: T,
  b: T
): boolean => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    if (!isShallowEqual(a[i], b[i])) return false;
  }

  return true;
};

const useShallowCompareMemo = <T>(
  factory: () => T,
  deps?: DependencyList
): T => {
  const previous = useRef(factory());
  const previousDepsRef = useRef(deps);
  const previousDeps = previousDepsRef.current;

  if (!previousDeps || !deps) {
    previous.current = factory();
  } else if (previousDeps.length && !isShallowEqualDeps(previousDeps, deps)) {
    previous.current = factory();
  }

  previousDepsRef.current = deps;
  return previous.current;
};

export default useShallowCompareMemo;
