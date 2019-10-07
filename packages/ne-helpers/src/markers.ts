import * as R from 'ramda';
import { MarkedOccurence, MarkedText, MarkedRow } from './text-search';

export function paddingAfterMark<T>(
  index: number,
  items: MarkedText<MarkedOccurence<T>>[],
  padding: number
): MarkedText<MarkedOccurence<T>> {
  /*
   Tries to find enough words to pad the marked occurence
   Return nested array as it makes reversing words back easier
   */
  function collect(index: number, words: string[]): string[] {
    if (items.length === index) {
      return words;
    }
    let acc = [...words, ...items[index].text.split(' ')];
    if (acc.length >= padding) {
      return R.slice(0, padding + 1, acc);
    }
    return collect(index + 1, acc);
  }

  const text = collect(index + 1, []).join(' ');
  const center = items[index];
  return {
    text,
    meta: {
      color: null,
      start: center.meta.end,
      end: center.meta.end + text.length,
      meta: center.meta.meta,
    },
  };
}

export function paddingBeforeMark<T>(
  index: number,
  items: MarkedText<MarkedOccurence<T>>[],
  padding: number
): MarkedText<MarkedOccurence<T>> {
  /*
   Tries to find enough words to pad the marked occurence
   Return nested array as it makes reversing words back easier
   */
  function collect(index: number, words: string[]): string[] {
    if (index === -1) {
      return words;
    }
    // Because we are going backwards, we append items to start
    let acc = [...items[index].text.split(' '), ...words];
    if (acc.length >= padding) {
      return R.slice(acc.length - padding, acc.length, acc);
    }
    return collect(index - 1, acc);
  }

  const text = collect(index - 1, []).join(' ');
  const center = items[index];
  return {
    text,
    meta: {
      color: null,
      start: center.meta.start - text.length,
      end: center.meta.start,
      meta: center.meta.meta,
    },
  };
}

/**
 * Will create a new marked row and give context to an occurence
 * @param index - Index of occurance we are highlighting
 * @param items - Occurences to use for expanding marked text
 * @param wordPadding - How many words will be shown at each side of marked instance
 */
export function paddMark<T>(
  index: number,
  items: MarkedText<MarkedOccurence<T>>[],
  wordPadding: number
): MarkedText<MarkedOccurence<T>>[] {
  return [
    paddingBeforeMark(index, items, wordPadding),
    items[index],
    paddingAfterMark(index, items, wordPadding),
  ];
}

/**
 * Will first remove rows that don't have anything marked,
 * Then will split rows
 */
export function trimMarkedRows<T>(
  rows: MarkedRow<MarkedOccurence<T>>[],
  wordPadding: number = 5
): MarkedRow<MarkedOccurence<T>>[] {
  return R.pipe<
    MarkedRow<MarkedOccurence<T>>[],
    MarkedRow<MarkedOccurence<T>>[],
    MarkedRow<MarkedOccurence<T>>[]
  >(
    R.filter((row: MarkedRow<MarkedOccurence<T>>) => {
      return !R.all(R.pathEq(['meta', 'color'], null), row.occurrences);
    }),
    R.reduce<MarkedRow<MarkedOccurence<T>>, MarkedRow<MarkedOccurence<T>>[]>((acc, row) => {
      /*
        Use this to prefix column name so we don't have duplicates
        For example BRIEF_TITLE (1), BRIEF_TITLE (2) etc
       */
      let foundN = 0;
      const occs = row.occurrences;
      for (let i = 0; i < occs.length; i += 1) {
        const occurrence = occs[i];
        if (occurrence.meta.color === null) {
          continue;
        }
        foundN += 1;
        const source = `${row.source} (${foundN})`;
        acc.push({ id: row.id, source, occurrences: paddMark(i, occs, wordPadding) });
      }
      return acc;
    }, [])
  )(rows);
}
