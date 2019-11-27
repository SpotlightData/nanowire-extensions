import * as React from 'react';

export interface FieldWrapperProps {
  children: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children }) => (
  <div className="field">{children}</div>
);
