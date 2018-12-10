import React from 'react';
import { func, string } from 'prop-types';

import { Icon } from 'antd';

export const BackCrumb = ({ icon, onClick, className }) => (
  <Icon type={icon} role="button" onClick={onClick} className={className} />
);

BackCrumb.propTypes = {
  onClick: func.isRequired,
  icon: string.isRequired,
};
