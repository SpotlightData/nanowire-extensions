import * as React from 'react';
import * as R from 'ramda';
import { useCancelableApolloClient } from '@spotlightdata/ne-panel';
import { DocumentNode } from 'graphql';
import { GraphQLPaginationDataI, GraphQLLoadUpdateMode } from '../interfaces';

const DEFAULT_FIRST_PAGE: GraphQLPaginationDataI = {
  first: 10,
  offset: 0,
  totalCount: 0,
};

interface PaginatedControllerSpec<D, V, T, FM> {
  formatData(data: D, variables: V): { output: T; totalCount: number };
  formatVariables(variables: V): FM;
  shouldQuery?: (variables: V) => boolean;
  generateDependencies?: (variables: V, page: GraphQLPaginationDataI) => any[];
  query: DocumentNode;
  firstPage?: GraphQLPaginationDataI;
}

export function usePaginatedQuery<D, V, T, FM>({
  formatData,
  formatVariables,
  query,
  shouldQuery: shouldQueryArg,
  firstPage: firstPageArg,
  generateDependencies: generateDependenciesArg,
}: PaginatedControllerSpec<D, V, T, FM>) {
  const shouldQuery = shouldQueryArg || R.T;
  const firstPage = firstPageArg || DEFAULT_FIRST_PAGE;
  const generateDependencies = generateDependenciesArg || R.always([]);

  return (variables: V) => {
    const client = useCancelableApolloClient();
    const [mode, setMode] = React.useState<GraphQLLoadUpdateMode<T>>({ state: 'loading' });
    const [page, setPageRaw] = React.useState<GraphQLPaginationDataI>(firstPage);

    const queryData = React.useCallback((variables: V, pagination: GraphQLPaginationDataI) => {
      return client.query<D, FM>({
        query: query,
        overrides: {
          fetchPolicy: 'no-cache',
        },
        variables: formatVariables({ ...variables, ...pagination }),
        onFail(errors) {
          setMode({ state: 'failed', errors });
        },
        onData(data) {
          const { output, totalCount } = formatData(data, variables);
          setPageRaw({ ...pagination, totalCount });
          setMode({ state: 'loaded', data: output });
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
      if (shouldQuery(variables)) {
        return requery(firstPage);
      }
    }, generateDependencies(variables, page));

    return { mode, page, setPage };
  };
}
