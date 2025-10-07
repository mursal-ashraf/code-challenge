import { BrowserRouter, Route, Routes } from 'react-router';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { EnergyAccounts } from './pages/EnergyAccounts/EnergyAccounts';
import { PaymentHistory } from './pages/PaymentHistory/PaymentHistory';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnergyAccounts />} />
          <Route
            path="/:accountId/payment-history"
            element={<PaymentHistory />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
