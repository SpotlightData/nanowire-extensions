import * as React from 'react';
import * as R from 'ramda';
import { useCancelableApolloClient } from './useCancelableApolloClient';
import { GraphQLLoadUpdateMode, CreateQuerySpec } from '../interfaces';

export function createUseSmartQuery<D, V, T, FM = V>({
  formatData,
  formatVariables: formatVariablesArg,
  query,
  shouldQuery: shouldQueryArg,
  generateDependencies: generateDependenciesArg,
}: CreateQuerySpec<D, V, T, FM>) {
  const shouldQuery = shouldQueryArg || R.T;
  const generateDependencies = generateDependenciesArg || R.always([]);
  const formatVariables = (formatVariablesArg || R.identity) as (variables: V) => FM;

  return (variables: V): GraphQLLoadUpdateMode<T> => {
    const client = useCancelableApolloClient();
    const [mode, setMode] = React.useState<GraphQLLoadUpdateMode<T>>({ state: 'loading' });

    React.useEffect(() => {
      const formatted = formatVariables(variables);
      if (!(mode.state === 'loading' || mode.state === 'updating') || !shouldQuery(formatted)) {
        return;
      }
      return client.query<D, FM>({
        query,
        variables: formatted,
        onFail(errors) {
          setMode({ state: 'failed', errors, updated: Date.now() });
        },
        onData(data) {
          setMode({ state: 'loaded', data: formatData(data, formatted), updated: Date.now() });
        },
      });
    }, [mode.updated, mode.updated]);

    React.useEffect(() => {
      if (!(mode.updated || shouldQuery(formatVariables(variables)))) {
        return;
      }
      if (mode.state === 'updating' || mode.state === 'loaded') {
        setMode({ state: 'updating', data: mode.data, updated: Date.now() });
      } else {
        setMode({ state: 'loading', updated: Date.now() });
      }
    }, generateDependencies(variables));

    return mode;
  };
}
