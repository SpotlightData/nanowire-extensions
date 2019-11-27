import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-client';

export type GraphQLLoadErrors = ReadonlyArray<GraphQLError | ApolloError>;

export type GraphQLLoadMode<T> =
  | { state: 'loading' }
  | { state: 'not-found' }
  | { state: 'failed'; errors: GraphQLLoadErrors }
  | { state: 'loaded'; data: T };

export type GraphQLLoadUpdateMode<T> = GraphQLLoadMode<T> | { state: 'updating'; data: T };

export type AnyGraphQLLoadMode<T> = GraphQLLoadUpdateMode<T> | GraphQLLoadMode<T>;

export type GraphQLErrorHandler = (errors: GraphQLLoadErrors) => void;
