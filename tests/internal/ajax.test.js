import { AjaxObservable } from '@internal';

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
  });
});
