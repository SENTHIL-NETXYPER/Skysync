import React, { useState } from 'react';
import { Edit2, Check } from 'lucide-react';
import { useArchitectureStore } from '../store';

export const StatusBar: React.FC = () => {
  const {
    projectName,
    setProjectName,
    nodes,
    edges,
    lastSavedText
  } = useArchitectureStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(projectName);

  const componentCount = nodes.filter((n) => n.type !== 'awsGroup').length;
  const connectionCount = edges.length;

  const handleSaveName = () => {
    if (tempName.trim()) {
      setProjectName(tempName.trim());
    }
    setIsEditing(false);
  };

  return (
    <footer
      style={{
        height: '38px',
        backgroundColor: '#0B1120',
        borderTop: '1px solid #1E293B',
        padding: '0 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.76rem',
        color: '#94A3B8',
        zIndex: 20,
        flexShrink: 0
      }}
    >
      {/* Editable Diagram Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              autoFocus
              style={{
                backgroundColor: '#0F172A',
                border: '1px solid #E7167B',
                borderRadius: '4px',
                color: '#F8FAFC',
                padding: '2px 8px',
                fontSize: '0.76rem',
                outline: 'none'
              }}
            />
            <button
              type="button"
              onClick={handleSaveName}
              style={{
                background: 'none',
                border: 'none',
                color: '#16A34A',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <Check size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTempName(projectName);
              setIsEditing(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#F8FAFC',
              fontWeight: 700,
              fontSize: '0.76rem',
              cursor: 'pointer',
              padding: 0
            }}
            title="Click to rename diagram"
          >
            <span>{projectName}</span>
            <Edit2 size={12} style={{ color: '#64748B' }} />
          </button>
        )}
      </div>

      {/* Stats and Autosave */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block'
            }}
          />
          <span style={{ color: '#CBD5E1', fontWeight: 600 }}>
            {componentCount} components · {connectionCount} connections
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B' }}>
          <span>✓ {lastSavedText}</span>
        </div>
      </div>
    </footer>
  );
};
