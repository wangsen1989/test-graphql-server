import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: operation =>
    `/api/graphql?${operation && operation.operationName}`,
});

const link = ApolloLink.from([
  httpLink,
]);

const client = new ApolloClient({
  link,
  connectToDevTools: true,
  cache: new InMemoryCache({
    dataIdFromObject(obj) {
      const { id, __typename } = obj;
      if (id) {
        return id;
      }
      return null;
    },
    cacheRedirects: {
      Query: {
        getServerDetail: (_, args, { getCacheKey }) => {
          // debugger
          // 资源必须返回 id 或 _id, 否则找不到缓存, getCacheKey 只会根据 id 和 _id 找缓存
          return getCacheKey({ __typename: 'Server', id: args.id });
        }
      },
    },
  }),
});
window.client = client;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
