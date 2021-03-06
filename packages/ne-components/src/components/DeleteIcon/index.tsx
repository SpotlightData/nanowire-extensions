import * as React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from '../Popconfirm';
import { PopconfirmProps } from 'antd/lib/popconfirm';

const style = { cursor: 'pointer', fontSize: 16, color: 'rgb(245, 34, 45)' };

export const DeleteIcon: React.FC<{ onConfirm: PopconfirmProps['onConfirm'] }> = ({
  onConfirm,
  ...rest
}) => {
  return (
    <Popconfirm onConfirm={onConfirm}>
      <DeleteOutlined type="delete" role="button" tabIndex={0} style={style} {...rest} />
    </Popconfirm>
  );
};
