import React, { useState, useEffect, useRef } from 'react';
import { Server, ArrowRight, X, Check, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface WhySwitchToCloudProps {
  onOpenConsultation?: () => void;
}

interface ComparisonTopic {
  id: string;
  tabLabel: string;
  onPrem: {
    title: string;
    subtitle: string;
    points: string[];
  };
  aws: {
    title: string;
    subtitle: string;
    points: string[];
  };
}

const AwsLogoIcon: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <span
      style={{
        fontSize: '1.05rem',
        fontWeight: 900,
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#232F3E',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        marginTop: '1px'
      }}
    >
      aws
    </span>
    <svg width="26" height="8" viewBox="0 0 28 8" fill="none" style={{ marginTop: '2px' }}>
      <path
        d="M2 3.5C7 7.5 19 7.5 24 2.5"
        stroke="#FF9900"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M21 1.5L25 2.5L22.5 5.5"
        fill="#FF9900"
      />
    </svg>
  </div>
);

export const WhySwitchToCloud: React.FC<WhySwitchToCloudProps> = ({ onOpenConsultation }) => {
  const topics: ComparisonTopic[] = [
    {
      id: 'exam-results',
      tabLabel: 'Exam Results & Admission',
      onPrem: {
        title: 'On-Premises Infrastructure',
        subtitle: 'Harder to manage during peak load.',
        points: [
          'Limited server capacity during result day',
          'Higher chance of slow response or downtime',
          'Manual setup and maintenance'
        ]
      },
      aws: {
        title: 'AWS Cloud Solution',
        subtitle: 'Scale automatically for high demand.',
        points: [
          'Auto scaling handles sudden traffic',
          'Better uptime and faster response',
          'Pay only for what you use'
        ]
      }
    },
    {
      id: 'hardware-failure',
      tabLabel: 'Hardware Failure & Recovery',
      onPrem: {
        title: 'On-Premises Infrastructure',
        subtitle: 'Hardware failure and manual recovery.',
        points: [
          'Single drive crash risks catastrophic data loss',
          'Days required to source physical replacement hardware',
          'Manual backups stored on local campus drives or tapes'
        ]
      },
      aws: {
        title: 'AWS Cloud Solution',
        subtitle: 'Automated multi-AZ replication and rapid failover.',
        points: [
          'Continuous automated snapshots to S3 (99.999999999% durability)',
          'Instant automatic failover across multiple Availability Zones',
          'Point-in-time database restore within minutes'
        ]
      }
    },
    {
      id: 'idle-power',
      tabLabel: 'Idle Power & Infrastructure Costs',
      onPrem: {
        title: 'On-Premises Infrastructure',
        subtitle: 'Continuous overhead regardless of usage.',
        points: [
          'Heavy upfront capital expenditure on physical rack servers',
          '24/7 air conditioning, UPS, and diesel electricity bills',
          'Paying 100% capacity costs during night and semester breaks'
        ]
      },
      aws: {
        title: 'AWS Cloud Solution',
        subtitle: 'Pay-as-you-go elastic OpEx pricing.',
        points: [
          'Zero upfront hardware purchase or server room lease costs',
          'Turn off idle resources automatically when not in use',
          'Predictable monthly expenses cut by up to 45%'
        ]
      }
    },
    {
      id: 'security-compliance',
      tabLabel: 'Security & Compliance',
      onPrem: {
        title: 'On-Premises Infrastructure',
        subtitle: 'Physical access risks and manual patches.',
        points: [
          'Physical server closet vulnerable to unauthorized access',
          'Manual OS security updates and delayed vulnerability patches',
          'Limited visibility into admin access and network logs'
        ]
      },
      aws: {
        title: 'AWS Cloud Solution',
        subtitle: 'Enterprise IAM, encryption, and audit trails.',
        points: [
          'Encrypted at rest (AWS KMS) and in transit (TLS 1.3)',
          'Granular least-privilege IAM roles and private VPC subnets',
          'Built-in AWS WAF DDoS protection and continuous audit logging'
        ]
      }
    }
  ];

  const AUTO_ROTATE_INTERVAL = 10000; // 10 seconds per user requirement

  const [activeTabId, setActiveTabId] = useState<string>('exam-results');
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progressKey, setProgressKey] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const activeIndex = topics.findIndex((t) => t.id === activeTabId);
  const currentTopic = topics[activeIndex] || topics[0];

  const handleNext = () => {
    setDirection('next');
    const nextIndex = (activeIndex + 1) % topics.length;
    setActiveTabId(topics[nextIndex].id);
    setProgressKey((k) => k + 1);
  };

  const handlePrev = () => {
    setDirection('prev');
    const prevIndex = (activeIndex - 1 + topics.length) % topics.length;
    setActiveTabId(topics[prevIndex].id);
    setProgressKey((k) => k + 1);
  };

  const handleSelectTab = (id: string) => {
    const targetIndex = topics.findIndex((t) => t.id === id);
    if (targetIndex !== activeIndex) {
      setDirection(targetIndex > activeIndex ? 'next' : 'prev');
      setActiveTabId(id);
      setProgressKey((k) => k + 1);
    }
  };

  // 10-Second Auto-Movement Engine
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeTabId, isPaused, progressKey]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 40) {
      handleNext();
    } else if (diffX < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="why-cloud"
      style={{
        padding: '50px 24px 60px 24px',
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <style>{`
        .comparison-window-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 20px;
          padding: 6px 2px;
        }

        .cloud-comparison-grid {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) auto minmax(280px, 1fr);
          align-items: center;
          gap: 24px;
          max-width: 1060px;
          margin: 0 auto;
        }

        .cloud-comparison-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
        }

        .cloud-comparison-tab-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          border-bottom: 1.5px solid #E2E8F0;
          position: relative;
          overflow: visible;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .cloud-comparison-tab-bar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Smooth Sliding Window Transitions */
        @keyframes slidingWindowNext {
          0% {
            opacity: 0;
            transform: translateX(45px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slidingWindowPrev {
          0% {
            opacity: 0;
            transform: translateX(-45px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes tabProgress10s {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .comparison-slide-track-next {
          animation: slidingWindowNext 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .comparison-slide-track-prev {
          animation: slidingWindowPrev 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .tab-countdown-line {
          position: absolute;
          bottom: 0px;
          left: 0;
          height: 2.5px;
          background: #C5A46D;
          border-radius: 9999px;
          animation: tabProgress10s 10s linear;
        }

        .is-timer-paused .tab-countdown-line {
          animation-play-state: paused;
        }

        .comparison-nav-pill-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.16s ease;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
        }

        .comparison-nav-pill-btn:hover {
          border-color: #C5A46D;
          color: #C5A46D;
          transform: scale(1.06);
          box-shadow: 0 2px 8px rgba(197, 164, 109, 0.2);
        }

        @media (max-width: 820px) {
          .cloud-comparison-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .cloud-comparison-arrow {
            transform: rotate(90deg);
            padding: 4px 0;
          }
          .cloud-comparison-tab-bar {
            justify-content: flex-start;
            padding-bottom: 4px;
            gap: 18px;
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Cloud Comparison</span>
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
          Why Move to the Cloud?
        </h2>

        <p
          style={{
            fontSize: '1.02rem',
            color: '#64748B',
            maxWidth: '580px',
            lineHeight: 1.55,
            margin: '0 auto'
          }}
        >
          Compare traditional infrastructure with a scalable cloud approach.
        </p>
      </div>

      {/* Tab Navigation with 10s Countdown Progress Bar & Slide Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <div className="cloud-comparison-tab-bar" style={{ margin: 0 }}>
          {topics.map((t) => {
            const isActive = activeTabId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTab(t.id)}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  padding: '12px 8px 14px 8px',
                  fontSize: '0.94rem',
                  fontWeight: isActive ? 750 : 600,
                  color: isActive ? '#C5A46D' : '#64748B',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#1E293B';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#64748B';
                }}
              >
                <span>{t.tabLabel}</span>
                {isActive && (
                  <div
                    key={`bar-${activeTabId}-${progressKey}`}
                    className="tab-countdown-line"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Manual Sliding & Play/Pause Controls Capsule */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#F8FAFC',
            border: '1.5px solid #E2E8F0',
            borderRadius: '9999px',
            padding: '3px 4px 3px 12px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.80rem',
              fontWeight: 800,
              letterSpacing: '0.04em'
            }}
          >
            <span style={{ color: '#C5A46D', fontWeight: 900 }}>0{activeIndex + 1}</span>
            <span style={{ color: '#94A3B8', fontWeight: 400 }}>/</span>
            <span style={{ color: '#64748B' }}>0{topics.length}</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <button
              onClick={handlePrev}
              className="comparison-nav-pill-btn"
              aria-label="Previous Comparison Topic"
              title="Previous Topic"
            >
              <ChevronLeft size={15} strokeWidth={2.4} />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="comparison-nav-pill-btn"
              aria-label={isPaused ? 'Resume auto-movement (10s)' : 'Pause auto-movement'}
              title={isPaused ? 'Resume 10s auto-movement' : 'Pause 10s auto-movement'}
            >
              {isPaused ? <Play size={12} fill="#C5A46D" color="#C5A46D" /> : <Pause size={12} fill="#64748B" color="#64748B" />}
            </button>
            <button
              onClick={handleNext}
              className="comparison-nav-pill-btn"
              aria-label="Next Comparison Topic"
              title="Next Topic"
            >
              <ChevronRight size={15} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Window Animated Comparison Cards Container */}
      <div
        className={`comparison-window-container ${isPaused ? 'is-timer-paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={`slide-window-${activeTabId}-${progressKey}`}
          className={`cloud-comparison-grid comparison-slide-track-${direction}`}
        >
        {/* Left Card: On-Premises Infrastructure */}
        <div
          style={{
            backgroundColor: '#FFF7F7',
            borderRadius: '18px',
            border: '1.5px solid #FEE2E2',
            padding: '28px 28px 32px 28px',
            boxShadow: '0 4px 18px rgba(239, 68, 68, 0.03)',
            transition: 'all 0.2s ease'
          }}
        >
          {/* Card Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Server size={22} color="#1E293B" strokeWidth={2} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.16rem', fontWeight: 800, color: '#1E293B', margin: '0 0 3px 0' }}>
                {currentTopic.onPrem.title}
              </h3>
              <p style={{ fontSize: '0.90rem', color: '#64748B', margin: 0 }}>
                {currentTopic.onPrem.subtitle}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#FEE2E2', margin: '22px 0 20px 0' }} />

          {/* Points List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentTopic.onPrem.points.map((point, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <X size={13} color="#EF4444" strokeWidth={2.8} />
                </div>
                <span style={{ fontSize: '0.94rem', fontWeight: 500, color: '#1E293B', lineHeight: 1.45 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Arrow */}
        <div className="cloud-comparison-arrow">
          <ArrowRight size={24} strokeWidth={2.2} />
        </div>

        {/* Right Card: AWS Cloud Solution */}
        <div
          style={{
            backgroundColor: '#F0FDF4',
            borderRadius: '18px',
            border: '1.5px solid #DCFCE7',
            padding: '28px 28px 32px 28px',
            boxShadow: '0 4px 18px rgba(16, 185, 129, 0.03)',
            transition: 'all 0.2s ease'
          }}
        >
          {/* Card Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <AwsLogoIcon />
            </div>
            <div>
              <h3 style={{ fontSize: '1.16rem', fontWeight: 800, color: '#1E293B', margin: '0 0 3px 0' }}>
                {currentTopic.aws.title}
              </h3>
              <p style={{ fontSize: '0.90rem', color: '#64748B', margin: 0 }}>
                {currentTopic.aws.subtitle}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#DCFCE7', margin: '22px 0 20px 0' }} />

          {/* Points List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentTopic.aws.points.map((point, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Check size={13} color="#16A34A" strokeWidth={2.8} />
                </div>
                <span style={{ fontSize: '0.94rem', fontWeight: 500, color: '#1E293B', lineHeight: 1.45 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Auto-movement helper subtitle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', fontSize: '0.80rem', color: '#94A3B8' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isPaused ? '#94A3B8' : '#C5A46D', transition: 'background-color 0.2s ease' }} />
        <span>{isPaused ? 'Auto-movement paused' : 'Automatically moving every 10 seconds • Hover or swipe to pause'}</span>
      </div>

      {/* Optional Consultation CTA */}
      {onOpenConsultation && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={onOpenConsultation}
            className="btn-pill-orange"
            style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          >
            <span>Book an AWS Architecture Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
};

export default WhySwitchToCloud;
