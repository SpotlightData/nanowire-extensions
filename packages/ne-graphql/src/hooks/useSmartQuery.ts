import * as React from 'react';
import * as R from 'ramda';
import { useCancelableApolloClient } from './useCancelableApolloClient';
import { GraphQLLoadUpdateMode, CreateQuerySpec } from '../interfaces';

export function createUseSmartQuery<D, V, T, FM = V>({
  formatData,
  formatVariables: formatVariablesArg,
  query,
  shouldQuery = R.T,
  generateDependencies = R.always([]),
  notFoundEnabled = true,
}: CreateQuerySpec<D, V, T, FM>) {
  const formatVariables = (formatVariablesArg || R.identity) as (variables: V) => FM;

  return (variables: V): GraphQLLoadUpdateMode<T> => {
    // Track whether we ever queried the data
    const querried = React.useRef<boolean>(false);
    const client = useCancelableApolloClient();
    const [mode, setMode] = React.useState<GraphQLLoadUpdateMode<T>>({ state: 'loading' });
    const formatted = formatVariables(variables);
    const willQuery = shouldQuery(formatted);

    React.useEffect(() => {
      querried.current = true;
      if (!(mode.state === 'loading' || mode.state === 'updating') || !willQuery) {
        return;
      }
      return client.query<D, FM>({
        query,
        variables: formatted,
        onFail(errors) {
          setMode({ state: 'failed', errors, updated: Date.now() });
        },
        onData(data) {
          const output = formatData(data, formatted);
          if (output === null && notFoundEnabled) {
            setMode({ state: 'not-found', updated: Date.now() });
          } else {
            setMode({ state: 'loaded', data: formatData(data, formatted), updated: Date.now() });
          }
        },
      });
    }, [mode.updated, mode.updated]);

    React.useEffect(() => {
      if (!willQuery || !querried.current) {
        return;
      }
      if (mode.state === 'updating' || mode.state === 'loaded') {
        setMode({ state: 'updating', data: mode.data, updated: Date.now() });
      } else {
        setMode({ state: 'loading', updated: Date.now() });
      }
    }, generateDependencies(variables).concat([willQuery]));

    return mode;
  };
}
