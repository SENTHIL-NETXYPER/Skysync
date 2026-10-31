import React from 'react';
import { GraduationCap, Database, Rocket, Building2 } from 'lucide-react';

interface SolutionsProps {
  onOpenConsultationWithTopic: (topic: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onOpenConsultationWithTopic }) => {
  const industries = [
    {
      id: 'engineering-colleges',
      title: 'Engineering & Technical Campuses',
      icon: GraduationCap,
      description: 'Scalable cloud infrastructure for labs, exams and academic workloads.'
    },
    {
      id: 'polytechnic-institutions',
      title: 'Polytechnics & Multi-Campus Racks',
      icon: Database,
      description: 'Centralized data and automated backups across multiple campuses.'
    },
    {
      id: 'startups',
      title: 'Early Startups & Tech Teams',
      icon: Rocket,
      description: 'CI/CD, containers and cost-optimized infrastructure.'
    },
    {
      id: 'smb',
      title: 'Small & Mid-Sized Businesses',
      icon: Building2,
      description: 'Secure and reliable cloud migration with minimal operational overhead.'
    }
  ];

  return (
    <section
      id="solutions"
      style={{
        padding: '44px 20px 48px 20px',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      <style>{`
        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px 16px;
          max-width: 1020px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .solutions-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        .solution-card {
          background-color: #FFFFFF;
          border-radius: 14px;
          border: 1.5px solid #F1F5F9;
          padding: 15px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 3px 16px -2px rgba(15, 23, 42, 0.04);
          cursor: pointer;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.24s ease, border-color 0.24s ease;
          animation: cardFloatEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, box-shadow;
        }
        .solution-card:hover {
          transform: translateX(4px);
          border-color: #CBD5E1;
          box-shadow: 0 10px 24px -4px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(231, 22, 123, 0.2);
        }
        .solution-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          background-color: #FFF7ED;
          border: 1px solid rgba(231, 22, 123, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E7167B;
          flex-shrink: 0;
          transition: transform 0.22s ease;
        }
        .solution-card:hover .solution-icon-box {
          transform: translateX(3px);
        }
        .solution-content {
          flex: 1;
          min-width: 0;
        }
        .solution-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 2px 0;
          letter-spacing: -0.015em;
          line-height: 1.3;
        }
        .solution-desc {
          font-size: 0.84rem;
          color: #475569;
          margin: 0;
          line-height: 1.45;
          font-weight: 500;
        }
        .solution-action-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.86rem;
          font-weight: 700;
          color: #E7167B;
          white-space: nowrap;
          flex-shrink: 0;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .solution-card:hover .solution-action-link {
          transform: translateX(4px);
        }
        @media (max-width: 640px) {
          .solution-card {
            flex-wrap: wrap;
            padding: 14px 16px;
            gap: 12px;
          }
          .solution-action-link {
            width: 100%;
            justify-content: flex-end;
            margin-top: 2px;
          }
        }
      `}</style>

      {/* Header with moving line badge */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="section-badge-lined">
          <span className="badge-text">Campus & Sector Solutions</span>
          <div className="badge-line" />
        </div>
        <h2
          style={{
            marginBottom: '8px',
            color: '#0F172A',
            fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em'
          }}
        >
          Campus & Sector Solutions
        </h2>
        <p
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            fontSize: '1.02rem',
            color: '#475569',
            lineHeight: 1.6
          }}
        >
          Cloud and DevOps architectures tailored for different campus and industry needs.
        </p>
      </div>

      {/* 2x2 Clean Horizontal Cards Grid */}
      <div className="solutions-grid">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className="solution-card"
              style={{ animationDelay: `${idx * 0.08}s` }}
              onClick={() => onOpenConsultationWithTopic(ind.title)}
            >
              {/* Left: Icon inside rounded peach container */}
              <div className="solution-icon-box">
                <Icon size={20} strokeWidth={2.2} />
              </div>

              {/* Center: Title & Description */}
              <div className="solution-content">
                <h3 className="solution-title">{ind.title}</h3>
                <p className="solution-desc">{ind.description}</p>
              </div>


            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Solutions;
