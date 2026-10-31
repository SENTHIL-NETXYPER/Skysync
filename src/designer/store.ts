import { create } from 'zustand';
import {
  type Node,
  type Edge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Connection,
  MarkerType
} from '@xyflow/react';
import type { AwsCatalogItem, NodeProperties, ValidationReport, AwsCategory } from './types';

// Initial Starter Architecture exactly matching user mockup
const initialNodes: Node[] = [
  // Container: AWS Cloud (Outer boundary)
  {
    id: 'group-cloud',
    type: 'awsGroup',
    position: { x: 40, y: 30 },
    style: { width: 1060, height: 560 },
    data: {
      label: 'AWS Cloud',
      variant: 'cloud',
      borderColor: '#E7167B',
      badgeBg: '#E7167B',
      badgeColor: '#FFFFFF'
    }
  },
  // Container: AWS Region (ap-south-1)
  {
    id: 'group-region',
    type: 'awsGroup',
    position: { x: 70, y: 75 },
    style: { width: 1000, height: 490 },
    data: {
      label: 'AWS Region (ap-south-1)',
      variant: 'region',
      borderColor: '#2563EB',
      badgeBg: '#2563EB',
      badgeColor: '#FFFFFF'
    }
  },
  // Container: VPC (10.0.0.0/16) - Green dashed border
  {
    id: 'group-vpc',
    type: 'awsGroup',
    position: { x: 95, y: 125 },
    style: { width: 950, height: 420 },
    data: {
      label: 'VPC (10.0.0.0/16)',
      variant: 'vpc',
      borderColor: '#22C55E',
      badgeBg: '#22C55E',
      badgeColor: '#FFFFFF'
    }
  },
  // Subnet 1: Public Subnet (10.0.1.0/24)
  {
    id: 'group-sub-public',
    type: 'awsGroup',
    position: { x: 120, y: 180 },
    style: { width: 280, height: 160 },
    data: {
      label: 'Public Subnet\n10.0.1.0/24',
      variant: 'subnet-public',
      borderColor: '#16A34A',
      badgeBg: '#16A34A',
      badgeColor: '#FFFFFF'
    }
  },
  // Subnet 2: Private Subnet (10.0.2.0/24) - Web App Tier
  {
    id: 'group-sub-app',
    type: 'awsGroup',
    position: { x: 590, y: 180 },
    style: { width: 180, height: 160 },
    data: {
      label: 'Private Subnet\n10.0.2.0/24',
      variant: 'subnet-private',
      borderColor: '#0284C7',
      badgeBg: '#0284C7',
      badgeColor: '#FFFFFF'
    }
  },
  // Subnet 3: Private Subnet (10.0.3.0/24) - Database Tier
  {
    id: 'group-sub-db',
    type: 'awsGroup',
    position: { x: 790, y: 180 },
    style: { width: 180, height: 160 },
    data: {
      label: 'Private Subnet\n10.0.3.0/24',
      variant: 'subnet-private',
      borderColor: '#0284C7',
      badgeBg: '#0284C7',
      badgeColor: '#FFFFFF'
    }
  },
  // Subnet 4: Private Subnet (10.0.4.0/24) - Storage Tier
  {
    id: 'group-sub-storage',
    type: 'awsGroup',
    position: { x: 440, y: 360 },
    style: { width: 180, height: 160 },
    data: {
      label: 'Private Subnet\n10.0.4.0/24',
      variant: 'subnet-private',
      borderColor: '#0284C7',
      badgeBg: '#0284C7',
      badgeColor: '#FFFFFF'
    }
  },

  // Component Nodes exactly as in mockup:
  {
    id: 'node-r53',
    type: 'awsService',
    position: { x: 140, y: 235 },
    data: {
      label: 'Amazon Route 53',
      service: 'Amazon Route 53',
      category: 'Networking',
      sublabel: 'DNS',
      iconName: 'Network',
      instanceType: 'Public Zone',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Global Latency & Health Checks'
    }
  },
  {
    id: 'node-cf',
    type: 'awsService',
    position: { x: 260, y: 235 },
    data: {
      label: 'Amazon CloudFront',
      service: 'Amazon CloudFront',
      category: 'Networking',
      sublabel: 'CDN',
      iconName: 'Cloud',
      instanceType: 'PriceClass_All',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Global Edge Cache & TLS 1.3'
    }
  },
  {
    id: 'node-alb',
    type: 'awsService',
    position: { x: 430, y: 235 },
    data: {
      label: 'Application Load Balancer',
      service: 'Application Load Balancer',
      category: 'Networking',
      sublabel: 'Load Balancing',
      iconName: 'Network',
      instanceType: 'HTTP/HTTPS Ingress',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Layer 7 Path-Based Routing'
    }
  },
  {
    id: 'node-ec2',
    type: 'awsService',
    position: { x: 610, y: 235 },
    data: {
      label: 'Amazon EC2',
      service: 'Amazon EC2',
      category: 'Compute',
      sublabel: 'Auto Scaling',
      iconName: 'Cpu',
      instanceType: 't3.micro',
      subnet: 'Private Subnet (10.0.2.0/24)',
      autoScaling: 'Enabled',
      minInstances: 2,
      maxInstances: 6,
      notes: 'Web application servers'
    }
  },
  {
    id: 'node-aurora',
    type: 'awsService',
    position: { x: 810, y: 235 },
    data: {
      label: 'Amazon Aurora',
      service: 'Amazon Aurora',
      category: 'Databases',
      sublabel: 'Database',
      iconName: 'Database',
      instanceType: 'db.r6g.xlarge',
      subnet: 'Private Subnet (10.0.3.0/24)',
      autoScaling: 'Enabled',
      multiAz: true,
      notes: 'PostgreSQL 16 Multi-AZ'
    }
  },
  {
    id: 'node-s3',
    type: 'awsService',
    position: { x: 460, y: 410 },
    data: {
      label: 'Amazon S3',
      service: 'Amazon S3',
      category: 'Storage',
      sublabel: 'Storage',
      iconName: 'HardDrive',
      instanceType: 'Standard S3',
      subnet: 'Private Subnet (10.0.4.0/24)',
      encrypted: true,
      notes: 'Encrypted document store'
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'edge-r53-cf',
    source: 'node-r53',
    target: 'node-cf',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#E7167B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#E7167B' }
  },
  {
    id: 'edge-cf-alb',
    source: 'node-cf',
    target: 'node-alb',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#E7167B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#E7167B' }
  },
  {
    id: 'edge-alb-ec2',
    source: 'node-alb',
    target: 'node-ec2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#E7167B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#E7167B' }
  },
  {
    id: 'edge-alb-s3',
    source: 'node-alb',
    target: 'node-s3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#E7167B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#E7167B' }
  },
  {
    id: 'edge-ec2-aurora',
    source: 'node-ec2',
    target: 'node-aurora',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#E7167B', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#E7167B' }
  }
];

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

