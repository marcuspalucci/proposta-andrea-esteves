import React, { useEffect } from 'react';
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

  // Navegação global por teclado para pular de seção em seção
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignora se o modal do lightbox (ou outro overlay) estiver aberto
      if (document.querySelector('.lightbox-overlay')) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // Encontra todas as seções (e footer)
        const sections = Array.from(document.querySelectorAll('section, footer'));
        if (sections.length === 0) return;

        // Descobre qual seção está atualmente em foco na tela
        const scrollY = window.scrollY;
        let currentIndex = 0;
        let minDiff = Infinity;

        sections.forEach((sec, index) => {
          // Compensar altura da viewport para o cálculo ser mais no topo da tela
          const diff = Math.abs(sec.offsetTop - scrollY);
          if (diff < minDiff) {
            minDiff = diff;
            currentIndex = index;
          }
        });

        let nextIndex = currentIndex;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
          nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
          e.preventDefault();
          sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
