import React from 'react';
import { useProposal } from '../context/ProposalContext';
import './FooterCTA.css';

export default function FooterCTA() {
  const proposal = useProposal();
  const { contact, client } = proposal;
  
  const textMessage = `Olá, gostaria de aprovar a proposta de paisagismo de ${client.name}!`;
  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(textMessage)}`;

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
