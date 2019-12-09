import * as R from 'ramda';
import { MarkedTextEntry, MarkedTextEntryType } from './highlightToMarked';

const tillMarked = R.pipe<MarkedTextEntry[], MarkedTextEntry[][], MarkedTextEntry[]>(
  R.splitWhen(R.propEq('type', 'marked' as MarkedTextEntryType)),
  R.head
);

type PaddingSide = 'left' | 'right' | 'both';

export interface UnmakedRemovalSpec {
  entries: MarkedTextEntry[];
  padding: number;
  continuation: string;
  side: PaddingSide;
}

export const markedTextSnippetsLength = R.reduce<MarkedTextEntry, number>(
  (sum, n) => sum + n.end - n.start,
  0
);

export function cutRightPad({
  entries,
  padding,
  continuation,
}: UnmakedRemovalSpec): MarkedTextEntry[] {
  let cPad = 0;
  let results = [];
  let sliced = false;
  for (let i = 0; i < entries.length; i += 1) {
    const e = entries[i];
    cPad += e.text.length;
    if (cPad >= padding) {
      const diff = cPad - padding;
      results.push({ ...e, end: e.end - diff, text: e.text.slice(0, -diff) });
      sliced = true;
      break;
    } else {
      results.push(e);
    }
  }

  const { length } = results;
  // It could be that we cut text of the last snippet
  if (length !== 0 && (results.length !== entries.length || sliced)) {
    const e = results[length - 1];
    results[length - 1] = { ...e, text: e.text + continuation };
  }

  return results;
}

export function cutLeftPad({
  entries,
  padding,
  continuation,
}: UnmakedRemovalSpec): MarkedTextEntry[] {
  let cPad = 0;
  let results = [];
  let sliced = false;

  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const e = entries[i];
    cPad += e.text.length;
    if (cPad >= padding) {
      const diff = cPad - padding;
      results.push({ ...e, start: diff, text: e.text.slice(diff, e.text.length) });
      sliced = true;
      break;
    } else {
      results.push(e);
    }
  }

  const { length } = results;
  // It could be that we cut text of the last snippet
  if (length !== 0 && (results.length !== entries.length || sliced)) {
    const e = results[0];
    results[0] = { ...e, text: continuation + e.text };
  }

  return results;
}

export const cutMarkedPadding = R.curry(
  (
    transform: (
      spec: UnmakedRemovalSpec
    ) => [MarkedTextEntry[], MarkedTextEntry[], MarkedTextEntry[]],
    spec: UnmakedRemovalSpec
  ) => {
    const { side } = spec;
    let [leftPad, content, rightPad] = transform(spec);

    if (side === 'both' || side === 'left') {
      leftPad = cutLeftPad({ ...spec, entries: leftPad });
    }
    if (side === 'both' || side === 'right') {
      rightPad = cutRightPad({ ...spec, entries: rightPad });
    }

    return [...leftPad, ...content, ...rightPad];
  }
);

/**
 * Leaves specified padding surrounding marked
 * @param entries
 * @param padding
 */
export const reduceSurroundingPadding = cutMarkedPadding(({ entries }) => {
  let leftPad = tillMarked(entries);
  let rightPad = R.pipe<MarkedTextEntry[], MarkedTextEntry[], MarkedTextEntry[], MarkedTextEntry[]>(
    R.reverse,
    tillMarked,
    R.reverse
  )(entries);
  const content = R.without(R.concat(leftPad, rightPad), entries);
  return [leftPad, content, rightPad];
});

export const previewFirstMarked = cutMarkedPadding(({ entries }) => {
  let leftPad = tillMarked(entries);
  let content: MarkedTextEntry[] = [];
  let rightPad: MarkedTextEntry[] = [];

  if (leftPad.length < entries.length) {
    content = [entries[leftPad.length]];
  }
  if (leftPad.length + 1 < entries.length) {
    rightPad = R.slice(leftPad.length + 1, Infinity, entries);
  }
  return [leftPad, content, rightPad];
});
