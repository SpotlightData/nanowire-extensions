import { Observable, Subscriber, of } from 'rxjs';
import axios from 'axios';
import { map, catchError } from 'rxjs/operators';

const { CancelToken } = axios;

class AjaxSubscriber extends Subscriber {
  constructor(destination, settings) {
    super(destination);
    this.send(settings);
  }

  send(settings) {
    const cancelToken = new CancelToken(cancel => {
      // An executor function receives a cancel function as a parameter
      this.cancel = cancel;
    });
    axios(Object.assign({ cancelToken }, settings))
      .then(resp => this.next([null, resp]))
      .catch(e => this.next([e, null]));
  }

  next([error, reponse]) {
    this.done = true;
    const { destination } = this;
    if (error) {
      destination.error(error);
    } else {
      destination.next(reponse.data);
    }
  }

  unsubscribe() {
    if (this.cancel) {
      this.cancel();
    }
    super.unsubscribe();
  }
}

export class AjaxObservable extends Observable {
  static create(settings) {
    return new AjaxObservable(settings);
  }

  constructor(settings) {
    super();
    this.settings = settings;
  }

  _subscribe(subscriber) {
    return new AjaxSubscriber(subscriber, this.settings);
  }
}
