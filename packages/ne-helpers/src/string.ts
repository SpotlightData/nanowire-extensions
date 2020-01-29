import * as R from 'ramda';

export const weakContains = (s1: string, s2: string, from: number = 0) =>
  s1.toLowerCase().includes(s2.toLowerCase(), from);

export const capitalizeString = (n: string) =>
  n.length === 0 ? n : n[0].toLocaleUpperCase() + n.substring(1, n.length).toLocaleLowerCase();

export function pretifyString(string: string) {
  return string
    .split('_')
    .map(capitalizeString)
    .join(' ');
}

export function deCamelize(text: string, separator: string = '_'): string {
  return text
    .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, `$1${separator}$2`)
    .replace(
      /(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
      `$1${separator}$2`
    )
    .toLowerCase();
}

export const isLetter = (char: string) => {
  if (typeof char !== 'string' || char.length !== 1) {
    throw new TypeError(`Expected string of length1, received: ${typeof char}`);
  }
  return /\w/.test(char);
};

export function isFullMatch(text: string, search: string, from: number) {
  // Verify that the match starts the word
  if (from - 1 >= 0 && isLetter(text[from - 1])) {
    return false;
  }

  // Check whether at the end match the term ends
  const location = from + search.length;
  // If last character of search is space, it should still be a full match
  if (location >= text.length || /\s/.test(search[search.length - 1])) {
    return true;
  }
  return !isLetter(text[location]);
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

// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/string/levenshtein-distance/levenshteinDistance.js
export function levenshteinDistance(a: string, b: string): number {
  // Create empty edit distance matrix for all possible modifications of
  // substrings of a to substrings of b.
  const distanceMatrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  // Fill the first row of the matrix.
  // If this is first row then we're transforming empty string to a.
  // In this case the number of transformations equals to size of a substring.
  for (let i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i;
  }

  // Fill the first column of the matrix.
  // If this is first column then we're transforming empty string to b.
  // In this case the number of transformations equals to size of b substring.
  for (let j = 0; j <= b.length; j += 1) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return distanceMatrix[b.length][a.length];
}

export const longestStringLen = R.pipe(
  R.map<string, number>(R.prop('length')),
  R.reduce<number, number>(R.max, 0 as number)
);

export type SearchString = string | null;

export const searchToParts = R.ifElse(R.isNil, R.always([]), R.split(/\s*\&\s*/)) as (
  string: SearchString
) => string[];

export const partsToSearch = R.pipe<string[], string[], string, SearchString>(
  R.uniq,
  R.join(' & '),
  R.ifElse(n => n.length === 0, R.always(null), R.identity)
);

export function addTag(search: SearchString, tag: string): SearchString {
  return R.pipe(searchToParts, R.append(tag), partsToSearch)(search);
}
