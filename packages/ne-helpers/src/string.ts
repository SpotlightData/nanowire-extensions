import * as R from 'ramda';

export const weakContains = (s1: string, s2: string, from: number = 0) =>
  s1.toLowerCase().includes(s2.toLowerCase(), from);

export const capitalizeString = (str: string) =>
  str[0].toUpperCase() + str.substring(1, str.length);

export const pretifyString = (str: string) =>
  capitalizeString(str.replace(/_/gm, ' ').toLocaleLowerCase());

export function isFullMatch(text: string, search: string, from: number) {
  // Check whether at the end match the term ends
  const location = from + search.length;
  // If last character of search is space, it should still be a full match
  if (location >= text.length || /\s/.test(search[search.length - 1])) {
    return true;
  }
  return !/\w/.test(text[location]);
}

export function searchTextIn(
  string: string,
  search: string,
  caseSensitive: boolean,
  allowPartial: boolean,
  from: number = 0
) {
  const index = caseSensitive
    ? string.indexOf(search, from)
    : string.toLowerCase().indexOf(search.toLowerCase(), from);
  if (allowPartial || index === -1) {
    return index;
  }
  return isFullMatch(string, search, index) ? index : -1;
}

export const takeChunckOf = (
  string: string,
  start: number,
  end: number
): [string, string, string] => {
  const first = string.slice(0, start);
  const second = string.slice(start, end);
  const third = string.slice(end, string.length);
  return [first, second, third];
};

export function safeStringEncode(str: string): string {
  return encodeURI(str).replace(/\&/g, ';;;');
}

export function safeStringDecode(str: string): string {
  return decodeURI(str).replace(/\;;;/g, '&');
}

/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str: string, seed: number): number {
  var i,
    l,
    hval = seed === undefined ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return hval >>> 0;
}

export function hash64(str: string, seed?: number) {
  var h1 = hashFnv32a(str, seed); // returns 32 bit (as 8 byte hex string)
  return h1 + hashFnv32a(h1 + str, seed); // 64 bit (as 16 byte hex string)
}
