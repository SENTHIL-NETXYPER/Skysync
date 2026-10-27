import type { AwsCatalogItem } from './types';

export const AWS_CATALOG: AwsCatalogItem[] = [
  // Compute
  {
    service: 'Amazon EC2',
    label: 'Amazon EC2',
    category: 'Compute',
    spec: 'Scalable Virtual Servers in the Cloud',
    iconName: 'Cpu',
    defaultProperties: {
      instanceType: 't3.micro',
      subnet: 'Private Subnet (10.0.2.0/24)',
      autoScaling: 'Enabled',
      minInstances: 2,
      maxInstances: 6,
      notes: 'Web application servers',
      multiAz: true,
      encrypted: true
    }
  },
  {
    service: 'EC2 Auto Scaling',
    label: 'EC2 Auto Scaling',
    category: 'Compute',
    spec: 'Maintains fleet availability & scales on demand',
    iconName: 'Cpu',
    defaultProperties: {
      instanceType: 't4g.xlarge',
      subnet: 'Private Subnet (10.0.2.0/24)',
      autoScaling: 'Enabled',
      minInstances: 2,
      maxInstances: 8,
      notes: 'Auto Scaling Group for stateless tiers'
    }
  },
  {
    service: 'AWS Lambda',
    label: 'AWS Lambda',
    category: 'Compute',
    spec: 'Run code without thinking about servers',
    iconName: 'Server',
    defaultProperties: {
      instanceType: 'ARM64 1024MB',
      subnet: 'VPC Lambda Eni',
      autoScaling: 'Automatic',
      notes: 'Serverless backend handlers'
    }
  },
  {
    service: 'Amazon ECS',
    label: 'Amazon ECS',
    category: 'Containers',
    spec: 'Highly secure, reliable, and scalable container orchestration',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'Fargate vCPU: 2, RAM: 4GB',
      subnet: 'Private Subnet (10.0.2.0/24)',
      notes: 'Microservices container tasks'
    }
  },
  {
    service: 'Amazon EKS',
    label: 'Amazon EKS',
    category: 'Containers',
    spec: 'Managed Kubernetes clusters in AWS',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'Managed Node Group',
      subnet: 'Private Subnet (10.0.2.0/24)',
      notes: 'Enterprise Kubernetes cluster'
    }
  },

  // Storage
  {
    service: 'Amazon S3',
    label: 'Amazon S3',
    category: 'Storage',
    spec: 'Object storage built to retrieve any amount of data',
    iconName: 'HardDrive',
    defaultProperties: {
      instanceType: 'Standard + Glacier Lifecycle',
      subnet: 'Private Subnet (10.0.4.0/24)',
      encrypted: true,
      notes: 'Encrypted document & static asset store'
    }
  },
  {
    service: 'Amazon EBS',
    label: 'Amazon EBS',
    category: 'Storage',
    spec: 'High-performance block storage volumes for EC2',
    iconName: 'HardDrive',
    defaultProperties: {
      instanceType: 'gp3 (3000 IOPS)',
      notes: 'Primary persistent root/data volume'
    }
  },
  {
    service: 'Amazon EFS',
    label: 'Amazon EFS',
    category: 'Storage',
    spec: 'Serverless, fully elastic NFS file storage',
    iconName: 'HardDrive',
    defaultProperties: {
      instanceType: 'General Purpose Multi-AZ',
      notes: 'Shared NFS volume across EC2 instances'
    }
  },

  // Databases
  {
    service: 'Amazon Aurora',
    label: 'Amazon Aurora',
    category: 'Databases',
    spec: 'High performance managed relational database',
    iconName: 'Database',
    defaultProperties: {
      instanceType: 'db.r6g.xlarge',
      subnet: 'Private Subnet (10.0.3.0/24)',
      autoScaling: 'Read Replica Auto Scaling',
      multiAz: true,
      encrypted: true,
      notes: 'Aurora PostgreSQL 16 Multi-AZ'
    }
  },
  {
    service: 'Amazon RDS',
    label: 'Amazon RDS',
    category: 'Databases',
    spec: 'Managed relational database service for MySQL/PostgreSQL',
    iconName: 'Database',
    defaultProperties: {
      instanceType: 'db.t4g.medium',
      subnet: 'Private Subnet (10.0.3.0/24)',
      multiAz: true,
      notes: 'Managed relational database tier'
    }
  },
  {
    service: 'Amazon DynamoDB',
    label: 'Amazon DynamoDB',
    category: 'Databases',
    spec: 'Fast, flexible NoSQL database service for single-digit ms',
    iconName: 'Database',
    defaultProperties: {
      instanceType: 'On-Demand Capacity',
      notes: 'Global key-value store'
    }
  },
  {
    service: 'Amazon ElastiCache',
    label: 'Amazon ElastiCache',
    category: 'Databases',
    spec: 'In-memory caching for Redis and Memcached',
    iconName: 'Database',
    defaultProperties: {
      instanceType: 'cache.r6g.large',
      notes: 'Redis cluster cache for session & query acceleration'
    }
  },

  // Networking
  {
    service: 'Amazon Route 53',
    label: 'Amazon Route 53',
    category: 'Networking',
    spec: 'Highly available and scalable cloud DNS web service',
    iconName: 'Network',
    defaultProperties: {
      instanceType: 'Public Hosted Zone',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Global DNS latency routing + health checks'
    }
  },
  {
    service: 'Amazon CloudFront',
    label: 'Amazon CloudFront',
    category: 'Networking',
    spec: 'Fast, secure, and programmable content delivery network',
    iconName: 'Cloud',
    defaultProperties: {
      instanceType: 'PriceClass_All + TLS 1.3',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Global edge distribution & SSL termination'
    }
  },
  {
    service: 'Application Load Balancer',
    label: 'Application Load Balancer',
    category: 'Networking',
    spec: 'Layer 7 load balancing for HTTP and HTTPS traffic',
    iconName: 'Network',
    defaultProperties: {
      instanceType: 'Internet-Facing ALB',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Path-based routing to target groups'
    }
  },
  {
    service: 'Amazon VPC',
    label: 'Amazon VPC',
    category: 'Networking',
    spec: 'Isolated cloud resources in a virtual network',
    iconName: 'Network',
    defaultProperties: {
      instanceType: '10.0.0.0/16',
      notes: 'Primary Virtual Private Cloud'
    }
  },
  {
    service: 'NAT Gateway',
    label: 'NAT Gateway',
    category: 'Networking',
    spec: 'Connects instances in private subnets to internet',
    iconName: 'Network',
    defaultProperties: {
      instanceType: 'Managed NAT Gateway',
      subnet: 'Public Subnet (10.0.1.0/24)',
      notes: 'Outbound egress for private subnets'
    }
  },
  {
    service: 'Amazon API Gateway',
    label: 'Amazon API Gateway',
    category: 'Networking',
    spec: 'Create, publish, maintain, monitor, and secure APIs',
    iconName: 'Network',
    defaultProperties: {
      instanceType: 'REST API Regional',
      notes: 'Managed API endpoints with rate-limiting'
    }
  },

  // AI & ML
  {
    service: 'Amazon Bedrock',
    label: 'Amazon Bedrock',
    category: 'AI & ML',
    spec: 'Build generative AI applications with foundation models',
    iconName: 'Sparkles',
    defaultProperties: {
      instanceType: 'Claude 3.5 Sonnet / Titan',
      notes: 'Serverless LLM reasoning and embedding engine'
    }
  },
  {
    service: 'Amazon SageMaker',
    label: 'Amazon SageMaker',
    category: 'AI & ML',
    spec: 'Build, train, and deploy machine learning models',
    iconName: 'Sparkles',
    defaultProperties: {
      instanceType: 'ml.g5.2xlarge Endpoint',
      notes: 'Custom model training & low-latency inference'
    }
  },

  // Security
  {
    service: 'AWS WAF & Shield',
    label: 'AWS WAF & Shield',
    category: 'Security',
    spec: 'DDoS protection and application firewall rules',
    iconName: 'Shield',
    defaultProperties: {
      instanceType: 'AWS Managed Rule Sets',
      notes: 'SQLi, XSS, and bot rate limiting protection'
    }
  },
  {
    service: 'AWS KMS',
    label: 'AWS KMS',
    category: 'Security',
    spec: 'Create and control keys used to encrypt data',
    iconName: 'Lock',
    defaultProperties: {
      instanceType: 'Customer Managed Key (CMK)',
      notes: 'Hardware security module (HSM) key management'
    }
  },
  {
    service: 'AWS IAM',
    label: 'AWS IAM',
    category: 'Security',
    spec: 'Manage identities and access permissions securely',
    iconName: 'Shield',
    defaultProperties: {
      instanceType: 'Least-Privilege Roles',
      notes: 'Role-based access control for AWS workloads'
    }
  },

  // Integration
  {
    service: 'Amazon SQS',
    label: 'Amazon SQS',
    category: 'Integration',
    spec: 'Fully managed message queuing for microservices',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'FIFO / Standard Queue',
      notes: 'Decoupled asynchronous message processing'
    }
  },
  {
    service: 'Amazon SNS',
    label: 'Amazon SNS',
    category: 'Integration',
    spec: 'Pub/sub messaging for distributed systems and mobile',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'Topic Pub/Sub',
      notes: 'Fan-out notification delivery'
    }
  },
  {
    service: 'AWS Step Functions',
    label: 'AWS Step Functions',
    category: 'Integration',
    spec: 'Visual workflows for distributed applications',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'Standard Workflow',
      notes: 'Multi-step microservice orchestrator'
    }
  },

  // Management
  {
    service: 'Amazon CloudWatch',
    label: 'Amazon CloudWatch',
    category: 'Management',
    spec: 'Observability of AWS resources and applications',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'Metrics + Logs + Alarms',
      notes: '24/7 telemetry monitoring and automated alerts'
    }
  },
  {
    service: 'AWS CloudFormation',
    label: 'AWS CloudFormation',
    category: 'Management',
    spec: 'Speed up cloud provisioning with infrastructure as code',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'IaC Stacks',
      notes: 'Declarative YAML/JSON stack definitions'
    }
  },

  // Migration
  {
    service: 'AWS DMS',
    label: 'AWS DMS',
    category: 'Migration',
    spec: 'Database Migration Service with minimal downtime',
    iconName: 'Layers',
    defaultProperties: {
      instanceType: 'dms.c5.xlarge',
      notes: 'Continuous data replication from on-premise to AWS'
    }
  }
];
