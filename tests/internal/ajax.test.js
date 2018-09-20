import { combineLatest, from } from 'rxjs';
import { mergeMap, merge } from 'rxjs/operators';
import { AjaxObservable } from '$internal';

describe('internal/ajax', () => {
  describe('unit: AjaxObservable', () => {
    it('should allow to inject custom runner', () => {
      expect.assertions(1);
      const data = { done: true };
      const runner = () => new Promise(res => res({ data }));
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

    it('should call complete function', done => {
      const data = { test: 'should call complete function' };
      const runner = () => new Promise(res => res({ data }));
      runner.CancelToken = class CancelToken {
        constructor() {}
      };
      const ajax = AjaxObservable.createWith({}, runner);
      combineLatest(ajax).subscribe(merged => {
        const [error, resp] = merged[0];
        expect(resp).toEqual(data);
        done();
      });
    });

    it('should work inside concurrent mergeMap', () => {
      expect.assertions(4);
      const data = { test: 'should work inside concurrent mergeMap' };
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

  describe('integration: AjaxObservable', () => {
    it('should format response', done => {
      const ajax = AjaxObservable.create({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos/1',
      });
      ajax.subscribe(([error, resp]) => {
        expect(error).toBe(null);
        expect(resp).toEqual({ userId: 1, id: 1, title: 'delectus aut autem', completed: false });
        done();
      });
    });
    it('should format error', done => {
      const ajax = AjaxObservable.create({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos/0',
      });
      ajax.subscribe(([error, resp]) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toEqual({});
        expect(error.message).toBe('Request failed with status code 404');
        expect(resp).toEqual(null);
        done();
      });
    });
  });
});
