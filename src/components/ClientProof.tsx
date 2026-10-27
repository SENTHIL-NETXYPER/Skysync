import React from 'react';
import { Star, Users, ArrowRight } from 'lucide-react';

interface ClientProofProps {
  onOpenConsultation: () => void;
}

export const ClientProof: React.FC<ClientProofProps> = ({ onOpenConsultation }) => {
  const clients = [
    {
      id: 'mec',
      name: 'Muthayammal Engineering College',
      type: 'Engineering Institution',
      location: 'Rasipuram, Tamil Nadu',
      logo: './assets/mec_emblem.png',
      quote: 'NetXyper helped us with our institutional cloud migration. Their team was supportive and the migration process was smooth. We received good guidance and the system has been stable after moving to the cloud.'
    },
    {
      id: 'mpc',
      name: 'Muthayammal Polytechnic College',
      type: 'Polytechnic Institution',
      location: 'Rasipuram, Tamil Nadu',
      logo: './assets/mpc_emblem.svg',
      quote: 'We worked with NetXyper for our cloud setup and got clear technical support. The team explained everything in a simple way and helped us through the implementation. We are happy with their service and support.'
    }
  ];

  return (
    <section id="projects" data-alias="client-proof" style={{
      padding: '54px 24px 64px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
      position: 'relative'
    }}>
      <div id="client-proof" style={{ position: 'absolute', top: 0, left: 0 }} />
      {/* Section Header matching exact screenshot */}
      <div style={{ textAlign: 'center', marginBottom: '38px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Client Reviews</span>
          <div className="badge-line" />
        </div>

        <h2 style={{
          fontSize: 'clamp(2.1rem, 3.6vw, 2.75rem)',
          fontWeight: 900,
          color: '#0F172A',
          marginBottom: '8px',
          letterSpacing: '-0.025em'
        }}>
          What Our Clients Say
        </h2>

        <p style={{
          maxWidth: '640px',
          margin: '0 auto',
          fontSize: '1.02rem',
          color: '#64748B',
          lineHeight: 1.5
        }}>
          Case studies and feedback from partner educational institutions.
        </p>
      </div>

      <style>{`
        .client-review-card {
          background-color: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-left: 4.5px solid #ED7100;
          border-radius: 16px;
          height: 100%;
          padding: 28px 28px 26px 28px;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          animation: cardFloatEntrance 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, box-shadow;
        }
        .client-review-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 18px 40px -6px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(237, 113, 0, 0.2);
        }
        .client-review-card .emblem-container {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease;
        }
        .client-review-card:hover .emblem-container {
          transform: translateX(3px);
          box-shadow: 0 4px 12px rgba(237, 113, 0, 0.15);
        }
      `}</style>

      {/* Client Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: '24px',
        marginBottom: '28px',
        alignItems: 'stretch'
      }}>
        {clients.map((c, idx) => (
          <div
            key={c.id}
            className="client-review-card"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div>
              {/* Institution Header: Real Logo, Title, Location & 5-Star Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    className="emblem-container"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '7px',
                      boxSizing: 'border-box',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={c.logo}
                      alt={`${c.name} Emblem`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        aspectRatio: '1 / 1'
                      }}
                    />
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '1.14rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      margin: '0 0 3px 0',
                      letterSpacing: '-0.01em'
                    }}>
                      {c.name}
                    </h3>
                    <span style={{ fontSize: '0.84rem', color: '#64748B' }}>
                      {c.type} · {c.location}
                    </span>
                  </div>
                </div>

                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '3px', color: '#ED7100', flexShrink: 0, marginTop: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#ED7100" stroke="#ED7100" />
                  ))}
                </div>
              </div>

              {/* Subtle Divider */}
              <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '14px 0 16px 0' }} />

              {/* Feedback Quote */}
              <p style={{
                fontSize: '0.94rem',
                color: '#475569',
                lineHeight: 1.65,
                fontStyle: 'italic',
                margin: 0
              }}>
                "{c.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Handover & Mentoring Guarantee Banner */}
      <div style={{
        backgroundColor: '#FFF7ED',
        border: '1.5px solid #FFEDD5',
        borderRadius: '16px',
        padding: '22px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #FED7AA',
            color: '#ED7100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(237, 113, 0, 0.12)'
          }}>
            <Users size={22} color="#ED7100" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 3px 0' }}>
              Need institutional cloud migration or faculty mentoring?
            </h4>
            <p style={{ fontSize: '0.90rem', color: '#64748B', margin: 0 }}>
              Get expert guidance for your institution's cloud journey. We support migration, infrastructure setup, and team mentoring.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenConsultation}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            backgroundColor: '#ED7100',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.94rem',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.18s ease',
            boxShadow: '0 4px 14px rgba(237, 113, 0, 0.3)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#EC7211';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ED7100';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Request a Consultation</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
};

export default ClientProof;
