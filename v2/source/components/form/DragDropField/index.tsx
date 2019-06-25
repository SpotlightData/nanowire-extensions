import * as React from 'react';

import { DragDrop, DragDropData } from '../../ui/DragDrop';
import { FieldRenderProps } from 'react-final-form';
import { FieldWrapper } from '../FieldWrapper';
import { FieldError } from '../FieldError';

export interface DragDropFieldProps extends FieldRenderProps<DragDropData[], null> {
  options: DragDropData[];
}

export const DragDropField: React.FC<DragDropFieldProps> = props => {
  const { input, meta, options } = props;

  // By default react-final-form will suply empty string
  const optionsSafe = Array.isArray(options) ? options : [];
  const store = typeof input.value === 'string' ? optionsSafe : input.value;

  const onRemove = (index: number) => {
    store.splice(index, 1);
    input.onChange(store);
  };

  return (
    <FieldWrapper>
      <DragDrop options={store} onChange={input.onChange} onRemove={onRemove} />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
};
