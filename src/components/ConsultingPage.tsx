import React from 'react';
import { 
  Users, 
  BookOpen, 
  Cpu, 
  Shield, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

interface ConsultingPageProps {
  onRequestConsulting: () => void;
}

export const ConsultingPage: React.FC<ConsultingPageProps> = ({ onRequestConsulting }) => {
  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Audit',
      desc: 'Deep dive into your existing workloads, team capabilities, and architectural goals.'
    },
    {
      step: '02',
      title: 'Architecture Blueprint',
      desc: 'Collaborative drafting of resilient AWS infrastructure with cost forecasting and security baselines.'
    },
    {
      step: '03',
      title: 'Guided Implementation',
      desc: 'Hands-on pairing or mentoring through IaC pipelines, containerization, and monitoring setup.'
    },
    {
      step: '04',
      title: 'Knowledge Handover',
      desc: 'Comprehensive runbooks, team training, and operational handoff for full autonomy.'
    }
  ];

  const offerings = [
    {
      icon: Users,
      title: 'Team Mentoring & Upskilling',
      desc: 'Pair directly with internal faculty or junior developers to build practical cloud operational confidence.',
      points: [
        'Real-world AWS Console & CLI workflows',
        'CI/CD pipeline troubleshooting sessions',
        'Security best practices & least-privilege IAM',
        'Weekly Q&A and architecture review office hours'
      ]
    },
    {
      icon: Cpu,
      title: 'Architecture Review & Design',
      desc: 'Get an objective, certified assessment of your proposed or existing cloud topology before committing resources.',
      points: [
        'AWS Well-Architected Framework alignment',
        'High availability & Multi-AZ redundancy',
        'Cost estimation and resource right-sizing',
        'Comprehensive architecture diagrams & specs'
      ]
    },
    {
      icon: Shield,
      title: 'Security & Governance Advisory',
      desc: 'Establish robust organizational guardrails to maintain compliance, protect sensitive institutional data, and prevent billing surprises.',
      points: [
        'AWS Budgets and billing alarm setup',
        'KMS encryption and secret management',
        'VPC subnetting and Security Group auditing',
        'Automated patching and vulnerability monitoring'
      ]
    },
    {
      icon: BookOpen,
      title: 'Campus IT Handover & Runbooks',
      desc: 'We equip academic staff with clear, documented procedures so internal teams maintain full control of college systems.',
      points: [
        'Step-by-step incident response runbooks',
        'Database restore & backup procedures',
        'Exam-day traffic scaling checklist',
        'Zero vendor lock-in operational independence'
      ]
    }
  ];

  return (
    <section id="consulting-page" style={{ padding: '40px 24px 80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(9, 9, 11, 0.08)',
          border: '1px solid rgba(9, 9, 11, 0.22)',
          color: '#09090B',
          fontSize: '0.78rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          marginBottom: '10px'
        }}>
          <Shield size={14} />
          <span>Practical Cloud Guidance</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#232F3E', marginBottom: '14px', letterSpacing: '-0.03em' }}>
          Consulting & Mentoring
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.1rem', color: '#526071', lineHeight: 1.6 }}>
          Practical guidance for startups, colleges, and growing businesses seeking to adopt AWS cloud infrastructure, upskill engineering teams, and modernize securely.
        </p>
      </div>

      {/* 4-Step Process Bar */}
      <div style={{
        backgroundColor: '#F7F8FA',
        border: '1.5px solid #E2E8F0',
        borderRadius: '18px',
        padding: '36px 30px',
        marginBottom: '54px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#09090B', fontWeight: 800, letterSpacing: '0.04em' }}>
            How We Work
          </span>
          <h2 style={{ fontSize: '1.6rem', color: '#232F3E', fontWeight: 800, marginTop: '4px' }}>
            Our 4-Step Consulting Process
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          position: 'relative'
        }}>
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div>
                <span style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  color: '#09090B',
                  display: 'block',
                  marginBottom: '10px'
                }}>
                  {step.step}
                </span>
                <h3 style={{ fontSize: '1.1rem', color: '#232F3E', fontWeight: 800, marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.90rem', color: '#526071', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offerings Grid */}
      <div style={{ marginBottom: '54px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#232F3E', fontWeight: 800, marginBottom: '8px' }}>
            What We Consult & Mentor On
          </h2>
          <p style={{ color: '#526071', fontSize: '0.98rem' }}>
            Targeted mentorship areas tailored for practical operational independence.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '22px'
        }}>
          {offerings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#09090B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(9, 9, 11, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#09090B',
                    marginBottom: '16px',
                    border: '1px solid rgba(9, 9, 11, 0.22)'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.20rem', fontWeight: 800, color: '#232F3E', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#526071', lineHeight: 1.55, marginBottom: '16px' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <CheckCircle2 size={15} color="#01A88D" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.86rem', color: '#526071', lineHeight: 1.45 }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div style={{
        backgroundColor: '#F7F8FA',
        border: '1.5px solid #E2E8F0',
        borderRadius: '18px',
        padding: '38px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#232F3E' }}>
          Ready to Plan Your Cloud Strategy?
        </h3>
        <p style={{ maxWidth: '560px', color: '#526071', fontSize: '0.98rem', lineHeight: 1.6 }}>
          Connect directly with our engineering team for an objective assessment of your architecture, team training needs, and migration path.
        </p>
        <button
          onClick={onRequestConsulting}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '13px 28px',
            backgroundColor: '#09090B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '0.96rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 14px rgba(9, 9, 11, 0.3)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EC7211')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#09090B')}
        >
          <span>Request Consulting</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
};

export default ConsultingPage;
