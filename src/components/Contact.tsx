import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ChevronDown, AlertCircle } from 'lucide-react';
import {
  getGeneralMailto,
  getFounderMailto,
  buildContactFormMailto,
  buildWhatsAppLink,
  sendDirectInquiry,
  FOUNDER_EMAIL,
  GENERAL_EMAIL
} from '../utils/mailAlerts';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({ ...prev, name: val }));
    if (errors.name && val.trim().length >= 2) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.name;
        return next;
      });
    }
  };

  const handlePhoneChange = (val: string) => {
    // Only accept numeric digits, maximum 10 digits
    const cleaned = val.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: cleaned }));
    if (errors.phone) {
      if (cleaned.length === 10) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.phone;
          return next;
        });
      } else if (cleaned.length > 0) {
        setErrors((prev) => ({
          ...prev,
          phone: `Mobile number must be exactly 10 digits (${cleaned.length}/10 entered).`
        }));
      }
    }
  };

  const handleEmailChange = (val: string) => {
    setFormData((prev) => ({ ...prev, email: val }));
    if (errors.email && /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(val.trim())) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Full name is required.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Please enter at least 2 characters.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Mobile number is required (10 digits).';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = `Mobile number must be exactly 10 digits (${cleanPhone.length}/10 entered).`;
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required before submitting.';
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Save to local storage as backup
    try {
      const submissions = JSON.parse(localStorage.getItem('skysynclab_inquiries') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('skysynclab_inquiries', JSON.stringify(submissions));
    } catch {
      // ignore
    }

    // Direct background dispatch to senthilkumar@skysynclab.com
    await sendDirectInquiry(formData, 'consultation');

    setIsSubmitting(false);
    setSubmitted(true);
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
          grid-template-columns: minmax(340px, 395px) 1fr;
          gap: 28px;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .contact-grid-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      <div className="contact-grid-layout">
        {/* Left Column: Direct Info */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid #CBD5E1',
          padding: '28px 24px',
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '32px' }}>
            <a
              href={getGeneralMailto()}
              title="Tap to email General Inquiries (Auto-Alerts Senthil Kumar)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '11px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <Mail size={19} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 700, marginBottom: '3px' }}>
                  General Inquiries
                </span>
                <span style={{ fontSize: '0.94rem', wordBreak: 'break-all' }}>{GENERAL_EMAIL}</span>
              </div>
            </a>

            <a
              href={getFounderMailto()}
              title="Tap to email Founder & Principal Architect Senthil Kumar directly"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '11px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <Mail size={19} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 700, marginBottom: '3px' }}>
                  Founder
                </span>
                <span style={{ fontSize: '0.94rem', wordBreak: 'break-all' }}>{FOUNDER_EMAIL}</span>
              </div>
            </a>

            <a
              href="tel:+918667254699"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                color: '#232F3E',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232F3E')}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '11px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <Phone size={19} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 700, marginBottom: '3px' }}>
                  Phone & WhatsApp
                </span>
                <span style={{ fontSize: '0.94rem' }}>+91 86672 54699</span>
              </div>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '11px',
                backgroundColor: 'rgba(237, 113, 0, 0.08)',
                border: '1px solid rgba(237, 113, 0, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ED7100',
                flexShrink: 0
              }}>
                <MapPin size={19} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', fontWeight: 700, marginBottom: '3px' }}>
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
            <div style={{ textAlign: 'center', padding: '28px 12px' }}>
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
              <h3 style={{ fontSize: '1.28rem', fontWeight: 800, color: '#232F3E', marginBottom: '8px' }}>
                Consultation Request Prepared
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#526071', marginBottom: '20px', lineHeight: 1.55 }}>
                Your request has been logged and an email alert to <strong>{GENERAL_EMAIL}</strong> (CC: <strong>{FOUNDER_EMAIL}</strong>) was automatically triggered in your mail client.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '380px', margin: '0 auto 24px auto' }}>
                <a
                  href={buildContactFormMailto(formData)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    fontSize: '0.90rem',
                    fontWeight: 700,
                    backgroundColor: '#ED7100',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 3px 12px rgba(237, 113, 0, 0.3)'
                  }}
                >
                  <Mail size={16} />
                  <span>Open Email App to Alert Senthil Now</span>
                </a>

                <a
                  href={buildWhatsAppLink(`Hi Senthil, I submitted a consultation request for ${formData.service} on SkySyncLab. Name: ${formData.name}, Contact: ${formData.phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    backgroundColor: '#F8FAFC',
                    color: '#0F172A',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '9999px',
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={15} color="#25D366" />
                  <span>Instant Alert on WhatsApp (+91 86672 54699)</span>
                </a>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                style={{
                  padding: '9px 20px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  backgroundColor: 'transparent',
                  color: '#64748B',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
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

              <form onSubmit={handleSubmit} noValidate>
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
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: errors.name ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        color: '#232F3E',
                        backgroundColor: errors.name ? '#FEF2F2' : '#FFFFFF',
                        outline: 'none',
                        transition: 'border-color 0.15s ease'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = errors.name ? '#EF4444' : '#ED7100')}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.name ? '#EF4444' : '#E2E8F0';
                        if (!formData.name.trim()) {
                          setErrors((prev) => ({ ...prev, name: 'Full name is required before submitting.' }));
                        } else if (formData.name.trim().length < 2) {
                          setErrors((prev) => ({ ...prev, name: 'Please enter at least 2 characters.' }));
                        }
                      }}
                    />
                    {errors.name && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#DC2626',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '6px',
                        padding: '5px 8px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        marginTop: '6px'
                      }}>
                        <AlertCircle size={14} style={{ flexShrink: 0, color: '#DC2626' }} />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: '#64748B'
                      }}>
                        MOBILE NUMBER (10 DIGITS) *
                      </label>
                      {formData.phone.length > 0 && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: formData.phone.length === 10 ? '#16A34A' : '#EA580C'
                        }}>
                          {formData.phone.length}/10
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="10-digit mobile number"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: errors.phone ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        color: '#232F3E',
                        backgroundColor: errors.phone ? '#FEF2F2' : '#FFFFFF',
                        outline: 'none',
                        transition: 'border-color 0.15s ease'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = errors.phone ? '#EF4444' : '#ED7100')}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.phone ? '#EF4444' : '#E2E8F0';
                        if (!formData.phone.trim()) {
                          setErrors((prev) => ({ ...prev, phone: 'Mobile number is required (10 digits).' }));
                        } else if (formData.phone.length !== 10) {
                          setErrors((prev) => ({
                            ...prev,
                            phone: `Mobile number must be exactly 10 digits (${formData.phone.length}/10 entered).`
                          }));
                        }
                      }}
                    />
                    {errors.phone && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#DC2626',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '6px',
                        padding: '5px 8px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        marginTop: '6px'
                      }}>
                        <AlertCircle size={14} style={{ flexShrink: 0, color: '#DC2626' }} />
                        <span>{errors.phone}</span>
                      </div>
                    )}
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
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="john@campus.edu"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: errors.email ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      color: '#232F3E',
                      backgroundColor: errors.email ? '#FEF2F2' : '#FFFFFF',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = errors.email ? '#EF4444' : '#ED7100')}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.email ? '#EF4444' : '#E2E8F0';
                      if (!formData.email.trim()) {
                        setErrors((prev) => ({ ...prev, email: 'Email address is required before submitting.' }));
                      } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
                        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address (e.g. name@company.com).' }));
                      }
                    }}
                  />
                  {errors.email && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#DC2626',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: '6px',
                      padding: '5px 8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      marginTop: '6px'
                    }}>
                      <AlertCircle size={14} style={{ flexShrink: 0, color: '#DC2626' }} />
                      <span>{errors.email}</span>
                    </div>
                  )}
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

                {/* Warnings Summary Before Submitting */}
                {Object.keys(errors).length > 0 && (
                  <div style={{
                    backgroundColor: '#FEF2F2',
                    border: '1.5px solid #FCA5A5',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.08)'
                  }}>
                    <AlertCircle size={18} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.82rem', color: '#991B1B', lineHeight: 1.45 }}>
                      <div style={{ fontWeight: 800, marginBottom: '3px' }}>
                        Please correct the following fields before submitting:
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: '#B91C1C' }}>
                        {errors.name && <li>{errors.name}</li>}
                        {errors.phone && <li>{errors.phone}</li>}
                        {errors.email && <li>{errors.email}</li>}
                      </ul>
                    </div>
                  </div>
                )}

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
