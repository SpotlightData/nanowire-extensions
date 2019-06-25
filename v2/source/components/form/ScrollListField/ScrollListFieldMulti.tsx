import * as React from 'react';
import * as R from 'ramda';
import { ScrollList } from '../../ui';

import { FieldRenderProps } from 'react-final-form';
import { FieldError } from '../FieldError';
import { FieldWrapper } from '../FieldWrapper';
import { Dictionary } from '../../../interfaces';

export interface ScrollListFieldMultiProps<T>
  extends FieldRenderProps<string[], HTMLTextAreaElement> {
  items: Dictionary<T>;
  accessor(item: T): React.ReactNode;
  height: number;
}

export function ScrollListFieldMulti<T>(
  props: ScrollListFieldMultiProps<T>
): React.ReactElement<typeof FieldWrapper> {
  const { input, meta, items, height, accessor } = props;
  // By default react-final-form will pass empty string as value
  let store = typeof input.value === 'string' ? [] : input.value;

  const onClick = (id: string, _item: T) => {
    R.pipe(
      R.ifElse(R.contains(id), R.remove(store.indexOf(id), 1), R.append(id)),
      input.onChange
    )(store);
  };
  const isActive = (id: string) => store.includes(id);

  return (
    <FieldWrapper>
      <ScrollList
        items={items}
        height={height}
        accessor={accessor}
        onClick={onClick}
        isActive={isActive}
      />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
}
ScrollListFieldMulti.displayName = 'ScrollListFieldMulti';
