import * as React from 'react';

import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/lib/table';

const defaultTableProps = {
  rowKey: (record: any) => record._id,
  locale: { emptyText: 'No results' },
  pagination: {
    pageSize: 10,
  },
  size: 'middle' as TableProps<any>['size'],
};

export function Table<T extends Object>(props: TableProps<T>): React.ReactElement {
  return <AntTable {...defaultTableProps} {...props} />;
}