interface ArchitectureStore {
  // Canvas State
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  projectName: string;
  projectDescription: string;
  lastSavedText: string;
  activeCategory: AwsCategory;
  searchQuery: string;
  toolMode: 'select' | 'connect';
  zoom: number;

  // History (Undo / Redo)
  past: HistoryState[];
  future: HistoryState[];

  // Modals & Panels
  isCatalogOpen: boolean;
  isPropertiesOpen: boolean;
  isValidationOpen: boolean;
  isCodeExportOpen: boolean;
  isAiOpen: boolean;
  isTemplatesOpen: boolean;
  isProjectsOpen: boolean;
  validationReport: ValidationReport | null;
  codeFormat: 'terraform' | 'cloudformation' | 'json';

  // Actions
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (node: Node | null) => void;
  updateNodeProperties: (nodeId: string, properties: Partial<NodeProperties>) => void;
  addCatalogNode: (item: AwsCatalogItem, position?: { x: number; y: number }) => void;
  duplicateNode: (nodeId: string) => void;
  deleteNode: (nodeId: string) => void;
  undo: () => void;
  redo: () => void;
  autoArrange: () => void;
  resetCanvas: () => void;
  setProjectName: (name: string) => void;
  setActiveCategory: (category: AwsCategory) => void;
  setSearchQuery: (query: string) => void;
  setToolMode: (mode: 'select' | 'connect') => void;
  setZoom: (zoom: number) => void;
  toggleCatalog: () => void;
  toggleProperties: () => void;
  setModal: (modal: 'validation' | 'code' | 'ai' | 'templates' | 'projects', open: boolean) => void;
  setCodeFormat: (format: 'terraform' | 'cloudformation' | 'json') => void;
  runValidation: () => Promise<void>;
  saveProject: () => Promise<void>;
  loadTemplate: (templateKey: string) => void;
}

