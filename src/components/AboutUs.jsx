import React, { useEffect, useRef, useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import './AboutUs.css';

export default function AboutUs() {
  const { about } = useProposal();
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
    <section className="about-section" ref={sectionRef}>
      <div className={`container ${isVisible ? 'animate-fade-up' : ''}`} style={{ opacity: isVisible ? 0 : 0 }}>
        <div className="about-grid">
          <div className="about-text">
            <div className="eyebrow">
              <span>Quem Somos</span>
            </div>
            
            <div className="quote-mark serif">"</div>
            <blockquote className="serif">
              Transformamos espaços em <em>experiências</em>. {about.quote.split("experiências.")[1]}
            </blockquote>
            
            <div className="about-attribution">
              <div className="line"></div>
              <div>
                <div className="name">{about.name}</div>
                <div className="role serif">{about.role}</div>
              </div>
            </div>

            <div className="about-narrative">
              <h3 className="serif">{about.title}</h3>
              {about.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
