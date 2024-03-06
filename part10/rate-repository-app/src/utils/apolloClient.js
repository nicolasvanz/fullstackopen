import { ApolloClient, InMemoryCache } from "@apollo/client"

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://150.162.151.86:4000/graphql",
    cache: new InMemoryCache(),
  })
}

export default createApolloClient