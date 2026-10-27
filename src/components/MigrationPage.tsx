import React from 'react';
import { 
  Server, 
  Database, 
  ArrowRight, 
  ShieldCheck, 
  HardDrive, 
  CheckCircle2, 
  Network,
  FileCheck
} from 'lucide-react';

interface MigrationPageProps {
  onDiscussMigration: () => void;
}

export const MigrationPage: React.FC<MigrationPageProps> = ({ onDiscussMigration }) => {
  const migrationProcess = [
    {
      step: '01',
      title: 'Environment Audit',
      desc: 'Inventory on-premises physical servers, disk IOPS, database engines, and network topology.'
    },
    {
      step: '02',
      title: 'Target Cloud Topology',
      desc: 'Architect VPC subnets, RDS/Aurora replication targets, and EC2 Auto-Scaling sizing.'
    },
    {
      step: '03',
      title: 'Data Synchronization',
      desc: 'Continuous schema and data replication via AWS DMS with checksum parity validation.'
    },
    {
      step: '04',
      title: 'Rehearsed Cutover',
      desc: 'Execute planned DNS and service cutover with step-by-step rollback runbooks.'
    },
    {
      step: '05',
      title: 'Handover & Runbooks',
      desc: 'Deliver operational documentation, CloudWatch alarm matrices, and staff mentoring.'
    }
  ];

  const migrationPillars = [
    {
      icon: Server,
      title: 'Physical & Virtual Server Migration',
      desc: 'Lift, shift, or re-platform bare-metal campus servers and VMware/Hyper-V guests to Amazon EC2.',
      specs: [
        'Automated server image replication using AWS Application Migration Service (MGN)',
        'Right-sizing analysis to eliminate over-provisioned idle compute',
        'Multi-AZ deployments to eliminate single points of failure',
        'Testing cutovers in an isolated staging VPC before production'
      ]
    },
    {
      icon: Database,
      title: 'Database Engine Migration & Replication',
      desc: 'Zero-data-loss database replication from local MySQL/PostgreSQL/SQL Server to Amazon Aurora.',
      specs: [
        'Continuous data capture using AWS Database Migration Service (DMS)',
        'Schema conversion and stored procedure compatibility review',
        'Minimal cutover window with strict row-count and checksum verification',
        'Automated continuous daily snapshots with point-in-time recovery'
      ]
    },
    {
      icon: HardDrive,
      title: 'Storage & Document Archive Migration',
      desc: 'Move local NAS, student portfolios, and legacy file shares to Amazon S3 and S3 Glacier.',
      specs: [
        'Encrypted bulk transfer using AWS DataSync and TLS encryption',
        'S3 Lifecycle rules to automatically transition older records to archive tiers',
        'Object Lock and Versioning for anti-ransomware protection',
        'IAM least-privilege policies for institutional compliance'
      ]
    },
    {
      icon: Network,
      title: 'Campus Network & VPN Integration',
      desc: 'Securely link on-campus laboratories, faculty offices, and administrative networks to your AWS VPC.',
      specs: [
        'AWS Site-to-Site IPsec VPN tunnels with automated failover',
        'Route 53 Private Hosted Zones for campus internal domain resolution',
        'Security Group and Network ACL isolation across departments',
        'AWS WAF and Shield protection against DDoS attacks on exam days'
      ]
    }
  ];

  const practicalSafeguards = [
    {
      title: 'Rollback Runbook Prepared for Every Step',
      desc: 'Every cutover operation has a documented, pre-tested rollback procedure before touching production systems.'
    },
    {
      title: 'Checksum-Verified Data Replication',
      desc: 'Databases and file shares are validated using automated row and hash checksums prior to DNS redirection.'
    },
    {
      title: 'Isolated Staging Dry-Runs',
      desc: 'Cutover exercises are rehearsed in private staging environments to measure exact cutover timing and eliminate surprises.'
    },
    {
      title: 'Customer Approval Before Production Cutover',
      desc: 'Production DNS cutover is never executed without formal verification and explicit stakeholder sign-off on staging results.'
    }
  ];

  return (
    <section id="migration-page" style={{ padding: '40px 24px 80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(237, 113, 0, 0.08)',
          border: '1px solid rgba(237, 113, 0, 0.22)',
          color: '#ED7100',
          fontSize: '0.78rem',
          fontWeight: 800,
          letterSpacing: '0.04em',
          marginBottom: '10px'
        }}>
          <ShieldCheck size={14} />
          <span>Zero-Downtime Migration Safeguards</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 900, color: '#232F3E', marginBottom: '14px', letterSpacing: '-0.03em' }}>
          Cloud Services & Migration
        </h1>
        <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.1rem', color: '#526071', lineHeight: 1.6 }}>
          Structured migration of on-premises servers, institutional databases, and web applications to AWS with tested safeguards and zero data loss.
        </p>
      </div>

      {/* 5-Step Process Bar */}
      <div style={{
        backgroundColor: '#F7F8FA',
        border: '1.5px solid #E2E8F0',
        borderRadius: '18px',
        padding: '36px 30px',
        marginBottom: '54px',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#ED7100', fontWeight: 800, letterSpacing: '0.04em' }}>
            Structured Methodology
          </span>
          <h2 style={{ fontSize: '1.6rem', color: '#232F3E', fontWeight: 800, marginTop: '4px' }}>
            Assess → Plan → Migrate → Test → Handover
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {migrationProcess.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div>
                <span style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  color: '#ED7100',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  {step.step}
                </span>
                <h3 style={{ fontSize: '1.05rem', color: '#232F3E', fontWeight: 800, marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#526071', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Migration Pillars Grid */}
      <div style={{ marginBottom: '54px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#232F3E', fontWeight: 800, marginBottom: '8px' }}>
            Comprehensive Migration Capabilities
          </h2>
          <p style={{ color: '#526071', fontSize: '0.98rem' }}>
            End-to-end workload migration across compute, databases, files, and networks.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '22px'
        }}>
          {migrationPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#ED7100';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                <div>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(237, 113, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ED7100',
                    marginBottom: '16px',
                    border: '1px solid rgba(237, 113, 0, 0.22)'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.20rem', fontWeight: 800, color: '#232F3E', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#526071', lineHeight: 1.55, marginBottom: '16px' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <CheckCircle2 size={15} color="#01A88D" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.86rem', color: '#526071', lineHeight: 1.45 }}>
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practical Safeguards Section */}
      <div style={{
        backgroundColor: '#F7F8FA',
        border: '1.5px solid #E2E8F0',
        borderRadius: '18px',
        padding: '36px 30px',
        marginBottom: '54px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#ED7100', fontWeight: 800, letterSpacing: '0.04em' }}>
            Engineering Discipline
          </span>
          <h2 style={{ fontSize: '1.6rem', color: '#232F3E', fontWeight: 800, marginTop: '4px' }}>
            Practical Migration Safeguards
          </h2>
          <p style={{ color: '#526071', fontSize: '0.94rem', maxWidth: '600px', margin: '8px auto 0 auto' }}>
            Every migration adheres to non-negotiable risk mitigations to protect institutional operations.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {practicalSafeguards.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '22px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <FileCheck size={18} color="#ED7100" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#232F3E' }}>
                  {item.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#526071', lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div style={{
        backgroundColor: '#F7F8FA',
        border: '1.5px solid #E2E8F0',
        borderRadius: '18px',
        padding: '38px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#232F3E' }}>
          Planning a Server or Database Migration?
        </h3>
        <p style={{ maxWidth: '560px', color: '#526071', fontSize: '0.98rem', lineHeight: 1.6 }}>
          Let us audit your current environment, calculate bandwidth requirements, and formulate a safe, zero-data-loss cutover plan.
        </p>
        <button
          onClick={onDiscussMigration}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '13px 28px',
            backgroundColor: '#ED7100',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '0.96rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 14px rgba(237, 113, 0, 0.3)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EC7211')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ED7100')}
        >
          <span>Discuss Your Migration</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
};

export default MigrationPage;
