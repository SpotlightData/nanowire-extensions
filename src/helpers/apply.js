/**
 * Allows to pipe a variable trough a list of functions.
 * Mainly used for applying HOC to react components
 * @example
 * const Component = apply(injectSheet(style), withRouter)(CoreComponent);
 * @param {Array.<any => any>} fns
 */
export function apply(...fns) {
  if (fns.length === 0) {
    return val => val;
  }
  return val => fns.reduce((v, fn) => fn(v), val);
}
