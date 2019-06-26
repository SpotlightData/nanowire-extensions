import React from 'react';

import { Menu, Dropdown as AntDropdown, Button, Icon } from 'antd';
import { FieldError } from '../FieldError';
import { FieldRenderProps } from 'react-final-form';
import { Dictionary } from '../../../interfaces';
import { FieldWrapper } from '../FieldWrapper';
import { ClickParam } from 'antd/lib/menu';
import { ValueOf } from 'ts-essentials';

export interface DropdownEntry {
  text: string;
  disabled?: boolean;
}

export interface DropdownProps<T, O> extends FieldRenderProps<O, HTMLTextAreaElement> {
  defaultOption?: keyof T;
  maxWidth?: number;
  options: T;
  label: string;
  preTransform?: (before: O) => string;
  postTransform?: (after: string) => O;
}

export class Dropdown<T extends Dictionary<DropdownEntry>, O> extends React.Component<
  DropdownProps<T, O>
> {
  static defaultProps = {
    accessor: 'key',
    maxWidth: 100,
  };

  private _getValue() {
    const { input, preTransform } = this.props;
    if (preTransform) {
      return preTransform(input.value);
    }
    return (input.value as any) as string;
  }

  private _setValue(data: string) {
    const { input, postTransform } = this.props;
    let value: O;
    if (postTransform) {
      value = postTransform(data);
    } else {
      value = (data as any) as O;
    }
    input.onChange(value);
  }

  componentDidMount() {
    const { input, defaultOption } = this.props;
    if (defaultOption) {
      // Need to delay, otherwise it doesn't get updated
      setTimeout(() => {
        this._setValue(defaultOption as string);
      }, 0);
    }
  }

  handleRequestClose = (req: ClickParam) => {
    this._setValue(req.key);
  };

  render() {
    const { options, label, meta, maxWidth } = this.props;
    const selected = options[this._getValue()];

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
