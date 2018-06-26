import React from 'react';

import { Button } from 'antd';
import shortid from 'shortid';
import { defaultTimeFormat } from '../../helpers/time';
import { propSort } from '../../helpers/table';

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function bytesToReadable(x) {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024) {
    n /= 1024;
    l += 1;
  }
  const rounded = n.toFixed(n >= 10 || l < 1 ? 0 : 1);
  return `${rounded} ${units[l]}`;
}

export default deleteHandler => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: propSort('name'),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: propSort('type'),
  },
  {
    title: 'Size',
    dataIndex: 'size',
    sorter: propSort('size'),
    render: bytesToReadable,
  },
  {
    title: 'Last Modified',
    dataIndex: 'data.lastModified',
    render: (text, row, index) => ({
      children: <span key={shortid.generate()}>{defaultTimeFormat(row.data.lastModified)}</span>,
    }),
  },
  {
    title: '',
    dataIndex: 'id',
    className: 'open-link',
    render: id => ({
      children: <Button onClick={deleteHandler(id)}>Remove</Button>,
    }),
  },
];
