import { CSSProperties } from 'react';

export const hideElement = (toBeHide = true): CSSProperties => {
  if (!toBeHide) return {};

  return { display: 'none' };
};

export const fake = <T>(param?: unknown): T => param as T;
