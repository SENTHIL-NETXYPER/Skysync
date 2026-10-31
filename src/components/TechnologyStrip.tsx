import React from 'react';

interface TechProvider {
  id: string;
  name: string;
  subName?: string;
  logo: string;
  alt: string;
}

const PROVIDERS: TechProvider[] = [
  {
    id: 'aws',
    name: 'Amazon',
    subName: 'Web Services',
    logo: './assets/logos/aws.svg',
    alt: 'Amazon Web Services (AWS) Official Logo'
  },
  {
    id: 'gcp',
    name: 'Google',
    subName: 'Cloud Platform',
    logo: './assets/logos/gcp.svg',
    alt: 'Google Cloud Platform Official Logo'
  },
  {
    id: 'azure',
    name: 'Microsoft',
    subName: 'Azure',
    logo: './assets/logos/azure.svg',
    alt: 'Microsoft Azure Official Logo'
  },
  {
    id: 'docker',
    name: 'Docker',
    logo: './assets/logos/docker.svg',
    alt: 'Docker Official Logo'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    logo: './assets/logos/kubernetes.svg',
    alt: 'Kubernetes Official Logo'
  },
  {
    id: 'terraform',
    name: 'Terraform',
    logo: './assets/logos/terraform.svg',
    alt: 'HashiCorp Terraform Official Logo'
  },
  {
    id: 'linux',
    name: 'Linux',
    logo: './assets/logos/linux.svg',
    alt: 'Linux Official Logo'
  }
];

export const TechnologyStrip: React.FC = () => {
  return (
    <section
      aria-label="Technologies we work with"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Seamless Continuous Horizontal Marquee */
        @keyframes techMarqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .tech-strip-wrapper {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .tech-strip-marquee-container {
          flex: 1;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%);
        }

        .tech-strip-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: techMarqueeScroll 34s linear infinite;
          will-change: transform;
        }

        /* Pause on hover and keyboard focus */
        .tech-strip-track:hover,
        .tech-strip-track:focus-within {
          animation-play-state: paused;
        }

        .tech-strip-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .tech-provider-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 6px 22px;
          color: #334155;
          text-decoration: none;
          cursor: default;
          white-space: nowrap;
          transition: color 0.18s ease, opacity 0.18s ease;
          outline: none;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .tech-provider-item:focus-visible {
          box-shadow: 0 0 0 2px #C5A46D;
        }

        .tech-provider-item .tech-provider-logo {
          height: 24px;
          width: auto;
          max-width: 44px;
          object-fit: contain;
          display: block;
          opacity: 1;
          transition: transform 0.18s ease;
          flex-shrink: 0;
        }

        .tech-provider-item:hover .tech-provider-logo,
        .tech-provider-item:focus-visible .tech-provider-logo {
          opacity: 1;
        }

        .tech-provider-item:hover .tech-provider-primary,
        .tech-provider-item:focus-visible .tech-provider-primary {
          color: #0F172A;
        }

        .tech-provider-item:hover .tech-provider-secondary,
        .tech-provider-item:focus-visible .tech-provider-secondary {
          color: #334155;
        }

        .tech-provider-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          text-align: left;
        }

        .tech-provider-primary {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #1E293B;
          transition: color 0.18s ease;
          line-height: 1.2;
        }

        .tech-provider-secondary {
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748B;
          letter-spacing: 0.01em;
          transition: color 0.18s ease;
          line-height: 1.15;
        }

        .tech-item-divider {
          width: 1px;
          height: 20px;
          background-color: #E2E8F0;
          margin: 0 2px;
          flex-shrink: 0;
        }

        /* Subtle edge gradient overlays for guaranteed cross-browser fade mask */
        .tech-edge-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 44px;
          background: linear-gradient(to right, #FFFFFF, rgba(255, 255, 255, 0));
          pointer-events: none;
          z-index: 2;
        }

        .tech-edge-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 44px;
          background: linear-gradient(to left, #FFFFFF, rgba(255, 255, 255, 0));
          pointer-events: none;
          z-index: 2;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .tech-strip-badge {
            padding: 0 16px !important;
          }
          .tech-strip-badge-text {
            font-size: 0.68rem !important;
          }
          .tech-provider-item {
            padding: 5px 16px;
            gap: 10px;
          }
          .tech-provider-item .tech-provider-logo {
            height: 20px;
            max-width: 36px;
          }
          .tech-provider-primary {
            font-size: 0.78rem;
          }
          .tech-provider-secondary {
            font-size: 0.66rem;
          }
        }

        @media (max-width: 520px) {
          .tech-strip-badge {
            padding: 0 12px !important;
          }
          .tech-strip-badge-text {
            display: none !important;
          }
          .tech-strip-badge-dot {
            margin: 0 !important;
          }
        }

        /* Accessible Motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-strip-track {
            animation: none !important;
            overflow-x: auto;
          }
          .tech-strip-marquee-container {
            mask-image: none !important;
            -webkit-mask-image: none !important;
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="tech-strip-wrapper">
        {/* Left Section Label: Small bold uppercase label with restrained orange accent dot */}
        <div
          className="tech-strip-badge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 24px',
            borderRight: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            zIndex: 3,
            flexShrink: 0
          }}
        >
          <span
            className="tech-strip-badge-dot"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#C5A46D',
              flexShrink: 0
            }}
          />
          <span
            className="tech-strip-badge-text"
            style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#334155',
              whiteSpace: 'nowrap'
            }}
          >
            Technologies We Work With
          </span>
        </div>

        {/* Marquee Container with edge fading */}
        <div className="tech-strip-marquee-container">
          <div className="tech-edge-fade-left" />
          <div className="tech-edge-fade-right" />

          {/* Marquee Track: Contains 2 identical sets of providers for a 100% seamless, jump-free infinite loop */}
          <div className="tech-strip-track">
            {/* Set 1: Main Provider Items */}
            <div className="tech-strip-group">
              {PROVIDERS.map((tech) => (
                <React.Fragment key={`set1-${tech.id}`}>
                  <div
                    className="tech-provider-item"
                    tabIndex={0}
                    role="img"
                    aria-label={`${tech.name}${tech.subName ? ' ' + tech.subName : ''}`}
                  >
                    <img
                      src={tech.logo}
                      alt=""
                      aria-hidden="true"
                      className="tech-provider-logo"
                      loading="eager"
                    />
                    <div className="tech-provider-text" aria-hidden="true">
                      <span className="tech-provider-primary">{tech.name}</span>
                      {tech.subName && (
                        <span className="tech-provider-secondary">{tech.subName}</span>
                      )}
                    </div>
                  </div>
                  <div className="tech-item-divider" aria-hidden="true" />
                </React.Fragment>
              ))}
            </div>

            {/* Set 2 (Continuous Marquee Translation Clone — hidden from assistive DOM text flow) */}
            <div className="tech-strip-group" aria-hidden="true" style={{ userSelect: 'none' }}>
              {PROVIDERS.map((tech) => (
                <React.Fragment key={`set2-${tech.id}`}>
                  <div
                    className="tech-provider-item"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={tech.logo}
                      alt=""
                      className="tech-provider-logo"
                      loading="eager"
                      aria-hidden="true"
                    />
                    <div className="tech-provider-text" aria-hidden="true">
                      <span className="tech-provider-primary" aria-hidden="true">{tech.name}</span>
                      {tech.subName && (
                        <span className="tech-provider-secondary" aria-hidden="true">{tech.subName}</span>
                      )}
                    </div>
                  </div>
                  <div className="tech-item-divider" aria-hidden="true" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStrip;
