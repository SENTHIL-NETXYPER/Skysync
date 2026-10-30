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
  const isMono = variant === 'mono';

  const cloudFill = isMono ? (isDark ? '#FFFFFF' : '#172538') : (isDark ? '#FFFFFF' : '#172538');
  const textColor = isDark ? '#FFFFFF' : '#172538';
  const dotColor = isMono ? (isDark ? '#FFFFFF' : '#172538') : (isDark ? '#00D8FF' : '#172538');
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
      {/* 1. Official SkySyncLab Cloud Emblem (Exact replica from official brand assets) */}
      <svg
        width={iconWidth}
        height={height}
        viewBox="0 0 66 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        style={{ flexShrink: 0, overflow: 'visible' }}
        aria-hidden="true"
      >
        {isDark && !isMono ? (
          <>
            {/* Full White Cloud Base */}
            <path
              d="M16 42 C8.27 42 2 35.73 2 28 C2 20.8 7.3 14.9 14.4 14.1 C16.5 6.2 23.6 0.5 32 0.5 C41.6 0.5 49.6 7.6 51 17 C57.5 17.8 62.5 23.3 62.5 30 C62.5 36.63 57.13 42 50.5 42 H16 Z"
              fill="#FFFFFF"
            />

            {/* Bottom-Right Electric Blue Accent Lobe */}
            <path
              d="M26 42 C32 42 42 42 50.5 42 C57.13 42 62.5 36.63 62.5 30 C62.5 23.3 57.5 17.8 51 17 C48 21 40 31 26 42 Z"
              fill="#00A3E0"
            />

            {/* White Separation Gap Path */}
            <path
              d="M14 42 C22 39 33 32 45 19"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Ascending Blue Arrow */}
            <path
              d="M13 41 C21 38 31 31 43 19"
              stroke="#00A3E0"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            <path
              d="M37 23 L54 12 L43 31 L40 25 Z"
              fill="#00A3E0"
            />
          </>
        ) : (
          <>
            {/* Light / Mono Mode: Deep Navy Cloud */}
            <path
              d="M16 42 C8.27 42 2 35.73 2 28 C2 20.8 7.3 14.9 14.4 14.1 C16.5 6.2 23.6 0.5 32 0.5 C41.6 0.5 49.6 7.6 51 17 C57.5 17.8 62.5 23.3 62.5 30 C62.5 36.63 57.13 42 50.5 42 H16 Z"
              fill={cloudFill}
            />

            {/* White Ascending Arrow */}
            <path
              d="M13 41 C21 38 31 31 43 19"
              stroke={isDark ? '#00A3E0' : '#FFFFFF'}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M37 23 L54 12 L43 31 L40 25 Z"
              fill={isDark ? '#00A3E0' : '#FFFFFF'}
            />
          </>
        )}
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
                boxShadow: isDark && !isMono ? '0 0 6px #00E5FF' : 'none',
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
