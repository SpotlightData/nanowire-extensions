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

export function graphqlRangeToRange<T>(range: GraphQLRange<T>): Range<T> {
  return [range.start.value, range.end.value];
}
