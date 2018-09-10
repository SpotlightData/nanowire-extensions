import { of, Observable, Subscriber } from 'rxjs';
import sid from 'shortid';

export const tryToExpect = (done, cb) => {
  try {
    cb();
    done();
  } catch (e) {}
};

export const makeMockFile = (type = 'pdf') => ({
  source: 'Local',
  name: sid.generate() + '.' + type,
  type,
  data: {},
  size: 20000,
});

export class TestSubscriber extends Subscriber {
  constructor(destination, actions) {
    super(destination);
    this.actions = actions;
    this.next();
  }

  next() {
    this.done = true;
    const { destination } = this;
    destination.next(this.actions.generateData());
  }

  unsubscribe() {
    if (this.cancel) {
      this.cancel();
    }
    if (this.actions.onUnsubscribe) {
      this.actions.onUnsubscribe();
    }
    super.unsubscribe();
  }
}

export class TestObservable extends Observable {
  static create(actions = {}) {
    return new TestObservable(actions);
  }

  constructor(actions) {
    super();
    this.actions = actions;
  }

  _subscribe(subscriber) {
    if (this.actions.onSubscribe) {
      this.actions.onSubscribe();
    }
    return new TestSubscriber(subscriber, this.actions);
  }
}
