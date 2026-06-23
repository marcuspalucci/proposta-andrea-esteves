import React from 'react';
import { proposalData } from '../data/config';
import './FooterCTA.css';

export default function FooterCTA() {
  const { contact } = proposalData;
  
  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=Olá,%20gostaria%20de%20aprovar%20a%20proposta%20de%20paisagismo!`;

  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <h2 className="serif">Próximos Passos</h2>
        <p>A natureza está pronta para fazer parte do seu dia a dia.</p>
        
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-primary">
          {contact.ctaText}
        </a>
      </div>
      <div className="footer-bottom">
        <p className="serif">Andréa Esteves — Paisagismo Autoral</p>
      </div>
    </footer>
  );
}
