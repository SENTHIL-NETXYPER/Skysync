import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Server, 
  BarChart2, 
  ArrowRight, 
  Database, 
  Clock, 
  User, 
  Wrench, 
  Info, 
  X, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CostCalculatorProps {
  onOpenAuditWithDetails?: (details: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenAuditWithDetails }) => {
  // Calculator state
  const [serverCount, setServerCount] = useState<number>(5);
  const [storageTB, setStorageTB] = useState<number>(2);
  const [supportModel, setSupportModel] = useState<'mentoring' | 'scheduled'>('mentoring');
  const [includeAI, setIncludeAI] = useState<boolean>(true);

  // Modal State for Image 2 popup
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    orgType: 'College / Education',
    preferredTime: "I'm flexible",
    notes: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Exact Mathematical Formula & Sub-service Breakdown:
  // Compute: EC2 auto-scaling rates @ ₹7,840/server
  // Storage: S3 & Aurora Multi-AZ rates @ ₹1,500/TB
  // Admissions AI Bot (Bedrock & RAG):
  //   - Compute: ₹3,200/mo (Amazon Bedrock token inference for ~25k student queries)
  //   - Storage: ₹1,200/mo (Aurora pgvector semantic embeddings + S3 document vault)
  //   - Total AI: ₹4,400/mo
  const computeRatePerServer = 7840;
  const storageRatePerTB = 1500;
  const aiComputeRate = 3200;
  const aiStorageRate = 1200;
  const aiTotalRate = aiComputeRate + aiStorageRate;

  const awsCompute = serverCount * computeRatePerServer;
  const awsStorage = Math.round(storageTB * storageRatePerTB);
  const aiRate = includeAI ? aiTotalRate : 0;
  const totalAws = awsCompute + awsStorage + aiRate;

  // On-premises baseline formula:
  // Base hardware & power: ₹17,400/server + ₹4,000/TB
  // Standalone legacy chatbot or student helpdesk software: ₹18,000/mo
  const onPremAIBaseline = includeAI ? 18000 : 0;
  const onPremTotal = Math.round(serverCount * 17400 + storageTB * 4000 + onPremAIBaseline);
  const estimatedSavings = Math.max(0, onPremTotal - totalAws);
  const estimatedSavingsPercent = Math.round((estimatedSavings / onPremTotal) * 100);

  const rolloutWindow = serverCount <= 4 ? '4 – 6 Weeks' : serverCount <= 8 ? '6 – 8 Weeks' : '8 – 12 Weeks';

  const presetCounts = [1, 3, 5, 10, 15];
  const storageTicks = [0.5, 1, 2, 5, 10];

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  const handleOpenConsultationModal = () => {
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim()) {
      alert('Please fill in your name and work email.');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('netxyper_cloud_plans') || '[]');
      existing.push({
        ...formData,
        estimate: {
          serverCount,
          storageTB,
          supportModel,
          includeAI,
          awsCompute,
          awsStorage,
          totalAws,
          estimatedSavings,
          estimatedSavingsPercent
        },
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('netxyper_cloud_plans', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
    try {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    if (onOpenAuditWithDetails) {
      const summary = `${serverCount} servers, ${storageTB}TB, AWS ₹${totalAws.toLocaleString('en-IN')}/mo, Savings ₹${estimatedSavings.toLocaleString('en-IN')}/mo`;
      onOpenAuditWithDetails(summary);
    }
  };

  return (
    <section
      id="calculator"
      data-nav-pricing="true"
      style={{
        padding: '50px 24px 65px 24px',
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Anchor for Pricing Nav Link */}
      <div id="pricing" style={{ position: 'absolute', top: '-90px', left: 0, width: '1px', height: '1px', visibility: 'hidden' }} />
      <style>{`
        .custom-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 9999px;
          background: #E2E8F0;
          outline: none;
        }
        .custom-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ED7100;
          cursor: pointer;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 6px rgba(237, 113, 0, 0.4);
        }
        .custom-range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ED7100;
          cursor: pointer;
          border: 2px solid #FFFFFF;
          box-shadow: 0 2px 6px rgba(237, 113, 0, 0.4);
        }
      `}</style>

      {/* Header matching Image 1 */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">ROI Calculator</span>
          <div className="badge-line" />
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
            fontWeight: 900,
            color: '#1E293B',
            letterSpacing: '-0.025em',
            marginBottom: '8px',
            lineHeight: 1.2
          }}
        >
          Estimate Your Cloud Savings
        </h2>

        <p
          style={{
            fontSize: '1.02rem',
            color: '#64748B',
            maxWidth: '560px',
            lineHeight: 1.55,
            margin: '0 auto'
          }}
        >
          See how much you can save by moving from physical servers to AWS.
        </p>
      </div>

      {/* Two Column Grid matching Image 1 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
          gap: '24px',
          alignItems: 'stretch',
          maxWidth: '1120px',
          margin: '0 auto'
        }}
      >
        {/* Left Card: Your Current Infrastructure */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            border: '1.5px solid #E2E8F0',
            padding: '28px 26px',
            boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ED7100',
                  flexShrink: 0
                }}
              >
                <Server size={22} color="#ED7100" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#1E293B', margin: '0 0 2px 0' }}>
                  Your Current Infrastructure
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
                  Enter a few details to get an estimated comparison.
                </p>
              </div>
            </div>

            {/* Field 1: Number of Physical Servers */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '10px' }}>
                Number of Physical Servers
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {presetCounts.map((count) => {
                  const isSelected = serverCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setServerCount(count)}
                      style={{
                        padding: '10px 0',
                        fontSize: '0.94rem',
                        fontWeight: isSelected ? 800 : 600,
                        borderRadius: '10px',
                        border: isSelected ? '1.5px solid #ED7100' : '1px solid #E2E8F0',
                        backgroundColor: isSelected ? '#FFF7ED' : '#FFFFFF',
                        color: isSelected ? '#ED7100' : '#1E293B',
                        cursor: 'pointer',
                        transition: 'all 0.16s ease'
                      }}
                    >
                      {count}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 2: Total Database Size (Styled Pill Button Group) */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E293B' }}>
                  Total Database Size
                </label>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ED7100', backgroundColor: '#FFF7ED', padding: '3px 9px', borderRadius: '6px', border: '1px solid #FFEDD5' }}>
                  {storageTB} TB Selected
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {storageTicks.map((tick) => {
                  const isSelected = storageTB === tick;
                  return (
                    <button
                      key={tick}
                      type="button"
                      onClick={() => setStorageTB(tick)}
                      style={{
                        padding: '10px 0',
                        fontSize: '0.90rem',
                        fontWeight: isSelected ? 800 : 600,
                        borderRadius: '10px',
                        border: isSelected ? '1.5px solid #ED7100' : '1px solid #E2E8F0',
                        backgroundColor: isSelected ? '#FFF7ED' : '#FFFFFF',
                        color: isSelected ? '#ED7100' : '#1E293B',
                        cursor: 'pointer',
                        transition: 'all 0.16s ease'
                      }}
                    >
                      {tick} TB
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Select Support / Handover Option */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '10px' }}>
                Select Support / Handover Option
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSupportModel('mentoring')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: supportModel === 'mentoring' ? '1.5px solid #ED7100' : '1px solid #E2E8F0',
                    backgroundColor: supportModel === 'mentoring' ? '#FFF7ED' : '#FFFFFF',
                    color: supportModel === 'mentoring' ? '#ED7100' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.16s ease'
                  }}
                >
                  <User size={20} color={supportModel === 'mentoring' ? '#ED7100' : '#64748B'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                    Faculty Mentoring Handover
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSupportModel('scheduled')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: supportModel === 'scheduled' ? '1.5px solid #ED7100' : '1px solid #E2E8F0',
                    backgroundColor: supportModel === 'scheduled' ? '#FFF7ED' : '#FFFFFF',
                    color: supportModel === 'scheduled' ? '#ED7100' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.16s ease'
                  }}
                >
                  <Wrench size={20} color={supportModel === 'scheduled' ? '#ED7100' : '#64748B'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                    Scheduled Maintenance
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Checkbox: AI Bot */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <input
              type="checkbox"
              checked={includeAI}
              onChange={(e) => setIncludeAI(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#059669', cursor: 'pointer' }}
            />
            <span>Include Campus Admissions AI Bot (powered by Amazon Bedrock)</span>
            <Info size={14} color="#94A3B8" />
          </label>

          {/* Sub-service breakdown for Amazon Bedrock AI Bot */}
          {includeAI ? (
            <div
              style={{
                marginTop: '12px',
                padding: '12px 14px',
                backgroundColor: '#FFF7ED',
                border: '1.5px solid #FFEDD5',
                borderRadius: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9A3412', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#EA580C" />
                  Amazon Bedrock Sub-Service Breakdown
                </span>
                <span style={{ fontSize: '0.80rem', fontWeight: 800, color: '#C2410C' }}>
                  +₹{aiTotalRate.toLocaleString('en-IN')} / mo
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#7C2D12', lineHeight: 1.45, margin: '0 0 10px 0' }}>
                Private RAG student counseling assistant for admission cutoffs, fee structures, and prospectus PDFs (~25,000 queries/mo).
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '0.70rem', color: '#64748B', fontWeight: 700 }}>Compute Line Item</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1E293B' }}>+₹{aiComputeRate.toLocaleString('en-IN')} / mo</div>
                  <div style={{ fontSize: '0.67rem', color: '#78350F' }}>Claude 3.5 / Llama 3 token inference</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #FED7AA', borderRadius: '8px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '0.70rem', color: '#64748B', fontWeight: 700 }}>Storage Line Item</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1E293B' }}>+₹{aiStorageRate.toLocaleString('en-IN')} / mo</div>
                  <div style={{ fontSize: '0.67rem', color: '#78350F' }}>pgvector & S3 document vault</div>
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '6px 10px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                ✓ Replaces ₹18,000/mo third-party helpdesk software → yields ₹13,600/mo net institutional savings.
              </div>
            </div>
          ) : (
            <div style={{
              marginTop: '10px',
              padding: '10px 12px',
              backgroundColor: '#F8FAFC',
              border: '1px dashed #CBD5E1',
              borderRadius: '10px',
              fontSize: '0.75rem',
              color: '#64748B',
              lineHeight: 1.45
            }}>
              <strong style={{ color: '#334155' }}>Sub-service Cost Breakdown:</strong> Check above to add automated 24/7 student admission & prospectus Q&A (+₹3,200 compute + ₹1,200 storage line items).
            </div>
          )}
        </div>

        {/* Right Card: Estimated Results */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            border: '1.5px solid #E2E8F0',
            borderTop: '4px solid #ED7100',
            padding: '28px 26px',
            boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ED7100',
                  flexShrink: 0
                }}
              >
                <BarChart2 size={22} color="#ED7100" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#1E293B', margin: '0 0 2px 0' }}>
                  Estimated Results
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
                  Based on your inputs, here is a projected monthly estimate.
                </p>
              </div>
            </div>

            {/* Green Highlight Box */}
            <div
              style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #DCFCE7',
                borderRadius: '14px',
                padding: '16px 20px',
                marginBottom: '24px'
              }}
            >
              <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 500, marginBottom: '6px' }}>
                Estimated Monthly Savings
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '2.3rem',
                    fontWeight: 900,
                    color: '#059669',
                    lineHeight: 1
                  }}
                >
                  ₹{estimatedSavings.toLocaleString('en-IN')}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    backgroundColor: '#DCFCE7',
                    color: '#059669',
                    fontSize: '0.80rem',
                    fontWeight: 800
                  }}
                >
                  📈 ~{estimatedSavingsPercent}% lower
                </span>
              </div>
            </div>

            {/* Line items list with explicit compute vs. storage impact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Row 1: Compute */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Server size={18} color="#64748B" />
                  <div>
                    <div style={{ fontSize: '0.90rem', color: '#475569', fontWeight: 600 }}>
                      Estimated AWS Compute
                    </div>
                    <div style={{ fontSize: '0.71rem', color: includeAI ? '#C2410C' : '#94A3B8' }}>
                      {includeAI
                        ? `EC2: ₹${awsCompute.toLocaleString('en-IN')} + Bedrock AI Tokens: ₹${aiComputeRate.toLocaleString('en-IN')} / mo`
                        : `EC2 instances: ₹${awsCompute.toLocaleString('en-IN')} / mo`}
                    </div>
                  </div>
                </div>
                <strong style={{ fontSize: '0.94rem', color: '#1E293B', fontWeight: 800 }}>
                  ₹{(awsCompute + (includeAI ? aiComputeRate : 0)).toLocaleString('en-IN')} / mo
                </strong>
              </div>

              {/* Row 2: Storage */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={18} color="#64748B" />
                  <div>
                    <div style={{ fontSize: '0.90rem', color: '#475569', fontWeight: 600 }}>
                      Estimated Storage & Database
                    </div>
                    <div style={{ fontSize: '0.71rem', color: includeAI ? '#C2410C' : '#94A3B8' }}>
                      {includeAI
                        ? `S3 & Aurora: ₹${awsStorage.toLocaleString('en-IN')} + Vector KB Vault: ₹${aiStorageRate.toLocaleString('en-IN')} / mo`
                        : `S3 & Aurora: ₹${awsStorage.toLocaleString('en-IN')} / mo`}
                    </div>
                  </div>
                </div>
                <strong style={{ fontSize: '0.94rem', color: '#1E293B', fontWeight: 800 }}>
                  ₹{(awsStorage + (includeAI ? aiStorageRate : 0)).toLocaleString('en-IN')} / mo
                </strong>
              </div>

              {/* Row 3: Admissions AI Bot Sub-Service */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '11px 14px',
                borderRadius: '10px',
                backgroundColor: includeAI ? '#FFF7ED' : '#F8FAFC',
                border: includeAI ? '1.5px solid #FFEDD5' : '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles size={17} color={includeAI ? '#EA580C' : '#94A3B8'} />
                    <span style={{ fontSize: '0.88rem', color: includeAI ? '#9A3412' : '#64748B', fontWeight: 700 }}>
                      Campus Admissions AI Bot
                    </span>
                  </div>
                  <strong style={{ fontSize: '0.92rem', color: includeAI ? '#C2410C' : '#94A3B8', fontWeight: 800 }}>
                    {includeAI ? `+₹${aiTotalRate.toLocaleString('en-IN')} / mo` : 'Not Included'}
                  </strong>
                </div>
                <div style={{ fontSize: '0.71rem', color: includeAI ? '#7C2D12' : '#94A3B8' }}>
                  {includeAI
                    ? `Breakdown: ₹${aiComputeRate.toLocaleString('en-IN')} compute (LLM inference) + ₹${aiStorageRate.toLocaleString('en-IN')} storage (Vector embeddings & S3)`
                    : 'Optional · toggle on left to include (+₹3,200 compute + ₹1,200 storage)'}
                </div>
              </div>

              {/* Row 4: Total Projected AWS Cost */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1.5px dashed #E2E8F0'
              }}>
                <span style={{ fontSize: '0.90rem', color: '#0F172A', fontWeight: 800 }}>
                  Total Projected AWS Cost
                </span>
                <span style={{ fontSize: '1.08rem', color: '#ED7100', fontWeight: 900 }}>
                  ₹{totalAws.toLocaleString('en-IN')} / mo
                </span>
              </div>

              {/* Row 5: Rollout Window */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={18} color="#64748B" />
                  <span style={{ fontSize: '0.90rem', color: '#475569', fontWeight: 500 }}>
                    Estimated Rollout Window
                  </span>
                </div>
                <strong style={{ fontSize: '0.94rem', color: '#1E293B', fontWeight: 800 }}>
                  {rolloutWindow}
                </strong>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <button
            type="button"
            onClick={handleOpenConsultationModal}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '12px',
              backgroundColor: '#ED7100',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(237, 113, 0, 0.3)',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#EC7211';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(237, 113, 0, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ED7100';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(237, 113, 0, 0.3)';
            }}
          >
            <span>Book a Consultation with These Numbers</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* POPUP MODAL: WIDE 2-COLUMN ORANGE & WHITE LAYOUT (DOES NOT HIT TOP/EDGES) */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            overflowY: 'auto'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderTop: '5px solid #ED7100',
              borderRadius: '20px',
              padding: '28px 32px 24px 32px',
              maxWidth: '860px',
              width: '100%',
              maxHeight: 'min(84vh, 640px)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              color: '#1E293B',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.28)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#64748B',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.16s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ED7100';
                e.currentTarget.style.backgroundColor = '#FFF7ED';
                e.currentTarget.style.borderColor = '#FDBA74';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(237, 113, 0, 0.1)',
                    border: '1.5px solid #ED7100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: '#ED7100'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1E293B', marginBottom: '8px' }}>
                  Consultation Request Received!
                </h3>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.55, maxWidth: '420px', margin: '0 auto 24px auto' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Our AWS Cloud Architect will review your estimate ({serverCount} servers, {storageTB} TB) and reach out to discuss your cloud plan within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '11px 28px',
                    borderRadius: '24px',
                    backgroundColor: '#ED7100',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(237, 113, 0, 0.35)'
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitModal}>
                {/* Modal Title matching Orange & White Theme */}
                <div style={{ marginBottom: '20px', paddingRight: '40px' }}>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#ED7100',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '4px'
                    }}
                  >
                    NETXYPER · CLOUD CONSULTING
                  </div>
                  <h3
                    style={{
                      fontSize: '1.48rem',
                      fontWeight: 900,
                      color: '#1E293B',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Let’s Discuss Your Cloud Plan
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#64748B',
                      margin: 0
                    }}
                  >
                    Share your details. We'll review your estimate and discuss the next steps.
                  </p>
                </div>

                {/* 2-Column Responsive Layout: Left Plan Summary + Right Contact Form */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
                  gap: '24px',
                  alignItems: 'start'
                }}>
                  {/* LEFT COLUMN: Plan Summary Card & Next Steps */}
                  <div>
                    {/* Section 1: Your estimated cloud plan (Orange tint card) */}
                    <div
                      style={{
                        backgroundColor: '#FFF7ED',
                        border: '1.5px solid #FFEDD5',
                        borderRadius: '14px',
                        padding: '16px 18px',
                        marginBottom: '14px'
                      }}
                    >
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#C2410C', margin: '0 0 10px 0' }}>
                        1. Your estimated cloud plan
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          fontSize: '0.88rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Physical servers</span>
                          <strong style={{ color: '#1E293B' }}>{serverCount} servers</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Database size</span>
                          <strong style={{ color: '#1E293B' }}>{storageTB} TB</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Admissions AI Bot</span>
                          <strong style={{ color: includeAI ? '#C2410C' : '#64748B' }}>
                            {includeAI ? 'Included (+₹4,400/mo)' : 'Not included'}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>AWS estimate</span>
                          <strong style={{ color: '#1E293B' }}>₹{totalAws.toLocaleString('en-IN')}/mo</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Estimated savings</span>
                          <strong style={{ color: '#059669', fontSize: '0.94rem' }}>₹{estimatedSavings.toLocaleString('en-IN')}/mo</strong>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#9A3412', marginTop: '10px', lineHeight: 1.4 }}>
                        Calculated from live estimator parameters. Final architecture includes rightsized compute and storage rules.
                      </div>
                    </div>

                    {/* What happens next box */}
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '14px 16px'
                    }}>
                      <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                        What to expect:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.45 }}>
                        <div>✓ Detailed AWS blueprint tailored to your workload</div>
                        <div>✓ Verified savings roadmap & migration timeline</div>
                        <div>✓ 30-min discovery call with AWS Cloud Architect</div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Contact Fields & Submit */}
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1E293B', margin: '0 0 12px 0' }}>
                      2. Your contact details
                    </h4>

                    {/* Row: Full Name & Work Email in 2 Columns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '3px' }}>
                          Full name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 13px',
                            borderRadius: '10px',
                            border: '1.5px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#1E293B',
                            fontSize: '0.88rem',
                            outline: 'none',
                            transition: 'border-color 0.16s ease, box-shadow 0.16s ease'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#ED7100';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(237, 113, 0, 0.15)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '3px' }}>
                          Work email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '9px 13px',
                            borderRadius: '10px',
                            border: '1.5px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#1E293B',
                            fontSize: '0.88rem',
                            outline: 'none',
                            transition: 'border-color 0.16s ease, box-shadow 0.16s ease'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#ED7100';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(237, 113, 0, 0.15)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* College or Company */}
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '3px' }}>
                        College or company
                      </label>
                      <input
                        type="text"
                        placeholder="Organization / Institution name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 13px',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B',
                          fontSize: '0.88rem',
                          outline: 'none',
                          transition: 'border-color 0.16s ease, box-shadow 0.16s ease'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#ED7100';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(237, 113, 0, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#CBD5E1';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Organization Type Radio (Inline horizontal) */}
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Organization type
                      </label>
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        {['College / Education', 'Business', 'Other'].map((type) => (
                          <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.84rem', color: '#334155' }}>
                            <input
                              type="radio"
                              name="orgType"
                              checked={formData.orgType === type}
                              onChange={() => setFormData({ ...formData, orgType: type })}
                              style={{ accentColor: '#ED7100', width: '15px', height: '15px' }}
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Preferred consultation time Radio (Inline horizontal) */}
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Preferred consultation time
                      </label>
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        {["I'm flexible", 'Morning', 'Afternoon'].map((time) => (
                          <label key={time} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.84rem', color: '#334155' }}>
                            <input
                              type="radio"
                              name="preferredTime"
                              checked={formData.preferredTime === time}
                              onChange={() => setFormData({ ...formData, preferredTime: time })}
                              style={{ accentColor: '#ED7100', width: '15px', height: '15px' }}
                            />
                            <span>{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Anything else? */}
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '3px' }}>
                        Anything else? (optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Describe your current setup or questions..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B',
                          fontSize: '0.86rem',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border-color 0.16s ease, box-shadow 0.16s ease'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#ED7100';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(237, 113, 0, 0.15)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#CBD5E1';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Submit Button in Vibrant Orange */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        backgroundColor: '#ED7100',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.94rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(237, 113, 0, 0.35)',
                        transition: 'all 0.16s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EC7211';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(237, 113, 0, 0.45)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ED7100';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(237, 113, 0, 0.35)';
                      }}
                    >
                      Request Consultation →
                    </button>

                    {/* Footer disclaimer */}
                    <div style={{ fontSize: '0.70rem', color: '#64748B', textAlign: 'center', marginTop: '8px', lineHeight: 1.35 }}>
                      Design preview only. Responses dispatched to engineering within 2 hours.
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default CostCalculator;
