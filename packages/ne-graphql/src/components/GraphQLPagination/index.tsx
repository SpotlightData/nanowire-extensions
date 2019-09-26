import * as React from 'react';
import { Pagination } from 'antd';

interface GraphQLPaginationProps {
  totalCount: number;
  offset: number;
  first: number;
  onChange(offset: number): void;
}

export const GraphQLPagination: React.FC<GraphQLPaginationProps> = ({
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
