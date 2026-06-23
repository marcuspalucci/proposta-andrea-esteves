import React, { useEffect, useRef, useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import './CommercialProposal.css';

export default function CommercialProposal() {
  const { commercial } = useProposal();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="proposal-section" ref={sectionRef}>
      <div className={`container ${isVisible ? 'animate-fade-up' : ''}`} style={{ opacity: isVisible ? 0 : 0 }}>
        <div className="proposal-header">
          <div className="eyebrow">
            <span>Proposta Comercial</span>
          </div>
          <h2 className="section-title">
            {commercial.title}
          </h2>
          <p className="proposal-desc serif">{commercial.description}</p>
        </div>

        <div className="proposal-cards">
          {commercial.options.map((opt, idx) => (
            <div key={idx} className={`proposal-card ${opt.highlight ? 'highlight' : ''}`}>
              <div className="card-type serif">{opt.type}</div>
              <div className="card-value serif">{opt.value}</div>
              <div className="card-line"></div>
              <div className="card-condition">{opt.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
