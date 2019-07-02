type Fn<A, R> = (arg1: A) => R;

export function apply<T, R>(f1: Fn<T, R>): R;
export function apply<T, T1, R>(f1: Fn<T, T1>, f2: Fn<T1, R>): R;
export function apply<T, T1, T2, R>(f1: Fn<T, T1>, f2: Fn<T1, T2>, f3: Fn<T2, R>): R;
export function apply<T, T1, T2, T3, R>(
  f1: Fn<T, T1>,
  f2: Fn<T1, T2>,
  f3: Fn<T2, T3>,
  f4: Fn<T3, R>
): R;
export function apply<T, T1, T2, T3, T4, R>(
  f1: Fn<T, T1>,
  f2: Fn<T1, T2>,
  f3: Fn<T2, T3>,
  f4: Fn<T3, T4>,
  f5: Fn<T4, R>
): R;
export function apply<T, T1, T2, T3, T4, T5, R>(
  f1: Fn<T, T1>,
  f2: Fn<T1, T2>,
  f3: Fn<T2, T3>,
  f4: Fn<T3, T4>,
  f5: Fn<T4, T5>,
  f6: Fn<T5, R>
): R;
export function apply<T, T1, T2, T3, T4, T5, T6, R>(
  f1: Fn<T, T1>,
  f2: Fn<T1, T2>,
  f3: Fn<T2, T3>,
  f4: Fn<T3, T4>,
  f5: Fn<T4, T5>,
  f6: Fn<T5, T6>,
  f7: Fn<T6, R>
): R;
export function apply<T, T1, T2, T3, T4, T5, T6, T7, R>(
  f1: Fn<T, T1>,
  f2: Fn<T1, T2>,
  f3: Fn<T2, T3>,
  f4: Fn<T3, T4>,
  f5: Fn<T4, T5>,
  f6: Fn<T5, T6>,
  f7: Fn<T6, T7>,
  f8: Fn<T7, R>
): R;

export function apply<T extends Fn<any, any>, R>(...fns: T[]) {
  if (fns.length === 0) {
    return (val: R) => val;
  }
  return (val: R) => fns.reduce((v, fn) => fn(v), val);
}
