import { Observable, Subscriber } from 'rxjs';
import axios from 'axios';

class AjaxSubscriber extends Subscriber {
  constructor(destination, settings, runner) {
    super(destination);
    this.send(settings, runner);
  }

  send(settings, runner) {
    const { CancelToken } = runner;
    const cancelToken = new CancelToken(cancel => {
      // An executor function receives a cancel function as a parameter
      this.cancel = cancel;
    });
    runner(Object.assign({ cancelToken }, settings))
      .then(resp => this.pass([null, resp.data]))
      .catch(e => this.pass([e, null]));
  }

  pass(response) {
    this.next(response);
    this.complete();
  }

  unsubscribe() {
    if (this.closed) {
      return;
    }
    if (this.cancel) {
      this.cancel();
    }
    this.isStopped = true;
    super.unsubscribe();
  }
}

export class AjaxObservable extends Observable {
  static createWith(settings, runner) {
    return new AjaxObservable(settings, runner);
  }

  static create(settings) {
    return AjaxObservable.createWith(settings, axios);
  }

  constructor(settings, runner) {
    super();
    this.settings = settings;
    this.runner = runner;
  }

  _subscribe(subscriber) {
    return new AjaxSubscriber(subscriber, this.settings, this.runner);
  }
}
