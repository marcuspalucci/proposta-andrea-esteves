import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProposal } from '../data/config';
import { ProposalProvider } from '../context/ProposalContext';

// Import components
import Hero from '../components/Hero';
import ContextAndPurpose from '../components/ContextAndPurpose';
import AboutUs from '../components/AboutUs';
import Process from '../components/Process';
import CasesGallery from '../components/CasesGallery';
import InstagramReels from '../components/InstagramReels';
import CommercialProposal from '../components/CommercialProposal';
import FooterCTA from '../components/FooterCTA';

export default function ProposalView() {
  const { id } = useParams();
  const proposal = getProposal(id);

  if (!proposal) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fbf8f1', color: '#5a6b4d' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', marginBottom: '1rem' }}>Proposta não encontrada</h1>
        <p style={{ marginBottom: '2rem' }}>O link que você acessou é inválido ou a proposta foi removida.</p>
        <Link to="/" style={{ padding: '1rem 2rem', background: '#c4988a', color: 'white', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <ProposalProvider proposal={proposal}>
      <Hero />
      <ContextAndPurpose />
      <AboutUs />
      <Process />
      <CasesGallery />
      <InstagramReels />
      <CommercialProposal />
      <FooterCTA />
    </ProposalProvider>
  );
}
