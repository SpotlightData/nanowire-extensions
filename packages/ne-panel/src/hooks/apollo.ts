import { useApolloClient } from 'react-apollo';
import { useAbortRegister, useCancelRegister } from '@spotlightdata/ne-components';
import { GraphQLLoadErrors } from '@spotlightdata/ne-graphql';
import { DocumentNode } from 'graphql';
import { QueryBaseOptions } from 'apollo-client';

export interface CancelableClientInput<D, V> {
  variables: V;
  overrides?: QueryBaseOptions<V>;
  cancelId?: string;
  onData(data: D): void;
  onFail(errors: GraphQLLoadErrors): void;
}

type Unsubscribe = () => void;

export function useCancelableApolloClient() {
  const client = useApolloClient();
  const registerCancel = useCancelRegister();

  function mutate<D, V>({
    variables,
    overrides,
    cancelId,
    onData,
    onFail,
    mutation,
  }: CancelableClientInput<D, V> & { mutation: DocumentNode }): Unsubscribe {
    const controller = new AbortController();
    const cancel = () => controller.abort();

    if (cancelId) {
      registerCancel(cancelId, cancel);
    }

    client
      .mutate<D, V>({
        mutation,
        variables,
        context: {
          fetchOptions: {
            signal: controller.signal,
          },
        },
        ...(overrides || {}),
      })
      .then(({ data }) => onData(data))
      .catch(e => onFail([e]));
    return cancel;
  }

  function query<D, V>({
    query,
    variables,
    overrides,
    cancelId,
    onData,
    onFail,
  }: CancelableClientInput<D, V> & { query: DocumentNode }): Unsubscribe {
    const $query = client
      .watchQuery<D, V>({
        query,
        variables,
        ...overrides,
      })
      .subscribe(({ data }) => onData(data), e => onFail([e]));
    const cancel = () => $query.unsubscribe();
    if (cancelId) {
      registerCancel(cancelId, cancel);
    }
    return cancel;
  }

  return { mutate, query };
}
