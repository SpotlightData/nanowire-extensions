import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

export class TextField extends PureComponent {
  componentWillMount() {
    const { defaultValue, input } = this.props;
    if (defaultValue) {
      input.onChange(defaultValue, input.value);
    }
  }
  render() {
    const { input, meta, defaultValue, render, ...rest } = this.props;
    const error = meta.error || meta.submitError;
    return (
      <div className="field">
        <Input {...input} {...rest} />
        {error && <span className="field-error">{error}</span>}
      </div>
    );
  }
}

TextField.propTypes = {
  size: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    submitError: PropTypes.string.isRequired,
  }),
  defaultValue: PropTypes.string,
};

TextField.defaultProps = {
  defaultValue: undefined,
  size: 'default',
  meta: {
    error: undefined,
    submitError: undefined,
  },
};

TextField.displayName = 'TextFieldForm';
