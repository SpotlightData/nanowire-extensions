import * as R from 'ramda';
import { searchTextIn } from './string';

interface Search {
  caseSensitive: boolean;
  value: string;
}

export interface Occurrence {
  start: number;
  end: number;
}

export interface MarkedText<T> {
  text: string;
  meta: T;
}

export interface TextMarkerEntry {
  source: string;
  text: string;
}

export interface TextMarkerDataItem {
  id: string;
  entries: TextMarkerEntry[];
}

export interface TextSearch<T = undefined> {
  color: string;
  search: string;
  meta: T;
}

export interface MarkedOccurence<M = undefined> extends Occurrence {
  color: string | null;
  meta: M;
}

export interface MarkedRow<T = undefined> {
  id: string;
  source: string;
  occurrences: MarkedText<MarkedOccurence<T>>[];
}

export function findOccurrences<T extends Occurrence>(
  search: Search,
  string: string,
  partialMatch: boolean,
  format: (entry: Occurrence) => T,
  found: T[] = []
): T[] {
  const { length } = search.value;
  if (length > string.length) {
    return found;
  }
  // Only search after next occurence
  const prevFind = R.last<T>(found) || { start: 0, end: 0 };
  const index = searchTextIn(
    string,
    search.value,
    search.caseSensitive,
    partialMatch,
    prevFind.end
  );
  if (index === -1) {
    return found;
  }
  return findOccurrences(search, string, partialMatch, format, [
    ...found,
    format({ start: index, end: index + length }),
  ]);
}

export function doesOccurenceOverlap(item: Occurrence, items: Occurrence[]): boolean {
  const overlaps = (value: number, index: number): boolean =>
    value >= items[index].start && value <= items[index].end;
  const contains = (smaller: Occurrence, bigger: Occurrence) =>
    bigger.start <= smaller.start && bigger.end >= smaller.end;
  /* 
    Check: 
    - whether start or end of highlight is within other highlight
    - if selected occurence envelops any other occurences
   */

  for (let i = 0; i < items.length; i += 1) {
    if (overlaps(item.start, i) || overlaps(item.end, i) || contains(items[i], item)) {
      return true;
    }
  }

  return false;
}

/*
  Removes occurences from second list if they interfere with items in first list  
  ATM it's O(n^2) but can be improved
 */
export function withoutOverlaps<T extends Occurrence>(first: T[], second: T[]): T[] {
  if (first.length === 0) {
    return second;
  }
  const filtered = R.filter(occ => {
    return !doesOccurenceOverlap(occ, first);
  }, second);
  return filtered;
}

export function markText<T extends Occurrence>(
  text: string,
  occs: T[],
  unmarked: T
): MarkedText<T>[] {
  const occurrences = R.sortWith<T>([R.ascend(R.prop('start'))], occs);
  function makeUnmarked(start: number, end: number): MarkedText<T> {
    const entry = Object.assign({}, unmarked);
    entry.start = start;
    entry.end = end;
    return { text: text.slice(entry.start, entry.end), meta: entry };
  }
  // debugger;
  // Send back the whole text as single mark
  if (occurrences.length === 0) {
    return [makeUnmarked(0, text.length)];
  }
  let items = [];
  // Make sure initial text is included
  if (occurrences[0].start !== 0) {
    items.push(makeUnmarked(0, occurrences[0].start));
  }

  items = occurrences.reduce((list, spot) => {
    const prev = R.last<MarkedText<T>>(items);
    if (prev !== undefined && prev.meta.end !== spot.start) {
      list.push(makeUnmarked(prev.meta.end, spot.start));
    }
    list.push({ text: text.slice(spot.start, spot.end), meta: spot });
    return list;
  }, items);
  // Check if there is any text at the end
  const last = R.last<MarkedText<T>>(items);
  if (last.meta.end !== text.length) {
    items.push(makeUnmarked(last.meta.end, text.length));
  }
  return items;
}

// Runs all searches on a single entry
export function searchEntry<M>(
  search: TextSearch<M>[],
  caseSensitive: boolean,
  entry: TextMarkerEntry,
  unmarked: MarkedOccurence<M>,
  partialMatch: boolean
): MarkedText<MarkedOccurence<M>>[] {
  const occs = search.reduce(
    (occs, s) => {
      const found = findOccurrences<MarkedOccurence<M>>(
        { value: s.search, caseSensitive },
        entry.text,
        partialMatch,
        (occ: Occurrence): MarkedOccurence<M> => {
          return { ...occ, color: s.color, meta: s.meta };
        }
      );
      const filtered = withoutOverlaps(occs, found);
      occs.push(...filtered);
      return occs;
    },
    [] as MarkedOccurence<M>[]
  );
  return markText(entry.text, occs, unmarked);
}

export function createMarkedTextRows<T>(
  search: TextSearch<T>[],
  items: TextMarkerDataItem[],
  caseSensitive: boolean = true,
  partialMatch: boolean = true
): MarkedRow<T>[] {
  const unmarked = { start: 0, end: 0, color: null, meta: undefined };
  const entries = items.reduce((list, item) => {
    // Collect all marks for a single entry
    // Will go trough all sources and mark each search on every one
    const marks = item.entries.reduce((list, entry) => {
      const occurrences = searchEntry(search, caseSensitive, entry, unmarked, partialMatch);
      list.push({ id: item.id, source: entry.source, occurrences });
      return list;
    }, []);
    list.push(...marks);
    return list;
  }, []);
  return entries;
}
