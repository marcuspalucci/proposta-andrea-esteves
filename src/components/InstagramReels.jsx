import React, { useEffect, useRef, useState } from 'react';
import { proposalData } from '../data/config';
import './InstagramReels.css';

export default function InstagramReels() {
  const { instagramReels } = proposalData;
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

  if (!instagramReels || instagramReels.length === 0) return null;

  return (
    <section className="reels-section" ref={sectionRef}>
      <div className={`container ${isVisible ? 'animate-fade-up' : ''}`} style={{ opacity: isVisible ? 1 : 0 }}>
        
        <div className="reels-header">
          <div className="eyebrow">
            <span>Experiência em Movimento</span>
          </div>
          <h2 className="section-title">
            Vida <em>em Detalhes</em>
          </h2>
        </div>

        <div className="reels-grid">
          {instagramReels.map((reelUrl, idx) => {
            const originalLink = reelUrl.replace("embed/", "");
            return (
              <div key={idx} className="reel-wrapper">
                <iframe 
                  src={reelUrl}
                  className="reel-iframe no-print"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allowFullScreen="true"
                  loading="lazy"
                  title={`Instagram Reel ${idx + 1}`}
                ></iframe>
                {/* Fallback para PDF */}
                <a href={originalLink} target="_blank" rel="noreferrer" className="print-only reel-print-link">
                  ▶ Clique para assistir ao Reel
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
