import React from 'react';

export interface SkySyncLogoProps {
  /**
   * 'dark' for dark backgrounds (white cloud, cyan base, white text, cyan dot)
   * 'light' for light backgrounds (navy cloud, white arrow, navy text, navy dot)
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
   * Overall height in pixels (defaults to 28px)
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
  height = 28,
  className = '',
  style = {}
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#172538';
  const dotColor = isDark ? '#FFFFFF' : '#172538';
  const lineBg = isDark ? '#FFFFFF' : '#172538';

  const iconWidth = Math.round(height * 1.36);

  return (
    <div
      className={`skysync-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.max(8, Math.round(height * 0.32))}px`,
        textDecoration: 'none',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Official SkySyncLab Cloud Emblem — exact match to reference brand asset */}
      <svg
        width={iconWidth}
        height={height}
        viewBox="0 0 72 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        {/* Cloud body — deep navy, matching reference brand */}
        <path
          d="M18 46
             C9.16 46 2 38.84 2 30
             C2 21.8 7.9 15.1 15.8 14.1
             C18.2 5.8 25.8 0 35 0
             C45.5 0 54.1 7.8 55.4 18
             C62.5 18.9 68 24.8 68 32
             C68 39.73 61.73 46 54 46 H18 Z"
          fill={isDark ? '#2C3E55' : '#172538'}
        />
        {/* White ascending arrow line */}
        <path
          d="M15 44 C24 40 35 32 48 18"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* White arrowhead */}
        <path
          d="M41 22 L60 10 L48 30 L44 23 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* 2. Official Brand Wordmark & Full Underline with Terminal Dot */}
      {!iconOnly && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
              fontSize: `${height * 0.76}px`,
              fontWeight: 700,
              color: textColor,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              paddingBottom: '1px'
            }}
          >
            skysynclab
          </div>

          {/* Signature Underline: placed 7px below so it sits cleanly underneath the y descenders */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: '7px'
            }}
          >
            <div
              style={{
                height: '1.5px',
                flex: 1,
                backgroundColor: lineBg,
                borderRadius: '1px'
              }}
            />
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: dotColor,
                marginLeft: '3px',
                flexShrink: 0
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
          <div
            style={{
              width: '1.5px',
              height: `${Math.round(height * 0.9)}px`,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(23, 37, 56, 0.25)'
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              fontSize: `${Math.max(8, Math.round(height * 0.24))}px`,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isDark ? '#00E5FF' : '#172538',
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
