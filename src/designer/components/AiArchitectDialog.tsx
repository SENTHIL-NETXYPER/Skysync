import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useArchitectureStore } from '../store';

export const AiArchitectDialog: React.FC = () => {
  const { isAiOpen, setModal, loadTemplate } = useArchitectureStore();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);

  if (!isAiOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/ai/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestion(data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend AI offline, evaluating with local rules', err);
    }

    // Local heuristic generator
    if (prompt.toLowerCase().includes('bedrock') || prompt.toLowerCase().includes('ai') || prompt.toLowerCase().includes('rag')) {
      setSuggestion({
        title: 'Generative AI & RAG Enterprise Architecture',
        summary: 'Amazon Bedrock foundation model orchestration with Aurora pgvector and S3 Knowledge Base.',
        recommended_services: [
          { service: 'Amazon Route 53', label: 'Route 53 DNS', category: 'Networking' },
          { service: 'Application Load Balancer', label: 'ALB Ingress', category: 'Networking' },
          { service: 'Amazon Bedrock', label: 'Bedrock Claude 3.5', category: 'AI & ML' },
          { service: 'Amazon Aurora', label: 'Aurora pgvector', category: 'Databases' },
          { service: 'Amazon S3', label: 'Knowledge Base Vault', category: 'Storage' }
        ],
        cost_estimate_monthly: '$260 - $420 / month',
        security_tier: 'KMS-Encrypted Isolated Subnets'
      });
    } else {
      setSuggestion({
        title: 'High-Availability 3-Tier Web Application',
        summary: 'Elastic Load Balancing with Multi-AZ EC2 Auto Scaling, Aurora PostgreSQL, and S3 asset delivery.',
        recommended_services: [
          { service: 'Amazon Route 53', label: 'Route 53 DNS', category: 'Networking' },
          { service: 'Amazon CloudFront', label: 'CloudFront CDN', category: 'Networking' },
          { service: 'Application Load Balancer', label: 'ALB', category: 'Networking' },
          { service: 'Amazon EC2', label: 'EC2 Auto Scaling', category: 'Compute' },
          { service: 'Amazon Aurora', label: 'Aurora Multi-AZ', category: 'Databases' },
          { service: 'Amazon S3', label: 'S3 Document Store', category: 'Storage' }
        ],
        cost_estimate_monthly: '$160 - $290 / month',
        security_tier: 'Well-Architected Multi-AZ'
      });
    }
    setLoading(false);
  };

  const handleApplyToCanvas = () => {
    if (prompt.toLowerCase().includes('bedrock') || prompt.toLowerCase().includes('ai') || prompt.toLowerCase().includes('rag')) {
      loadTemplate('ai-rag');
    } else {
      loadTemplate('3-tier');
    }
    setModal('ai', false);
  };

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
      onClick={() => setModal('ai', false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(201, 37, 209, 0.15)',
                border: '1px solid #C925D1',
                color: '#C925D1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.08rem', fontWeight: 800 }}>
                AI Architecture Consultant
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                Describe your workload in plain English — receive a validated AWS blueprint
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModal('ai', false)}
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

        {/* Prompt Input Form */}
        <form onSubmit={handleGenerate} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Design an AI-powered student query assistant with Amazon Bedrock and Aurora..."
              style={{
                flex: 1,
                padding: '10px 14px',
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              style={{
                padding: '10px 18px',
                backgroundColor: '#C925D1',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: loading || !prompt.trim() ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: loading || !prompt.trim() ? 0.6 : 1
              }}
            >
              {loading ? (
                <span>Generating...</span>
              ) : (
                <>
                  <Send size={15} />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
            {[
              'Enterprise Bedrock RAG AI',
              'High-Availability 3-Tier Web App',
              'Serverless Event API'
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setPrompt(preset)}
                style={{
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#94A3B8',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                + {preset}
              </button>
            ))}
          </div>
        </form>

        {/* AI Proposal Results */}
        {suggestion && (
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#F8FAFC' }}>
                {suggestion.title}
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(201, 37, 209, 0.2)',
                  color: '#F472B6',
                  fontWeight: 700
                }}
              >
                {suggestion.cost_estimate_monthly}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
              {suggestion.summary}
            </p>

            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px', textTransform: 'uppercase' }}>
                Recommended AWS Services:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {suggestion.recommended_services?.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#0F172A',
                      borderRadius: '6px',
                      border: '1px solid #334155',
                      fontSize: '0.76rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle2 size={13} style={{ color: '#10B981', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: '#F1F5F9' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              <button
                type="button"
                onClick={handleApplyToCanvas}
                style={{
                  width: '100%',
                  padding: '9px 16px',
                  backgroundColor: '#E7167B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>Load Topology onto Canvas</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
