import { ApolloClient, InMemoryCache } from "@apollo/client"

export default new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000"
})