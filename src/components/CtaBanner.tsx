import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onGetInTouch?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onGetInTouch }) => {
  const handleClick = () => {
    if (onGetInTouch) {
      onGetInTouch();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="evolve-together"
      style={{
        padding: '24px 20px 48px 20px',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 50%, #FFF7ED 100%)',
          border: '1.5px solid #FFEDD5',
          borderTop: '5px solid #E7167B',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '48px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxShadow: '0 20px 45px -10px rgba(231, 22, 123, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)'
        }}
      >
        {/* Warm Ambient Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(231, 22, 123, 0.10) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '640px',
            margin: '0 auto'
          }}
        >
          <div className="section-badge-lined" style={{ marginBottom: '16px' }}>
            <span className="badge-text">COLLABORATION</span>
            <div className="badge-line" />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 3.6rem)',
              fontWeight: 900,
              color: '#1E293B',
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              marginBottom: '16px'
            }}
          >
            Let's Evolve Together
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: '#475569',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto 32px auto',
              fontWeight: 500
            }}
          >
            Discover how AWS cloud architecture and tested cutover runbooks can modernize your institutional platforms.
          </p>

          <div>
            <button
              onClick={handleClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 34px',
                borderRadius: '9999px',
                backgroundColor: '#E7167B',
                color: '#FFFFFF',
                fontSize: '1.02rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(231, 22, 123, 0.45)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EC7211';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(231, 22, 123, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E7167B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(231, 22, 123, 0.45)';
              }}
            >
              <span>Get In Touch</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
