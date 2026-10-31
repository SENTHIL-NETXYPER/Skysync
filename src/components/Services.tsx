import React, { useState } from 'react';
import {
  Cloud,
  Database,
  FileText,
  Settings,
  ArrowRight,
  X,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface ServicesProps {
  onOpenConsultationWithService: (serviceName: string) => void;
}

interface ServiceCardData {
  id: string;
  title: string;
  badge: string;
  color: string;
  image: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  bullets: string[];
  technicalScope: {
    headline: string;
    description: string;
    specifications: string[];
  };
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    badge: 'AWS ARCHITECTURE',
    color: '#E7167B',
    image: './assets/card_cloud_sleek.jpg',
    icon: Cloud,
    bullets: [
      'Cloud servers setup (AWS)',
      'Migration and deployment',
      'Secure and scalable infrastructure'
    ],
    technicalScope: {
      headline: 'Multi-AZ Cloud Infrastructure Topology',
      description:
        'Production-ready VPC architecture across multiple availability zones with automated EC2 auto-scaling, ALB load balancing, and private subnet isolation for institutional workloads.',
      specifications: [
        'Multi-AZ VPC with isolated public & private subnet architecture',
        'Application Load Balancer with automated TLS certificate renewal',
        'Auto Scaling Groups with CloudWatch alarms for exam peak windows',
        'AWS Well-Architected Security and Reliability baseline'
      ]
    }
  },
  {
    id: 'migration',
    title: 'Cloud Migration & Databases',
    badge: 'DMS & AURORA',
    color: '#2563EB',
    image: './assets/card_devops.png',
    icon: Database,
    bullets: [
      'Database migration to AWS',
      'AWS migration with tested cutover',
      'Runbooks and support'
    ],
    technicalScope: {
      headline: 'Zero-Downtime Database Migration Framework',
      description:
        'Continuous Change Data Capture (CDC) replication from on-premises relational databases to Amazon Aurora with rehearsed cutovers and automated rollback protection.',
      specifications: [
        'Live CDC database replication via AWS Database Migration Service',
        'Amazon Aurora Multi-AZ with 6-way automated continuous storage',
        'Pre-cutover data checksum validation and automated smoke test suite',
        'Rehearsed weekend cutover runbooks with zero downtime impact'
      ]
    }
  },
  {
    id: 'ai',
    title: 'Generative AI Solutions',
    badge: 'BEDROCK & RAG',
    color: '#7C3AED',
    image: './assets/card_ai.png',
    icon: FileText,
    bullets: [
      'Campus document AI',
      'AI assistants using Amazon Bedrock',
      'Private and secure deployment'
    ],
    technicalScope: {
      headline: 'Private Institutional Knowledge Assistant',
      description:
        'Grounded enterprise RAG system that ingests campus circulars, admissions policies, and syllabi without exposing proprietary institutional data to public models.',
      specifications: [
        'Amazon Bedrock foundation models (Claude 3.5 Sonnet & Llama 3)',
        'pgvector semantic search indexing in Amazon Aurora PostgreSQL',
        'Role-based access filtering for students vs faculty circulars',
        'KMS encryption at rest and in transit for 100% data privacy'
      ]
    }
  },
  {
    id: 'devops',
    title: 'DevOps & Automation',
    badge: 'CI/CD & IAC',
    color: '#059669',
    image: './assets/card_explore.png',
    icon: Settings,
    bullets: [
      'Automation for deployments',
      'Infrastructure monitoring',
      'Support and operations'
    ],
    technicalScope: {
      headline: 'Automated CI/CD & Infrastructure as Code Pipeline',
      description:
        'End-to-end Terraform and GitHub Actions pipeline ensuring zero-downtime rolling updates, automated vulnerability scans, and instant rollback capability.',
      specifications: [
        'Modular Terraform IaC state locking with Amazon DynamoDB',
        'GitHub Actions CI/CD with automated testing and approval stages',
        'Amazon ECR container registry with automated vulnerability scanning',
        'Prometheus, Grafana, and CloudWatch operational observability dashboards'
      ]
    }
  }
];

