import { BrowserRouter, Route, Routes } from 'react-router';
import { EnergyAccounts } from './EnergyAccounts';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnergyAccounts />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
