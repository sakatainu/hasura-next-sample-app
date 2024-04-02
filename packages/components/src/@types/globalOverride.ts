declare global {
  interface ObjectConstructor {
    entries<T extends AnyObject>(o: T): ReadonlyArray<Entry<T>>;
  }

  interface ReadonlyArray<T> {
    includes(searchElement: T, fromIndex?: number): searchElement is T;
    includes(searchElement: unknown, fromIndex?: number): searchElement is T;
  }

  interface Array<T> {
    includes(searchElement: T, fromIndex?: number): searchElement is T;
    includes(searchElement: unknown, fromIndex?: number): searchElement is T;
    indexOf(searchElement: unknown, fromIndex?: number): number;
  }

  interface Date {
    toISOString(): TimestamptzString;
  }
}

export {};
