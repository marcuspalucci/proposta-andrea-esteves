import React, { useEffect, useRef, useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import './CasesGallery.css';

export default function CasesGallery() {
  const { references } = useProposal();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Lightbox State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    projectIndex: 0,
    imageIndex: 0
  });

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

  const openLightbox = (pIndex, iIndex) => {
    setLightbox({ isOpen: true, projectIndex: pIndex, imageIndex: iIndex });
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    const currentProject = references[lightbox.projectIndex];
    if (lightbox.imageIndex < currentProject.images.length - 1) {
      setLightbox(prev => ({ ...prev, imageIndex: prev.imageIndex + 1 }));
    } else {
      // Loop back to first image
      setLightbox(prev => ({ ...prev, imageIndex: 0 }));
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    const currentProject = references[lightbox.projectIndex];
    if (lightbox.imageIndex > 0) {
      setLightbox(prev => ({ ...prev, imageIndex: prev.imageIndex - 1 }));
    } else {
      // Loop back to last image
      setLightbox(prev => ({ ...prev, imageIndex: currentProject.images.length - 1 }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);



  return (
    <>
      <section className="editorial-section" ref={sectionRef}>
        <div className={`container ${isVisible ? 'animate-fade-up' : ''}`} style={{ opacity: isVisible ? 1 : 0 }}>
          
          <div className="editorial-header">
            <div className="eyebrow">
              <span>Referências</span>
            </div>
            <h2 className="section-title">
              Nossos <em>Projetos</em>
            </h2>
          </div>

          <div className="editorial-list">
            {references.map((project, pIdx) => {
              const numImages = project.images.length;
              const gridClass = `ed-grid--${Math.min(numImages, 5)}`;

              return (
                <div key={project.id} className="project-editorial">
                  <div className="ed-info">
                    <div className="ed-eyebrow">Projeto {String(pIdx + 1).padStart(2, '0')}</div>
                    <h3 className="serif">{project.title}</h3>
                    <p>{project.description}</p>
                    
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="ed-link">
                        Ver no Instagram
                      </a>
                    )}
                  </div>

                  <div className={`ed-grid ${gridClass}`}>
                    {project.images.map((img, imgIdx) => (
                      <div 
                        key={imgIdx} 
                        className={imgIdx === 0 ? "ed-main" : "ed-thumb"}
                        onClick={() => openLightbox(pIdx, imgIdx)}
                      >
                        <img src={img} alt={`${project.title} - Foto ${imgIdx + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            &#10094;
          </button>
          
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            {references[lightbox.projectIndex].images.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${references[lightbox.projectIndex].title} - Foto ${idx + 1}`} 
                className={`lightbox-image ${idx === lightbox.imageIndex ? 'active' : ''}`} 
              />
            ))}
            
            <div className="lightbox-caption">
              {references[lightbox.projectIndex].title} — {lightbox.imageIndex + 1} de {references[lightbox.projectIndex].images.length}
            </div>
          </div>

          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
