import * as R from 'ramda';
import { TermResult } from './interface';

export const fillKeywordGaps = (items: TermResult[], unique: string[]) =>
  R.pipe(
    R.groupBy<TermResult>(R.prop('datePublished')),
    R.toPairs,
    R.reduce<[string, TermResult[]], TermResult[]>((acc, [datePublished, entries]) => {
      let cleanEntries = entries.filter(n => n.hasValue !== null);
      if (cleanEntries.length !== unique.length) {
        const keys = cleanEntries.map(n => n.hasValue);
        const missing = R.difference(unique, keys);

        cleanEntries.push(...missing.map(hasValue => ({ datePublished, hasValue, hasCount: '0' })));
      }
      acc.push(...cleanEntries);
      return acc;
    }, [])
  )(items);
