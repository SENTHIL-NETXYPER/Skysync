import React from 'react';
import { Clock, ShieldCheck, Users, Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Clock,
      title: 'Rehearsed Cutovers',
      desc: 'Migrations are rehearsed in staging first with automated rollback plans and AWS cutover runbooks.'
    },
    {
      icon: ShieldCheck,
      title: 'Security-First Architecture',
      desc: 'Least-privilege IAM roles, KMS storage encryption, and private VPC subnets.'
    },
    {
      icon: Users,
      title: 'Faculty Mentoring Handover',
      desc: 'We train internal campus staff with step-by-step runbooks for zero vendor lock-in.'
    },
    {
      icon: Zap,
      title: 'Auto Scaling for Results Day',
      desc: 'Compute fleets expand during exam result surges and contract to save budget.'
    }
  ];

  return (
    <section id="why-choose-us" style={{
      padding: '30px 24px 50px 24px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <div style={{
        backgroundColor: '#F8FAFC',
        borderRadius: '20px',
        border: '1.5px solid #CBD5E1',
        padding: '36px',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div className="section-badge-lined" style={{ textAlign: 'left', marginBottom: '12px' }}>
              <span className="badge-text">Operational Excellence</span>
              <div className="badge-line" style={{ margin: '0' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.2rem)', fontWeight: 900, color: '#0F172A', marginBottom: '6px' }}>
              Why Choose Our Approach
            </h2>
            <div style={{ fontSize: '0.98rem', color: '#475569' }}>
              Core architectural and delivery principles guiding every migration and consulting engagement
            </div>
          </div>
        </div>

        <div className="grid-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  borderWidth: '4px 1.5px 1.5px 1.5px',
                  borderStyle: 'solid',
                  borderColor: '#09090B #CBD5E1 #CBD5E1 #CBD5E1',
                  borderRadius: '14px',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(9, 9, 11, 0.08)',
                  border: '1px solid rgba(9, 9, 11, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#09090B',
                  marginBottom: '14px'
                }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: '1.14rem', fontWeight: 800, color: '#232F3E', marginBottom: '8px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#526071', lineHeight: 1.55, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
