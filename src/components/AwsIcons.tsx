import React from 'react';

interface AwsIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Official AWS Service Style SVG Icons
 * Crafted with authentic AWS architecture diagram colors and standard iconography:
 * - Compute: #E7167B (AWS Orange)
 * - Database: #01A88D / #3B48CC (Teal / Blue)
 * - Storage: #7AA116 (Green)
 * - Networking: #8C4FFF (Purple)
 * - Security: #DD344C (Red)
 * - AI / Bedrock: #C925D1 (Magenta)
 */

export const AwsEc2Icon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#E7167B" />
    <path d="M7 11h3v10H7V11zm5 0h10c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H12V11zm2 2v6h6v-6h-6z" fill="#FFFFFF" />
    <path d="M10 7h2v3h-2zm5-4h2v3h-2zm5 4h2v3h-2zm-10 15h2v3h-2zm5 0h2v3h-2zm5 0h2v3h-2z" fill="#FFE5CC" />
  </svg>
);

export const AwsLambdaIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#E7167B" />
    <path d="M8 23l4.5-9.5H16L11.5 23H8zm7.5-14h3.2l5.3 14H20.7l-1.3-3.6h-5.2l1.6-3.4h2.2l-2.5-7z" fill="#FFFFFF" />
  </svg>
);

export const AwsEcsIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#E7167B" />
    <path d="M16 6l8 4.5v9L16 24l-8-4.5v-9L16 6z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M16 6v9m0 9v-9m8-4.5l-8 4.5m-8-4.5l8 4.5" stroke="#FFFFFF" strokeWidth="1.8" />
    <circle cx="16" cy="15" r="2.5" fill="#FFE5CC" />
  </svg>
);

export const AwsAuroraIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#01A88D" />
    <ellipse cx="16" cy="9" rx="8" ry="3.5" fill="#FFFFFF" />
    <path d="M8 9v7c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5V9" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M8 16v7c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5v-7" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <circle cx="23" cy="8" r="2" fill="#E6FFFA" />
  </svg>
);

export const AwsDynamoDbIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#2E73B8" />
    <ellipse cx="16" cy="8" rx="7" ry="2.5" fill="#FFFFFF" />
    <path d="M9 8v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V8" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    <path d="M9 13v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    <path d="M9 18v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    <path d="M17 11l-3 5h3l-2 5 5-6h-3l2-4h-2z" fill="#FDBA74" />
  </svg>
);

export const AwsRdsIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#3B48CC" />
    <ellipse cx="16" cy="9" rx="8" ry="3" fill="#FFFFFF" />
    <path d="M8 9v6c0 1.66 3.58 3 8 3s8-1.34 8-3V9" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M8 15v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M12 12h8m-8 6h8" stroke="#3B48CC" strokeWidth="1.5" />
  </svg>
);

export const AwsS3Icon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#7AA116" />
    <path d="M8 9l8-3 8 3v12l-8 5-8-5V9z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M8 9l8 3 8-3" stroke="#FFFFFF" strokeWidth="1.8" />
    <path d="M16 12v14" stroke="#FFFFFF" strokeWidth="1.8" />
    <circle cx="16" cy="18" r="2.5" fill="#EBF8D3" />
  </svg>
);

export const AwsRoute53Icon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <circle cx="16" cy="16" r="9" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M7 16h18M16 7c2.5 3 4 5.5 4 9s-1.5 6-4 9c-2.5-3-4-5.5-4-9s1.5-6 4-9z" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
    <path d="M14 11l4 5-4 5" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AwsCloudFrontIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <path d="M9 19c-1.66 0-3-1.34-3-3 0-1.47 1.06-2.69 2.47-2.94.3-.87.97-1.58 1.83-1.95A4.5 4.5 0 0119 12c1.7 0 3.17 1 3.86 2.44C23.5 14.54 24 15.22 24 16c0 1.66-1.34 3-3 3H9z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <circle cx="10" cy="22" r="1.5" fill="#FDBA74" />
    <circle cx="16" cy="24" r="1.5" fill="#FDBA74" />
    <circle cx="22" cy="22" r="1.5" fill="#FDBA74" />
  </svg>
);

export const AwsAlbIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <rect x="7" y="13" width="6" height="6" rx="1.5" fill="#FFFFFF" />
    <rect x="19" y="8" width="6" height="6" rx="1.5" fill="#FFFFFF" />
    <rect x="19" y="18" width="6" height="6" rx="1.5" fill="#FFFFFF" />
    <path d="M13 16h3v-5h3m-3 5v5h3" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const AwsWafIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#DD344C" />
    <path d="M16 6l9 3.5v6.5c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V9.5L16 6z" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M12 13h8m-8 4h8m-8 4h8" stroke="#FFE5E8" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const AwsKmsIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#DD344C" />
    <rect x="9" y="14" width="14" height="11" rx="2" fill="#FFFFFF" />
    <path d="M12 14v-4a4 4 0 118 0v4" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <circle cx="16" cy="19.5" r="1.8" fill="#DD344C" />
    <path d="M16 21v2.5" stroke="#DD344C" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const AwsBedrockIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#C925D1" />
    <path d="M16 7l2.5 5.5L24 15l-5.5 2.5L16 23l-2.5-5.5L8 15l5.5-2.5L16 7z" fill="#FFFFFF" />
    <circle cx="24" cy="8" r="1.8" fill="#FCE7F3" />
    <circle cx="8" cy="22" r="1.5" fill="#FCE7F3" />
  </svg>
);

