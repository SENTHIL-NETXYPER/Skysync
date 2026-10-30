import React from 'react';
import emblemImg from '../assets/skysync_cloud_emblem.png';

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

  const iconWidth = Math.round(height * 1.55);

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
      {/* Official SkySyncLab Cloud Emblem — authentic brand asset */}
      <img
        src={emblemImg}
        alt="SkySyncLab"
        width={iconWidth}
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          aspectRatio: '96 / 62',
          objectFit: 'contain',
          flexShrink: 0,
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
          filter: isDark ? 'drop-shadow(0 0 1px rgba(255, 255, 255, 0.45)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))' : 'none'
        }}
        draggable={false}
      />

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
