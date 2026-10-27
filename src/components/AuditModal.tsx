import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledNotes?: string;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  prefilledService = '',
  prefilledNotes = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: prefilledService || 'Consulting & Mentoring',
    message: prefilledNotes || ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) setFormData((prev) => ({ ...prev, service: prefilledService }));
    if (prefilledNotes) setFormData((prev) => ({ ...prev, message: prefilledNotes }));
  }, [prefilledService, prefilledNotes]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSubmitted(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const audits = JSON.parse(localStorage.getItem('netxyper_audit_requests') || '[]');
      audits.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('netxyper_audit_requests', JSON.stringify(audits));
    } catch {
      // ignore
    }

    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 14, 26, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '16px'
      }}
      onClick={resetAndClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '32px 32px 28px 32px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.45), 0 0 1px rgba(0, 0, 0, 0.2)',
          borderTop: '5px solid #ED7100',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(237, 113, 0, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#ED7100'
            }}>
              <CheckCircle size={32} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>
              Message Sent Successfully
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#64748B', marginBottom: '24px', lineHeight: 1.55 }}>
              Thank you! Our engineering desk will review your inquiry and respond within 24 hours.
            </p>

            <button
              onClick={resetAndClose}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.96rem',
                fontWeight: 700,
                backgroundColor: '#ED7100',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(237, 113, 0, 0.3)'
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header: Exact Skilltect copy & structure */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '4px',
                letterSpacing: '-0.02em'
              }}>
                Send us a message
              </h2>
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '12px'
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: errors.name ? '1px solid #EF4444' : '1px solid #E2E8F0',
                      fontSize: '0.90rem',
                      fontFamily: 'inherit',
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                    onBlur={(e) => (e.target.style.borderColor = errors.name ? '#EF4444' : '#E2E8F0')}
                  />
                  {errors.name && <span style={{ color: '#EF4444', fontSize: '0.74rem', marginTop: '2px', display: 'block' }}>{errors.name}</span>}
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
                    placeholder="+1234567890"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: errors.phone ? '1px solid #EF4444' : '1px solid #E2E8F0',
                      fontSize: '0.90rem',
                      fontFamily: 'inherit',
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                    onBlur={(e) => (e.target.style.borderColor = errors.phone ? '#EF4444' : '#E2E8F0')}
                  />
                  {errors.phone && <span style={{ color: '#EF4444', fontSize: '0.74rem', marginTop: '2px', display: 'block' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Row 2: EMAIL (Full Width) */}
              <div style={{ marginBottom: '12px' }}>
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: errors.email ? '1px solid #EF4444' : '1px solid #E2E8F0',
                    fontSize: '0.90rem',
                    fontFamily: 'inherit',
                    color: '#0F172A',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                  onBlur={(e) => (e.target.style.borderColor = errors.email ? '#EF4444' : '#E2E8F0')}
                />
                {errors.email && <span style={{ color: '#EF4444', fontSize: '0.74rem', marginTop: '2px', display: 'block' }}>{errors.email}</span>}
              </div>

              {/* Row 3: ORGANIZATION */}
              <div style={{ marginBottom: '12px' }}>
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
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="College, Startup or Business"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.90rem',
                    fontFamily: 'inherit',
                    color: '#0F172A',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              {/* Row 4: SERVICE REQUIRED */}
              <div style={{ marginBottom: '12px' }}>
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
                      padding: '10px 38px 10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #E2E8F0',
                      fontSize: '0.90rem',
                      fontFamily: 'inherit',
                      color: '#0F172A',
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
                    size={17}
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
              <div style={{ marginBottom: '18px' }}>
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
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.90rem',
                    fontFamily: 'inherit',
                    color: '#0F172A',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.5
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#ED7100')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              {/* Row 6: Submit Button (AWS Orange Pill) */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  backgroundColor: '#ED7100',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.18s ease, transform 0.18s ease',
                  boxShadow: '0 4px 14px rgba(237, 113, 0, 0.35)'
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
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
