import React from 'react';
import { Award, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" style={{
      padding: '40px 20px 48px 20px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Engineering & Credentials</span>
          <div className="badge-line" />
        </div>
        <h2 style={{ marginBottom: '8px', color: '#232F3E', fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 900 }}>
          About SkySyncLab Practice
        </h2>
        <p style={{ maxWidth: '580px', margin: '0 auto', fontSize: '1.05rem', color: '#526071', lineHeight: 1.6 }}>
          AWS Certified Cloud Practitioner foundation with hands-on campus migration engineering.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        alignItems: 'stretch'
      }}>
        {/* Left Column: Short Founder Bio */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #CBD5E1',
          padding: '32px',
          boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.30rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
              Campus Infrastructure Practice
            </h3>

            <p style={{ fontSize: '0.96rem', color: '#334155', marginBottom: '14px', lineHeight: 1.65, fontWeight: 450 }}>
              Founded by <strong style={{ color: '#0F172A' }}>Senthil Kumar</strong>, an <strong style={{ color: '#ED7100' }}>AWS Certified Cloud Practitioner</strong>. SkySyncLab (skysynclab.com) assists colleges and academic departments with migrating physical server racks without complex enterprise bloat.
            </p>

            <p style={{ fontSize: '0.94rem', color: '#334155', marginBottom: '22px', lineHeight: 1.65, fontWeight: 450 }}>
              We work directly with campus IT coordinators, automating deployments and delivering runbooks so your internal faculty can confidently monitor workloads with zero vendor lock-in.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.90rem', color: '#334155' }}>
              <CheckCircle2 size={17} color="#01A88D" style={{ flexShrink: 0 }} />
              <span>AWS Certified Cloud Practitioner verified foundation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.90rem', color: '#334155' }}>
              <CheckCircle2 size={17} color="#01A88D" style={{ flexShrink: 0 }} />
              <span>Direct engineer involvement during migration rehearsals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.90rem', color: '#01A88D' }}>
              <CheckCircle2 size={17} color="#01A88D" style={{ flexShrink: 0 }} />
              <span style={{ color: '#334155' }}>Full staff training with zero proprietary vendor lock-in</span>
            </div>
          </div>
        </div>

        {/* Right Column: Founder Profile Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #CBD5E1',
          padding: '32px',
          boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                backgroundColor: '#232F3E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '1.30rem',
                fontWeight: 900,
                boxShadow: '0 4px 12px rgba(35, 47, 62, 0.2)'
              }}>
                SK
              </div>
              <div>
                <h3 style={{ fontSize: '1.30rem', fontWeight: 800, color: '#232F3E', marginBottom: '4px' }}>
                  Senthil Kumar
                </h3>
                <div style={{ fontSize: '0.92rem', color: '#ED7100', fontWeight: 700 }}>
                  Founder & AWS Cloud Consultant
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 18px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              marginBottom: '24px'
            }}>
              <Award size={26} color="#ED7100" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#232F3E' }}>
                  AWS Certified Cloud Practitioner
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>
                  Credential ID: Validated on AWS Certification Portal
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
            <a
              href="mailto:contact@skysynclab.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.18s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <Mail size={18} color="#ED7100" />
              <span>contact@skysynclab.com</span>
            </a>
            <a
              href="tel:+918667254699"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.18s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <Phone size={18} color="#ED7100" />
              <span>+91 86672 54699</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', fontSize: '0.90rem' }}>
              <MapPin size={18} color="#64748B" />
              <span>Salem, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
