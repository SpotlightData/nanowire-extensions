import moment from 'moment';
import { keyToAccessor, AccessorKey } from './functions';

export const defaultFormat = 'Do MMM YYYY';
export const detailedFormat = 'Do MMM YYYY h:mm:ss a';

export function detailedTimeFormat(date: moment.MomentInput) {
  return moment(date).format(detailedFormat);
}

export function defaultTimeFormat(date: moment.MomentInput) {
  return moment(date).format(defaultFormat);
}

const value = (time: string | Date) => moment(time).valueOf();

export function timeSort<T>(key: AccessorKey) {
  const accessor = keyToAccessor<T, string>(key);
  const convert = (n: T) => value(accessor(n));
  return (a: T, b: T) => {
    const timeA = convert(a);
    const timeB = convert(b);
    if (timeA === timeB) {
      return 0;
    }
    return timeA > timeB ? 1 : -1;
  };
}

export function nYearsAgoFrom(date: Date, years: number): Date {
  return new Date(new Date().setFullYear(date.getFullYear() - years));
}
export function yearAgo(): Date {
  return nYearsAgoFrom(new Date(), 1);
}
