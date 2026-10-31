import React from 'react';
import { Server, Database, Bot, CheckCircle2, ArrowRight } from 'lucide-react';

interface CaseStudiesProps {
  onOpenAuditWithDemo?: (demoTitle: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAuditWithDemo }) => {
  const demonstrations = [
    {
      id: 'demo-exam-portal',
      title: 'Lab Prototype: Exam Portal Auto Scaling',
      badge: 'Lab Prototype, not a client deployment',
      icon: Server,
      objective: 'Dynamically scales compute to absorb exam result traffic surges without memory crashes.',
      topology: 'EC2 Auto Scaling Group behind ALB + Amazon Aurora read-replicas + CloudFront CDN.',
      proofPoints: [
        'Expands compute instances dynamically during simulated traffic spikes',
        'CloudFront edge caching absorbs static assets and circulars',
        'Multi-AZ Aurora replica offloads student query lookups'
      ]
    },
    {
      id: 'demo-db-migration',
      title: 'Lab Prototype: Database Replication with AWS DMS',
      badge: 'Lab Prototype, not a client deployment',
      icon: Database,
      objective: 'Migrates on-premise relational databases to AWS with pre-cutover checksum verification.',
      topology: 'Source MySQL replicating to Amazon RDS via AWS DMS with Change Data Capture (CDC).',
      proofPoints: [
        'Continuous replication while keeping source database live',
        'Pre-cutover data verification comparing row counts and checksums',
        'Documented short, planned cutover procedure agreed per project'
      ]
    },
    {
      id: 'demo-campus-ai',
      title: 'Lab Prototype: Campus AI Regulations Bot',
      badge: 'Lab Prototype, not a client deployment',
      icon: Bot,
      objective: 'Grounded RAG assistant answering student admission and regulation questions from official PDFs.',
      topology: 'S3 PDF ingestion + pgvector semantic embeddings + AWS Bedrock (Claude 3.5 Sonnet).',
      proofPoints: [
        'Strict grounding: Answers strictly drawn from uploaded campus prospectuses',
        'Direct page citations provided alongside every response',
        'Privacy: Documents stay strictly inside institutional AWS account and are not used to train models'
      ]
    }
  ];

  return (
    <section id="demonstrations" style={{
      padding: '50px 24px 60px 24px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Technical Demos</span>
          <div className="badge-line" />
        </div>
        <h2 style={{ marginBottom: '8px', color: 'var(--text-dark-black)' }}>
          Technical Demonstrations & Lab Prototypes
        </h2>
        <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-body)' }}>
          Real engineering prototypes built to validate campus workloads on AWS without unverified claims.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {demonstrations.map((demo) => {
          const Icon = demo.icon;
          return (
            <div
              key={demo.id}
              className="aws-unified-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #E2E8F0',
                borderLeft: '4px solid #E7167B',
                padding: '26px 28px',
                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="unified-icon-box" style={{ width: '42px', height: '42px' }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.24rem', color: '#1E293B', marginBottom: '3px' }}>
                      {demo.title}
                    </h3>
                    <div style={{ fontSize: '0.86rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                      {demo.topology}
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: '#FFF7ED',
                  color: '#C2410C',
                  border: '1px solid #FFEDD5'
                }}>
                  {demo.badge}
                </span>
              </div>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.55 }}>
                {demo.objective}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                {demo.proofPoints.map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    <CheckCircle2 size={16} color="var(--aws-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  Validated in lab demo environment · Terraform code available
                </span>

                <button
                  onClick={() => onOpenAuditWithDemo && onOpenAuditWithDemo(demo.title)}
                  className="aws-link"
                  style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.94rem' }}
                >
                  <span>Request Prototype Walkthrough</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
