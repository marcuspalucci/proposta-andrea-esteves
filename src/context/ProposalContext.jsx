import React, { createContext, useContext } from 'react';

const ProposalContext = createContext(null);

export function ProposalProvider({ proposal, children }) {
  return (
    <ProposalContext.Provider value={proposal}>
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposal() {
  const context = useContext(ProposalContext);
  if (!context) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
}
