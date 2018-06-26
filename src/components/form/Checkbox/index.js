import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as CheckboxInput } from 'antd';

export class Checkbox extends Component {
  componentWillMount() {
    const { defaultValue, input } = this.props;
    input.onChange(defaultValue);
  }

  onChange = e => {
    this.props.input.onChange(e.target.checked);
  };

  render() {
    return (
      <CheckboxInput
        {...this.props.input}
        checked={this.props.input.checked}
        onChange={this.onChange}
      >
        {this.props.label}
      </CheckboxInput>
    );
  }
}

Checkbox.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    checked: PropTypes.bool,
  }).isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
};

Checkbox.defaultProps = {
  defaultValue: false,
};