/**
 * Service name to Icon mapping helper
 */
export const AwsVpcIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <path d="M6 10h20v12H6V10zm2 2v8h16v-8H8zm3 2h4v4h-4v-4zm6 0h4v4h-4v-4z" fill="#FFFFFF" />
  </svg>
);

export const AwsIgwIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <path d="M16 6l-8 6h5v8h6v-8h5l-8-6zm-3 16h6v2h-6v-2z" fill="#FFFFFF" />
  </svg>
);

export const AwsNatIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <path d="M8 8h16v4H8V8zm0 6h16v4H8v-4zm0 6h16v4H8v-4z" fill="#FFFFFF" opacity="0.9" />
    <path d="M14 10h4v2h-4zm0 6h4v2h-4z" fill="#8C4FFF" />
  </svg>
);

export const AwsCloudWatchIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#E7167B" />
    <circle cx="16" cy="16" r="9" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M16 10v6l4 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AwsIamIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#DD344C" />
    <path d="M16 7l-7 3v6c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V10l-7-3zm-1 5h2v3h3v2h-3v3h-2v-3h-3v-2h3v-3z" fill="#FFFFFF" />
  </svg>
);

export const AwsApiGatewayIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#8C4FFF" />
    <path d="M8 8h16v3H8V8zm0 6.5h16v3H8v-3zm0 6.5h16v3H8v-3z" fill="#FFFFFF" />
    <circle cx="10" cy="9.5" r="1" fill="#8C4FFF" />
  </svg>
);

export const AwsSnsIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#E7167B" />
    <path d="M6 12h20v8H6v-8zm4 2v4h2v-4H10zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2z" fill="#FFFFFF" />
  </svg>
);

export const AwsSqsIcon: React.FC<AwsIconProps> = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
    <rect width="32" height="32" rx="6" fill="#E7167B" />
    <path d="M8 9h16v3H8V9zm0 5.5h16v3H8v-3zm0 5.5h10v3H8v-3z" fill="#FFFFFF" />
  </svg>
);

export const getAwsIcon = (service: string, size: number = 24, style?: React.CSSProperties): React.ReactNode => {
  const s = service.toLowerCase();
  if (s.includes('ec2')) return <AwsEc2Icon size={size} style={style} />;
  if (s.includes('lambda')) return <AwsLambdaIcon size={size} style={style} />;
  if (s.includes('ecs') || s.includes('fargate') || s.includes('container')) return <AwsEcsIcon size={size} style={style} />;
  if (s.includes('aurora')) return <AwsAuroraIcon size={size} style={style} />;
  if (s.includes('dynamodb')) return <AwsDynamoDbIcon size={size} style={style} />;
  if (s.includes('rds')) return <AwsRdsIcon size={size} style={style} />;
  if (s.includes('s3') || s.includes('vault') || s.includes('bucket')) return <AwsS3Icon size={size} style={style} />;
  if (s.includes('route 53') || s.includes('dns')) return <AwsRoute53Icon size={size} style={style} />;
  if (s.includes('cloudfront') || s.includes('cdn')) return <AwsCloudFrontIcon size={size} style={style} />;
  if (s.includes('balancer') || s.includes('alb')) return <AwsAlbIcon size={size} style={style} />;
  if (s.includes('waf') || s.includes('shield')) return <AwsWafIcon size={size} style={style} />;
  if (s.includes('kms') || s.includes('encrypt') || s.includes('key')) return <AwsKmsIcon size={size} style={style} />;
  if (s.includes('bedrock') || s.includes('claude') || s.includes('ai') || s.includes('titan')) return <AwsBedrockIcon size={size} style={style} />;
  if (s.includes('vpc')) return <AwsVpcIcon size={size} style={style} />;
  if (s.includes('nat')) return <AwsNatIcon size={size} style={style} />;
  if (s.includes('internet gateway') || s.includes('igw')) return <AwsIgwIcon size={size} style={style} />;
  if (s.includes('cloudwatch') || s.includes('monitor')) return <AwsCloudWatchIcon size={size} style={style} />;
  if (s.includes('iam') || s.includes('identity')) return <AwsIamIcon size={size} style={style} />;
  if (s.includes('api gateway') || s.includes('apigateway')) return <AwsApiGatewayIcon size={size} style={style} />;
  if (s.includes('sns')) return <AwsSnsIcon size={size} style={style} />;
  if (s.includes('sqs')) return <AwsSqsIcon size={size} style={style} />;
  return <AwsEc2Icon size={size} style={style} />;
};
