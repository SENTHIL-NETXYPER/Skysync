import React, { useState } from 'react';
import { Globe, ChevronDown, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { SkySyncLogo } from './SkySyncLogo';
import { getGeneralMailto, getFounderMailto, CONTACT_PHONE, FOUNDER_EMAIL, GENERAL_EMAIL } from '../utils/mailAlerts';

interface FooterProps {
  onSelectTab?: (tab: string) => void;
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenConsultation }) => {
  const [selectedLang, setSelectedLang] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const scrollToTop = () => {
    if (onSelectTab) onSelectTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (onSelectTab) onSelectTab('home');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generalMailto = getGeneralMailto();
  const founderMailto = getFounderMailto();

  return (
    <footer
      style={{
        backgroundColor: '#0F141C',
        color: '#CBD5E1',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        padding: '44px 40px 32px 40px',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* TOP ROW: Brand Logo + Pill Action Button & Language Picker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '36px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Left: Brand Logo & Consultation CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollToSection('hero')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              aria-label="Back to top"
            >
              <SkySyncLogo variant="dark" height={26} />
            </button>
            <button
              type="button"
              onClick={onOpenConsultation || (() => scrollToSection('contact'))}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0F141C',
                border: 'none',
                borderRadius: '9999px',
                padding: '9px 22px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.16s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F1F5F9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Book a Free Consultation
            </button>
          </div>

          {/* Right Language Selector Pill */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '9999px',
                color: '#FFFFFF',
                padding: '7px 16px',
                fontSize: '0.84rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'border-color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
            >
              <Globe size={14} />
              <span>{selectedLang}</span>
              <ChevronDown size={13} />
            </button>

            {isLangOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: '110%',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '150px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 20
                }}
              >
                {['English', 'India (English)', 'Tamil Nadu (EN)'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    style={{
                      background: selectedLang === lang ? '#334155' : 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MINIMAL 3-COLUMN STRUCTURE (Clean, Spacious, No Unwanted Areas) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '36px',
            marginBottom: '36px'
          }}
        >
          {/* Column 1: Core Services */}
          <div>
            <div
              style={{
                fontSize: '0.90rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              Cloud Practice
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '0.86rem' }}>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                AWS Cloud Infrastructure & Architecture
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                DevOps & CI/CD Pipelines
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                Zero-Downtime Database Migration
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                AI & AWS Bedrock Assistants
              </button>
            </div>
          </div>

          {/* Column 2: Architecture Tools */}
          <div>
            <div
              style={{
                fontSize: '0.90rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              Cloud Tools
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '0.86rem' }}>
              <button
                onClick={() => scrollToSection('designer-section')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                Cloud Architecture Designer
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                AWS Cost & Savings Estimator
              </button>
              <button
                onClick={() => scrollToSection('why-cloud')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                On-Premises vs Cloud TCO
              </button>
              <button
                onClick={() => scrollToSection('process')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#94A3B8', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                4-Step Delivery Blueprints
              </button>
            </div>
          </div>

          {/* Column 3: Direct Engineering Desk (Direct mailto auto-alerts) */}
          <div>
            <div
              style={{
                fontSize: '0.90rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              Direct Engineering Desk
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '0.86rem' }}>
              {/* Founder email link (Alerts Senthil Kumar directly) */}
              <a
                href={founderMailto}
                title="Tap to email Founder & Principal Architect Senthil Kumar directly"
                style={{
                  color: '#CBD5E1',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.16s ease',
                  wordBreak: 'break-all'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                <Mail size={15} color="#ED7100" style={{ flexShrink: 0 }} />
                <span>{FOUNDER_EMAIL}</span>
              </a>

              {/* General inquiries email link (Auto-alerts hello + CC senthil) */}
              <a
                href={generalMailto}
                title="Tap to email General Consulting Desk"
                style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.16s ease',
                  wordBreak: 'break-all'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Mail size={15} color="#64748B" style={{ flexShrink: 0 }} />
                <span>{GENERAL_EMAIL}</span>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                style={{
                  color: '#CBD5E1',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.16s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                <Phone size={15} color="#ED7100" style={{ flexShrink: 0 }} />
                <span>{CONTACT_PHONE}</span>
              </a>

              {/* Location & SLA Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.80rem' }}>
                <MapPin size={14} style={{ flexShrink: 0 }} />
                <span>Salem, Tamil Nadu, India · 24h SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTERED: Back to top ↑ */}
        <div style={{ textAlign: 'center', margin: '28px 0 20px 0' }}>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'color 0.16s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* BOTTOM LEGAL DISCLAIMER + SOCIAL ICONS */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <p
              style={{
                fontSize: '0.78rem',
                color: '#64748B',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '780px'
              }}
            >
              SkySyncLab delivers Enterprise-Grade AWS Cloud Infrastructure, DevOps pipelines, and Generative AI solutions engineered in alignment with the AWS Well-Architected Framework.
            </p>

            {/* Social & Contact Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SkySyncLab on LinkedIn (opens in new tab)"
                title="SkySyncLab on LinkedIn"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  LinkedIn
                </span>
              </a>
              <a
                href="https://github.com/SENTHIL-NETXYPER/Skysync"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SkySyncLab on GitHub (opens in new tab)"
                title="SkySyncLab on GitHub"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  GitHub
                </span>
              </a>
              <a
                href={generalMailto}
                aria-label="Send email alert to hello@skysynclab.com"
                title="Email SkySyncLab Cloud Consulting (Auto-Alert)"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Mail size={15} aria-hidden="true" />
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Email SkySyncLab
                </span>
              </a>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                aria-label={`Call SkySyncLab at ${CONTACT_PHONE}`}
                title="Call SkySyncLab Cloud Consulting"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Phone size={15} aria-hidden="true" />
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Call SkySyncLab
                </span>
              </a>
            </div>
          </div>

          {/* Bottom Copyright & Terms Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '0.78rem',
              color: '#64748B'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => scrollToSection('contact')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#64748B', cursor: 'pointer', fontSize: '0.78rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#CBD5E1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                Privacy
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#64748B', cursor: 'pointer', fontSize: '0.78rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#CBD5E1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                Site terms
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#64748B', cursor: 'pointer', fontSize: '0.78rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#CBD5E1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                Cookie Preferences
              </button>
            </div>

            <div>
              {`© ${new Date().getFullYear()}, SkySyncLab (skysynclab.com). All rights reserved.`}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
