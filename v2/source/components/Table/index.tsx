import * as React from 'react';

import { Table as AntTable } from 'antd';
import { TableProps, TableSize } from 'antd/lib/table';

const defaultTableProps = {
  rowKey: (record: any) => record._id,
  locale: { emptyText: 'No results' },
  pagination: {
    pageSize: 10,
  },
  size: 'middle' as TableSize,
};

export function Table<T>(props: TableProps<T>): React.ReactElement {
  return <AntTable {...defaultTableProps} {...props} />;
}