export const useArchitectureStore = create<ArchitectureStore>((set, get) => {
  const saveSnapshot = () => {
    const { nodes, edges, past } = get();
    set({
      past: [...past.slice(-20), { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }],
      future: []
    });
  };

  return {
    nodes: initialNodes,
    edges: initialEdges,
    selectedNode: initialNodes.find((n) => n.id === 'node-ec2') || null,
    projectName: 'architecture-diagram-1',
    projectDescription: 'Standard 3-Tier AWS Architecture with VPC, Subnets, EC2, Aurora & S3',
    lastSavedText: 'Autosaved just now',
    activeCategory: 'All',
    searchQuery: '',
    toolMode: 'select',
    zoom: 1,

    past: [],
    future: [],

    isCatalogOpen: true,
    isPropertiesOpen: true,
    isValidationOpen: false,
    isCodeExportOpen: false,
    isAiOpen: false,
    isTemplatesOpen: false,
    isProjectsOpen: false,
    validationReport: null,
    codeFormat: 'terraform',

    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges)
      });
    },

    onConnect: (connection: Connection) => {
      saveSnapshot();
      const newEdge: Edge = {
        id: `edge-${connection.source}-${connection.target}-${Date.now()}`,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#E7167B', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#E7167B' }
      };
      set({
        edges: [...get().edges, newEdge]
      });
    },

    selectNode: (node: Node | null) => {
      set({
        selectedNode: node,
        isPropertiesOpen: node ? true : get().isPropertiesOpen
      });
    },

    updateNodeProperties: (nodeId: string, properties: Partial<NodeProperties>) => {
      saveSnapshot();
      set({
        nodes: get().nodes.map((n) => {
          if (n.id === nodeId) {
            return {
              ...n,
              data: {
                ...n.data,
                ...properties
              }
            };
          }
          return n;
        }),
        selectedNode:
          get().selectedNode?.id === nodeId
            ? {
                ...get().selectedNode!,
                data: {
                  ...get().selectedNode!.data,
                  ...properties
                }
              }
            : get().selectedNode
      });
    },

    addCatalogNode: (item: AwsCatalogItem, position?: { x: number; y: number }) => {
      saveSnapshot();
      const id = `node-${Date.now().toString(36)}`;
      const pos = position || {
        x: 450 + (get().nodes.length % 4) * 40,
        y: 200 + (get().nodes.length % 4) * 35
      };

      const newNode: Node = {
        id,
        type: 'awsService',
        position: pos,
        data: {
          label: item.service,
          service: item.service,
          category: item.category,
          sublabel: item.label,
          iconName: item.iconName,
          ...item.defaultProperties
        }
      };

      set({
        nodes: [...get().nodes, newNode],
        selectedNode: newNode,
        isPropertiesOpen: true
      });
    },

    duplicateNode: (nodeId: string) => {
      const target = get().nodes.find((n) => n.id === nodeId);
      if (!target) return;
      saveSnapshot();

      const dupId = `node-${Date.now().toString(36)}`;
      const dupNode: Node = {
        ...target,
        id: dupId,
        position: { x: target.position.x + 30, y: target.position.y + 30 },
        data: {
          ...target.data,
          label: `${target.data.label} (Copy)`
        }
      };

      set({
        nodes: [...get().nodes, dupNode],
        selectedNode: dupNode
      });
    },

    deleteNode: (nodeId: string) => {
      saveSnapshot();
      set({
        nodes: get().nodes.filter((n) => n.id !== nodeId),
        edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        selectedNode: get().selectedNode?.id === nodeId ? null : get().selectedNode
      });
    },

    undo: () => {
      const { past, future, nodes, edges } = get();
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      set({
        nodes: previous.nodes,
        edges: previous.edges,
        past: newPast,
        future: [{ nodes, edges }, ...future]
      });
    },

    redo: () => {
      const { past, future, nodes, edges } = get();
      if (future.length === 0) return;

      const next = future[0];
      const newFuture = future.slice(1);

      set({
        nodes: next.nodes,
        edges: next.edges,
        past: [...past, { nodes, edges }],
        future: newFuture
      });
    },

    autoArrange: () => {
      saveSnapshot();
      // Arrange non-group nodes into progressive architectural tiers
      const componentNodes = get().nodes.filter((n) => n.type !== 'awsGroup');
      const groupNodes = get().nodes.filter((n) => n.type === 'awsGroup');

      const tierMap: Record<string, number> = {
        'Amazon Route 53': 0,
        'Amazon CloudFront': 1,
        'Application Load Balancer': 2,
        'Amazon EC2': 3,
        'EC2 Auto Scaling': 3,
        'Amazon ECS': 3,
        'AWS Lambda': 3,
        'Amazon Aurora': 4,
        'Amazon RDS': 4,
        'Amazon DynamoDB': 4,
        'Amazon S3': 2
      };

      const startX = 140;
      const stepX = 160;

      const arrangedComponents = componentNodes.map((n, i) => {
        const tier = tierMap[n.data.service as string] ?? (i % 5);
        const isS3 = (n.data.service as string).includes('S3');
        return {
          ...n,
          position: {
            x: startX + tier * stepX,
            y: isS3 ? 410 : 235
          }
        };
      });

      set({
        nodes: [...groupNodes, ...arrangedComponents]
      });
    },

    resetCanvas: () => {
      saveSnapshot();
      set({
        nodes: initialNodes,
        edges: initialEdges,
        selectedNode: initialNodes.find((n) => n.id === 'node-ec2') || null
      });
    },

    setProjectName: (name: string) => set({ projectName: name }),
    setActiveCategory: (cat: AwsCategory) => set({ activeCategory: cat }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    setToolMode: (mode: 'select' | 'connect') => set({ toolMode: mode }),
    setZoom: (zoom: number) => set({ zoom }),
    toggleCatalog: () => set((s) => ({ isCatalogOpen: !s.isCatalogOpen })),
    toggleProperties: () => set((s) => ({ isPropertiesOpen: !s.isPropertiesOpen })),
    setModal: (modal, open) => {
      const map = {
        validation: 'isValidationOpen',
        code: 'isCodeExportOpen',
        ai: 'isAiOpen',
        templates: 'isTemplatesOpen',
        projects: 'isProjectsOpen'
      } as const;
      set({ [map[modal]]: open } as any);
    },
    setCodeFormat: (format) => set({ codeFormat: format }),

    runValidation: async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nodes: get().nodes,
            edges: get().edges
          })
        });
        if (res.ok) {
          const report = await res.json();
          set({ validationReport: report, isValidationOpen: true });
          return;
        }
      } catch (e) {
        console.warn('Backend validation offline, evaluating locally', e);
      }

      // Local fallback validator
      const nodes = get().nodes;
      const edges = get().edges;
      const issues = [];
      let score = 95;

      const hasAlb = nodes.some((n) => (n.data?.service as string)?.includes('Balancer'));
      const hasWaf = nodes.some((n) => (n.data?.service as string)?.includes('WAF'));
      if (hasAlb && !hasWaf) {
        issues.push({
          severity: 'WARNING' as const,
          category: 'Security',
          message: 'Public Load Balancer lacks AWS WAF DDoS & Bot mitigation rules.'
        });
        score -= 10;
      }

      set({
        validationReport: {
          score,
          status: score >= 85 ? 'EXCELLENT' : 'GOOD',
          total_components: nodes.filter((n) => n.type !== 'awsGroup').length,
          total_connections: edges.length,
          issues,
          validated_at: new Date().toLocaleTimeString()
        },
        isValidationOpen: true
      });
    },

    saveProject: async () => {
      const payload = {
        name: get().projectName,
        description: get().projectDescription,
        data: {
          nodes: get().nodes,
          edges: get().edges,
          viewport: { x: 0, y: 0, zoom: get().zoom }
        }
      };

      try {
        await fetch('http://127.0.0.1:8000/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Backend offline, saving to localStorage', err);
      }

      localStorage.setItem('skysynclab_arch_project', JSON.stringify(payload));
      set({ lastSavedText: `Autosaved at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` });
    },

    loadTemplate: (templateKey: string) => {
      saveSnapshot();
      if (templateKey === '3-tier') {
        set({
          nodes: initialNodes,
          edges: initialEdges,
          projectName: 'three-tier-web-app'
        });
      } else if (templateKey === 'ai-rag') {
        // Bedrock AI RAG template
        const ragNodes: Node[] = [
          ...initialNodes.filter((n) => n.type === 'awsGroup'),
          {
            id: 'node-rag-bedrock',
            type: 'awsService',
            position: { x: 610, y: 235 },
            data: {
              label: 'Amazon Bedrock',
              service: 'Amazon Bedrock',
              category: 'AI & ML',
              sublabel: 'Claude 3.5 Sonnet',
              iconName: 'Sparkles',
              instanceType: 'Foundation Model',
              subnet: 'Private Subnet (10.0.2.0/24)',
              notes: 'RAG Q&A Assistant Engine'
            }
          },
          {
            id: 'node-rag-aurora',
            type: 'awsService',
            position: { x: 810, y: 235 },
            data: {
              label: 'Aurora pgvector',
              service: 'Amazon Aurora',
              category: 'Databases',
              sublabel: 'Vector Database',
              iconName: 'Database',
              instanceType: 'db.r6g.xlarge',
              subnet: 'Private Subnet (10.0.3.0/24)',
              notes: 'Vector embeddings store'
            }
          },
          {
            id: 'node-rag-s3',
            type: 'awsService',
            position: { x: 460, y: 410 },
            data: {
              label: 'Knowledge Base S3',
              service: 'Amazon S3',
              category: 'Storage',
              sublabel: 'Documents Vault',
              iconName: 'HardDrive',
              encrypted: true,
              notes: 'PDFs & syllabi document vault'
            }
          }
        ];
        set({
          nodes: ragNodes,
          edges: initialEdges.slice(0, 3),
          projectName: 'bedrock-generative-ai-rag'
        });
      }
      set({ isTemplatesOpen: false });
    }
  };
});
