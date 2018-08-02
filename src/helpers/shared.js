const SIZE_UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export function bytesToReadable(x) {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024) {
    n /= 1024;
    l += 1;
  }
  const rounded = n.toFixed(n >= 10 || l < 1 ? 0 : 1);
  return `${rounded} ${SIZE_UNITS[l]}`;
}
