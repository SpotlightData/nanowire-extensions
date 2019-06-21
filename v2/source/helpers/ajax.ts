import { Observable, Subscriber } from 'rxjs';
import axios, { AxiosRequestConfig, CancelTokenStatic } from 'axios';

export type AjaxResponse = Promise<{ data: any }>;
export type AjaxConfig = AxiosRequestConfig;

export interface AjaxRunner {
  (config: AxiosRequestConfig): AjaxResponse;
  CancelToken: CancelTokenStatic;
}

class AjaxSubscriber extends Subscriber<[null, any] | [any, null]> {
  cancel: () => void;

  constructor(destination: Subscriber<any>, settings: AjaxConfig, runner: AjaxRunner) {
    super(destination);
    this.send(settings, runner);
  }

  send(settings: AjaxConfig, runner: AjaxRunner) {
    const { CancelToken } = runner;
    const cancelToken = new CancelToken(cancel => {
      // An executor function receives a cancel function as a parameter
      this.cancel = cancel;
    });
    runner(Object.assign({ cancelToken }, settings))
      .then(resp => this.pass([null, resp.data]))
      .catch(e => this.pass([e, null]));
  }

  pass(response: [null, any] | [any, null]) {
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

export class AjaxObservable<T> extends Observable<T> {
  static createWith<T>(settings: AjaxConfig, runner: AjaxRunner): AjaxObservable<T> {
    return new AjaxObservable(settings, runner);
  }

  static create<T>(settings: AjaxConfig): AjaxObservable<T> {
    return AjaxObservable.createWith(settings, axios as AjaxRunner);
  }

  settings: AjaxConfig;
  runner: AjaxRunner;

  constructor(settings: AjaxConfig, runner: AjaxRunner) {
    super();
    this.settings = settings;
    this.runner = runner;
  }

  _subscribe(subscriber: Subscriber<any>) {
    return new AjaxSubscriber(subscriber, this.settings, this.runner);
  }
}
