import * as React from 'react';
import injectSheet from 'react-jss';
import cn from 'classnames';
import { Icon } from 'antd';
import { IconProps } from 'antd/lib/icon';

const style = {
  root: {
    fontSize: '20px',
    margin: 'auto 1em',
    marginLeft: '0',
    cursor: 'pointer',
    userSelect: 'none' as React.CSSProperties['userSelect'],
  },
};

export interface SidebarToggleBareClasses {
  root: string;
}

export interface SidebarToggleBareProps extends IconProps {
  classes: SidebarToggleBareClasses;
  className?: string;
  open: boolean;
}

const SidebarToggleBare = ({ onClick, open, classes, className, ...rest }) => (
  <Icon
    type={open ? 'menu-fold' : 'menu-unfold'}
    onClick={onClick}
    role="button"
    tabIndex={0}
    className={cn(classes.root, className)}
    {...rest}
  />
);

SidebarToggleBare.displayName = 'SidebarToggle';

export const SidebarToggle = injectSheet(style)(SidebarToggleBare);
