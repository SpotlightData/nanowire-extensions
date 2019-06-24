import * as React from 'react';
import { FieldMetaState } from 'react-final-form';

export interface FieldErrorProps<T> {
  meta: FieldMetaState<T>;
}

export function FieldError<T>({ meta }: FieldErrorProps<T>): React.ReactElement {
  const error = meta.error || meta.submitError;
  if (!error) {
    return null;
  }
  return <span className="field-error">{error}</span>;
}
