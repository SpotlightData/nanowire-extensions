import * as React from 'react';
import * as R from 'ramda';
import { Menu, Dropdown as AntDropdown, Button, Icon } from 'antd';
import { Dictionary } from 'ts-essentials';
import { DropDownProps as AntDropDownProps } from 'antd/lib/dropdown';

export interface DropdownEntry {
  text: string;
  disabled?: boolean;
}

type Key = string | number;

export interface DropdownProps<K extends Key> extends Omit<AntDropDownProps, 'overlay'> {
  maxWidth?: number;
  options: Dictionary<DropdownEntry, K>;
  label: string;
  value: K | undefined;
  onChange(key: string): void;
}

export function arrayToDropdownOptions<K extends Key>(
  items: K[],
  map: (item: K) => string
): Dictionary<DropdownEntry, K> {
  return R.reduce(
    (dict, item) => {
      dict[item] = { text: map(item) };
      return dict;
    },
    {} as Dictionary<DropdownEntry, K>,
    items
  );
}

export function Dropdown<K extends Key>({
  maxWidth,
  options,
  label,
  value,
  onChange,
  ...rest
}: DropdownProps<K>) {
  const menu = React.useMemo(
    () => (
      <Menu onClick={({ key }) => onChange(key)} style={{ maxWidth }}>
        {Object.keys(options).map(key => (
          <Menu.Item key={key} disabled={options[key].disabled}>
            {options[key].text}
          </Menu.Item>
        ))}
      </Menu>
    ),
    [options, onChange, maxWidth]
  );

  const selected = value ? options[value] : undefined;

  return (
    <AntDropdown overlay={menu} {...rest}>
      <Button className="ant-dropdown-link">
        {selected ? selected.text : label} <Icon type="down" />
      </Button>
    </AntDropdown>
  );
}
