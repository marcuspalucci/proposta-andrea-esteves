import React, { useEffect, useRef, useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import './Context.css';

export default function ContextAndPurpose() {
  const { concept } = useProposal();
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
    <section className="context-section" ref={sectionRef}>
      <div className={`container context-grid ${isVisible ? 'animate-fade-up' : ''}`} style={{ opacity: isVisible ? 1 : 0 }}>
        <div className="context-left">
          <div className="eyebrow">
            <span>Conceito Paisagístico</span>
          </div>
          <h2 className="section-title">
            {concept.title}
          </h2>
        </div>
        
        <div className="context-right">
          <p className="context-main-text serif">
            "{concept.description}"
          </p>
          
          <div className="context-highlight">
            <p>{concept.highlight}</p>
          </div>
          
          <p className="context-secondary-text">
            {concept.secondaryDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
