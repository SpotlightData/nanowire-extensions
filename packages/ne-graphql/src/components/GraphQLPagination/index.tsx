import * as React from 'react';
import { Pagination } from 'antd';
import { GraphQLPaginationDataI } from '../../interfaces';

interface GraphQLPaginationProps extends GraphQLPaginationDataI {
  onChange(config: GraphQLPaginationDataI): void;
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
        onChange({ first, offset: newOffset, totalCount });
      }}
    />
  );
};
