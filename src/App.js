import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import Main from './Main'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
)

export default App
