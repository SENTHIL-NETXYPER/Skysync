import React from 'react';
import { X, Layers, ArrowRight, Sparkles, Cloud } from 'lucide-react';
import { useArchitectureStore } from '../store';

export const TemplatesDialog: React.FC = () => {
  const { isTemplatesOpen, setModal, loadTemplate } = useArchitectureStore();

  if (!isTemplatesOpen) return null;

  const templates = [
    {
      id: '3-tier',
      title: 'Standard 3-Tier Web Architecture',
      badge: 'Production Default',
      desc: 'Route 53 DNS, CloudFront CDN, Application Load Balancer in Public Subnet, EC2 Auto Scaling in Private Subnet, Aurora PostgreSQL Multi-AZ & S3.',
      services: ['Route 53', 'CloudFront', 'ALB', 'EC2 Auto Scaling', 'Aurora DB', 'S3'],
      icon: Cloud,
      color: '#C5A46D'
    },
    {
      id: 'ai-rag',
      title: 'Amazon Bedrock Enterprise RAG AI',
      badge: 'Generative AI',
      desc: 'Bedrock Claude 3.5 Sonnet foundation model with Aurora pgvector database, document knowledge vault on S3, and isolated VPC subnets.',
      services: ['Bedrock', 'Aurora pgvector', 'S3 Vault', 'VPC', 'Subnets'],
      icon: Sparkles,
      color: '#C925D1'
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 10, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px'
      }}
      onClick={() => setModal('templates', false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#0F172A',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          color: '#F8FAFC',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(197, 164, 109, 0.15)',
                border: '1px solid #C5A46D',
                color: '#C5A46D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Layers size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.08rem', fontWeight: 800 }}>
                AWS Architecture Templates
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                Load official reference architectures tested for security and scalability
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModal('templates', false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Template Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {templates.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <div
                key={tpl.id}
                style={{
                  backgroundColor: '#1E293B',
                  border: '1.5px solid #334155',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: `${tpl.color}25`,
                        color: tpl.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span style={{ fontSize: '0.94rem', fontWeight: 800, color: '#F8FAFC' }}>
                      {tpl.title}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.70rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: `${tpl.color}20`,
                      color: tpl.color
                    }}
                  >
                    {tpl.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.80rem', color: '#94A3B8', lineHeight: 1.45, margin: 0 }}>
                  {tpl.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {tpl.services.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.68rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: '#0F172A',
                          color: '#CBD5E1',
                          border: '1px solid #334155'
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => loadTemplate(tpl.id)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: tpl.color,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Load</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
