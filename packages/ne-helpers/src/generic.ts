import { KeyValueColor } from './interfaces';

export function kvsToString(entries: KeyValueColor<number>[]) {
  return entries.map(n => n.key + n.value).join('');
}
