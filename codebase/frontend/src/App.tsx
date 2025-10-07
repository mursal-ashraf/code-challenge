import { BrowserRouter, Route, Routes } from 'react-router';
import { EnergyAccounts } from './EnergyAccounts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnergyAccounts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
