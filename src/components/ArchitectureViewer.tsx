import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Flag,
  Monitor,
  Search,
  FileText,
  Users,
  CheckCircle2,
  Server,
  Database,
  Shield,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  Activity,
  Key
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const steps = [
    {
      num: '01',
      stepNum: 1,
      title: '01 — Customer Discovery & Alignment',
      subtitle: 'AWS Well-Architected · Scope, Budget & Security',
      desc: 'Understand your campus infrastructure, constraints, and operational goals. Review current hardware, identify bottlenecks, and document exact requirements.',
      milestone: 'Initial discovery call completed and institutional roadmap documented.',
      stepperLabel: 'Discovery &\nAlignment',
      color: '#E7167B',
      milestoneBg: '#FFF7ED',
      milestoneBorder: '#FFEDD5',
      milestoneIconColor: '#E7167B',
      items: [
        { icon: Monitor, color: '#3B82F6', text: 'Current infrastructure review' },
        { icon: Search, color: '#E7167B', text: 'Identify bottlenecks' },
        { icon: FileText, color: '#3B82F6', text: 'Define requirements' },
        { icon: Users, color: '#10B981', text: 'Align on goals & budget' }
      ]
    },
    {
      num: '02',
      stepNum: 2,
      title: '02 — Discover & Design',
      subtitle: 'AWS Well-Architected · VPC Topology',
      desc: 'Assess existing architecture, identify constraints, define the target topology, estimate AWS unit economics, and formalize milestones.',
      milestone: 'Customer approves proposal, security posture, and architecture blueprint.',
      stepperLabel: 'Discover &\nDesign',
      color: '#2563EB',
      milestoneBg: '#EFF6FF',
      milestoneBorder: '#DBEAFE',
      milestoneIconColor: '#2563EB',
      items: [
        { icon: Layers, color: '#8B5CF6', text: 'Multi-AZ VPC Isolation' },
        { icon: Server, color: '#E7167B', text: 'EC2 Auto Scaling Group' },
        { icon: Database, color: '#3B82F6', text: 'Amazon Aurora Multi-AZ' },
        { icon: Shield, color: '#10B981', text: 'AWS WAF & DDoS Shield' }
      ]
    },
    {
      num: '03',
      stepNum: 3,
      title: '03 — Build & Validate',
      subtitle: 'Terraform IaC · AWS CodePipeline',
      desc: 'Deploy declarative Infrastructure as Code (Terraform), establish automated CI/CD deployment pipelines, and conduct comprehensive staging tests.',
      milestone: 'Agreed acceptance benchmarks pass and customer validates staging environments.',
      stepperLabel: 'Build &\nValidate',
      color: '#7C3AED',
      milestoneBg: '#F5F3FF',
      milestoneBorder: '#EDE9FE',
      milestoneIconColor: '#7C3AED',
      items: [
        { icon: CheckCircle2, color: '#3B82F6', text: 'Deploy infrastructure' },
        { icon: CheckCircle2, color: '#3B82F6', text: 'Run automated tests' },
        { icon: CheckCircle2, color: '#3B82F6', text: 'Validate environment' },
        { icon: Cpu, color: '#7C3AED', text: 'Stress-test peak traffic' }
      ]
    },
    {
      num: '04',
      stepNum: 4,
      title: '04 — Cutover & Optimize',
      subtitle: 'Route 53 DNS · CloudWatch Alarms',
      desc: 'Execute tested cutover with rehearsed rollback runbooks, real-time observability telemetry, and post-cutover cost optimization.',
      milestone: 'Production launch verified with low-latency SLAs and live synthetic monitoring.',
      stepperLabel: 'Cutover &\nOptimize',
      color: '#059669',
      milestoneBg: '#ECFDF5',
      milestoneBorder: '#D1FAE5',
      milestoneIconColor: '#059669',
      items: [
        { icon: Zap, color: '#059669', text: 'Zero-downtime DNS cutover' },
        { icon: Activity, color: '#3B82F6', text: 'Live CloudWatch telemetry' },
        { icon: CheckCircle2, color: '#059669', text: 'Latency < 15ms verified' },
        { icon: ShieldCheck, color: '#10B981', text: 'Automated failover active' }
      ]
    },
    {
      num: '05',
      stepNum: 5,
      title: '05 — Handover & Scale',
      subtitle: 'IAM Security · Runbooks & Auto Scaling',
      desc: 'Transfer all runbooks and access keys, conduct team training, hand over infrastructure ownership, and establish continuous scaling.',
      milestone: 'Formal operational handover completed with dedicated support readiness.',
      stepperLabel: 'Handover &\nScale',
      color: '#D0126D',
      milestoneBg: '#FFF7ED',
      milestoneBorder: '#FFEDD5',
      milestoneIconColor: '#D0126D',
      items: [
        { icon: Key, color: '#D0126D', text: 'Root & IAM keys handover' },
        { icon: FileText, color: '#3B82F6', text: 'Disaster recovery runbooks' },
        { icon: Users, color: '#10B981', text: 'Faculty IT training sessions' },
        { icon: CheckCircle2, color: '#D0126D', text: 'Institutional sign-off' }
      ]
    }
  ];

  const [activeStep, setActiveStep] = useState<number>(0);
  const timerRef = useRef<any>(null);

  // Auto-advance step every 3.5 seconds (3 to 4 seconds) in an infinite loop: 1->2->3->4->5->1
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [steps.length]);

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    startTimer();
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    startTimer();
  };

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    startTimer();
  };

  const currentStep = steps[activeStep];

  return (
    <section
      id="process"
      style={{
        padding: '52px 20px 64px 20px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes stepSlideEntrance {
          0% {
            opacity: 0;
            transform: translateX(18px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes stepConnectingProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .carousel-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          color: #E7167B;
          display: flex;
          align-items: center;
          justifyContent: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
          flex-shrink: 0;
          z-index: 5;
        }
        .carousel-arrow-btn:hover {
          background: #E7167B;
          border-color: #E7167B;
          color: #FFFFFF;
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(231, 22, 123, 0.35);
        }
        .process-slider-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 24px;
          padding: 36px 40px;
          box-shadow: 0 10px 32px -4px rgba(15, 23, 42, 0.06);
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: center;
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          animation: stepSlideEntrance 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (max-width: 860px) {
          .process-slider-card {
            grid-template-columns: 1fr;
            padding: 26px 22px;
            gap: 24px;
          }
        }
        @media (max-width: 580px) {
          .stepper-timeline-btn {
            width: 56px !important;
          }
          .stepper-timeline-circle {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.74rem !important;
          }
          .stepper-timeline-label {
            font-size: 0.68rem !important;
          }
        }
      `}</style>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Our Process</span>
          <div className="badge-line" />
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: '-0.025em',
            margin: '0 0 8px 0'
          }}
        >
          How We Work
        </h2>

        <p
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            fontSize: '0.98rem',
            color: '#64748B',
            lineHeight: 1.55
          }}
        >
          From first discovery call through cutover, optimization, and handover—here is the step-by-step path.
        </p>
      </div>

      {/* CAROUSEL WRAPPER: Left Button + Slide Card + Right Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="carousel-arrow-btn"
          aria-label="Previous step"
        >
          <ChevronLeft size={22} strokeWidth={2.6} />
        </button>

        {/* ACTIVE STEP CARD (Auto-advancing 3.5 seconds) */}
        <div key={activeStep} className="process-slider-card">
          {/* Left Column: Step Details */}
          <div>
            {/* Step badge */}
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#FFF7ED',
                color: '#E7167B',
                fontSize: '0.76rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}
            >
              Step {currentStep.stepNum} of 5
            </span>

            {/* Title */}
            <h3
              style={{
                fontSize: 'clamp(1.28rem, 2.2vw, 1.6rem)',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                margin: '0 0 6px 0'
              }}
            >
              {currentStep.title}
            </h3>

            {/* Subtitle in Theme Color */}
            <div
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                color: currentStep.color,
                marginBottom: '14px'
              }}
            >
              {currentStep.subtitle}
            </div>

            {/* Paragraph description */}
            <p
              style={{
                fontSize: '0.92rem',
                color: '#475569',
                lineHeight: 1.6,
                margin: '0 0 20px 0'
              }}
            >
              {currentStep.desc}
            </p>

            {/* Milestone Card */}
            <div
              style={{
                backgroundColor: currentStep.milestoneBg,
                border: `1.5px solid ${currentStep.milestoneBorder}`,
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentStep.milestoneIconColor,
                  flexShrink: 0
                }}
              >
                <Flag size={16} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: currentStep.milestoneIconColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '2px'
                  }}
                >
                  Milestone
                </div>
                <div
                  style={{
                    fontSize: '0.86rem',
                    color: '#334155',
                    fontWeight: 600,
                    lineHeight: 1.45
                  }}
                >
                  {currentStep.milestone}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Card */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 0'
            }}
          >
            {/* Background Glow */}
            <div
              style={{
                position: 'absolute',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${currentStep.color}15 0%, transparent 70%)`,
                filter: 'blur(32px)',
                zIndex: 0
              }}
            />

            {/* Floating Top Right Cloud Badge */}
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '4px',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: currentStep.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: `0 8px 20px ${currentStep.color}50`,
                zIndex: 3
              }}
            >
              <Cloud size={24} strokeWidth={2.4} />
            </div>

            {/* Illustration Card (Laptop / Architecture Window) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '18px',
                padding: '24px 22px',
                width: '100%',
                maxWidth: '340px',
                boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.08)',
                position: 'relative',
                zIndex: 1
              }}
            >
              {/* Card Window Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '16px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #F1F5F9'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginLeft: '6px', fontWeight: 600 }}>
                  skysynclab · {currentStep.num}
                </span>
              </div>

              {/* Checklist Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentStep.items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #F1F5F9'
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          backgroundColor: `${item.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.color,
                          flexShrink: 0
                        }}
                      >
                        <ItemIcon size={15} strokeWidth={2.4} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          color: '#1E293B'
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          className="carousel-arrow-btn"
          aria-label="Next step"
        >
          <ChevronRight size={22} strokeWidth={2.6} />
        </button>
      </div>

      {/* STEPPER TIMELINE NAVIGATION (Precise flexbox segment connections, NO OVERFLOW) */}
      <div
        style={{
          maxWidth: '720px',
          margin: '38px auto 0 auto',
          padding: '0 12px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%'
          }}
        >
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep >= idx;

            return (
              <React.Fragment key={st.num}>
                {/* Node Button (Circle + Label) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className="stepper-timeline-btn"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      width: '74px'
                    }}
                  >
                    {/* Circle */}
                    <div
                      className="stepper-timeline-circle"
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: isActive
                          ? '#E7167B'
                          : isCompleted
                          ? '#FFF7ED'
                          : '#FFFFFF',
                        border: isActive
                          ? '2px solid #E7167B'
                          : isCompleted
                          ? '2px solid #E7167B'
                          : '2px solid #E2E8F0',
                        color: isActive
                          ? '#FFFFFF'
                          : isCompleted
                          ? '#E7167B'
                          : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        boxShadow: isActive
                          ? '0 4px 14px rgba(231, 22, 123, 0.45)'
                          : '0 2px 6px rgba(15, 23, 42, 0.04)',
                        transition: 'background-color 0.28s ease, border-color 0.28s ease, color 0.28s ease, box-shadow 0.28s ease'
                      }}
                    >
                      {st.num}
                    </div>

                    {/* Step Label */}
                    <span
                      className="stepper-timeline-label"
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: isActive ? 800 : 600,
                        color: isActive ? '#E7167B' : '#64748B',
                        textAlign: 'center',
                        lineHeight: 1.25,
                        whiteSpace: 'pre-line',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {st.stepperLabel}
                    </span>
                  </button>
                </div>

                {/* Connecting Line Segment between nodes (Smooth 3.5s filling progress towards next step) */}
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '3.5px',
                      backgroundColor: '#E2E8F0',
                      marginTop: '17px',
                      borderRadius: '3px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      key={`segment-${idx}-${activeStep === idx ? activeStep : 'static'}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#E7167B',
                        transformOrigin: 'left',
                        ...(activeStep > idx
                          ? {
                              transform: 'scaleX(1)',
                              transition: 'transform 0.25s ease'
                            }
                          : activeStep === idx
                          ? {
                              animation: 'stepConnectingProgress 3.5s linear forwards',
                              boxShadow: '0 0 8px rgba(231, 22, 123, 0.45)'
                            }
                          : {
                              transform: 'scaleX(0)',
                              transition: 'transform 0.25s ease'
                            })
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureViewer;
