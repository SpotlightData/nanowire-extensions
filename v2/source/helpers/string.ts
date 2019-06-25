import * as R from 'ramda';
import { Result, StrictResult } from './Result';

export const weakContains = (s1: string, s2: string) => s1.toLowerCase().includes(s2.toLowerCase());

export const capitalizeString = (str: string) =>
  str[0].toUpperCase() + str.substring(1, str.length);

export const pretifyString = (str: string) =>
  capitalizeString(str.replace(/_/gm, ' ').toLocaleLowerCase());

const RESERVED_NAME_RE = /[<>:"\/\\|?*\x00-\x1F]/g;
const INVALID_NAME_RE = /^\.\.?$/;

export function isValidFileName(name: string): StrictResult<string, boolean> {
  if (name.length > 255) {
    return Result.fromError('Export name is too long');
  }
  const invalid = R.concat(name.match(RESERVED_NAME_RE) || [], name.match(INVALID_NAME_RE) || []);
  if (invalid.length === 0) {
    return Result.fromValue(true);
  }

  return Result.fromError(`The following characters are invalid: ${invalid.join(' ')}`);
}
