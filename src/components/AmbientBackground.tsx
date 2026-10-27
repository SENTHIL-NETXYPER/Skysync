import React, { useState, useEffect } from 'react';

export const AmbientBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate slow, controlled scroll-linked parallax movement
  const curveOffsetY = scrollY * 0.08;
  const curveOffsetX = Math.sin(scrollY * 0.0015) * 16;
  const secondaryOffsetY = scrollY * 0.04;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: '#FFFFFF'
      }}
    >
      <style>{`
        @keyframes subtleCurveDrift {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Clean pristine background - no cloudy blurred blobs */}

      {/* Scroll-Linked Flowing Architectural Background Curve (Image 1 Style) */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: 0,
          right: 0,
          height: '680px',
          transform: `translate3d(${curveOffsetX}px, ${curveOffsetY}px, 0)`,
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          opacity: 0.82
        }}
      >
        <svg
          viewBox="0 0 1440 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {/* Primary Blue/Cyan Gradient Line */}
            <linearGradient id="curveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.08" />
              <stop offset="25%" stopColor="#0284C7" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#6366F1" stopOpacity="0.38" />
              <stop offset="80%" stopColor="#ED7100" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ED7100" stopOpacity="0.08" />
            </linearGradient>

            {/* Secondary Warm Orange Flow Wave */}
            <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ED7100" stopOpacity="0.05" />
              <stop offset="35%" stopColor="#F97316" stopOpacity="0.32" />
              <stop offset="70%" stopColor="#0284C7" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.05" />
            </linearGradient>

            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Primary Elegant Sinusoidal Wave */}
          <path
            d="M -100 210 C 220 80, 480 340, 780 180 C 1080 30, 1320 280, 1600 160"
            stroke="url(#curveGradient1)"
            strokeWidth="2.2"
            fill="none"
          />

          {/* Secondary Parallel Accent Wave */}
          <path
            d="M -80 250 C 240 140, 500 370, 800 220 C 1100 80, 1340 310, 1580 200"
            stroke="url(#curveGradient2)"
            strokeWidth="1.6"
            strokeDasharray="6 4"
            fill="none"
          />

          {/* Connected Architectural Nodes (Reference Diagram Dots) */}
          <circle cx="280" cy="180" r="4.5" fill="#0284C7" filter="url(#nodeGlow)" />
          <circle cx="280" cy="180" r="2" fill="#FFFFFF" />

          <circle cx="620" cy="270" r="5" fill="#ED7100" filter="url(#nodeGlow)" />
          <circle cx="620" cy="270" r="2.2" fill="#FFFFFF" />

          <circle cx="940" cy="115" r="4.5" fill="#6366F1" filter="url(#nodeGlow)" />
          <circle cx="940" cy="115" r="2" fill="#FFFFFF" />

          <circle cx="1230" cy="235" r="5" fill="#ED7100" filter="url(#nodeGlow)" />
          <circle cx="1230" cy="235" r="2.2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Secondary Lower Curve with Slower Parallax */}
      <div
        style={{
          position: 'absolute',
          top: '58%',
          left: 0,
          right: 0,
          height: '520px',
          transform: `translate3d(${-curveOffsetX * 0.7}px, ${secondaryOffsetY}px, 0)`,
          transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          opacity: 0.65
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <path
            d="M -120 120 C 260 260, 580 40, 920 180 C 1220 300, 1420 110, 1620 220"
            stroke="url(#curveGradient2)"
            strokeWidth="1.8"
            fill="none"
          />
          <circle cx="450" cy="170" r="4" fill="#ED7100" filter="url(#nodeGlow)" />
          <circle cx="1060" cy="225" r="4" fill="#0284C7" filter="url(#nodeGlow)" />
        </svg>
      </div>
    </div>
  );
};

export default AmbientBackground;
