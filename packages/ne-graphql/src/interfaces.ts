import { GraphQLError, DocumentNode } from 'graphql';
import { ApolloError } from 'apollo-client';

export type GraphQLLoadErrors = ReadonlyArray<GraphQLError | ApolloError>;

export type GraphQLLoadMode<T> =
  | { state: 'loading'; updated?: number }
  | { state: 'not-found'; updated?: number }
  | { state: 'failed'; errors: GraphQLLoadErrors; updated?: number }
  | { state: 'loaded'; data: T; updated?: number };

export type GraphQLLoadUpdateMode<T> =
  | GraphQLLoadMode<T>
  | { state: 'updating'; data: T; updated?: number };

export type AnyGraphQLLoadMode<T> = GraphQLLoadUpdateMode<T> | GraphQLLoadMode<T>;

export type GraphQLErrorHandler = (errors: GraphQLLoadErrors) => void;

export interface GraphQLPaginationI {
  first: number;
  offset: number;
}

export interface GraphQLPaginationDataI extends GraphQLPaginationI {
  totalCount: number;
}

export interface CreateQuerySpec<D, V, T, FM> {
  formatData(data: D, variables: FM): T;
  formatVariables?: (variables: V) => FM;
  shouldQuery?: (variables: FM) => boolean;
  generateDependencies?: (variables: V) => any[];
  query: DocumentNode;
  notFoundEnabled?: boolean;
}

export interface GraphQLRangeBounds<T> {
  value: T;
  inclusive: boolean;
}

export interface GraphQLRange<T> {
  start: GraphQLRangeBounds<T>;
  end: GraphQLRangeBounds<T>;
}
