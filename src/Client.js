import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: 'http://node.woojinsj.com/'
  // uri: 'http://192.168.0.8:3000/'
});

const elink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  uri: 'http://node.woojinsj.com/',
  // uri: 'http://192.168.0.8:3000/',
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});
