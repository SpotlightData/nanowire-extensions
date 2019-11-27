import * as React from 'react';
import * as R from 'ramda';
import * as sid from 'shortid';

import {
  GraphQLErrorHandler,
  GraphQLLoadUpdateMode,
  GraphQLPagination,
  GraphQLPaginationDataI,
} from '@spotlightdata/ne-graphql';
import { siblingBreakpoints, MarkedOccurence } from '@spotlightdata/ne-helpers';

import { LoadingBox, Loading } from '@spotlightdata/ne-components';

import { useApolloClient } from 'react-apollo';
import { Row, Typography, Divider, Col } from 'antd';
import { Dictionary } from 'ts-essentials';
// @ts-ignore
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  trimMarkedRows,
  MarkedRow,
  createMarkedTextRows,
  TextMarkerDataItem,
} from '@spotlightdata/ne-helpers';
import { DocumentNode } from 'graphql';

interface SearchMarkerDisplayProps<D, V> {
  onFail: GraphQLErrorHandler;
  query: DocumentNode;
  variables: V;
  wordPadding?: number;
  transform: (data: D) => { totalCount: number; values: TextMarkerDataItem[] };
  makePath(id: string): string;
  search: string;
}

interface Pagination {
  first: number;
  offset: number;
}

type TaggedRow = MarkedRow<MarkedOccurence<undefined>>;

type SearchMarkerLoadMode = GraphQLLoadUpdateMode<{
  rows: Dictionary<TaggedRow[]>;
  totalCount: number;
}>;

function useController<D, V>({
  onFail,
  wordPadding,
  query,
  variables,
  transform,
  search,
}: SearchMarkerDisplayProps<D, V>) {
  const client = useApolloClient();
  const [position, setPosition] = React.useState<Pagination>({ first: 10, offset: 0 });
  const [mode, setMode] = React.useState<SearchMarkerLoadMode>({ state: 'loading' });

  useDeepCompareEffect(() => {
    setPosition({ ...position, offset: 0 });
    if (mode.state === 'loaded') {
      return setMode({ state: 'updating', data: mode.data });
    }
    setMode({ state: 'loading' });
  }, [variables]);

  React.useEffect(() => {
    if (!(mode.state === 'loading' || mode.state === 'updating')) {
      return;
    }
    const $query = client
      .watchQuery<D, V & Pagination>({
        query,
        variables: { ...variables, ...position },
      })
      .subscribe(
        ({ data }) => {
          const { values, totalCount } = transform(data);

          const marked = createMarkedTextRows<undefined>(
            [{ color: 'red', search }],
            values,
            false,
            false
          );
          const grouped = R.groupBy(
            R.prop('id'),
            trimMarkedRows<undefined>(marked, wordPadding || 10)
          );
          setMode({
            state: 'loaded',
            data: { rows: grouped, totalCount },
          });
        },
        e => onFail([e])
      );
    return () => $query.unsubscribe();
  }, [mode.state]);

  const changePosition = React.useCallback(
    (position: GraphQLPaginationDataI) => {
      setPosition(position);
      if (mode.state === 'loaded') {
        return setMode({ state: 'updating', data: mode.data });
      }
      setMode({ state: 'loading' });
    },
    [position, mode.state]
  );

  return { markers: mode, position, changePosition };
}

const [sourceBpts, textBpts] = siblingBreakpoints({
  xs: 8,
  md: 6,
  lg: 5,
  xl: 3,
});

const MarkedTextRender: React.FC<{ data: TaggedRow }> = ({ data }) => {
  return (
    <Row type="flex">
      <Col {...sourceBpts}>
        <Typography.Text strong>{data.source.split(' ')[0]}</Typography.Text>
      </Col>
      <Col {...textBpts}>
        {data.occurrences.map(occ => (
          <Typography.Text key={sid.generate()} style={{ color: occ.meta.color || undefined }}>
            {occ.text}
          </Typography.Text>
        ))}
      </Col>
    </Row>
  );
};

export function SearchMarkerDisplay<D, V>(props: SearchMarkerDisplayProps<D, V>) {
  const { makePath } = props;
  const { markers, position, changePosition } = useController(props);
  const containerRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.scrollTop = 0;
  }, [position.offset]);

  if (!(markers.state === 'loaded' || markers.state === 'updating')) {
    return <LoadingBox />;
  }

  const { data } = markers;
  return (
    <div style={{ padding: '1em' }}>
      {markers.state === 'updating' && <Loading />}
      <div style={{ overflowY: 'scroll', height: 300 }} ref={containerRef}>
        {Object.entries(data.rows).map(([key, value]) => {
          return (
            <div key={key}>
              <Row type="flex" justify="end" style={{ paddingRight: '1em' }}>
                <a href={'/' + makePath(key)} target="_blank">
                  VIEW
                </a>
              </Row>
              {value.map(n => {
                return <MarkedTextRender key={n.source + n.id} data={n} />;
              })}
              <Divider />
            </div>
          );
        })}
      </div>

      <Row type="flex" justify="end" style={{ marginTop: '1em' }}>
        <GraphQLPagination
          totalCount={data.totalCount}
          first={position.first}
          offset={position.offset}
          onChange={changePosition}
        />
      </Row>
    </div>
  );
}
