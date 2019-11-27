import * as R from 'ramda';
import { levenshteinDistance, longestStringLen } from '../string';

export type MarkedTextEntryType = 'marked' | 'regular';

export interface MarkedTextEntry {
  type: MarkedTextEntryType;
  text: string;
  start: number;
  end: number;
}

export const DEFAULT_HIGHLIGHT_MARKER_SYMBOL = '#$#';

const lower = (str: string): string => str.toLowerCase();

// Add empty string just to verify that the word itself matches
const commonSuffixes = ['ed', 'ing', ''];
export function checkSuffixMatches(str: string, term: string) {
  const strL = lower(str);
  const termL = lower(term);
  return commonSuffixes.some(s => levenshteinDistance(strL, termL + s) < 3);
}


// Converts postgreSQL ts_headline marked text to array of MarkedEntries
// Can also be used for other generic search
export function highlightToMarked(terms: string[], text: string, highlightSymbol: string = DEFAULT_HIGHLIGHT_MARKER_SYMBOL): MarkedTextEntry[] {
  const parts = text.split(highlightSymbol);
  const maxLength = longestStringLen(terms);
  /*
    Keeps walking trough split text until a full highlight it found.
    This solves the problem where ts_headline highlights singular words instead of a phrase
   */
  function walk(start: number, index: number, acc: string): [number, MarkedTextEntryType] {
    const str = acc + parts[index];

    for (let term of terms) {
      /*
      Use this instead of exact match, so things like:
      'smartphone' and 'Smartphones' match
      */
      if (checkSuffixMatches(str, term)) {
        return [index, 'marked'];
        // If we matched the term, we need to backtrace
        // and mark previous occurence as regular
      } else if (str.length > maxLength) {
        return [start, 'regular'];
      }
    }

    return walk(start, index + 1, str);
  }
  const all: MarkedTextEntry[] = [];
  let index = 0;
  // Make sure that index search is moved together with index
  let after = 0;
  while (index < parts.length) {
    const [endI, type] = walk(index, index, '');
    // If we're trying to access out of bounds data, the text is likely problematic
    if (endI + 1 > parts.length) {
      break;
    }

    const tmp = parts.slice(index, endI + 1).join('');
    const start = text.indexOf(parts[index], after);
    const end = text.indexOf(parts[endI], after) + parts[endI].length;
    all.push({ type, text: tmp, start, end });
    index = endI + 1;
    after = end;
  }
  return all;
}