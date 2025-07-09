import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authMiddleware = new ApolloLink((op, fwd) => {
  op.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('next-auth.session-token') || null,
    },
  }));

  return fwd(op);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
