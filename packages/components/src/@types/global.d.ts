declare namespace NodeJS {
  interface ProcessEnv {
    readonly [key: string]: string | undefined;
  }
}

declare type Primitive = string | number | boolean | undefined | null;

declare type StockIssueCode = string;
declare type StockIssue = {
  code: StockIssueCode;
  name: string;
  nameEn?: string;
  fiscalMonth?: number;
  homepage?: string;
  avatar?: string;
};

declare type RangeType<T> = {
  start: T;
  end: T;
};

declare type Period = RangeType<Date>;

declare type Contract = {
  planCode: string;
  maxUsers: number;
  expireAt: Date;
  startAt: Date;
};

declare type GroupId = string;
declare type Group = {
  id: GroupId;
  name: string;
  stockIssue: StockIssue | null;
  contract: Contract | null;
};

/** YYYY-MM-DD */
declare type DateString = string & { __dateStringBrand: never };
/** ISO8601 e.g. 2016-07-20T17:30:15Z */
declare type TimestamptzString = string & { __timestamptzStringBrand: never };
declare type UuidString = string & { __UuidStringBrand: never };

declare type UserId = string;

declare type User = {
  id: UserId;
  name: string;
  email: string;
};

declare type SignedInUser = User & {
  auth: import('firebase/auth').User;
  role: import('~/contexts/GqlAuthContext').Role;
};

// https://zenn.dev/dqn/articles/union-to-tuple
type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

type LastOf<U> = UnionToIntersection<
  U extends unknown ? () => U : never
> extends () => infer R
  ? R
  : never;

declare type UnionToTuple<T, L = LastOf<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];

type Dictionary<K extends PropertyKey = string, T = unknown> = {
  [P in K]?: T;
};

type AnyObject = Record<unknown, unknown>;

// inspired by https://dev.to/harry0000/a-bit-convenient-typescript-type-definitions-for-objectentries-d6g

type TupleEntry<
  T extends readonly unknown[],
  I extends unknown[] = [],
  R = never
> = T extends readonly [infer Head, ...infer Tail]
  ? TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]>
  : R;

type ObjectEntry<T extends AnyObject> = T extends object
  ? { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E
    ? E extends [infer K, infer V]
      ? K extends string | number
        ? [`${K}`, V]
        : never
      : never
    : never
  : never;

type Entry<T extends AnyObject> = T extends readonly [unknown, ...unknown[]]
  ? TupleEntry<T>
  : T extends ReadonlyArray<infer U>
  ? [`${number}`, U]
  : ObjectEntry<T>;

type Nullish<T> = T | null | undefined;

type RequiredSome<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionLike<P = any[], R = any> = (...args: P) => R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Hook<P = any[], R = any> = FunctionLike<P, R>;

declare namespace React {
  interface SyntheticEvent<T = Element, E = Event, P = unknown>
    extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {
    payload?: P;
  }
}
