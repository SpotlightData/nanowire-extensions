import * as React from 'react';

export interface FieldWrapper {
  children: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapper> = ({ children }) => (
  <div className="field">{children}</div>
);
