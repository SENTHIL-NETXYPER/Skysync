import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Copy, Trash2 } from 'lucide-react';
import { getAwsIcon } from '../../components/AwsIcons';
import { useArchitectureStore } from '../store';

export const AwsNode: React.FC<NodeProps> = memo(({ id, data, selected }) => {
  const { duplicateNode, deleteNode } = useArchitectureStore();

  const service = (data.service as string) || 'Amazon EC2';
  const label = (data.label as string) || service;
  const sublabel = (data.sublabel as string) || (data.category as string) || 'Component';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        backgroundColor: '#0F172A',
        border: selected ? '2px solid #ED7100' : '1.5px solid #334155',
        borderRadius: '10px',
        padding: '8px 12px',
        minWidth: '150px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: selected
          ? '0 0 18px rgba(237, 113, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.6)'
          : '0 4px 16px rgba(0, 0, 0, 0.45)',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        position: 'relative'
      }}
      className="group"
    >
      {/* Target/Source Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ED7100',
          border: '2px solid #0F172A'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ED7100',
          border: '2px solid #0F172A'
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ED7100',
          border: '2px solid #0F172A'
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ED7100',
          border: '2px solid #0F172A'
        }}
      />

      {/* Official AWS Icon Badge */}
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {getAwsIcon(service, 34)}
      </div>

      {/* Node Labels */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div
          style={{
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#F8FAFC',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            letterSpacing: '-0.01em'
          }}
          title={label}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: '0.70rem',
            fontWeight: 600,
            color: '#94A3B8',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {sublabel}
        </div>
      </div>

      {/* Floating Action Menu on Node Hover/Select */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: '-32px',
            right: '0',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '6px',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            zIndex: 10
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              duplicateNode(id);
            }}
            title="Duplicate component"
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '3px',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ED7100')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            <Copy size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteNode(id);
            }}
            title="Delete component"
            style={{
              background: 'none',
              border: 'none',
              color: '#EF4444',
              cursor: 'pointer',
              padding: '3px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}
    </div>
  );
});

AwsNode.displayName = 'AwsNode';
