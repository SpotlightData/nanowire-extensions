import * as R from 'ramda';

export type AccessorKey = string | number | string[];

export function keyToAccessor<E, R>(key: AccessorKey): (entry: E) => R {
  if (Array.isArray(key)) {
    return R.path(key);
  } else if (typeof key === 'string' || typeof key === 'number') {
    return (entry: E) => entry[key];
  }
  return key;
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: any
): T {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  } as T;
}

export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate?: boolean
): (...args: any[]) => void {
  let timeout: number;
  const context = null;
  return function(...args: any[]): void {
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const fleschScales = [
  {
    max: 100,
    min: 90,
    text: 'Very easy to read. Easily understood by an average 11-year-old student',
  },
  {
    max: 90,
    min: 80,
    text: 'Easy to read. Conversational English for consumers',
  },
  {
    max: 80,
    min: 70,
    text: 'Fairly easy to read',
  },
  {
    max: 70,
    min: 60,
    text: 'Plain English. Easily understood by 13- to 15-year-old students',
  },
  {
    max: 60,
    min: 50,
    text: 'Fairly difficult to read',
  },
  {
    max: 50,
    min: 30,
    text: 'Difficult to read',
  },
  {
    max: 30,
    min: 0,
    text: 'Very difficult to read. Best understood by university graduates',
  },
];

export function fleschReadabilityToString(score: number): string {
  if (score > 100 || score < 0) {
    return 'Invalid score received';
  }
  for (const scale of fleschScales) {
    if (score <= scale.max && score >= scale.min) {
      return scale.text;
    }
  }
  return 'Could not match the score';
}

export function sentimentToString(score: number): string {
  if (score > -0.05 && score < 0.05) {
    return 'Neutral';
  }
  if (score > 0.05) {
    return 'Positive';
  }
  return 'Negative';
}
