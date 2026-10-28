import React from 'react';

export interface SkySyncLogoProps {
  /**
   * 'dark' for dark backgrounds (white cloud, cyan arrow, white text)
   * 'light' for light backgrounds (navy cloud, cyan arrow, navy text)
   * 'mono' for monochrome/print styles
   */
  variant?: 'dark' | 'light' | 'mono';
  /**
   * Show the 4-row tagline (CLOUD, DEVOPS, AUTOMATION, AI SOLUTIONS)
   */
  showTagline?: boolean;
  /**
   * Only render the cloud icon without the wordmark
   */
  iconOnly?: boolean;
  /**
   * Overall height in pixels (defaults to 34px)
   */
  height?: number;
  /**
   * Optional className for wrapper
   */
  className?: string;
  /**
   * Optional inline style
   */
  style?: React.CSSProperties;
}

export const SkySyncLogo: React.FC<SkySyncLogoProps> = ({
  variant = 'dark',
  showTagline = false,
  iconOnly = false,
  height = 34,
  className = '',
  style = {}
}) => {
  const isDark = variant === 'dark';
  const isMono = variant === 'mono';

  // Exact Brand Color Palette from Official Guidelines:
  // Navy: #0B2A4A, Electric Blue: #0091FF, Cyan: #00C2E8, White: #FFFFFF, Slate: #2F3A4A
  const cloudFill = isMono ? (isDark ? '#FFFFFF' : '#2F3A4A') : (isDark ? '#FFFFFF' : '#0B2A4A');
  const textColor = isDark ? '#FFFFFF' : '#0B2A4A';
  const accentGradientId = `skysync-cyan-grad-${isDark ? 'dark' : 'light'}`;
  const accentStart = isMono ? (isDark ? '#FFFFFF' : '#2F3A4A') : '#0091FF';
  const accentEnd = isMono ? (isDark ? '#FFFFFF' : '#2F3A4A') : '#00C2E8';

  // Compute proportional width
  const iconWidth = Math.round(height * 1.35);

  return (
    <div
      className={`skysync-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.max(8, Math.round(height * 0.28))}px`,
        textDecoration: 'none',
        userSelect: 'none',
        ...style
      }}
    >
      {/* 1. Official Cloud Icon with Upward Ascending Cyan Arrow */}
      <svg
        width={iconWidth}
        height={height}
        viewBox="0 0 76 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={accentGradientId} x1="12" y1="46" x2="62" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={accentStart} />
            <stop offset="100%" stopColor={accentEnd} />
          </linearGradient>
          {/* Subtle drop glow for dark mode arrow */}
          {isDark && !isMono && (
            <filter id="skysync-arrow-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#00C2E8" floodOpacity="0.35" />
            </filter>
          )}
        </defs>

        {/* Cloud Body Shape */}
        <path
          d="M21.5 48.5C14.0442 48.5 8 42.4558 8 35C8 28.3242 12.8361 22.7788 19.2272 21.6663C21.4658 12.7212 29.5606 6 39.2 6C50.2989 6 59.4005 14.5085 60.3168 25.3582C66.9634 26.294 72 31.9567 72 38.8C72 46.0902 66.0902 52 58.8 52H23.5"
          fill={cloudFill}
        />

        {/* Upward Ascending Arrow swoosh cutting through the cloud */}
        <g filter={isDark && !isMono ? 'url(#skysync-arrow-glow)' : undefined}>
          {/* Arrow dynamic tail / swoosh */}
          <path
            d="M13 47C20.5 45.2 31.2 39.8 44 26.5L47.5 30L58 11.5L38.5 15.5L42 19C30.2 30.5 21 35.8 13 47Z"
            fill={`url(#${accentGradientId})`}
          />
        </g>
      </svg>

      {/* 2. Official Geometric Wordmark & Underline with terminal dot */}
      {!iconOnly && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: `${height * 0.72}px`,
                fontWeight: 800,
                color: textColor,
                letterSpacing: '-0.025em',
                lineHeight: 1
              }}
            >
              skysync
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontSize: `${height * 0.72}px`,
                fontWeight: 800,
                color: textColor,
                letterSpacing: '-0.025em',
                lineHeight: 1
              }}
            >
              lab
            </span>
          </div>

          {/* Signature Accent Line with Terminal Node Dot (from Brand Guidelines) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: `${Math.max(2, Math.round(height * 0.08))}px`,
              width: '100%',
              maxWidth: `${height * 2.2}px`
            }}
          >
            <div
              style={{
                height: `${Math.max(1.5, Math.round(height * 0.05))}px`,
                flex: 1,
                background: `linear-gradient(90deg, ${accentStart} 0%, ${accentEnd} 100%)`,
                borderRadius: '2px'
              }}
            />
            <div
              style={{
                width: `${Math.max(3.5, Math.round(height * 0.12))}px`,
                height: `${Math.max(3.5, Math.round(height * 0.12))}px`,
                borderRadius: '50%',
                backgroundColor: accentEnd,
                marginLeft: '-1px',
                boxShadow: isDark ? '0 0 6px #00C2E8' : 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Optional Vertical Tagline Lockup: CLOUD / DEVOPS / AUTOMATION / AI SOLUTIONS */}
      {!iconOnly && showTagline && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${Math.round(height * 0.35)}px`,
            marginLeft: `${Math.round(height * 0.2)}px`
          }}
        >
          {/* Vertical Divider */}
          <div
            style={{
              width: '1.5px',
              height: `${Math.round(height * 0.9)}px`,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(11, 42, 74, 0.25)'
            }}
          />

          {/* 4 Stacked Core Pillars */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              fontSize: `${Math.max(8, Math.round(height * 0.24))}px`,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isDark ? '#00C2E8' : '#0B2A4A',
              lineHeight: 1.2
            }}
          >
            <span>CLOUD</span>
            <span>DEVOPS</span>
            <span>AUTOMATION</span>
            <span>AI SOLUTIONS</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkySyncLogo;
