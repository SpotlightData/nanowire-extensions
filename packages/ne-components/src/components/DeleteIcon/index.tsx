import * as React from 'react';
import { Icon } from 'antd';
import { Popconfirm } from '../Popconfirm';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { IconProps } from 'antd/lib/icon';

const style = { cursor: 'pointer', fontSize: 16, color: 'rgb(245, 34, 45)' };

export const DeleteIcon: React.FC<{ onConfirm: PopconfirmProps['onConfirm'] } & IconProps> = ({
  onConfirm,
  ...rest
}) => {
  return (
    <Popconfirm onConfirm={onConfirm}>
      <Icon type="delete" role="button" tabIndex={0} style={style} {...rest} />
    </Popconfirm>
  );
};
