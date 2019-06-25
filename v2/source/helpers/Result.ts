type Change<V, V2> = (item: V) => V2;
type Empty = null;

export type StrictResult<E, V> = Result<E, Empty> | Result<Empty, V>;
export class Result<E, V> {
  value: V | Empty;
  error: E | Empty;

  static EMPTY = null;

  static fromValue<V>(value: V) {
    return new Result(Result.EMPTY, value);
  }

  static fromError<E>(error: E) {
    return new Result(error, Result.EMPTY);
  }

  static fromArr<E, V>(items: [E | Empty, V | Empty]) {
    return new Result(items[0], items[1]);
  }

  static errorMap<V, E, E2>(fn: Change<E, E2>) {
    return (r: Result<E, V>) => r.errorMap(fn);
  }

  static valueMap<V, V2, E>(fn: Change<V, V2>) {
    return (r: Result<E, V>) => r.valueMap(fn);
  }

  constructor(error: E, value: V) {
    this.error = error;
    this.value = value;
  }

  errorMap<E2>(fn: Change<E, E2>): StrictResult<E2, V> {
    if (this.error !== Result.EMPTY) {
      return new Result(fn(this.error), Result.EMPTY);
    }
    return new Result(Result.EMPTY, this.value);
  }

  valueMap<V2>(fn: Change<V, V2>): StrictResult<E, V2> {
    if (this.value !== Result.EMPTY) {
      return new Result(Result.EMPTY, fn(this.value));
    }
    return new Result(this.error, Result.EMPTY);
  }

  ifValue(fn: Change<V, void>): Result<E, V> {
    if (this.value !== Result.EMPTY) {
      fn(this.value);
    }
    return this;
  }

  ifError(fn: Change<E, void>): Result<E, V> {
    if (this.error !== Result.EMPTY) {
      fn(this.error);
    }
    return this;
  }

  isValue(): boolean {
    return this.value !== Result.EMPTY;
  }

  isError(): boolean {
    return this.error !== Result.EMPTY;
  }
}
