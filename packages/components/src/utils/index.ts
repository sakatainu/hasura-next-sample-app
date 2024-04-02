import { lighten } from '@mui/system';
import Color from 'color';
import dayjs, { ConfigType } from 'dayjs';
import Decimal from 'decimal.js';
import React from 'react';
import hash from 'string-hash';

export * from './number';

export const getRelativeTime = (
  value: Date | string | undefined,
  format = 'LL'
) => {
  if (!value) {
    return null;
  }

  const daysValue = dayjs.isDayjs(value) ? value : dayjs(value);

  if (daysValue.isValid()) {
    if (daysValue.isBefore(dayjs().add(-1, 'day'), 'day')) {
      return daysValue.format(format);
    }

    return daysValue.fromNow();
  }

  return null;
};

export const uniqueId = ((length = 36) => {
  let count = 0;

  return () => {
    count += 1;
    return hash(count.toString()).toString(length);
  };
})();

// 参考: https://github.com/mui/material-ui/blob/v5.9.3/docs/data/material/components/avatars/BackgroundLetterAvatars.tsx
export const getAvatarColor = (value: string) => {
  let hashNum = 0;

  /* eslint-disable no-bitwise */
  for (let i = 0; i < value.length; i += 1) {
    hashNum = value.charCodeAt(i) + ((hashNum << 5) - hashNum);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const colorValue = (hashNum >> (i * 8)) & 0xff;
    color += `00${colorValue.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return lighten(color, 0.8);
};

export const removeLegalType = (value: string): string => {
  const excludes = ['（株）', '\\(株\\)', '株式会社'];
  const reg = new RegExp(excludes.join('|'), 'g');
  return value.replace(reg, '');
};

export const getAvatarShortLabel = (value: string, length = 2): string =>
  removeLegalType(value).trim().slice(0, length);

export const getFontColor = (colorValue: string) => {
  const color = Color(colorValue);

  return color.isLight() ? 'rgba(0, 0, 0, 0.4)' : 'white';
};

/**
 * @see https://day.js.org/docs/en/display/format#list-of-localized-formats
 */
export const toDateString = (value: Date | string, template = 'L') =>
  dayjs(value).format(template);

export type Order = 'asc' | 'desc';

export const numberCompare = (order: Order) => (a: unknown, b: unknown) => {
  const value1 = Number(a);
  const value2 = Number(b);

  if (Number.isNaN(value1) && Number.isNaN(value2)) return 0;
  if (Number.isNaN(value1) && !Number.isNaN(value2)) return 1;
  if (!Number.isNaN(value1) && Number.isNaN(value2)) return -1;
  return Decimal.sub(value1, value2)
    .mul(order === 'asc' ? 1 : -1)
    .toNumber();
};

export const distinct = <T>(value: T[]): T[] => Array.from(new Set(value));

/** 行列入れ替え */
export const transpose = <T>(value: T[][]) =>
  value[0].map((_, column) => value.map((row) => row[column]));

export const groupBy = <K extends PropertyKey, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
) =>
  array.reduce((acc, cur, idx, src) => {
    const key = getKey(cur, idx, src);
    let target = acc[key];
    if (!target) {
      acc[key] = [];
      target = acc[key];
    }
    target?.push(cur);

    return acc;
  }, {} as Partial<Record<K, V[]>>);

export const textTruncate = (text: string, limit: number): string =>
  text && text.length > limit ? `${text.substring(0, limit)}…` : text;

/**
 * @deprecated データが timestamptz の場合は使用しない（動き上は問題ない）
 */
export const utc = (config?: ConfigType, format?: string, strict?: boolean) =>
  dayjs.utc(config, format, strict).toDate();

export const isShallowEqual = <T>(a: T, b: T): boolean => {
  if (a === b) return true;
  if (!a || !b) return a === b;
  if (typeof a !== 'object' || typeof b !== 'object') return a === b;

  const keys = Object.keys(a) as (keyof T)[];

  for (let i = 0; i < keys.length; i += 1) {
    if (!(keys[i] in b)) return false;
  }

  for (let i = 0; i < keys.length; i += 1) {
    if (a[keys[i]] !== b[keys[i]]) return false;
  }

  return keys.length === Object.keys(b).length;
};

// shorthands
export const { keys, entries, fromEntries } = Object;

export const getDuration = (value: Date | null | undefined) => {
  const daysValue = dayjs(value);
  const between = daysValue.diff(dayjs());
  return dayjs.duration(between);
};

export const isDictionary = <T = unknown>(
  value: unknown
): value is Dictionary<string | number | symbol, T> => {
  if (typeof value !== 'object' || value === null) return false;
  return Object.getPrototypeOf(value) === Object.prototype;
};

export type CustomSyntheticEvent<
  T extends Element,
  E extends Event,
  P = never
> = React.SyntheticEvent<T, E> & {
  payload?: P;
};

export type CustomSyntheticEventHandler<
  T extends Element,
  E extends Event,
  P = never
> = (event: CustomSyntheticEvent<T, E, P>) => void | Promise<void>;

export const createSyntheticEvent = <
  T extends Element,
  E extends Event,
  P = never
>(
  event: E,
  payload?: P
): CustomSyntheticEvent<T, E, P> => {
  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = () => {
    isDefaultPrevented = true;
    event.preventDefault();
  };
  const stopPropagation = () => {
    isPropagationStopped = true;
    event.stopPropagation();
  };
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => {},
    timeStamp: event.timeStamp,
    type: event.type,
    payload,
  };
};

export const range = (start: number, end: number, step = 1): number[] => {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};

export const getGroupRoleLabel = (value: string | undefined): string => {
  switch (value) {
    case 'member':
      return 'メンバー';
    case 'owner':
      return 'オーナー';
    case 'staff':
      return 'スタッフ';
    default:
      return '';
  }
};
