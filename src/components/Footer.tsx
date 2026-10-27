import React, { useState } from 'react';
import { Globe, ChevronDown, ArrowUp, Mail, Phone } from 'lucide-react';

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

  return (
    <footer
      style={{
        backgroundColor: '#0F141C',
        color: '#CBD5E1',
        borderTopLeftRadius: '36px',
        borderTopRightRadius: '36px',
        padding: '48px 48px 36px 48px',
        maxWidth: '100%',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* TOP ROW: Pill Action Button (Create account / Book Consultation) & Language Picker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px'
          }}
        >
          {/* Left Pill Button (Matches AWS "Create an AWS account" button) */}
          <button
            type="button"
            onClick={onOpenConsultation || (() => scrollToSection('contact'))}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0F141C',
              border: 'none',
              borderRadius: '9999px',
              padding: '11px 26px',
              fontSize: '0.88rem',
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

          {/* Right Language Selector Pill (Matches AWS "🌐 English ⌄" pill) */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '9999px',
                color: '#FFFFFF',
                padding: '8px 18px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'border-color 0.16s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)')}
            >
              <Globe size={15} />
              <span>{selectedLang}</span>
              <ChevronDown size={14} />
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

        {/* 4 COLUMNS: EXACT STRUCTURE OF WHAT OUR WEB CONSISTS OF (AWS FOOTER STYLE) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '40px'
          }}
        >
          {/* Column 1: Core Services */}
          <div>
            <div
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Cloud Infrastructure & Architecture
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                DevOps & CI/CD Pipelines
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Managed Cloud Operations
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                AI & AWS Bedrock Assistants
              </button>
              <button
                onClick={() => scrollToSection('services')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Zero-Downtime Database Migration
              </button>
              <button
                onClick={() => scrollToSection('why-choose-us')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Faculty Handover & Mentoring
              </button>
            </div>
          </div>

          {/* Column 2: Interactive Tools */}
          <div>
            <div
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Interactive Tools
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <button
                onClick={() => scrollToSection('calculator')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                AWS Cost & ROI Estimator
              </button>
              <button
                onClick={() => scrollToSection('designer-section')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Cloud Architecture Designer
              </button>
              <button
                onClick={() => scrollToSection('why-cloud')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                On-Premises vs Cloud TCO
              </button>
              <button
                onClick={() => scrollToSection('process')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                4-Step Delivery Blueprints
              </button>
              <button
                onClick={() => scrollToSection('process')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                VPC & Aurora Topology Viewer
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Live Cloud Savings Audit
              </button>
            </div>
          </div>

          {/* Column 3: Institutional Workloads */}
          <div>
            <div
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Institutional Workloads
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <button
                onClick={() => scrollToSection('client-proof')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Muthayammal Engineering College (Autonomous)
              </button>
              <button
                onClick={() => scrollToSection('client-proof')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Muthayammal Polytechnic College
              </button>
              <button
                onClick={() => scrollToSection('solutions')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Autonomous Exam & Result Portals
              </button>
              <button
                onClick={() => scrollToSection('solutions')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Campus ERP & Student Information Systems
              </button>
              <button
                onClick={() => scrollToSection('solutions')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                High-Concurrency Auto Scaling
              </button>
              <button
                onClick={() => scrollToSection('solutions')}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Automated Disaster Recovery
              </button>
            </div>
          </div>

          {/* Column 4: Engineering & Support */}
          <div>
            <div
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Engineering & Support
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <button
                onClick={onOpenConsultation || (() => scrollToSection('contact'))}
                style={{ background: 'none', border: 'none', padding: 0, color: '#CBD5E1', cursor: 'pointer', textAlign: 'left', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                Book a Consultation
              </button>
              <span style={{ color: '#94A3B8' }}>
                AWS Certified Cloud Practitioner
              </span>
              <span style={{ color: '#94A3B8' }}>
                AWS Well-Architected Framework
              </span>
              <span style={{ color: '#94A3B8' }}>
                24-Hour Engineering SLA
              </span>
              <a
                href="mailto:consult@netxyper.com"
                style={{ color: '#CBD5E1', textDecoration: 'none', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                consult@netxyper.com
              </a>
              <a
                href="tel:+918667254699"
                style={{ color: '#CBD5E1', textDecoration: 'none', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                +91 86672 54699
              </a>
            </div>
          </div>
        </div>

        {/* CENTERED: Back to top ↑ */}
        <div style={{ textAlign: 'center', margin: '42px 0 28px 0' }}>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '0.86rem',
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
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* BOTTOM LEGAL DISCLAIMER + SOCIAL ICONS */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
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
                maxWidth: '820px'
              }}
            >
              NetXyper delivers Enterprise-Grade AWS Cloud Infrastructure, DevOps automation pipelines, and Generative AI solutions engineered strictly in alignment with the AWS Well-Architected Framework for autonomous educational institutions, colleges, and modern enterprises.
            </p>

            {/* Social Icons (Matches AWS footer right side icons) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NetXyper on LinkedIn (opens in new tab)"
                title="NetXyper on LinkedIn"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  LinkedIn
                </span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NetXyper on GitHub (opens in new tab)"
                title="NetXyper on GitHub"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  GitHub
                </span>
              </a>
              <a
                href="mailto:consult@netxyper.com"
                aria-label="Send email to consult@netxyper.com"
                title="Email NetXyper Cloud Consulting"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Mail size={16} aria-hidden="true" />
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Email NetXyper
                </span>
              </a>
              <a
                href="tel:+918667254699"
                aria-label="Call NetXyper at +91 86672 54699"
                title="Call NetXyper Cloud Consulting"
                style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', transition: 'color 0.16s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Phone size={16} aria-hidden="true" />
                <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                  Call NetXyper
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
              {`© ${new Date().getFullYear()}, NetXyper Cloud Consulting or its affiliates. All rights reserved.`}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
