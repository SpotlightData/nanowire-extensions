export function apply(...fns) {
  if (fns.length === 0) {
    return val => val;
  }
  return val => fns.reduce((v, fn) => fn(v), val);
}
