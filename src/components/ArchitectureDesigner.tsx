import React, { useState, useRef } from 'react';
import {
  Sparkles, Download, RotateCcw,
  Trash2, Check, X, Layers, Network, Link as LinkIcon,
  Edit3, Copy, LayoutGrid
} from 'lucide-react';
import { getAwsIcon } from './AwsIcons';

export interface ArchNode {
  id: string;
  service: string;
  label: string;
  category: 'Compute' | 'Database' | 'Storage' | 'Networking' | 'Security' | 'AI';
  x: number;
  y: number;
  spec: string;
  iconName: string;
}

export interface ArchConnection {
  id: string;
  fromId: string;
  toId: string;
  label: string;
}

export const ArchitectureDesigner: React.FC = () => {
  // Available AWS Components in the palette
  const awsCatalog = [
    { service: 'Amazon EC2', label: 'EC2 Auto Scaling', category: 'Compute' as const, spec: 't4g.xlarge · Multi-AZ', iconName: 'Cpu' },
    { service: 'AWS Lambda', label: 'Lambda Function', category: 'Compute' as const, spec: 'Serverless ARM64', iconName: 'Server' },
    { service: 'Amazon ECS', label: 'ECS Fargate Container', category: 'Compute' as const, spec: 'Linux Fargate Task', iconName: 'Layers' },
    { service: 'Amazon Aurora', label: 'Aurora Multi-AZ DB', category: 'Database' as const, spec: 'PostgreSQL 16 Compatible', iconName: 'Database' },
    { service: 'Amazon DynamoDB', label: 'DynamoDB Key-Value', category: 'Database' as const, spec: 'On-Demand Capacity', iconName: 'Database' },
    { service: 'Amazon RDS', label: 'RDS Multi-AZ', category: 'Database' as const, spec: 'MySQL 8.0 Primary', iconName: 'Database' },
    { service: 'Amazon S3', label: 'S3 Secure Vault', category: 'Storage' as const, spec: 'Standard + Glacier Lifecycle', iconName: 'HardDrive' },
    { service: 'Amazon Route 53', label: 'Route 53 DNS', category: 'Networking' as const, spec: 'Latency Routing + Health Checks', iconName: 'Network' },
    { service: 'Amazon CloudFront', label: 'CloudFront CDN', category: 'Networking' as const, spec: 'Edge Cache + TLS 1.3', iconName: 'Cloud' },
    { service: 'Application Load Balancer', label: 'ALB (HTTP/HTTPS)', category: 'Networking' as const, spec: 'Layer 7 Path-Based Routing', iconName: 'Network' },
    { service: 'AWS WAF & Shield', label: 'WAF DDoS Shield', category: 'Security' as const, spec: 'Rate Limiting Ruleset', iconName: 'Shield' },
    { service: 'AWS KMS', label: 'KMS Encryption', category: 'Security' as const, spec: 'Customer Managed Keys (CMK)', iconName: 'Lock' },
    { service: 'Amazon Bedrock', label: 'Bedrock Foundation Model', category: 'AI' as const, spec: 'Claude 3.5 Sonnet / Titan', iconName: 'Sparkles' }
  ];

  // Default Canvas Starter - Clean Left-to-Right Tier Alignment
  const defaultNodes: ArchNode[] = [
    { id: 'node-1', service: 'Amazon Route 53', label: 'Route 53 DNS', category: 'Networking', x: 20, y: 190, spec: 'Domain DNS & Latency Failover', iconName: 'Network' },
    { id: 'node-2', service: 'Amazon CloudFront', label: 'CloudFront CDN', category: 'Networking', x: 215, y: 190, spec: 'Edge Caching & Shield', iconName: 'Cloud' },
    { id: 'node-3', service: 'Application Load Balancer', label: 'Campus ALB', category: 'Networking', x: 410, y: 190, spec: 'Dual-AZ Traffic Distribution', iconName: 'Network' },
    { id: 'node-4', service: 'Amazon EC2', label: 'EC2 Auto Scaling', category: 'Compute', x: 605, y: 190, spec: 'App Fleet · Dual AZ', iconName: 'Cpu' },
    { id: 'node-5', service: 'Amazon Aurora', label: 'Aurora Multi-AZ DB', category: 'Database', x: 800, y: 95, spec: 'Encrypted Relational Storage', iconName: 'Database' },
    { id: 'node-6', service: 'Amazon S3', label: 'S3 Document Vault', category: 'Storage', x: 800, y: 285, spec: 'KMS Encrypted Archives', iconName: 'HardDrive' }
  ];

  const defaultConnections: ArchConnection[] = [
    { id: 'conn-1', fromId: 'node-1', toId: 'node-2', label: 'DNS' },
    { id: 'conn-2', fromId: 'node-2', toId: 'node-3', label: 'HTTPS / TLS' },
    { id: 'conn-3', fromId: 'node-3', toId: 'node-4', label: 'Forward' },
    { id: 'conn-4', fromId: 'node-4', toId: 'node-5', label: 'SQL R/W' },
    { id: 'conn-5', fromId: 'node-4', toId: 'node-6', label: 'S3 Sync' }
  ];

  const [nodes, setNodes] = useState<ArchNode[]>(defaultNodes);
  const [connections, setConnections] = useState<ArchConnection[]>(defaultConnections);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedConnId, setSelectedConnId] = useState<string | null>(null);
  // Connection Creation State
  const [isConnectMode, setIsConnectMode] = useState(false);
  const [connectSourceId, setConnectSourceId] = useState<string | null>(null);

  // In-Card Inline Editing State
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState<string>('');
  const [editSpec, setEditSpec] = useState<string>('');

  const handleStartInCardEdit = (node: ArchNode) => {
    setEditingNodeId(node.id);
    setEditLabel(node.label);
    setEditSpec(node.spec);
  };

  const handleSaveInCardEdit = (id: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, label: editLabel.trim() || n.label, spec: editSpec.trim() || n.spec } : n
      )
    );
    setEditingNodeId(null);
  };

  const handleDuplicateNode = (id: string) => {
    const source = nodes.find((n) => n.id === id);
    if (!source) return;
    const cloned: ArchNode = {
      ...source,
      id: `node-${Date.now()}`,
      label: `${source.label} (Replica)`,
      x: Math.min(source.x + 35, 820),
      y: Math.min(source.y + 35, 420)
    };
    setNodes((prev) => [...prev, cloned]);
    setSelectedNodeId(cloned.id);
  };

  const handleStartConnectFromNode = (id: string) => {
    setIsConnectMode(true);
    setConnectSourceId(id);
  };

  const handleAutoArrange = () => {
    const tierOrder: Record<string, number> = {
      'Amazon Route 53': 0,
      'Amazon CloudFront': 1,
      'AWS WAF & Shield': 1,
      'Application Load Balancer': 2,
      'Amazon EC2': 3,
      'AWS Lambda': 3,
      'Amazon ECS': 3,
      'Amazon Aurora': 4,
      'Amazon RDS': 4,
      'Amazon DynamoDB': 4,
      'Amazon S3': 4,
      'AWS KMS': 4,
      'Amazon Bedrock': 4
    };

    const tiers: Record<number, ArchNode[]> = {};
    nodes.forEach((n) => {
      const t = tierOrder[n.service] ?? (n.category === 'Networking' ? 0 : n.category === 'Compute' ? 3 : 4);
      if (!tiers[t]) tiers[t] = [];
      tiers[t].push(n);
    });

    const sortedTiers = Object.keys(tiers).map(Number).sort((a, b) => a - b);
    const updated: ArchNode[] = [];

    sortedTiers.forEach((tierKey, colIdx) => {
      const group = tiers[tierKey];
      const colX = 20 + colIdx * 195;
      const count = group.length;

      if (count === 1) {
        updated.push({
          ...group[0],
          x: Math.min(colX, 800),
          y: 190
        });
      } else {
        const spacing = Math.min(190, 380 / count);
        const startY = Math.max(75, 190 - ((count - 1) * spacing) / 2);
        group.forEach((node, rowIdx) => {
          updated.push({
            ...node,
            x: Math.min(colX, 800),
            y: Math.round(startY + rowIdx * spacing)
          });
        });
      }
    });

    setNodes(updated);
  };

  // Dragging State
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Category filter for the sidebar
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // AI Prompt Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStatus, setAiStatus] = useState<string | null>(null);

  // Handle adding a node from catalog
  const handleAddNode = (item: typeof awsCatalog[0]) => {
    const newNode: ArchNode = {
      id: `node-${Date.now()}`,
      service: item.service,
      label: item.label,
      category: item.category,
      x: 350 + Math.floor(Math.random() * 80),
      y: 120 + Math.floor(Math.random() * 80),
      spec: item.spec,
      iconName: item.iconName
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
  };

  // Drag node handling
  const handleNodePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    if (isConnectMode) {
      if (!connectSourceId) {
        setConnectSourceId(id);
      } else if (connectSourceId !== id) {
        // Create connection
        const newConn: ArchConnection = {
          id: `conn-${Date.now()}`,
          fromId: connectSourceId,
          toId: id,
          label: 'Data Flow'
        };
        setConnections((prev) => [...prev, newConn]);
        setConnectSourceId(null);
        setIsConnectMode(false);
      }
      return;
    }

    setSelectedNodeId(id);
    setSelectedConnId(null);
    setDraggedNodeId(id);

    const node = nodes.find((n) => n.id === id);
    if (node && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scrollLeft = canvasRef.current.scrollLeft || 0;
      const scrollTop = canvasRef.current.scrollTop || 0;
      setDragOffset({
        x: e.clientX - rect.left + scrollLeft - node.x,
        y: e.clientY - rect.top + scrollTop - node.y
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggedNodeId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scrollLeft = canvasRef.current.scrollLeft || 0;
    const scrollTop = canvasRef.current.scrollTop || 0;
    const newX = Math.max(16, Math.min(1080, e.clientX - rect.left + scrollLeft - dragOffset.x));
    const newY = Math.max(48, Math.min(480, e.clientY - rect.top + scrollTop - dragOffset.y));

    setNodes((prev) =>
      prev.map((node) => (node.id === draggedNodeId ? { ...node, x: newX, y: newY } : node))
    );
  };

  const handlePointerUp = () => {
    setDraggedNodeId(null);
  };

  // Node deletion
  const handleDeleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId));
    setConnections((prev) => prev.filter((c) => c.fromId !== selectedNodeId && c.toId !== selectedNodeId));
    setSelectedNodeId(null);
  };

  // Connection deletion
  const handleDeleteSelectedConnection = () => {
    if (!selectedConnId) return;
    setConnections((prev) => prev.filter((c) => c.id !== selectedConnId));
    setSelectedConnId(null);
  };

  // Reset Canvas
  const handleResetCanvas = () => {
    if (window.confirm('Reset diagram back to standard 3-tier reference architecture?')) {
      setNodes(defaultNodes);
      setConnections(defaultConnections);
      setSelectedNodeId(null);
      setSelectedConnId(null);
      setConnectSourceId(null);
      setIsConnectMode(false);
    }
  };

  // Export diagram as an SVG / Image file
  const handleExportDiagram = () => {
    if (!canvasRef.current) return;

    // Build standalone SVG
    const width = canvasRef.current.offsetWidth || 1100;
    const height = canvasRef.current.offsetHeight || 560;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background-color: #FFFFFF; font-family: sans-serif;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#E7167B" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      <text x="24" y="32" font-size="16" font-weight="bold" fill="#0F172A">SkySyncLab AWS Cloud Architecture Diagram</text>
      <text x="24" y="52" font-size="12" fill="#64748B">Generated via SkySyncLab Architecture Designer · skysynclab.com · Region: ap-south-1</text>
    `;

    // Draw connections
    connections.forEach((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.fromId);
      const toNode = nodes.find((n) => n.id === conn.toId);
      if (fromNode && toNode) {
        const x1 = fromNode.x + 95;
        const y1 = fromNode.y + 45;
        const x2 = toNode.x + 95;
        const y2 = toNode.y + 45;
        svgContent += `
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E7167B" stroke-width="2" marker-end="url(#arrow)" />
          <text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 8}" font-size="11" fill="#475569" text-anchor="middle" font-weight="600">${conn.label}</text>
        `;
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      svgContent += `
        <g transform="translate(${node.x}, ${node.y})">
          <rect width="190" height="85" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
          <rect width="190" height="4" rx="2" fill="#E7167B" />
          <text x="14" y="30" font-size="13" font-weight="bold" fill="#0F172A">${node.service}</text>
          <text x="14" y="50" font-size="11.5" font-weight="600" fill="#E7167B">${node.label}</text>
          <text x="14" y="68" font-size="10" fill="#64748B">${node.spec}</text>
        </g>
      `;
    });

    svgContent += `</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `skysynclab-aws-architecture-${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Structured AI Architecture Generator (Offline Rule-Based / Pre-configured for API)
  const handleGenerateAiArchitecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiStatus('Parsing architecture requirements and mapping AWS services...');

    setTimeout(() => {
      const q = aiPrompt.toLowerCase();
      if (q.includes('rag') || q.includes('ai') || q.includes('search') || q.includes('chat')) {
        // AI / RAG Architecture
        setNodes([
          { id: 'n-ai-1', service: 'Amazon S3', label: 'Institutional PDF Bucket', category: 'Storage', x: 60, y: 150, spec: 'Circulars & Prospectuses', iconName: 'HardDrive' },
          { id: 'n-ai-2', service: 'AWS Lambda', label: 'Text Chunking Worker', category: 'Compute', x: 280, y: 150, spec: 'Python 3.12 Serverless', iconName: 'Server' },
          { id: 'n-ai-3', service: 'Amazon Aurora', label: 'Aurora pgvector Store', category: 'Database', x: 500, y: 150, spec: 'Titan v2 1536-dim Embeddings', iconName: 'Database' },
          { id: 'n-ai-4', service: 'Amazon Bedrock', label: 'Claude 3.5 Sonnet Reasoning', category: 'AI', x: 720, y: 150, spec: 'Strict Prospectus Citations', iconName: 'Sparkles' },
          { id: 'n-ai-5', service: 'Amazon CloudFront', label: 'Embeddable Chatbot CDN', category: 'Networking', x: 940, y: 150, spec: 'WAF Rate Limited', iconName: 'Cloud' }
        ]);
        setConnections([
          { id: 'c-1', fromId: 'n-ai-1', toId: 'n-ai-2', label: 'S3 Ingest Trigger' },
          { id: 'c-2', fromId: 'n-ai-2', toId: 'n-ai-3', label: 'Vector Index' },
          { id: 'c-3', fromId: 'n-ai-3', toId: 'n-ai-4', label: 'Context Retrieval' },
          { id: 'c-4', fromId: 'n-ai-4', toId: 'n-ai-5', label: 'Cited Response' }
        ]);
      } else if (q.includes('serverless') || q.includes('api') || q.includes('microservice')) {
        // Serverless API Topology
        setNodes([
          { id: 'n-s-1', service: 'Amazon Route 53', label: 'API Custom Domain', category: 'Networking', x: 80, y: 160, spec: 'api.college.edu', iconName: 'Network' },
          { id: 'n-s-2', service: 'Amazon CloudFront', label: 'CloudFront Edge API', category: 'Networking', x: 300, y: 160, spec: 'Global Edge TLS', iconName: 'Cloud' },
          { id: 'n-s-3', service: 'AWS Lambda', label: 'FastAPI Backend Lambda', category: 'Compute', x: 540, y: 160, spec: 'Containerized Microservice', iconName: 'Server' },
          { id: 'n-s-4', service: 'Amazon DynamoDB', label: 'Student Data DynamoDB', category: 'Database', x: 780, y: 160, spec: 'Single-Digit Latency', iconName: 'Database' },
          { id: 'n-s-5', service: 'AWS KMS', label: 'KMS Encryption At Rest', category: 'Security', x: 780, y: 320, spec: 'FIPS 140-3 Validated', iconName: 'Lock' }
        ]);
        setConnections([
          { id: 'c-s1', fromId: 'n-s-1', toId: 'n-s-2', label: 'Edge Routing' },
          { id: 'c-s2', fromId: 'n-s-2', toId: 'n-s-3', label: 'Proxy Request' },
          { id: 'c-s3', fromId: 'n-s-3', toId: 'n-s-4', label: 'Query / Put' },
          { id: 'c-s4', fromId: 'n-s-4', toId: 'n-s-5', label: 'KMS Key Wrap' }
        ]);
      } else {
        // High-Concurrency Exam Results Architecture
        setNodes(defaultNodes);
        setConnections(defaultConnections);
      }

      setAiStatus('Architecture successfully mapped to canvas!');
      setTimeout(() => {
        setIsAiModalOpen(false);
        setAiStatus(null);
      }, 700);
    }, 600);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <section id="designer-section" style={{
      padding: '48px 24px 60px 24px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          .arch-designer-grid {
            display: grid;
            grid-template-columns: 285px minmax(0, 1fr);
            gap: 16px;
            align-items: start;
          }
          .arch-designer-sidebar {
            height: 580px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            overflow: hidden;
            background-color: #FFFFFF;
            border-radius: 16px;
            border: 1.5px solid #CBD5E1;
            padding: 16px;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
          }
          .arch-designer-canvas-box {
            height: 580px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: #FFFFFF;
            border-radius: 16px;
            border: 1.5px solid #CBD5E1;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          }
          .arch-designer-toolbar {
            padding: 10px 16px;
            background-color: #F8FAFC;
            border-bottom: 1.5px solid #CBD5E1;
            display: flex;
            align-items: center;
            justifyContent: space-between;
            flex-wrap: wrap;
            gap: 10px;
          }
          .canvas-mobile-hint {
            display: none;
          }
          @media (max-width: 900px) {
            .arch-designer-grid {
              grid-template-columns: 1fr !important;
              gap: 16px;
            }
            .arch-designer-sidebar {
              height: auto !important;
              max-height: 400px !important;
            }
            .arch-designer-canvas-box {
              height: 520px !important;
            }
            .canvas-mobile-hint {
              display: inline-flex !important;
              align-items: center;
              gap: 4px;
              font-size: 0.72rem;
              font-weight: 700;
              color: #E7167B;
              background-color: #FFF7ED;
              border: 1px solid #FFEDD5;
              padding: 4px 8px;
              border-radius: 6px;
            }
          }
          @media (max-width: 600px) {
            .arch-designer-toolbar {
              padding: 8px 10px !important;
              gap: 8px !important;
            }
            .arch-designer-canvas-box {
              height: 470px !important;
            }
          }
        `}</style>
        <div className="section-badge-lined">
          <span className="badge-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
            <Network size={14} color="#E7167B" />
            <span>Interactive AWS Topology Workbench</span>
          </span>
          <div className="badge-line" />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.7rem)', fontWeight: 900, color: '#0F172A', marginBottom: '10px', letterSpacing: '-0.025em', animation: 'fadeInUp 0.5s ease-out both' }}>
          Want to Try Architecture?
        </h2>
        <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '1.04rem', color: '#526071', lineHeight: 1.6 }}>
          Design, arrange, and connect standard AWS cloud architectures. Drag components, draw connection lines, and export publication-ready diagrams.
        </p>
      </div>

      {/* Main Designer Grid: Sidebar Palette (Left) + Interactive Visual Canvas (Right) */}
      <div className="arch-designer-grid">
        {/* Left Sidebar: Component Catalog & Controls */}
        <div className="arch-designer-sidebar">
          {/* Sticky Non-Scrolling Title Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#FFF7ED',
                border: '1.5px solid #FDBA74',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E7167B',
                flexShrink: 0
              }}>
                <Layers size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.98rem', color: '#232F3E', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                  AWS Component Catalog
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                  13 Architecture Services
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAiModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(231, 22, 123, 0.08)',
                border: '1px solid rgba(231, 22, 123, 0.25)',
                color: '#E7167B',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Generate layout from text description"
            >
              <Sparkles size={12} color="#E7167B" />
              <span>AI Starter</span>
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['All', 'Compute', 'Database', 'Storage', 'Networking', 'Security', 'AI'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  border: activeCategory === cat ? '1px solid #E7167B' : '1px solid #E2E8F0',
                  backgroundColor: activeCategory === cat ? '#E7167B' : '#F8FAFC',
                  color: activeCategory === cat ? '#FFFFFF' : '#526071',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Component List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flex: selectedNode ? '0 1 200px' : 1,
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {awsCatalog
              .filter((item) => activeCategory === 'All' || item.category === activeCategory)
              .map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAddNode(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer',
                    transition: 'all 0.16s ease',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#E7167B';
                    e.currentTarget.style.backgroundColor = '#FFF7ED';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 22, 123, 0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flexShrink: 0 }}>
                      {getAwsIcon(item.service, 26)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.25 }}>
                        {item.service}
                      </div>
                      <span style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: '#475569',
                        display: 'inline-block',
                        marginTop: '2px'
                      }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: '#FFEDD5',
                    border: '1.5px solid #FDBA74',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D0126D',
                    flexShrink: 0
                  }}>
                    +
                  </div>
                </div>
              ))}
          </div>

          {/* Node Property Inspector (When a node is selected) */}
          {selectedNode && (
            <div style={{
              padding: '14px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E7167B',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#E7167B', textTransform: 'uppercase' }}>
                  Node Inspector
                </span>
                <button
                  onClick={handleDeleteSelectedNode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.76rem',
                    fontWeight: 700
                  }}
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                  Custom Label
                </label>
                <input
                  type="text"
                  value={selectedNode.label}
                  onChange={(e) => {
                    const newLabel = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, label: newLabel } : n))
                    );
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-strong)',
                    fontSize: '0.84rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                  Specification / Role
                </label>
                <input
                  type="text"
                  value={selectedNode.spec}
                  onChange={(e) => {
                    const newSpec = e.target.value;
                    setNodes((prev) =>
                      prev.map((n) => (n.id === selectedNode.id ? { ...n, spec: newSpec } : n))
                    );
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-strong)',
                    fontSize: '0.84rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <button
                onClick={() => {
                  setIsConnectMode(true);
                  setConnectSourceId(selectedNode.id);
                }}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--aws-orange)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <LinkIcon size={13} />
                <span>Connect to Another Node</span>
              </button>
            </div>
          )}

          {/* Quick Help Guide */}
          <div style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.45,
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '12px'
          }}>
            <strong>Canvas Tips:</strong>
            <ul style={{ paddingLeft: '16px', marginTop: '4px' }}>
              <li>Click any component above to add it.</li>
              <li>Drag nodes to reposition them.</li>
              <li>Toggle <strong>Connect Mode</strong> to draw line flows.</li>
              <li>Click <strong>Export Diagram</strong> to save SVG.</li>
            </ul>
          </div>
        </div>

        {/* Right Canvas Workbench */}
        <div className="arch-designer-canvas-box">
          {/* Top Canvas Toolbar */}
          <div className="arch-designer-toolbar">
            {/* Status / Connect Mode Indicator & Auto-Arrange */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setIsConnectMode(!isConnectMode);
                  setConnectSourceId(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 12px',
                  borderRadius: '7px',
                  border: isConnectMode ? '1.5px solid #E7167B' : '1.5px solid #CBD5E1',
                  backgroundColor: isConnectMode ? '#FFF7ED' : '#FFFFFF',
                  color: isConnectMode ? '#E7167B' : '#232F3E',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
              >
                <LinkIcon size={14} />
                <span>{isConnectMode ? 'Connecting Mode (Active)' : 'Connect Nodes'}</span>
              </button>

              <button
                onClick={handleAutoArrange}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 12px',
                  borderRadius: '7px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#232F3E',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#E7167B';
                  e.currentTarget.style.color = '#E7167B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.color = '#232F3E';
                }}
                title="Automatically align and arrange nodes into clean, balanced tiers"
              >
                <LayoutGrid size={14} />
                <span>Auto-Arrange</span>
              </button>

              {isConnectMode && (
                <span style={{ fontSize: '0.78rem', color: '#E7167B', fontWeight: 600 }}>
                  {connectSourceId ? 'Click target node to connect' : 'Click the first node'}
                </span>
              )}
            </div>

            {/* Action Tools: Reset, Delete, Export */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {selectedConnId && (
                <button
                  onClick={handleDeleteSelectedConnection}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    borderRadius: '7px',
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #FCA5A5',
                    color: '#DC2626',
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Delete Line</span>
                </button>
              )}

              <button
                onClick={handleResetCanvas}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '7px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  color: '#526071',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>

              <button
                onClick={handleExportDiagram}
                className="btn-pill-orange"
                style={{ padding: '7px 15px', fontSize: '0.84rem' }}
              >
                <Download size={14} />
                <span>Export Diagram</span>
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={() => {
              setSelectedNodeId(null);
              setSelectedConnId(null);
              setEditingNodeId(null);
            }}
            style={{
              position: 'relative',
              flex: 1,
              backgroundColor: '#FAFAFC',
              backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px',
              overflowX: 'auto',
              overflowY: 'hidden',
              userSelect: 'none'
            }}
          >
            {/* Architectural Tier Guide Lanes */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                minWidth: '900px',
                height: '34px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                pointerEvents: 'none',
                zIndex: 1,
                borderBottom: '1px dashed #CBD5E1',
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.64rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', borderRight: '1px dashed #CBD5E1' }}>
                01 · ROUTE 53 DNS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.64rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', borderRight: '1px dashed #CBD5E1' }}>
                02 · EDGE & CACHE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.64rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', borderRight: '1px dashed #CBD5E1' }}>
                03 · LOAD BALANCING
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.64rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', borderRight: '1px dashed #CBD5E1' }}>
                04 · COMPUTE FLEET
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.64rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em' }}>
                05 · DATABASE & STORAGE
              </div>
            </div>
            {/* SVG Connection Layer */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                minWidth: '900px',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
              }}
            >
              <defs>
                <marker
                  id="canvas-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E7167B" />
                </marker>
              </defs>

              {connections.map((conn, idx) => {
                const fromNode = nodes.find((n) => n.id === conn.fromId);
                const toNode = nodes.find((n) => n.id === conn.toId);
                if (!fromNode || !toNode) return null;

                const nodeWidth = 142;
                const nodeHeight = 114;

                let x1: number, y1: number, x2: number, y2: number;
                let cx1: number, cy1: number, cx2: number, cy2: number;

                const deltaX = (toNode.x + nodeWidth / 2) - (fromNode.x + nodeWidth / 2);

                // Robust directional port selection
                if (fromNode.x + nodeWidth <= toNode.x) {
                  // Standard Left-to-Right: right port to left port
                  x1 = fromNode.x + nodeWidth;
                  y1 = fromNode.y + nodeHeight / 2;
                  x2 = toNode.x;
                  y2 = toNode.y + nodeHeight / 2;

                  const dist = Math.max(35, (x2 - x1) * 0.45);
                  cx1 = x1 + dist;
                  cy1 = y1;
                  cx2 = x2 - dist;
                  cy2 = y2;
                } else if (toNode.x + nodeWidth <= fromNode.x) {
                  // Right-to-Left: left port to right port
                  x1 = fromNode.x;
                  y1 = fromNode.y + nodeHeight / 2;
                  x2 = toNode.x + nodeWidth;
                  y2 = toNode.y + nodeHeight / 2;

                  const dist = Math.max(35, (x1 - x2) * 0.45);
                  cx1 = x1 - dist;
                  cy1 = y1;
                  cx2 = x2 + dist;
                  cy2 = y2;
                } else if (fromNode.y + nodeHeight <= toNode.y) {
                  // Top-to-Bottom: bottom port to top port
                  x1 = fromNode.x + nodeWidth / 2;
                  y1 = fromNode.y + nodeHeight;
                  x2 = toNode.x + nodeWidth / 2;
                  y2 = toNode.y;

                  const dist = Math.max(30, (y2 - y1) * 0.45);
                  cx1 = x1;
                  cy1 = y1 + dist;
                  cx2 = x2;
                  cy2 = y2 - dist;
                } else if (toNode.y + nodeHeight <= fromNode.y) {
                  // Bottom-to-Top: top port to bottom port
                  x1 = fromNode.x + nodeWidth / 2;
                  y1 = fromNode.y;
                  x2 = toNode.x + nodeWidth / 2;
                  y2 = toNode.y + nodeHeight;

                  const dist = Math.max(30, (y1 - y2) * 0.45);
                  cx1 = x1;
                  cy1 = y1 - dist;
                  cx2 = x2;
                  cy2 = y2 + dist;
                } else {
                  // Overlapping or diagonal close proximity: use nearest horizontal side ports
                  if (deltaX >= 0) {
                    x1 = fromNode.x + nodeWidth;
                    y1 = fromNode.y + nodeHeight / 2;
                    x2 = toNode.x;
                    y2 = toNode.y + nodeHeight / 2;
                    cx1 = x1 + 25;
                    cy1 = y1;
                    cx2 = x2 - 25;
                    cy2 = y2;
                  } else {
                    x1 = fromNode.x;
                    y1 = fromNode.y + nodeHeight / 2;
                    x2 = toNode.x + nodeWidth;
                    y2 = toNode.y + nodeHeight / 2;
                    cx1 = x1 - 25;
                    cy1 = y1;
                    cx2 = x2 + 25;
                    cy2 = y2;
                  }
                }

                const isStraight = (x1 === x2 && cx1 === x1) || (y1 === y2 && cy1 === y1 && cx1 === (x1 + x2) / 2);
                const pathD = isStraight
                  ? `M ${x1} ${y1} L ${x2} ${y2}`
                  : `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

                // Exact point on cubic bezier at t = 0.5:
                const midX = 0.125 * x1 + 0.375 * cx1 + 0.375 * cx2 + 0.125 * x2;
                const midY = 0.125 * y1 + 0.375 * cy1 + 0.375 * cy2 + 0.125 * y2;

                const isSelected = selectedConnId === conn.id;
                const labelWidth = Math.max(56, conn.label.length * 6.2 + 14);

                return (
                  <g key={conn.id} style={{ pointerEvents: 'auto', cursor: 'pointer' }} onClick={(e) => {
                    e.stopPropagation();
                    setSelectedConnId(conn.id);
                    setSelectedNodeId(null);
                  }}>
                    {/* Wider transparent hit zone */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                    />
                    {/* Visible line - reveals sequentially in 400-800ms */}
                    <path
                      d={pathD}
                      fill="none"
                      className="arch-conn-revealed"
                      stroke="#E7167B"
                      strokeWidth={isSelected ? '2.8' : '2'}
                      strokeDasharray={isSelected ? '4 4' : 'none'}
                      markerEnd="url(#canvas-arrow)"
                      style={{
                        animationDelay: `${idx * 160}ms`
                      }}
                    />
                    {/* Line badge label */}
                    <rect
                      x={midX - labelWidth / 2}
                      y={midY - (y1 === y2 ? 16 : 9)}
                      width={labelWidth}
                      height="18"
                      rx="4"
                      fill="#FFFFFF"
                      stroke={isSelected ? '#E7167B' : '#CBD5E1'}
                      strokeWidth="1"
                      filter="drop-shadow(0 1px 2px rgba(0,0,0,0.06))"
                    />
                    <text
                      x={midX}
                      y={midY - (y1 === y2 ? 4 : -3)}
                      fontSize="8.5"
                      fontWeight="bold"
                      fill={isSelected ? '#E7167B' : '#334155'}
                      textAnchor="middle"
                    >
                      {conn.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Draggable & In-Card Interactive Architecture Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isSource = connectSourceId === node.id;
              const isEditing = editingNodeId === node.id;

              const getCategoryAccent = (cat: string) => {
                switch (cat) {
                  case 'Compute': return '#E7167B'; // AWS Orange
                  case 'Database': return '#01A88D'; // AWS Teal
                  case 'Storage': return '#7AA116'; // AWS Green
                  case 'Networking': return '#8C4FFF'; // AWS Purple
                  case 'Security': return '#DD344C'; // AWS Red
                  case 'AI': return '#C925D1'; // AWS Magenta
                  default: return '#E7167B';
                }
              };

              const accentColor = getCategoryAccent(node.category);

              return (
                <div
                  key={node.id}
                  onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleStartInCardEdit(node);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '142px',
                    minHeight: '114px',
                    touchAction: 'none',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: isSelected
                      ? '2px solid #E7167B'
                      : isSource
                      ? '2px dashed #01A88D'
                      : '1.5px solid #CBD5E1',
                    boxShadow: isSelected
                      ? '0 8px 24px rgba(231, 22, 123, 0.22)'
                      : '0 2px 10px rgba(15, 23, 42, 0.06)',
                    zIndex: isSelected || isEditing ? 15 : 2,
                    cursor: isConnectMode ? 'crosshair' : 'grab',
                    transition: draggedNodeId === node.id ? 'none' : 'box-shadow 0.15s ease, border-color 0.15s ease'
                  }}
                >
                  {/* Category Accent Top Stripe */}
                  <div style={{
                    height: '3px',
                    backgroundColor: accentColor,
                    borderRadius: '10px 10px 0 0'
                  }} />

                  {/* Connection Anchor Points (Left, Right, Top, Bottom) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-5px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: `2px solid ${accentColor}`,
                      boxShadow: '0 0 0 2px #E2E8F0',
                      zIndex: 5
                    }}
                    title="Input Connection Port"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '-5px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: `2px solid ${accentColor}`,
                      boxShadow: '0 0 0 2px #E2E8F0',
                      zIndex: 5
                    }}
                    title="Output Connection Port"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: `2px solid ${accentColor}`,
                      boxShadow: '0 0 0 2px #E2E8F0',
                      zIndex: 5
                    }}
                    title="Top Connection Port"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: `2px solid ${accentColor}`,
                      boxShadow: '0 0 0 2px #E2E8F0',
                      zIndex: 5
                    }}
                    title="Bottom Connection Port"
                  />

                  {/* Card Content Area */}
                  <div style={{ padding: '7px 8px' }}>
                    {/* Header: Official AWS Icon, Service Name, and Category Chip */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '4px' }}>
                      <div style={{ flexShrink: 0, marginTop: '1px' }}>
                        {getAwsIcon(node.service, 22)}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          color: '#0F172A',
                          lineHeight: 1.2,
                          wordBreak: 'break-word'
                        }}>
                          {node.service}
                        </div>
                        <span style={{
                          fontSize: '0.58rem',
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: '4px',
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                          border: `1px solid ${accentColor}30`,
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                          display: 'inline-block',
                          marginTop: '2px'
                        }}>
                          {node.category}
                        </span>
                      </div>
                    </div>

                    {/* In-Card Direct Editing Form OR Display View */}
                    {isEditing ? (
                      /* Live In-Card Edit Mode */
                      <div
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          paddingTop: '2px'
                        }}
                      >
                        <input
                          type="text"
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          placeholder="Node Label"
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderRadius: '4px',
                            border: `1.5px solid ${accentColor}`,
                            outline: 'none',
                            color: '#232F3E',
                            backgroundColor: '#F8FAFC'
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveInCardEdit(node.id);
                            if (e.key === 'Escape') setEditingNodeId(null);
                          }}
                        />

                        <input
                          type="text"
                          value={editSpec}
                          onChange={(e) => setEditSpec(e.target.value)}
                          placeholder="Instance / Tier Spec"
                          style={{
                            width: '100%',
                            padding: '4px 6px',
                            fontSize: '0.7rem',
                            borderRadius: '4px',
                            border: '1px solid #E2E8F0',
                            outline: 'none',
                            color: '#526071',
                            backgroundColor: '#F8FAFC'
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveInCardEdit(node.id);
                            if (e.key === 'Escape') setEditingNodeId(null);
                          }}
                        />

                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', marginTop: '2px' }}>
                          <button
                            onClick={() => setEditingNodeId(null)}
                            style={{
                              padding: '2px 7px',
                              fontSize: '0.68rem',
                              borderRadius: '4px',
                              border: '1px solid #E2E8F0',
                              backgroundColor: '#FFFFFF',
                              color: '#64748B',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveInCardEdit(node.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                              padding: '2px 8px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: 'var(--aws-orange)',
                              color: '#FFFFFF',
                              cursor: 'pointer'
                            }}
                          >
                            <Check size={11} strokeWidth={2.6} />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Normal Display View with In-Card Action Toolbar */
                      <div>
                        <div
                          style={{
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            color: accentColor,
                            marginBottom: '2px',
                            lineHeight: 1.25,
                            wordBreak: 'break-word',
                            cursor: 'text'
                          }}
                          title="Double-click to edit directly"
                        >
                          {node.label}
                        </div>

                        <div style={{
                          fontSize: '0.64rem',
                          color: '#64748B',
                          lineHeight: 1.25,
                          marginBottom: '6px',
                          wordBreak: 'break-word'
                        }}>
                          {node.spec}
                        </div>

                        {/* Interactive In-Card Action Toolbar */}
                        <div
                          onPointerDown={(e) => e.stopPropagation()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '5px',
                            borderTop: '1px solid #F1F5F9'
                          }}
                        >
                          {/* In-Card Edit Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartInCardEdit(node);
                            }}
                            title="Edit label & specs directly"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                              background: 'none',
                              border: 'none',
                              fontSize: '0.66rem',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px 3px',
                              borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--aws-orange)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <Edit3 size={10} />
                            <span>Edit</span>
                          </button>

                          {/* In-Card Connect / Link Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartConnectFromNode(node.id);
                            }}
                            title="Connect this node to another"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px',
                              background: 'none',
                              border: 'none',
                              fontSize: '0.66rem',
                              fontWeight: 600,
                              color: isSource ? 'var(--aws-teal)' : 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px 3px',
                              borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--aws-teal)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = isSource ? 'var(--aws-teal)' : 'var(--text-muted)')}
                          >
                            <LinkIcon size={10} />
                            <span>Link</span>
                          </button>

                          {/* In-Card Duplicate Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateNode(node.id);
                            }}
                            title="Duplicate node"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px 3px',
                              borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-dark-black)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <Copy size={10} />
                          </button>

                          {/* In-Card Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNodes((prev) => prev.filter((n) => n.id !== node.id));
                              setConnections((prev) => prev.filter((c) => c.fromId !== node.id && c.toId !== node.id));
                              if (selectedNodeId === node.id) setSelectedNodeId(null);
                            }}
                            title="Delete node"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px 3px',
                              borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Structured AI Architecture Generator Modal (Preview Feature) */}
      {isAiModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 20, 26, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '16px'
        }}
        onClick={() => setIsAiModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#0F1422',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: 'var(--shadow-modal)',
              borderTop: '4px solid var(--aws-orange)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="unified-icon-box" style={{ width: '36px', height: '36px' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark-black)' }}>
                    AI Architecture Generator (Preview)
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Structure AWS blueprints from requirements text
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.5 }}>
              Describe your campus or application workload. The system generates a structured layout on your designer canvas using AWS Well-Architected Framework guidelines.
            </p>

            <form onSubmit={handleGenerateAiArchitecture}>
              <textarea
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Design a private AI document search bot with S3, Lambda, and Bedrock for student regulation circulars..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--border-strong)',
                  fontSize: '0.88rem',
                  fontFamily: 'inherit',
                  marginBottom: '14px',
                  resize: 'vertical'
                }}
              />

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700 }}>Quick Examples:</span>
                <button
                  type="button"
                  onClick={() => setAiPrompt('Private student RAG chatbot with S3 and Bedrock')}
                  style={{
                    backgroundColor: '#161B2E',
                    border: '1px solid var(--border-subtle)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  Private RAG Knowledge Base
                </button>
                <button
                  type="button"
                  onClick={() => setAiPrompt('Serverless REST API with Lambda and DynamoDB')}
                  style={{
                    backgroundColor: '#161B2E',
                    border: '1px solid var(--border-subtle)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  Serverless API
                </button>
              </div>

              {aiStatus && (
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  color: '#1D4ED8',
                  fontSize: '0.82rem',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Check size={14} />
                  <span>{aiStatus}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn-pill-orange"
                  style={{ flex: 1, padding: '11px', fontSize: '0.94rem' }}
                >
                  Generate Canvas Diagram
                </button>
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="btn-pill-blue"
                  style={{ padding: '11px 20px', fontSize: '0.94rem' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
