import React, { useEffect, useRef, useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import './Process.css';

export default function Process() {
  const { process } = useProposal();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-section" ref={sectionRef}>
      <div className={`container process-grid ${isVisible ? 'animate-fade-up' : ''}`} style={{ opacity: isVisible ? 0 : 0 }}>
        
        <div className="process-left">
          <div className="process-img-wrapper">
            <img src={process.image} alt="Processo Andréa" className="process-img" />
            <div className="process-img-caption serif">Andréa Esteves</div>
          </div>
        </div>

        <div className="process-right">
          <div className="eyebrow process-eyebrow">
            <span>{process.eyebrow}</span>
          </div>
          
          <h2 className="process-title serif">
            {process.title}<em>{process.titleHighlight}</em>
          </h2>

          <div className="process-steps">
            {process.steps.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="step-num serif">{step.number}</div>
                <div className="step-content">
                  <h3 className="serif">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
