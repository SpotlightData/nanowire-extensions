import * as React from 'react';
import { ScrollList } from '../../ui';

import { FieldRenderProps } from 'react-final-form';
import { FieldError } from '../FieldError';
import { FieldWrapper } from '../FieldWrapper';
import { Dictionary } from '../../../interfaces';

export interface ScrollListFieldSingleProps<T>
  extends FieldRenderProps<string, HTMLTextAreaElement> {
  items: Dictionary<T>;
  accessor(item: T): React.ReactNode;
  height: number;
}

export function ScrollListFieldSingle<T>(props: ScrollListFieldSingleProps<T>): React.ReactElement {
  const { input, meta, items, height, accessor } = props;

  const onClick = (id: string, _item: T) => input.onChange(id);
  const isActive = (id: string) => id === input.value;

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
ScrollListFieldSingle.displayName = 'ScrollListFieldSingle';
