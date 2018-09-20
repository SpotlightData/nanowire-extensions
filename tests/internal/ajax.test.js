import { combineLatest, from } from 'rxjs';
import { mergeMap, merge } from 'rxjs/operators';
import { AjaxObservable } from '$internal';

describe('internal/ajax', () => {
  describe('AjaxObservable', () => {
    it('should allow to inject custom runner', () => {
      expect.assertions(1);
      const data = { done: true };
      const runner = jest.fn().mockResolvedValue({ data });
      runner.CancelToken = class CancelToken {
        constructor() {}
      };
      const ajax = AjaxObservable.createWith({}, runner);
      ajax.subscribe(([error, result]) => {
        expect(result).toEqual(data);
      });
    });

    it('should allow to cancel the requests via token', () => {
      expect.assertions(2);
      const cancel = jest.fn();
      const subscriber = jest.fn();
      const runner = () => new Promise(res => {});
      runner.CancelToken = class CancelToken {
        constructor(cb) {
          cb(cancel);
        }
      };
      const ajax = AjaxObservable.createWith({}, runner);
      ajax.subscribe(() => false).unsubscribe();
      expect(cancel.mock.calls.length).toBe(1);
      expect(subscriber.mock.calls.length).toBe(0);
    });

    it('should call complete function', () => {
      expect.assertions(1);
      const data = { test: 'test' };
      const runner = () => new Promise(res => res({ data }));
      runner.CancelToken = class CancelToken {
        constructor() {}
      };
      const ajax = AjaxObservable.createWith({}, runner);
      combineLatest(ajax).subscribe(([error, resp]) => {
        expect(resp).toEqual(data);
      });
    });

    it('should work inside concurrent mergeMap ', () => {
      expect.assertions(4);
      const data = { test: 'test' };
      const runner = () => new Promise(res => res({ data }));
      runner.CancelToken = class CancelToken {
        constructor() {}
      };
      const makeAjax = () => AjaxObservable.createWith({}, runner);
      from(Array.from({ length: 4 }))
        .pipe(mergeMap(makeAjax, 2))
        .subscribe(([error, resp]) => {
          expect(resp).toEqual(data);
        });
    });
  });
});
