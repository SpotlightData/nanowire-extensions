import { concat, reduce } from 'ramda';

/**
 * @param {string} prefix - Prefix to the message
 * @param {string[]} types - Types to be added to the type object
 * @param {string[]} [defaultTypes] - Types to be concatinated with passed types
 * @return Object
 */
export function makeActionType(prefix, types, defaultTypes = []) {
  return reduce(
    (dict, type) => Object.assign({ [type]: `${prefix}_${type}` }, dict),
    {},
    concat(types, defaultTypes)
  );
}
