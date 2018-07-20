import { clone } from 'ramda';
import { apply } from '../../../helpers/apply';

export function createCore(initial) {
  const filters = [];
  const subscribers = [];
  let items = initial;

  function injectFilter(fn) {
    filters.push(fn);
    return () => {
      var index = filters.indexOf(fn);
      if (index > -1) {
        filters.splice(index, 1);
      }
    };
  }

  function injectSubscriber(fn) {
    subscribers.push(fn);
    return () => {
      var index = subscribers.indexOf(fn);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  }

  function updateItems(newItems) {
    items = newItems;
  }

  function onChange() {
    const result = apply(...filters)(items);
    subscribers.map(fn => fn(result));
  }

  return {
    addFilter: fn => {
      injectFilter(fn);
      onChange();
    },
    addSubscriber: fn => {
      injectSubscriber(fn);
      onChange();
    },
    onChange,
    update: items => {
      updateItems(items);
      onChange();
    },
  };
}
