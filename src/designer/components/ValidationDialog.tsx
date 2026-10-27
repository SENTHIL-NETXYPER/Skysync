import React from 'react';
import { X, ShieldCheck, AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { useArchitectureStore } from '../store';

export const ValidationDialog: React.FC = () => {
  const { isValidationOpen, setModal, validationReport } = useArchitectureStore();

  if (!isValidationOpen || !validationReport) return null;

  const { score, status, issues, total_components, total_connections } =
    validationReport;

  const scoreColor =
    score >= 85 ? '#10B981' : score >= 70 ? '#F59E0B' : '#EF4444';

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
      onClick={() => setModal('validation', false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
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
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10B981',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.08rem', fontWeight: 800 }}>
                AWS Well-Architected Review
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                Evaluated against Security, Reliability & Performance Pillars
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModal('validation', false)}
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

        {/* Score Card */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            border: '1px solid #334155'
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
              Architecture Health Score
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 900, color: scoreColor, lineHeight: 1.1 }}>
              {score} <span style={{ fontSize: '1rem', color: '#64748B' }}>/ 100</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '4px' }}>
              Status: <span style={{ fontWeight: 800, color: scoreColor }}>{status}</span> · {total_components} components · {total_connections} connections
            </div>
          </div>

          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              border: `4px solid ${scoreColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: 900,
              color: scoreColor
            }}
          >
            {score}%
          </div>
        </div>

        {/* Issues List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.80rem', fontWeight: 800, color: '#CBD5E1', textTransform: 'uppercase' }}>
            Findings & Recommendations ({issues.length})
          </div>

          {issues.map((iss, i) => {
            const isCrit = iss.severity === 'CRITICAL';
            const isWarn = iss.severity === 'WARNING';
            const bg = isCrit
              ? 'rgba(239, 68, 68, 0.1)'
              : isWarn
              ? 'rgba(245, 158, 11, 0.1)'
              : 'rgba(59, 130, 246, 0.1)';
            const border = isCrit ? '#EF4444' : isWarn ? '#F59E0B' : '#3B82F6';
            const iconColor = border;

            return (
              <div
                key={i}
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${border}50`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ color: iconColor, flexShrink: 0, marginTop: '2px' }}>
                  {isCrit ? <AlertCircle size={18} /> : isWarn ? <AlertTriangle size={18} /> : <Info size={18} />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: iconColor,
                        textTransform: 'uppercase',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: `${border}20`
                      }}
                    >
                      {iss.severity} · {iss.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#F1F5F9', lineHeight: 1.45 }}>
                    {iss.message}
                  </div>
                </div>
              </div>
            );
          })}

          {issues.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '32px 16px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px'
              }}
            >
              <CheckCircle2 size={36} style={{ color: '#10B981', margin: '0 auto 10px auto' }} />
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10B981' }}>
                Full Architecture Compliance
              </div>
              <div style={{ fontSize: '0.80rem', color: '#94A3B8' }}>
                All services adhere to AWS Well-Architected Framework guidelines.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => setModal('validation', false)}
            style={{
              padding: '8px 18px',
              backgroundColor: '#ED7100',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '7px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
