import * as React from 'react';
import * as R from 'ramda';
import { Pagination } from 'antd';
import { GraphQLPaginationDataI } from '../../interfaces';
import { PaginationProps } from 'antd/lib/pagination';

interface GraphQLPaginationProps extends GraphQLPaginationDataI, Omit<PaginationProps, 'onChange'> {
  onChange?: (config: GraphQLPaginationDataI) => void;
  setPage?: (config: GraphQLPaginationDataI) => void;
}

export const GraphQLPagination: React.FC<GraphQLPaginationProps> = ({
  totalCount,
  offset,
  first,
  onChange,
  setPage,
  ...rest
}) => {
  const handler = setPage || onChange || R.identity;

  return (
    <Pagination
      total={totalCount}
      pageSize={first}
      current={(offset + first) / first}
      onChange={page => {
        const newOffset = (page - 1) * first;
        handler({ first, offset: newOffset, totalCount });
      }}
      {...rest}
    />
  );
};
