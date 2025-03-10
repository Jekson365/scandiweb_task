import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/api/",
  cache: new InMemoryCache(),
});

export default client;
