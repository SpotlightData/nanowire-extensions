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
    const { type, placeholder, input, size, meta } = this.props;
    const error = meta.error || meta.submitError;
    return (
      <div className="field">
        <Input {...input} placeholder={placeholder} type={type} size={size} />
        {error && <span className="field-error">{error}</span>}
      </div>
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
  }).isRequired,
  defaultValue: PropTypes.string,
};

TextField.defaultProps = {
  type: '',
  placeholder: '',
  defaultValue: undefined,
  size: 'default',
};

TextField.displayName = 'TextFieldForm';
