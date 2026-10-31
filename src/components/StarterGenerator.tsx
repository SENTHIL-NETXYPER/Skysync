import React, { useState } from 'react';
import { Download, Copy, Check, Rocket, AlertTriangle } from 'lucide-react';

interface StarterGeneratorProps {
  onOpenConsultation?: (topic: string, details: string) => void;
}

export const StarterGenerator: React.FC<StarterGeneratorProps> = ({ onOpenConsultation }) => {
  const [appType, setAppType] = useState('fullstack');
  const [frontend, setFrontend] = useState('react');
  const [backend, setBackend] = useState('node');
  const [db, setDb] = useState('aurora-pg');
  const [cloud] = useState('aws');
  const [deployment, setDeployment] = useState('ecs');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'spec' | 'docker' | 'env'>('spec');

  const appTypes = [
    { id: 'fullstack', label: 'Full-Stack Web App', desc: 'Interactive client + authenticated API portal' },
    { id: 'campus-portal', label: 'Campus & Student LMS', desc: 'High-concurrency portal for student admissions & grades' },
    { id: 'api-service', label: 'Microservices API', desc: 'High-throughput backend data API' },
    { id: 'ai-rag', label: 'GenAI & RAG Assistant', desc: 'Document Q&A assistant with vector database' }
  ];

  const frontends = [
    { id: 'react', label: 'React + Vite', badge: 'Fast SPA' },
    { id: 'next', label: 'Next.js', badge: 'SSR / Fullstack' },
    { id: 'vue', label: 'Vue 3', badge: 'Lightweight' },
    { id: 'mobile', label: 'Flutter Mobile', badge: 'Cross-Platform' }
  ];

  const backends = [
    { id: 'node', label: 'Node.js (Express/Nest)', badge: 'Event-driven' },
    { id: 'python', label: 'Python (FastAPI)', badge: 'AI & Data-ready' },
    { id: 'go', label: 'Go (Golang)', badge: 'High concurrency' },
    { id: 'java', label: 'Java (Spring Boot)', badge: 'Enterprise' }
  ];

  const databases = [
    { id: 'aurora-pg', label: 'Amazon Aurora (PostgreSQL)', badge: 'Relational Multi-AZ' },
    { id: 'aurora-mysql', label: 'Amazon Aurora (MySQL)', badge: 'High Performance' },
    { id: 'dynamodb', label: 'Amazon DynamoDB', badge: 'Serverless NoSQL' },
    { id: 'documentdb', label: 'Amazon DocumentDB', badge: 'MongoDB-compatible' }
  ];

  const deployments = [
    { id: 'ecs', label: 'Amazon ECS Fargate', desc: 'Serverless Docker container workloads' },
    { id: 'serverless', label: 'AWS Lambda + API Gateway', desc: 'Event-driven compute with scale-to-zero' },
    { id: 'eks', label: 'Amazon EKS (Kubernetes)', desc: 'Container orchestration for complex clusters' },
    { id: 'ec2', label: 'Amazon EC2 Auto Scaling', desc: 'Standard scalable virtual machines behind ALB' }
  ];

  // Dynamic Project Spec Generator
  const generateSpec = () => {
    return `# SkySyncLab Cloud Starter Application Specification
# Generated at: ${new Date().toISOString()}

## 1. Project Overview
- Application Archetype: ${appTypes.find(a => a.id === appType)?.label}
- Cloud Provider: ${cloud.toUpperCase()} (Primary Target: ap-south-1 Mumbai)
- Frontend Framework: ${frontends.find(f => f.id === frontend)?.label}
- Backend Framework: ${backends.find(b => b.id === backend)?.label}
- Database System: ${databases.find(d => d.id === db)?.label}
- Deployment Architecture: ${deployments.find(dp => dp.id === deployment)?.label}

## 2. Recommended AWS Infrastructure Blueprint
- VPC: 2 Public Subnets (NAT Gateway + ALB), 2 Private Application Subnets, 2 Isolated Database Subnets
- Compute Layer: ${deployments.find(dp => dp.id === deployment)?.desc}
- Edge Caching & Security: Amazon CloudFront CDN + AWS WAF (Rate limiting & SQLi rules)
- Secret Management: AWS Secrets Manager & Systems Manager Parameter Store
- CI/CD Delivery: GitHub Actions with OIDC AWS authentication deploying to Amazon ECR

## 3. Operational Safety Notice
This starter plan provides architectural specifications only. No cloud infrastructure is provisioned without explicit client authorization and confirmed billing account access.`;
  };

  // Dynamic Docker Compose Manifest
  const generateDockerCompose = () => {
    return `version: '3.8'

services:
  app-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8000
    depends_on:
      - app-backend

  app-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
      - DB_HOST=db-postgres
      - DB_NAME=skysynclab_app
      - NODE_ENV=development
    depends_on:
      - db-service

  db-service:
    image: ${db.includes('mysql') ? 'mysql:8.0' : db.includes('dynamo') ? 'amazon/dynamodb-local' : 'postgres:15-alpine'}
    ports:
      - "${db.includes('mysql') ? '3306:3306' : db.includes('dynamo') ? '8000:8000' : '5432:5432'}"
    environment:
      - POSTGRES_DB=skysynclab_app
      - POSTGRES_USER=skysynclab_user
      - POSTGRES_PASSWORD=local_dev_password_only
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:`;
  };

  // Dynamic Environment Variables Template
  const generateEnvTemplate = () => {
    return `# SkySyncLab Cloud Application Configuration (.env.example)
NODE_ENV=production
PORT=8000
APP_NAME=skysynclab-starter-app

# AWS Cloud Config
AWS_REGION=ap-south-1
AWS_ACCOUNT_ID=YOUR_AWS_ACCOUNT_ID
ECR_REPOSITORY_URI=YOUR_AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/starter-app

# Database Connection (Injected via AWS Secrets Manager in Production)
DATABASE_URL=postgresql://user:password@aurora-cluster.cluster-xyz.ap-south-1.rds.amazonaws.com:5432/production_db

# Security & CORS
ALLOWED_ORIGINS=https://portal.yourdomain.com
JWT_SECRET=USE_AWS_SECRETS_MANAGER_GENERATED_SECRET`;
  };

  const getActiveCode = () => {
    if (activeTab === 'spec') return generateSpec();
    if (activeTab === 'docker') return generateDockerCompose();
    if (activeTab === 'env') return generateEnvTemplate();
    return generateSpec();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getActiveCode()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = activeTab === 'spec' ? 'project-specification.md' : activeTab === 'docker' ? 'docker-compose.yml' : 'sample.env';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="starter-generator-section" style={{ padding: '36px 20px 48px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="section-badge-lined">
          <span className="badge-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            <Rocket size={14} color="#E7167B" />
            <span>Application Starter Generator</span>
          </span>
          <div className="badge-line" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', fontWeight: 900, color: '#232F3E', marginBottom: '8px', letterSpacing: '-0.025em' }}>
          Generate Your Cloud Application Starter Plan
        </h2>
        <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.02rem', color: '#526071', lineHeight: 1.55 }}>
          Select your technology stack, database, and cloud deployment approach to generate an architectural specification and starter configuration files.
        </p>
      </div>

      {/* Safety Notice */}
      <div style={{
        backgroundColor: '#FFF7ED',
        border: '1.5px solid rgba(231, 22, 123, 0.25)',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <AlertTriangle size={20} color="#E7167B" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.86rem', color: '#526071', margin: 0, lineHeight: 1.45 }}>
          <strong style={{ color: '#232F3E' }}>Safety & Governance:</strong> This tool produces structured specifications and configuration files. It is strictly separated from live infrastructure and will never deploy cloud resources or incur expenses without explicit confirmation.
        </p>
      </div>

      <style>{`
        .starter-generator-grid {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(380px, 1.15fr);
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .starter-generator-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}</style>

      {/* Two Column Layout: Controls & Output */}
      <div className="starter-generator-grid">
        {/* Left Column: Stack Selection Controls */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #CBD5E1',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
        }}>
          {/* 1. Application Type */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.80rem', fontWeight: 800, color: '#232F3E', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
              1. Application Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {appTypes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAppType(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: `1.5px solid ${appType === item.id ? '#E7167B' : '#E2E8F0'}`,
                    background: appType === item.id ? 'rgba(231, 22, 123, 0.08)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: appType === item.id ? '#E7167B' : '#232F3E' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.80rem', color: '#64748B', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Frontend Preference */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.80rem', fontWeight: 800, color: '#232F3E', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
              2. Frontend Preference
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {frontends.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFrontend(item.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${frontend === item.id ? '#E7167B' : '#E2E8F0'}`,
                    background: frontend === item.id ? 'rgba(231, 22, 123, 0.08)' : '#FFFFFF',
                    color: frontend === item.id ? '#E7167B' : '#232F3E',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Backend Preference */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.80rem', fontWeight: 800, color: '#232F3E', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
              3. Backend Framework
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {backends.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBackend(item.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${backend === item.id ? '#E7167B' : '#E2E8F0'}`,
                    background: backend === item.id ? 'rgba(231, 22, 123, 0.08)' : '#FFFFFF',
                    color: backend === item.id ? '#E7167B' : '#232F3E',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Database */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.80rem', fontWeight: 800, color: '#232F3E', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
              4. Database System
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {databases.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDb(item.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: `1.5px solid ${db === item.id ? '#E7167B' : '#E2E8F0'}`,
                    background: db === item.id ? 'rgba(231, 22, 123, 0.08)' : '#FFFFFF',
                    color: db === item.id ? '#E7167B' : '#232F3E',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>{item.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Deployment Approach */}
          <div>
            <label style={{ fontSize: '0.80rem', fontWeight: 800, color: '#232F3E', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
              5. Deployment Approach
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {deployments.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDeployment(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: `1.5px solid ${deployment === item.id ? '#E7167B' : '#E2E8F0'}`,
                    background: deployment === item.id ? 'rgba(231, 22, 123, 0.08)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.90rem', fontWeight: 700, color: deployment === item.id ? '#E7167B' : '#232F3E' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code & Specification Viewer */}
        <div style={{
          background: '#0B0F19',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '18px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '90px'
        }}>
          {/* Output Toolbar Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: '#0F1424',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveTab('spec')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'spec' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeTab === 'spec' ? '#FFFFFF' : '#94A3B8'
                }}
              >
                Specification
              </button>
              <button
                onClick={() => setActiveTab('docker')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'docker' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeTab === 'docker' ? '#FFFFFF' : '#94A3B8'
                }}
              >
                docker-compose.yml
              </button>
              <button
                onClick={() => setActiveTab('env')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'env' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeTab === 'env' ? '#FFFFFF' : '#94A3B8'
                }}
              >
                .env.example
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#CBD5E1',
                  fontSize: '0.80rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={13} color="#06D6A0" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(1, 168, 141, 0.15)',
                  border: '1px solid rgba(1, 168, 141, 0.3)',
                  color: '#01A88D',
                  fontSize: '0.80rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Download size={13} />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Code Viewer Area */}
          <div style={{ padding: '18px', overflowX: 'auto', overflowY: 'auto', maxHeight: '420px' }}>
            <pre style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              color: '#E2E8F0',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}>
              {getActiveCode()}
            </pre>
          </div>

          {/* Action Footer */}
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#0F1424',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              Need help deploying this architecture to AWS?
            </span>
            <button
              onClick={() => onOpenConsultation?.('Starter Plan Deployment', `Selected: ${appType} with ${frontend}, ${backend}, ${db}, on ${deployment}`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '6px',
                background: '#E7167B',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Discuss Architecture with Consultant</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
