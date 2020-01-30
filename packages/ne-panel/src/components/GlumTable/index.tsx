import * as React from 'react';
import { Row } from 'antd';
import {
  GraphQLErrorDisplay,
  GraphQLPagination,
  GraphQLPaginationDataI,
  GraphQLLoadUpdateMode,
} from '@spotlightdata/ne-graphql';
import { Table } from '@spotlightdata/ne-components';
import { TableProps, SortOrder } from 'antd/lib/table';
import { sortEnumOf } from '../../helpers';
import { PaginationProps } from 'antd/lib/pagination';

export function tableResultsFromGLUM<T>(
  mode: GraphQLLoadUpdateMode<T[]>
): { data: T[]; updating: boolean } {
  let data: T[] = [];
  if (mode.state === 'updating' || mode.state === 'loaded') {
    data = mode.data;
  }
  return {
    data,
    updating: mode.state === 'loading' || mode.state === 'updating',
  };
}

export interface GlumTableProps<D> extends TableProps<D> {
  mode: GraphQLLoadUpdateMode<D[]>;
  page: GraphQLPaginationDataI;
  setPage: (nPage: GraphQLPaginationDataI) => void;
  onSort?: (order: string) => void;
  paginationProps?: PaginationProps;
}

export function GlumTable<D>({
  mode,
  page,
  setPage,
  onSort,
  paginationProps = {},
  ...rest
}: GlumTableProps<D>): React.ReactElement {
  if (mode.state === 'failed') {
    return <GraphQLErrorDisplay errors={mode.errors} />;
  }
  const { data, updating } = tableResultsFromGLUM(mode);
  return (
    <React.Fragment>
      <Table
        dataSource={data}
        pagination={false}
        loading={updating}
        size="small"
        onChange={(_pg, _filt, sorter) =>
          onSort ? onSort(sortEnumOf(sorter.field, sorter.order)) : undefined
        }
        {...rest}
      />
      <Row type="flex" justify="end" className="margin-top-half">
        <GraphQLPagination {...page} setPage={setPage} {...paginationProps} />
      </Row>
    </React.Fragment>
  );
}
