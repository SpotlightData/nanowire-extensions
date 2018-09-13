import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu, Dropdown as AntDropdown, Button, Icon } from 'antd';
import { find, propEq } from 'ramda';

export class Dropdown extends Component {
  componentDidMount() {
    const { input, defaultOption } = this.props;
    if (defaultOption) {
      input.onChange(this.access(defaultOption));
    }
  }

  handleRequestClose = req => {
    const { input, options } = this.props;
    input.onChange(this.access(req));
  };

  access(obj) {
    return obj[this.props.accessor];
  }

  render() {
    const { options, input, label, meta, maxWidth } = this.props;
    const error = meta.error || meta.submitError;
    const selected = options[input.value];

    const menu = (
      <Menu onClick={this.handleRequestClose} style={{ maxWidth: `${maxWidth}px` }}>
        {Object.keys(options).map((key, index) => (
          <Menu.Item key={key} disabled={options[key].disabled}>
            {options[key].text}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <AntDropdown overlay={menu} trigger={['click']}>
        <div>
          <Button className="ant-dropdown-link">
            {selected ? selected.text : label} <Icon type="down" />
          </Button>
          {error && <span className="field-error">{error}</span>}
        </div>
      </AntDropdown>
    );
  }
}

Dropdown.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
  }),
  options: PropTypes.shape({}).isRequired,
  label: PropTypes.string,
  maxWidth: PropTypes.number,
  defaultOption: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  accessor: PropTypes.string,
};

Dropdown.defaultProps = {
  defaultOption: undefined,
  label: '',
  maxWidth: 100,
  meta: {
    error: undefined,
    submitError: undefined,
  },
  accessor: 'key',
};
