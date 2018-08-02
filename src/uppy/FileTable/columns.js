import React from 'react';

import { Button } from 'antd';
import shortid from 'shortid';
import { defaultTimeFormat } from '../../helpers/time';
import { propSort } from '../../helpers/table';
import { bytesToReadable } from '../../helpers/shared';

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
    render: defaultTimeFormat,
  },
  {
    title: '',
    dataIndex: 'id',
    render: id => <Button onClick={deleteHandler(id)}>Remove</Button>,
  },
];
