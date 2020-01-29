import { GraphQLRange } from '../interfaces';
import { Range } from '@spotlightdata/ne-helpers';

export function rangeToGraphQLRange<T>(
  range: Range<T>,
  inclusive: boolean = true
): GraphQLRange<T> {
  return {
    start: {
      value: range[0],
      inclusive,
    },
    end: {
      value: range[1],
      inclusive,
    },
  };
}
