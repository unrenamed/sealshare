import { DependencyList, useEffect } from "react";
import useAsyncFn from "./use-async-fn";
import { FunctionReturningPromise } from "./use-async-fn";

export function useAsync<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
