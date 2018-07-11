export class Either {
  constructor(left, right, isLeft = false) {
    this.isLeft = isLeft || !!left;

    this.left = left;
    this.right = right;
  }

  static from(arg1, arg2, isLeft = false) {
    if (Either.isEither(arg1)) {
      return arg1;
    }
    if (Array.isArray(arg1)) {
      return new Either(arg1[0], arg1[1], isLeft);
    }
    return new Either(arg1, arg2, isLeft);
  }

  static leftMap(fn) {
    return (...args) => Either.from(...args).leftMap(fn);
  }

  static rightMap(fn) {
    return (...args) => Either.from(...args).rightMap(fn);
  }

  static ifLeft(fn) {
    return (...args) => Either.from(...args).ifLeft(fn);
  }

  static ifRight(fn) {
    return (...args) => Either.from(...args).ifRight(fn);
  }

  static isEither(m) {
    return m instanceof Either;
  }

  leftMap(fn) {
    if (this.isLeft) {
      return Either.from(fn(this.left), this.right, true);
    }
    return this;
  }

  rightMap(fn) {
    if (!this.isLeft) {
      return Either.from(this.left, fn(this.right));
    }
    return this;
  }

  ifLeft(fn) {
    if (this.isLeft) {
      fn(this.left);
    }
    return this;
  }

  ifRight(fn) {
    if (!this.isLeft) {
      fn(this.right);
    }
    return this;
  }

  toValue() {
    return [this.left, this.right];
  }

  takeLeft() {
    return this.left;
  }

  takeRight() {
    return this.right;
  }

  leftOr(alt) {
    return this.takeLeft() || alt;
  }

  rightOr(alt) {
    return this.takeRight() || alt;
  }
}
