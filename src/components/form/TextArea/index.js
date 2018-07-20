import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

export const TextArea = props => {
  const { input, rows, meta, render, ...rest } = props;
  const error = meta.error || meta.submitError;
  return (
    <div className="field">
      <Input.TextArea rows={rows} {...input} {...rest} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

TextArea.propTypes = {
  rows: PropTypes.number.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
  }),
};

TextArea.defaultProps = {
  meta: {
    error: undefined,
    submitError: undefined,
  },
};

TextArea.displayName = 'TextArea';
