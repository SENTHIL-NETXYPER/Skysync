import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ChevronDown } from 'lucide-react';

interface ContactProps {
  prefilledService?: string;
  prefilledNotes?: string;
}

export const Contact: React.FC<ContactProps> = ({ prefilledService, prefilledNotes }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    service: 'Consulting & Mentoring',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledNotes) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n${prefilledNotes}` : prefilledNotes
      }));
    }
  }, [prefilledNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('skysynclab_inquiries') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('skysynclab_inquiries', JSON.stringify(submissions));

      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" style={{
      padding: '48px 20px 96px 20px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Let's Talk</span>
          <div className="badge-line" />
        </div>
        <h2 style={{ marginBottom: '8px', color: '#232F3E', fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 900 }}>
          Book a Free Consultation
        </h2>
        <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem', color: '#526071', lineHeight: 1.6 }}>
          Direct technical consultation with our AWS-certified practitioner. Practical, architecture-dependent advice.
        </p>
      </div>

      <style>{`
        .contact-grid-layout {
          display: grid;
          grid-template-columns: minmax(260px, 320px) 1fr;
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .contact-grid-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <div className="contact-grid-layout">
        {/* Left Column: Direct Info */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #CBD5E1',
          padding: '24px',
          boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
          borderLeft: '5px solid #ED7100',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <h3 style={{ fontSize: '1.28rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
            Direct Engineering Desk
          </h3>

          <p style={{ fontSize: '0.94rem', color: '#526071', marginBottom: '24px', lineHeight: 1.6 }}>
            Planning an on-premises migration or preparing for high-concurrency exam result traffic? Get in touch directly with our lead cloud consultant.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
            <a
              href="mailto:hello@skysynclab.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <Mail size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 700 }}>
                  General Inquiries & Consultation
                </span>
                <span style={{ fontSize: '0.95rem' }}>hello@skysynclab.com</span>
              </div>
            </a>

            <a
              href="mailto:senthilkumar@skysynclab.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <Mail size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 700 }}>
                  Founder & Admin Outreach
                </span>
                <span style={{ fontSize: '0.95rem' }}>senthilkumar@skysynclab.com</span>
              </div>
            </a>

            <a
              href="tel:+918667254699"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <Phone size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 700 }}>
                  Direct Phone & WhatsApp
                </span>
                <span style={{ fontSize: '0.95rem' }}>+91 86672 54699</span>
              </div>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <MapPin size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 700 }}>
                  Location
                </span>
                <span style={{ color: '#526071', fontSize: '0.94rem', fontWeight: 600 }}>Salem, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 16px',
            backgroundColor: '#F8FAFC',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            fontSize: '0.90rem',
            color: '#526071',
            fontWeight: 600
          }}>
            <Clock size={18} color="#ED7100" style={{ flexShrink: 0 }} />
            <span>Consultation response guaranteed within 24 business hours.</span>
          </div>
        </div>

        {/* Right Column: Send us a message Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
          borderWidth: '4px 1.5px 1.5px 1.5px',
          borderStyle: 'solid',
          borderColor: '#ED7100 #CBD5E1 #CBD5E1 #CBD5E1',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 8px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'rgba(1, 168, 141, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: '#01A88D'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.30rem', fontWeight: 800, color: '#232F3E', marginBottom: '8px' }}>
                Message Sent Successfully
              </h3>
              <p style={{ fontSize: '0.94rem', color: '#526071', marginBottom: '24px' }}>
                Thank you! Our engineering team will review your inquiry and respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  padding: '11px 26px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  backgroundColor: '#ED7100',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer'
                }}
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '22px' }}>
                <h3 style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#232F3E',
                  marginBottom: '4px',
                  letterSpacing: '-0.02em'
                }}>
                  Send us a message
                </h3>
                <p style={{
                  fontSize: '0.92rem',
                  color: '#64748B',
                  margin: 0
                }}>
                  We'll respond within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Row 1: FULL NAME & MOBILE NUMBER */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '14px',
                  marginBottom: '14px'
                }}>
                  <div>
                    <label style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#64748B',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #E2E8F0',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        color: '#232F3E',
                        backgroundColor: '#FFFFFF',
                        outline: 'none'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                      onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                    />
                  </div>

                  <div>
                    <label style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#64748B',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      MOBILE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #E2E8F0',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        color: '#232F3E',
                        backgroundColor: '#FFFFFF',
                        outline: 'none'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                      onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                    />
                  </div>
                </div>

                {/* Row 2: EMAIL */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#64748B',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@campus.edu"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #E2E8F0',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      color: '#232F3E',
                      backgroundColor: '#FFFFFF',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>

                {/* Row 3: ORGANIZATION */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#64748B',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    ORGANIZATION / INSTITUTION
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="College, Startup or Business (Optional)"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #E2E8F0',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      color: '#232F3E',
                      backgroundColor: '#FFFFFF',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>

                {/* Row 4: SERVICE REQUIRED */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#64748B',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    SERVICE REQUIRED *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 40px 11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #E2E8F0',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        color: '#232F3E',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#ED7100';
                        e.target.style.boxShadow = '0 0 0 3px rgba(237, 113, 0, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E2E8F0';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="Consulting & Mentoring">Consulting & Mentoring</option>
                      <option value="Cloud Migration">Cloud Migration & Architecture</option>
                      <option value="DevOps">DevOps & Automation</option>
                      <option value="AI Solutions">AI Solutions with Amazon Bedrock & RAG</option>
                      <option value="Cloud Training">Cloud Training & Handover</option>
                      <option value="Other">Other Custom Inquiry</option>
                    </select>
                    <ChevronDown
                      size={18}
                      color="#64748B"
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Row 5: PROJECT DESCRIPTION */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#64748B',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    PROJECT DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your workload, current servers, or consulting needs"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #E2E8F0',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      color: '#232F3E',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: 1.5
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '13px 20px',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    backgroundColor: '#ED7100',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'none',
                    boxShadow: '0 4px 14px rgba(237, 113, 0, 0.28)'
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
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
