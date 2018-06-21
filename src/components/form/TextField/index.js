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

  handleKey = e => {
    const { onEnterPress } = this.props;
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress(e);
    }
  };

  render() {
    const { type, placeholder, input, size, meta } = this.props;
    const error = meta.error || meta.submitError;
    return (
      <div className="field">
        <Input
          {...input}
          placeholder={placeholder}
          type={type}
          size={size}
          onKeyPress={this.handleKey}
        />
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
  onEnterPress: PropTypes.func,
};

TextField.defaultProps = {
  type: '',
  placeholder: '',
  onEnterPress: undefined,
  defaultValue: undefined,
  size: 'default',
};

TextField.displayName = 'TextFieldForm';
