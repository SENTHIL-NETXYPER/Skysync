export type AwsCategory =
  | 'All'
  | 'Compute'
  | 'Storage'
  | 'Networking'
  | 'Databases'
  | 'AI & ML'
  | 'Containers'
  | 'Integration'
  | 'Security'
  | 'Management'
  | 'Migration';

export interface AwsCatalogItem {
  service: string;
  label: string;
  category: Exclude<AwsCategory, 'All'>;
  spec: string;
  iconName: string;
  defaultProperties?: Record<string, any>;
}

export interface NodeProperties {
  label: string;
  service: string;
  category: string;
  instanceType?: string;
  subnet?: string;
  autoScaling?: string;
  minInstances?: number;
  maxInstances?: number;
  notes?: string;
  multiAz?: boolean;
  encrypted?: boolean;
  iamRole?: string;
  securityGroups?: string;
  tags?: { key: string; value: string }[];
}

export interface ArchitectureProject {
  id: string;
  name: string;
  description: string;
  data: {
    nodes: any[];
    edges: any[];
    viewport: { x: number; y: number; zoom: number };
  };
  created_at?: string;
  updated_at?: string;
}

export interface ValidationIssue {
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'LOW';
  category: string;
  message: string;
}

export interface ValidationReport {
  score: number;
  status: 'EXCELLENT' | 'GOOD' | 'NEEDS_ATTENTION';
  total_components: number;
  total_connections: number;
  issues: ValidationIssue[];
  validated_at: string;
}
