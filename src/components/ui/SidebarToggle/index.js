import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';
import injectSheet from 'react-jss';
import cn from 'classnames';

import style from './style';

const SidebarToggleBare = ({ onClick, open, classes, className }) => (
  <Icon
    type={open ? 'menu-fold' : 'menu-unfold'}
    onClick={onClick}
    role="button"
    tabIndex={0}
    className={cn(classes.root, className)}
  />
);

SidebarToggleBare.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

SidebarToggleBare.defaultProps = {
  className: '',
};

SidebarToggleBare.displayName = 'SidebarToggle';

export const SidebarToggle = injectSheet(style)(SidebarToggleBare);
