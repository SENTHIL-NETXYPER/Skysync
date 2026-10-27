import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreServices: () => void;
  onOpenDesigner?: () => void;
  onNavigateToConsulting?: () => void;
  onNavigateToMigration?: () => void;
}

type TopicId = 'cloud' | 'devops' | 'ai' | 'explore';

interface HeroTopic {
  id: TopicId;
  label: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  bgImage: string;
  cardImage: string;
  actionText: string;
  targetSection: string;
}

const TOPICS: HeroTopic[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    badge: 'Cloud · Architecture · AWS',
    titlePrefix: 'Build Smarter',
    titleHighlight: 'with Cloud & AI',
    subtitle: 'We design and build secure, scalable cloud and AI solutions that help organizations move faster.',
    bgImage: './assets/hero_clean_arch_bg.jpg',
    cardImage: './assets/hero_clean_arch_bg.jpg',
    actionText: 'Explore Cloud Capabilities',
    targetSection: 'services'
  },
  {
    id: 'devops',
    label: 'DevOps & Automation',
    badge: 'DevSecOps · CI/CD · Pipelines',
    titlePrefix: 'Release Faster',
    titleHighlight: 'with DevOps & Flow',
    subtitle: 'Automated CI/CD pipelines, containerized workloads on AWS, and rehearsed zero-downtime cutovers.',
    bgImage: './assets/hero_twilight_building.jpg',
    cardImage: './assets/hero_twilight_building.jpg',
    actionText: 'View DevOps Workflows',
    targetSection: 'services'
  },
  {
    id: 'ai',
    label: 'AI Solutions',
    badge: 'Enterprise AI · Bedrock · RAG',
    titlePrefix: 'Scale Intelligently',
    titleHighlight: 'with Generative AI',
    subtitle: 'Grounded Amazon Bedrock Q&A assistants that query institutional and enterprise documents privately.',
    bgImage: './assets/theme_ai_bg.jpg',
    cardImage: './assets/theme_ai_bg.jpg',
    actionText: 'Discover AI Solutions',
    targetSection: 'solutions'
  },
  {
    id: 'explore',
    label: 'Explore More',
    badge: 'Architecture · Workbench · FinOps',
    titlePrefix: 'Design Architectures',
    titleHighlight: 'in Real-time Studio',
    subtitle: 'Interactive drag-and-drop AWS architecture designer with Well-Architected validation and FinOps forecasting.',
    bgImage: './assets/hero_skyscrapers.jpg',
    cardImage: './assets/hero_skyscrapers.jpg',
    actionText: 'Open Architecture Designer',
    targetSection: 'designer-section'
  }
];

