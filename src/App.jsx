import React from 'react';
import Hero from './components/Hero';
import ContextAndPurpose from './components/ContextAndPurpose';
import AboutUs from './components/AboutUs';
import Process from './components/Process';
import CasesGallery from './components/CasesGallery';
import InstagramReels from './components/InstagramReels';
import CommercialProposal from './components/CommercialProposal';
import FooterCTA from './components/FooterCTA';

function App() {
  return (
    <>
      <Hero />
      <ContextAndPurpose />
      <AboutUs />
      <Process />
      <CasesGallery />
      <InstagramReels />
      <CommercialProposal />
      <FooterCTA />
    </>
  );
}

export default App;
