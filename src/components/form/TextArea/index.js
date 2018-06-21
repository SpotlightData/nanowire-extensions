import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { TextArea: TextAreaComp } = Input;

export const TextArea = props => {
  const { input, rows, meta, placeholder } = props;
  const error = meta.error || meta.submitError;
  return (
    <div className="field">
      <TextAreaComp rows={rows} {...input} placeholder={placeholder} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

TextArea.propTypes = {
  rows: PropTypes.number.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: '',
};

TextArea.displayName = 'TextArea';
