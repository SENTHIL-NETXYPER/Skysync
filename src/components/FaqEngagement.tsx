import React, { useState } from 'react';
import { ChevronDown, IndianRupee, Shield } from 'lucide-react';

export const FaqEngagement: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('security');

  const engagementModels = [
    {
      title: 'Architecture Audit',
      range: '₹25k – ₹75k',
      desc: 'Well-Architected review, cost snapshot, and a prioritized 30-day action plan.'
    },
    {
      title: 'Fixed Migration Project',
      range: 'Scoped quote',
      desc: 'Discovery through cutover with documented runbooks and staff handover.'
    },
    {
      title: 'Managed Ops Retainer',
      range: 'Monthly retainer',
      desc: 'Monitoring, patching, FinOps reviews, and incident support for campus workloads.'
    }
  ];

  const faqs = [
    {
      id: 'security',
      q: 'How do you handle data security and compliance?',
      a: 'Workloads stay in your AWS account with IAM least privilege, encryption at rest (KMS), and VPC isolation. Campus documents used for AI stay private to Bedrock with no training on your data.'
    },
    {
      id: 'downtime',
      q: 'Can we migrate without taking the portal offline?',
      a: 'Yes. We use replication (DMS/RDS), staged cutover windows, and rehearsed rollback runbooks so production traffic switches only after validation.'
    },
    {
      id: 'timeline',
      q: 'How long does a typical college migration take?',
      a: 'Most institutional migrations run 6–12 weeks depending on database size, integrations, and how many rehearsal cutovers your team wants.'
    },
    {
      id: 'ownership',
      q: 'Do we keep full ownership of the AWS account?',
      a: 'Always. SkySyncLab builds in your account, documents everything, and trains your IT staff—you retain keys, billing, and architecture control.'
    }
  ];

  return (
    <section id="faq" style={{ padding: '44px 24px 48px', maxWidth: '1180px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Engagement & FAQ</span>
          <div className="badge-line" />
        </div>
        <h2 style={{ marginBottom: '8px', color: '#232F3E', fontSize: 'clamp(1.85rem, 3vw, 2.35rem)', fontWeight: 900 }}>
          How We Partner With You
        </h2>
        <p style={{ maxWidth: '620px', margin: '0 auto', fontSize: '1.0625rem', color: '#334155', lineHeight: 1.6 }}>
          Transparent engagement options and answers on security, downtime, and ownership.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {engagementModels.map((model) => (
          <div
            key={model.title}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '14px',
              padding: '20px 22px',
              boxShadow: '0 2px 12px rgba(15, 23, 42, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <IndianRupee size={18} color="#E7167B" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{model.title}</h3>
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#E7167B', marginBottom: '8px' }}>{model.range}</div>
            <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: 1.55, margin: 0 }}>{model.desc}</p>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #CBD5E1',
        borderRadius: '16px',
        padding: '8px 12px',
        boxShadow: '0 2px 12px rgba(15, 23, 42, 0.05)'
      }}>
        {faqs.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '14px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.98rem', fontWeight: 700, color: '#0F172A' }}>
                  {item.id === 'security' && <Shield size={17} color="#E7167B" />}
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  color="#475569"
                  style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                />
              </button>
              {isOpen && (
                <p style={{ padding: '0 12px 14px 40px', margin: 0, fontSize: '0.94rem', color: '#334155', lineHeight: 1.6 }}>
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqEngagement;