export const Services: React.FC<ServicesProps> = ({ onOpenConsultationWithService }) => {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);

  const handleOpenScope = (service: ServiceCardData, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedService(service);
  };

  const handleCloseScope = () => {
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      aria-label="Core Cloud and AI Capabilities"
      style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '44px 20px 52px 20px'
      }}
    >
      <style>{`
        .service-2x2-card {
          background-color: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid #E2E8F0;
          box-shadow: 0 4px 18px -2px rgba(15, 23, 42, 0.05);
          overflow: hidden;
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms ease, border-color 260ms ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .service-2x2-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.12);
        }

        .service-thumb-container {
          position: relative;
          height: 142px;
          overflow: hidden;
          background-color: #0A0E1A;
        }

        .service-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-2x2-card:hover .service-thumb-img {
          transform: scale(1.04);
        }

        .service-thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 14, 26, 0.1) 0%, rgba(10, 14, 26, 0.45) 100%);
        }

        .service-thumb-badge {
          position: absolute;
          top: 14px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 9999px;
          background: rgba(10, 14, 26, 0.72);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .service-thumb-arrow-btn {
          position: absolute;
          bottom: 14px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #FFFFFF;
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
          transition: transform 200ms ease, background-color 200ms ease;
        }

        .service-2x2-card:hover .service-thumb-arrow-btn {
          transform: scale(1.08);
          background-color: #E7167B;
          color: #FFFFFF;
        }

        .service-card-body {
          padding: 24px 26px 22px 26px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .service-scope-link {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.88rem;
          font-weight: 750;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: gap 180ms ease, opacity 180ms ease;
        }

        .service-scope-link:hover {
          gap: 8px;
          text-decoration: underline;
        }

        @media (max-width: 820px) {
          .services-2x2-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 42px auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#E7167B'
            }}
          />
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#E7167B'
            }}
          >
            Our Core Capabilities
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
            fontWeight: 900,
            color: '#0A0E1A',
            letterSpacing: '-0.03em',
            margin: '0 0 12px 0',
            lineHeight: 1.15
          }}
        >
          Practical Cloud Solutions for Institutions
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#475569',
            lineHeight: 1.6,
            fontWeight: 500,
            margin: 0
          }}
        >
          We help colleges and educational institutions with secure, reliable, and cost-effective cloud solutions.
        </p>
      </div>

      {/* 2x2 Services Grid */}
      <div
        className="services-2x2-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          paddingBottom: '32px'
        }}
      >
        {SERVICES_DATA.map((service) => {
          const IconComponent = service.icon;

          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="service-2x2-card"
              onClick={(e) => handleOpenScope(service, e)}
              style={{
                borderColor: '#E2E8F0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = service.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {/* Photographic Header with Badge and Arrow */}
              <div className="service-thumb-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-thumb-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './assets/card_cloud_sleek.jpg';
                  }}
                />
                <div className="service-thumb-overlay" />

                {/* Service Tag Badge */}
                <div className="service-thumb-badge">
                  <IconComponent size={13} color="#FFFFFF" strokeWidth={2.4} />
                  <span>{service.badge}</span>
                </div>

                {/* Action Arrow Icon Button */}
                <div className="service-thumb-arrow-btn" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </div>

              {/* Card Text Content */}
              <div className="service-card-body">
                <div>
                  <h3
                    style={{
                      fontSize: '1.28rem',
                      fontWeight: 800,
                      color: '#0A0E1A',
                      margin: '0 0 14px 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* 3 Scope Bullets */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 20px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '9px'
                    }}
                  >
                    {service.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.92rem',
                          color: '#334155',
                          fontWeight: 500,
                          lineHeight: 1.45
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: service.color,
                            flexShrink: 0
                          }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link & AWS Validated Stamp */}
                <div
                  style={{
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <button
                    className="service-scope-link"
                    style={{ color: service.color }}
                    onClick={(e) => handleOpenScope(service, e)}
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </button>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#64748B' }}>
                    <ShieldCheck size={14} color="#059669" strokeWidth={2.2} />
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      AWS VALIDATED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Scope Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 14, 26, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={handleCloseScope}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '580px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px 34px',
              boxShadow: '0 24px 60px -12px rgba(15, 23, 42, 0.3)',
              border: '1.5px solid #E2E8F0',
              animation: 'modalFadeIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    backgroundColor: `${selectedService.color}15`,
                    color: selectedService.color,
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  {selectedService.badge}
                </span>
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    color: '#0A0E1A',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}
                >
                  {selectedService.title}
                </h3>
              </div>

              <button
                onClick={handleCloseScope}
                aria-label="Close Technical Scope Modal"
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                  transition: 'background-color 160ms ease'
                }}
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>

            {/* Headline and Description */}
            <h4
              style={{
                fontSize: '1.02rem',
                fontWeight: 750,
                color: selectedService.color,
                margin: '0 0 8px 0'
              }}
            >
              {selectedService.technicalScope.headline}
            </h4>

            <p
              style={{
                fontSize: '0.94rem',
                color: '#475569',
                lineHeight: 1.55,
                margin: '0 0 20px 0'
              }}
            >
              {selectedService.technicalScope.description}
            </p>

            {/* Specifications with Checkmarks */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px 18px',
                border: '1px solid #E2E8F0',
                marginBottom: '26px'
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#64748B',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                PRODUCTION SPECIFICATIONS
              </span>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedService.technicalScope.specifications.map((spec, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '0.88rem',
                      color: '#1E293B',
                      fontWeight: 500,
                      lineHeight: 1.45
                    }}
                  >
                    <CheckCircle2 size={16} color={selectedService.color} strokeWidth={2.4} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={handleCloseScope}
                style={{
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>

              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  handleCloseScope();
                  onOpenConsultationWithService(serviceName);
                }}
                style={{
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: '#E7167B',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  fontWeight: 750,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(231, 22, 123, 0.35)'
                }}
              >
                <span>Request This Service</span>
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
