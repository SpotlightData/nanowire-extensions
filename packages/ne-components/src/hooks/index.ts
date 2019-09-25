import * as React from 'react';
import { Dictionary } from 'ts-essentials';

export type Unsubscribe = () => void;
export function useCancelRegister(): (key: string, unsubscribe: Unsubscribe) => void {
  const toCancel = React.useRef<Dictionary<Unsubscribe>>({});

  React.useEffect(() => {
    Object.values(toCancel.current).map(f => f());
  }, []);

  const registerCancel = React.useCallback(
    (key: string, unsubscribe: Unsubscribe) => {
      toCancel.current[key] = unsubscribe;
    },
    [toCancel]
  );
  return registerCancel;
}

export function useAbortRegister(): (name: string) => AbortController {
  const register = useCancelRegister();

  return (name: string) => {
    const controller = new AbortController();
    register(name, () => controller.abort());
    return controller;
  };
}
