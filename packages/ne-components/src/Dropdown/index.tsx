import React from 'react';

import { Menu, Dropdown as AntDropdown, Button, Icon } from 'antd';
import { Dictionary } from 'ts-essentials';

export interface DropdownEntry {
  text: string;
  disabled?: boolean;
}

export interface DropdownProps {
  maxWidth?: number;
  options: Dictionary<DropdownEntry>;
  label: string;
  value: string;
  onChange(key: string): void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  maxWidth,
  options,
  label,
  value,
  onChange,
}) => {
  const menu = (
    <Menu onClick={({ key }) => onChange(key)} style={{ maxWidth: `${maxWidth || 100}px` }}>
      {Object.keys(options).map(key => (
        <Menu.Item key={key} disabled={options[key].disabled}>
          {options[key].text}
        </Menu.Item>
      ))}
    </Menu>
  );

  const selected = options[value];

  return (
    <AntDropdown overlay={menu} trigger={['click']}>
      <Button className="ant-dropdown-link">
        {selected ? selected.text : label} <Icon type="down" />
      </Button>
    </AntDropdown>
  );
};
