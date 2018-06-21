import React from 'react';

import { Table as AntTable } from 'antd';

const defaultTableProps = {
  rowKey: record => record._id,
  locale: { emptyText: 'No results' },
  pagination: {
    pageSize: 10,
  },
  size: 'middle',
};

export const Table = props => <AntTable {...defaultTableProps} {...props} />;
