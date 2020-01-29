import { keyToAccessor, AccessorKey } from './functions';
import { format } from 'date-fns';

export const DATE_WITH_TIME = 'kk:mm dd-MM-yyyy';
export const SIMPLE_DATE = 'dd-MM-yyyy';

export const defaultFormat = 'dd-MM-yyyy';
export const detailedFormat = 'kk:mm dd-MM-yyyy';

export type DateInput = string | number | Date;

export function detailedTimeFormat(date: DateInput) {
  return format(new Date(date), detailedFormat);
}

export function defaultTimeFormat(date: DateInput) {
  return format(new Date(date), defaultFormat);
}

const value = (time: DateInput) => new Date(time).getTime();

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
