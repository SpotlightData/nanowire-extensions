import React from 'react';

import { Popconfirm as AntPopconfirm } from 'antd';

const defaultPopConfirmProps = {
  placement: 'top',
  okText: 'Yes',
  cancelText: 'No',
  title: 'Are you sure you want to delete this?',
};

export const Popconfirm = ({ children, ...rest }) => (
  <AntPopconfirm {...defaultPopConfirmProps} {...rest}>
    {children}
  </AntPopconfirm>
);
