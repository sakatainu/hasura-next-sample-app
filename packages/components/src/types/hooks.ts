export type AsyncHookResult<T> = {
  fetching: boolean;
  error?: Error;
  data?: T;
};

export type DispatcherResult<T = unknown> = Promise<{
  error?: Error;
  data?: T;
}>;
