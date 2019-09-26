import * as React from 'react';
import { Pagination } from 'antd';

interface GraphPaginationProps {
  totalCount: number;
  offset: number;
  first: number;
  onChange(offset: number): void;
}

export const GraphPagination: React.FC<GraphPaginationProps> = ({
  totalCount,
  offset,
  first,
  onChange,
}) => {
  return (
    <Pagination
      total={totalCount}
      pageSize={first}
      current={(offset + first) / first}
      onChange={page => {
        const newOffset = (page - 1) * first;
        onChange(newOffset);
      }}
    />
  );
};
