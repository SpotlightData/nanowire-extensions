import moment from 'moment';
import { keyToAccessor } from '../internal/functions';

export const defaultFormat = 'Do MMM YYYY';
export const detailedFormat = 'Do MMM YYYY h:mm:ss a';

export function detailedTimeFormat(date) {
  return moment(date).format(detailedFormat);
}

export function defaultTimeFormat(date) {
  return moment(date).format(defaultFormat);
}

const value = time => moment(time).valueOf();

export function timeSort(key) {
  const accessor = keyToAccessor(key);
  const convert = n => value(accessor(n));
  return (a, b) => {
    const timeA = conver(a);
    const timeB = convert(b);
    if (timeA === timeB) {
      return 0;
    }
    return timeA > timeB ? 1 : -1;
  };
}
