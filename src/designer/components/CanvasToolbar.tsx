import React from 'react';
import {
  MousePointer, Link as LinkIcon, RotateCcw, RotateCw,
  Sparkles, RefreshCw, Maximize2
} from 'lucide-react';
import { useArchitectureStore } from '../store';
import { useReactFlow } from '@xyflow/react';

export const CanvasToolbar: React.FC = () => {
  const {
    toolMode,
    setToolMode,
    undo,
    redo,
    past,
    future,
    autoArrange,
    resetCanvas,
    zoom
  } = useArchitectureStore();

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleReset = () => {
    resetCanvas();
    fitView({ padding: 0.15, duration: 400 });
  };

  const handleFit = () => {
    fitView({ padding: 0.15, duration: 400 });
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '16px',
        left: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 10
      }}
    >
      {/* Tool Mode & Action Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '4px 6px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
          pointerEvents: 'auto'
        }}
      >
        <button
          type="button"
          onClick={() => setToolMode('select')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: toolMode === 'select' ? 'rgba(9, 9, 11, 0.15)' : 'transparent',
            border: toolMode === 'select' ? '1px solid #09090B' : '1px solid transparent',
            color: toolMode === 'select' ? '#09090B' : '#94A3B8',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <MousePointer size={14} />
          <span>Select</span>
        </button>

        <button
          type="button"
          onClick={() => setToolMode('connect')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: toolMode === 'connect' ? 'rgba(9, 9, 11, 0.15)' : 'transparent',
            border: toolMode === 'connect' ? '1px solid #09090B' : '1px solid transparent',
            color: toolMode === 'connect' ? '#09090B' : '#94A3B8',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <LinkIcon size={14} />
          <span>Connect</span>
        </button>

        <div style={{ width: '1px', height: '18px', backgroundColor: '#334155', margin: '0 4px' }} />

        <button
          type="button"
          onClick={undo}
          disabled={past.length === 0}
          title="Undo (Ctrl+Z)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 10px',
            borderRadius: '6px',
            background: 'none',
            border: 'none',
            color: past.length > 0 ? '#CBD5E1' : '#475569',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: past.length > 0 ? 'pointer' : 'default'
          }}
        >
          <RotateCcw size={14} />
          <span>Undo</span>
        </button>

        <button
          type="button"
          onClick={redo}
          disabled={future.length === 0}
          title="Redo (Ctrl+Y)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 10px',
            borderRadius: '6px',
            background: 'none',
            border: 'none',
            color: future.length > 0 ? '#CBD5E1' : '#475569',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: future.length > 0 ? 'pointer' : 'default'
          }}
        >
          <RotateCw size={14} />
          <span>Redo</span>
        </button>

        <div style={{ width: '1px', height: '18px', backgroundColor: '#334155', margin: '0 4px' }} />

        <button
          type="button"
          onClick={autoArrange}
          title="Auto arrange nodes into AWS standard tiers"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            color: '#F8FAFC',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#09090B')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#334155')}
        >
          <Sparkles size={13} style={{ color: '#09090B' }} />
          <span>Auto-arrange</span>
        </button>
      </div>

      {/* Zoom & Viewport Controls Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '4px 8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
          pointerEvents: 'auto'
        }}
      >
        <button
          type="button"
          onClick={() => zoomOut({ duration: 250 })}
          style={{
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            cursor: 'pointer',
            padding: '4px 6px',
            fontSize: '0.88rem',
            fontWeight: 700
          }}
          title="Zoom out"
        >
          −
        </button>

        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#F8FAFC',
            minWidth: '42px',
            textAlign: 'center'
          }}
        >
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={() => zoomIn({ duration: 250 })}
          style={{
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            cursor: 'pointer',
            padding: '4px 6px',
            fontSize: '0.88rem',
            fontWeight: 700
          }}
          title="Zoom in"
        >
          +
        </button>

        <div style={{ width: '1px', height: '18px', backgroundColor: '#334155', margin: '0 4px' }} />

        <button
          type="button"
          onClick={handleReset}
          title="Reset canvas"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            cursor: 'pointer',
            padding: '4px 8px',
            fontSize: '0.76rem',
            fontWeight: 600
          }}
        >
          <RefreshCw size={13} />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={handleFit}
          title="Fit to view"
          style={{
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            cursor: 'pointer',
            padding: '4px 6px'
          }}
        >
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
};
