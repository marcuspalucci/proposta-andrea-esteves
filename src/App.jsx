import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProposalView from './pages/ProposalView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/proposta/:id" element={<ProposalView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
