import * as React from 'react';

import { Popconfirm as AntdPopconfirm } from 'antd';
import { PopconfirmProps as AntdPopconfirmProps } from 'antd/lib/popconfirm';

export interface PopconfirmProps extends Omit<AntdPopconfirmProps, 'title'> {
  title?: React.ReactNode;
}

const defaultPopConfirmProps = {
  placement: 'top' as PopconfirmProps['placement'],
  okText: 'Yes',
  cancelText: 'No',
  title: 'Are you sure you want to delete this?',
};

export const Popconfirm: React.FC<PopconfirmProps> = ({ children, ...rest }) => (
  <AntdPopconfirm {...defaultPopConfirmProps} {...rest}>
    {children}
  </AntdPopconfirm>
);
