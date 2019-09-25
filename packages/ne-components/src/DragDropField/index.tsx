import * as React from 'react';
import * as R from 'ramda';

import { DragDrop, DragDropData } from '../DragDrop';
import { FieldRenderProps } from 'react-final-form';
import { FieldWrapper } from '../FieldWrapper';
import { FieldError } from '../FieldError';

export interface DragDropFieldProps extends FieldRenderProps<DragDropData[], null> {}

export const DragDropField: React.FC<DragDropFieldProps> = props => {
  const { input, meta } = props;

  // By default react-final-form will suply empty string
  const store = typeof input.value === 'string' ? [] : input.value;

  const onRemove = (index: number) => {
    R.pipe(
      R.remove(index, 1),
      input.onChange
    )(store);
  };

  return (
    <FieldWrapper>
      <DragDrop options={store} onChange={input.onChange} onRemove={onRemove} />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
};
