import React, { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Cloud, Flag, Network, ShieldCheck, Lock } from 'lucide-react';

export const AwsGroupNode: React.FC<NodeProps> = memo(({ data, selected }) => {
  const variant = (data.variant as string) || 'cloud';
  const label = (data.label as string) || 'Group';

  const isVpc = variant === 'vpc';
  const isRegion = variant === 'region';
  const isPublicSubnet = variant === 'subnet-public';
  const isPrivateSubnet = variant === 'subnet-private';

  const borderColor = isVpc
    ? '#22C55E'
    : isPublicSubnet
    ? '#16A34A'
    : isPrivateSubnet
    ? '#0284C7'
    : isRegion
    ? '#3B82F6'
    : '#ED7100';

  const badgeBg = isVpc
    ? '#15803D'
    : isPublicSubnet
    ? '#15803D'
    : isPrivateSubnet
    ? '#0369A1'
    : isRegion
    ? '#1D4ED8'
    : '#ED7100';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        border: `1.5px dashed ${borderColor}`,
        backgroundColor: isPrivateSubnet
          ? 'rgba(2, 132, 199, 0.04)'
          : isPublicSubnet
          ? 'rgba(22, 163, 74, 0.04)'
          : isVpc
          ? 'rgba(34, 197, 94, 0.02)'
          : 'rgba(15, 23, 42, 0.25)',
        position: 'relative',
        boxShadow: selected ? `0 0 12px ${borderColor}60` : 'none',
        pointerEvents: 'all'
      }}
    >
      {/* Top-left Group Badge */}
      <div
        style={{
          position: 'absolute',
          top: '-12px',
          left: '12px',
          backgroundColor: badgeBg,
          color: '#FFFFFF',
          borderRadius: '5px',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.02em',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          whiteSpace: 'pre-line'
        }}
      >
        {isRegion ? (
          <Flag size={12} strokeWidth={2.4} />
        ) : isVpc ? (
          <Network size={12} strokeWidth={2.4} />
        ) : isPublicSubnet ? (
          <ShieldCheck size={12} strokeWidth={2.4} />
        ) : isPrivateSubnet ? (
          <Lock size={12} strokeWidth={2.4} />
        ) : (
          <Cloud size={12} strokeWidth={2.4} />
        )}
        <span>{label}</span>
      </div>
    </div>
  );
});

AwsGroupNode.displayName = 'AwsGroupNode';