const AUTO_ROTATE_INTERVAL = 5000; // 5 seconds per slide for a dynamic, moving experience

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenDesigner
}) => {
  const [activeId, setActiveId] = useState<TopicId>('cloud');
  const [progressKey, setProgressKey] = useState<number>(0);

  // Auto-rotate slides smoothly every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveId((prev) => {
        const idx = TOPICS.findIndex((t) => t.id === prev);
        const nextIdx = (idx + 1) % TOPICS.length;
        return TOPICS[nextIdx].id;
      });
      setProgressKey((k) => k + 1);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [progressKey]);

  // Card click smoothly switches the hero slide in place
  const handleCardClick = (topic: HeroTopic) => {
    setActiveId(topic.id);
    setProgressKey((k) => k + 1);
  };

  const handleNextSlide = () => {
    setActiveId((prev) => {
      const idx = TOPICS.findIndex((t) => t.id === prev);
      const nextIdx = (idx + 1) % TOPICS.length;
      return TOPICS[nextIdx].id;
    });
    setProgressKey((k) => k + 1);
  };

  const handlePrevSlide = () => {
    setActiveId((prev) => {
      const idx = TOPICS.findIndex((t) => t.id === prev);
      const prevIdx = (idx - 1 + TOPICS.length) % TOPICS.length;
      return TOPICS[prevIdx].id;
    });
    setProgressKey((k) => k + 1);
  };

  const handleExploreSection = (topic: HeroTopic) => {
    if (topic.id === 'explore' && onOpenDesigner) {
      onOpenDesigner();
    }
    const el = document.getElementById(topic.targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = TOPICS.findIndex((t) => t.id === activeId);
  const activeTopic = TOPICS[activeIndex] || TOPICS[0];

  return (
    <section
      aria-label="NetXyper Cloud & AI Solutions"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '24px 20px 32px 20px',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Hero Headline Entrance: Fade in + move up (400ms) */
        @keyframes heroFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 5-second progress countdown line for active card */
        @keyframes activeCardProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .hero-animated-content {
          animation: heroFadeInUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Interactive floating image cards */
        .hero-image-card {
          position: relative;
          height: 155px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          background-color: #0A0E1A;
          border: 1.5px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.1);
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms ease, border-color 260ms ease;
          display: block;
          user-select: none;
        }

        .hero-image-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -6px rgba(15, 23, 42, 0.2);
          border-color: rgba(237, 113, 0, 0.7);
        }

        .hero-image-card.active-topic {
          border-color: #ED7100;
          box-shadow: 0 12px 28px -4px rgba(237, 113, 0, 0.35), 0 0 0 1.5px #ED7100;
        }

        .hero-image-card .card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-image-card:hover .card-thumb-img {
          transform: scale(1.05);
        }

        .hero-image-card .card-thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 14, 26, 0.1) 0%, rgba(10, 14, 26, 0.4) 45%, rgba(10, 14, 26, 0.82) 100%);
          transition: background 260ms ease;
        }

        .hero-image-card:hover .card-thumb-overlay {
          background: linear-gradient(180deg, rgba(10, 14, 26, 0.2) 0%, rgba(10, 14, 26, 0.5) 45%, rgba(10, 14, 26, 0.9) 100%);
        }

        .hero-image-card .card-thumb-label {
          position: absolute;
          bottom: 18px;
          left: 18px;
          right: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #FFFFFF;
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        /* Progress indicator bar on active card */
        .card-bottom-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          background: rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .card-bottom-progress-bar {
          height: 100%;
          width: 100%;
          background: #ED7100;
          transform-origin: left;
          animation: activeCardProgress 5s linear forwards;
        }

        /* Primary Action button */
        .hero-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 12px 26px;
          border-radius: 9999px;
          background-color: #ED7100;
          color: #FFFFFF;
          font-size: 0.96rem;
          font-weight: 750;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(237, 113, 0, 0.32);
          transition: background-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          text-decoration: none;
        }

        .hero-cta-button:hover {
          background-color: #D96500;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(237, 113, 0, 0.44);
        }

        .hero-secondary-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.9);
          color: #0F172A;
          font-size: 0.92rem;
          font-weight: 700;
          border: 1.5px solid #CBD5E1;
          cursor: pointer;
          transition: all 200ms ease;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
        }

        .hero-secondary-button:hover {
          background-color: #FFFFFF;
          border-color: #ED7100;
          color: #ED7100;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
        }

        .hero-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid #E2E8F0;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
          transition: all 180ms ease;
        }

        .hero-arrow-btn:hover {
          background: #FFFFFF;
          border-color: #ED7100;
          color: #ED7100;
          transform: scale(1.06);
          box-shadow: 0 6px 16px rgba(237, 113, 0, 0.2);
        }

        .hero-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          position: relative;
          z-index: 4;
          margin-top: 14px;
        }

        @media (max-width: 1080px) {
          .hero-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 768px) {
          .hero-stepper-capsule {
            top: 16px !important;
            right: 16px !important;
            transform: scale(0.9);
          }
        }

        @media (max-width: 600px) {
          .hero-cards-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      {/* Hero Outer Curved Frame */}
      <div
        style={{
          position: 'relative',
          borderRadius: '26px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 20px 48px -12px rgba(15, 23, 42, 0.08)',
          minHeight: '560px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '38px 36px 28px 36px'
        }}
      >
        {/* Layered Themed Backgrounds with Smooth 700ms Cross-fade */}
        {TOPICS.map((topic) => {
          const isActive = topic.id === activeId;
          return (
            <div
              key={topic.id}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${topic.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          );
        })}

        {/* Minimal, soft left gradient scrim to keep text legible without washing out background photography */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.55) 26%, rgba(255, 255, 255, 0.10) 45%, transparent 56%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Top-Right Floating Slide Navigation & Counter Capsule */}
        <div
          className="hero-stepper-capsule"
          style={{
            position: 'absolute',
            top: '32px',
            right: '36px',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(248, 250, 252, 0.92)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '9999px',
            padding: '3px 4px 3px 12px',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.08)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.80rem',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}
          >
            <span style={{ color: '#ED7100', fontWeight: 900 }}>0{activeIndex + 1}</span>
            <span style={{ color: '#94A3B8', fontWeight: 400 }}>/</span>
            <span style={{ color: '#64748B' }}>0{TOPICS.length}</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <button
              onClick={handlePrevSlide}
              className="hero-arrow-btn"
              aria-label="Previous Slide"
              title="Previous Slide"
              style={{ width: '32px', height: '32px' }}
            >
              <ChevronLeft size={15} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNextSlide}
              className="hero-arrow-btn"
              aria-label="Next Slide"
              title="Next Slide"
              style={{ width: '32px', height: '32px' }}
            >
              <ChevronRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Top Text Content Area */}
        <div
          key={`hero-text-${activeId}-${progressKey}`}
          className="hero-animated-content"
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: '660px',
            marginBottom: '46px'
          }}
        >
          {/* Main Headline placed at the very top of the box */}
          <h1
            style={{
              fontSize: 'clamp(2.15rem, 3.8vw, 3.4rem)',
              fontWeight: 900,
              color: '#0A0E1A',
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              margin: '0 0 24px 0',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.85)'
            }}
          >
            {activeTopic.titlePrefix} <br />
            <span
              style={{
                color: '#C85200',
                fontWeight: 950,
                display: 'inline-block',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.95)'
              }}
            >
              {activeTopic.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#334155',
              fontWeight: 500,
              maxWidth: '560px',
              margin: '0 0 28px 0'
            }}
          >
            {activeTopic.subtitle}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenConsultation}
              className="hero-cta-button"
              aria-label="Book a Consultation for architecture consultation"
            >
              <span>Book a Consultation</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => handleExploreSection(activeTopic)}
              className="hero-secondary-button"
              aria-label={activeTopic.actionText}
            >
              <span>{activeTopic.actionText}</span>
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        {/* Bottom 4 Floating Image Cards */}
        <div className="hero-cards-grid">
          {TOPICS.map((topic) => {
            const isActive = topic.id === activeId;

            return (
              <div
                key={topic.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                className={`hero-image-card ${isActive ? 'active-topic' : ''}`}
                onClick={() => handleCardClick(topic)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(topic);
                  }
                }}
              >
                {/* Real Photographic Background Thumbnail */}
                <img
                  src={topic.cardImage}
                  alt={topic.label}
                  className="card-thumb-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = topic.bgImage;
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="card-thumb-overlay" />

                {/* Card Title Label + Arrow with 14-16px inset margin */}
                <div className="card-thumb-label">
                  <span>{topic.label}</span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#ED7100' : 'rgba(255, 255, 255, 0.22)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      margin: '0 2px 2px 0',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.28)',
                      transition: 'background-color 200ms ease, transform 200ms ease'
                    }}
                  >
                    <ArrowRight size={15} strokeWidth={2.5} color="#FFFFFF" />
                  </div>
                </div>

                {/* Active Progress Countdown Indicator */}
                {isActive && (
                  <div className="card-bottom-progress">
                    <div
                      key={`progress-${activeId}-${progressKey}`}
                      className="card-bottom-progress-bar"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
