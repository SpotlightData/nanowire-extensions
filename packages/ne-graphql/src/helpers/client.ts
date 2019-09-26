import fetch from 'isomorphic-unfetch';
import * as R from 'ramda';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache NormalizedCacheObject } from 'apollo-cache-inmemory';

const gqlFetch = (uri: RequestInfo, options?: RequestInit) => {
  options.headers = R.mergeRight(options.headers, {
    // Prevents IE 11 from caching incorrectly
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    'If-Modified-Since': '0',
  }) as HeadersInit;
  return fetch(uri, options);
};

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: new HttpLink({
      fetch: gqlFetch,
      uri: '/graphql',
    }),
    // This is what enables cancelation
    queryDeduplication: false,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        notifyOnNetworkStatusChange: true,
      },
    },
  });
}
