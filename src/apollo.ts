// import ApolloClient, { Operation } from "apollo-boost";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link"
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";

const getToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    return "";
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "X-JWT": getToken()
    }
  });
  return forward(operation);
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      "X-JWT": getToken()
    },
    reconnect: true
  },
  uri: "ws://localhost:4000/subscriptions"
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("jwt"))
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, { token }, { cache }) => {
        localStorage.setItem("jwt", token);
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return null;
      },
      logUserOut: (_, __, { cache }) => {
        localStorage.removeItem("jwt");
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, combinedLinks)
  ])
});

/*
const client = new ApolloClient({
  cache,
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt"))
        //auth resolver
      }
    }
  },
  resolvers:{
    Mutation: {
      logUserIn: (_, { token }, { cache }) => {
        localStorage.setItem("jwt", token);
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return null;
      },
      logUserOut: (_, __, { cache }) => {
        localStorage.removeItem("jwt");
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  },
  request: async(operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', JSON.stringify(graphQLErrors, null, 2));
    console.log('networkError', JSON.stringify(networkError, null, 2));
  }
});
*/
export default client;
