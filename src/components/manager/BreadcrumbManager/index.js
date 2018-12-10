import React from 'react';
import { bool, string } from 'prop-types';

import { BackCrumb } from './BackCrumb';
import { SmartBreadcrumb } from './SmartBreadcrumb';

export const BreadcrumbManager = ({ basic, ...rest }) => {
  if (basic) {
    return <BackCrumb {...rest} />;
  }
  return <SmartBreadcrumb {...rest} />;
};

BreadcrumbManager.propTypes = {
  // If true will display BackCrumb otherwise SmartCrumb
  basic: bool.isRequired,
  className: string.isRequired,
};
