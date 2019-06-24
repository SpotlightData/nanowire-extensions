import React from 'react';

import { Menu, Dropdown as AntDropdown, Button, Icon } from 'antd';
import { FieldError } from '../FieldError';
import { FieldRenderProps } from 'react-final-form';
import { Dictionary } from '../../../interfaces';
import { FieldWrapper } from '../FieldWrapper';
import { ClickParam } from 'antd/lib/menu';

export interface DropdownEntry {
  text: string;
  disabled?: boolean;
}

export interface DropdownProps extends FieldRenderProps<string, HTMLTextAreaElement> {
  defaultOption?: string;
  maxWidth?: number;
  options: Dictionary<DropdownEntry>;
  accessor: string;
  label: string;
}

export class Dropdown extends React.Component<DropdownProps> {
  static defaultProps = {
    accessor: 'key',
    maxWidth: 100,
  };

  componentDidMount() {
    const { input, defaultOption, options } = this.props;
    if (defaultOption) {
      input.onChange(options[defaultOption]);
    }
  }

  handleRequestClose = (req: ClickParam) => {
    const { input } = this.props;
    input.onChange(req.key);
  };

  render() {
    const { options, input, label, meta, maxWidth } = this.props;
    const selected = options[input.value];

    const menu = (
      <Menu onClick={this.handleRequestClose} style={{ maxWidth: `${maxWidth}px` }}>
        {Object.keys(options).map(key => (
          <Menu.Item key={key} disabled={options[key].disabled}>
            {options[key].text}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <FieldWrapper>
        <AntDropdown overlay={menu} trigger={['click']}>
          <div>
            <Button className="ant-dropdown-link">
              {selected ? selected.text : label} <Icon type="down" />
            </Button>
            <FieldError meta={meta} />
          </div>
        </AntDropdown>
      </FieldWrapper>
    );
  }
}
