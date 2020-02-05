import * as React from 'react';
import * as R from 'ramda';
import { useCancelableApolloClient } from './useCancelableApolloClient';
import { GraphQLPaginationDataI, GraphQLLoadUpdateMode, CreateQuerySpec } from '../interfaces';

const DEFAULT_FIRST_PAGE: GraphQLPaginationDataI = {
  first: 10,
  offset: 0,
  totalCount: 0,
};

export interface PaginatedQuerySpec<D, V, T, FM>
  extends CreateQuerySpec<
    D,
    V & GraphQLPaginationDataI,
    { output: T; totalCount: number },
    FM & GraphQLPaginationDataI
  > {
  firstPage?: GraphQLPaginationDataI;
}

export interface PaginatedQueryOutput<T> {
  mode: GraphQLLoadUpdateMode<T>;
  page: GraphQLPaginationDataI;
  setPage: (nPage: GraphQLPaginationDataI) => void;
}

export function usePaginatedQuery<D, V, T, FM = V>({
  formatData,
  formatVariables: formatVariablesArg,
  query,
  shouldQuery: shouldQueryArg,
  firstPage: firstPageArg,
  generateDependencies: generateDependenciesArg,
  notFoundEnabled = true,
}: PaginatedQuerySpec<D[], V, T[], FM>) {
  const shouldQuery = shouldQueryArg || R.T;
  const firstPage = firstPageArg || DEFAULT_FIRST_PAGE;
  const generateDependencies = generateDependenciesArg || R.always([]);
  const formatVariables = (formatVariablesArg || R.identity) as (
    variables: V & GraphQLPaginationDataI
  ) => FM & GraphQLPaginationDataI;

  return (variables: V): PaginatedQueryOutput<T[]> => {
    const client = useCancelableApolloClient();
    const [mode, setMode] = React.useState<GraphQLLoadUpdateMode<T[]>>({ state: 'loading' });
    const [page, setPageRaw] = React.useState<GraphQLPaginationDataI>(firstPage);

    const queryData = React.useCallback((variables: V, pagination: GraphQLPaginationDataI) => {
      const formatted = formatVariables({ ...variables, ...pagination });

      return client.query<D[], FM & GraphQLPaginationDataI>({
        query: query,
        overrides: {
          fetchPolicy: 'no-cache',
        },
        variables: formatted,
        onFail(errors) {
          setMode({ state: 'failed', errors });
        },
        onData(data) {
          const { output, totalCount } = formatData(data, formatted);
          if (notFoundEnabled && output.length === 0) {
            setMode({ state: 'not-found' });
          } else {
            setMode({ state: 'loaded', data: output });
          }
          setPageRaw({ ...pagination, totalCount });
        },
      });
    }, []);

    const requery = (page: GraphQLPaginationDataI) => {
      if (mode.state === 'loaded') {
        setMode({ state: 'updating', data: mode.data });
      } else {
        setMode({ state: 'loading' });
      }
      return queryData(variables, page);
    };

    const setPage = (nPage: GraphQLPaginationDataI) => {
      setPageRaw(nPage);
      requery(nPage);
    };

    React.useEffect(() => {
      if (shouldQuery(formatVariables({ ...variables, ...page }))) {
        return requery(firstPage);
      }
    }, generateDependencies({ ...variables, ...page }));

    return { mode, page, setPage };
  };
}
