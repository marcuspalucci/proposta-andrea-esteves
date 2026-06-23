import React, { useEffect, useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import './Hero.css';

export default function Hero() {
  const { hero, client } = useProposal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="hero-section">
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      ></div>
      <div className="hero-overlay"></div>
      
      <div className={`hero-content container ${mounted ? 'animate-fade-up' : ''}`} style={{ opacity: mounted ? 1 : 0 }}>
        <div className="eyebrow">
          <span>Proposta Exclusiva</span>
        </div>
        
        <h1 className="hero-title serif">
          {hero.title.split(' ').map((word, i) => (
            word.toLowerCase() === 'cuidado' || word.toLowerCase() === 'natureza' 
              ? <em key={i}>{word} </em> 
              : <span key={i}>{word} </span>
          ))}
        </h1>
        
        <p className="hero-subtitle serif">
          {hero.subtitle}
        </p>
        
        <div className="hero-client-meta">
          <div className="line"></div>
          <p className="serif">Apresentado a {client.doctor}</p>
        </div>
      </div>
    </section>
  );
}
