import React from 'react';

import { Button } from 'antd';
import shortid from 'shortid';
import { defaultTimeFormat } from '../../helpers/time';
import { propSort, bytesToReadable } from '../../helpers/table';

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
    width: 70,
  },
  {
    title: 'Last Modified',
    dataIndex: 'data.lastModified',
    width: 120,
    render: defaultTimeFormat,
  },
  {
    title: '',
    dataIndex: 'id',
    width: 100,
    render: id => <Button onClick={deleteHandler(id)}>Remove</Button>,
  },
];
