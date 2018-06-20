import moment from 'moment';

export const defaultFormat = 'Do MMM YYYY';
export const detailedFormat = 'Do MMM YYYY h:mm:ss a';

export function detailedTimeFormat(date) {
  return moment(date).format(detailedFormat);
}

export function defaultTimeFormat(date) {
  return moment(date).format(defaultFormat);
}

const value = time => moment(time).valueOf();
/**
 * Allows to specify time sorter for objects.
 * Mainly used inside antd table column sorting
 * @example
 * import { timeSort } from 'helpers/time';
 * {
 *   title: 'Date created',
 *   dataIndex: 'createdAt',
 *   sorter: timeSort('createdAt'),
 *   width: 120,
 * },
 * @param {String|(any) => any} keyAccess
 * @return {(a, b) => Int}
 */
export function timeSort(keyAccess) {
  const accessor = typeof keyAccess === 'function' ? keyAccess : obj => obj[keyAccess];

  return (a, b) => {
    const timeA = value(accessor(a));
    const timeB = value(accessor(b));
    if (timeA === timeB) {
      return 0;
    }
    return timeA > timeB ? 1 : -1;
  };
}
