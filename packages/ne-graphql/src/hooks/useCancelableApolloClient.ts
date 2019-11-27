import { useApolloClient } from 'react-apollo';
import { GraphQLLoadErrors } from '../interfaces';
import { DocumentNode } from 'graphql';
import { MutationOptions, QueryOptions } from 'apollo-client/core/watchQueryOptions';

export interface CancelableClientInput<D, V> {
  variables?: V;
  cancelId?: string;
  onData(data: D): void;
  onFail(errors: GraphQLLoadErrors): void;
}

export interface CancelableMutateInput<D, V> extends CancelableClientInput<D, V> {
  mutation: DocumentNode;
  overrides?: Omit<MutationOptions<any, V>, 'mutation'>;
}

export interface CancelableQueryInput<D, V> extends CancelableClientInput<D, V> {
  query: DocumentNode;
  overrides?: Omit<QueryOptions<V>, 'query'>;
}

type Unsubscribe = () => void;

interface CancelableApolloClient {
  mutate: <D, V>(input: CancelableMutateInput<D, V>) => Unsubscribe;
  query: <D, V>(input: CancelableQueryInput<D, V>) => Unsubscribe;
}

interface Input {
  registerCancel?: (cancelId: string, unsubscribe: Unsubscribe) => void;
}

const voidFn = () => {};

export function useCancelableApolloClient(input?: Input): CancelableApolloClient {
  const client = useApolloClient();
  const registerCancel = input && input.registerCancel ? input.registerCancel : voidFn;

  function mutate<D, V>({
    variables,
    overrides,
    cancelId,
    onData,
    onFail,
    mutation,
  }: CancelableMutateInput<D, V>): Unsubscribe {
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
  }: CancelableQueryInput<D, V>): Unsubscribe {
    const $query = client
      .watchQuery<D, V>({
        query,
        variables,
        ...(overrides || {}),
      })
      .subscribe(
        ({ data }) => onData(data),
        e => onFail([e])
      );
    const cancel = () => $query.unsubscribe();
    if (cancelId) {
      registerCancel(cancelId, cancel);
    }
    return cancel;
  }

  return { mutate, query };
}
