import { keyToAccessor, AccessorKey } from './functions';

export function stringSort(a: string, b: string) {
  return a.localeCompare(b);
}

export function propSort<T>(key: AccessorKey) {
  const accessor = keyToAccessor<T, string | number>(key);
  return (a: T, b: T) => {
    const aVal = accessor(a);
    const bVal = accessor(b);

    // In here we copy paste typeof because it helps typescript to validate types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return stringSort(aVal, bVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }
    throw new TypeError(
      `Expected values to be (number | string), received: (${typeof aVal}, ${typeof bVal})`
    );
  };
}
