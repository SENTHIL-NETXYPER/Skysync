import React, { useState, useRef, useEffect } from 'react';
import {
  Cloud, Bell, Save, Download, Sparkles, ShieldCheck,
  FileCode, ChevronDown, Check
} from 'lucide-react';
import { useArchitectureStore } from '../store';
import { toPng, toSvg } from 'html-to-image';

interface TopHeaderProps {
  onBackToSite?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onBackToSite }) => {
  const {
    saveProject,
    runValidation,
    setModal,
    setCodeFormat,
    nodes,
    edges,
    projectName
  } = useArchitectureStore();

  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExportDropdownOpen(false);
      }
    };
    if (exportDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [exportDropdownOpen]);

  const handleSave = async () => {
    await saveProject();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const exportAsPng = async () => {
    setExportDropdownOpen(false);
    const flowElement = document.querySelector('.react-flow') as HTMLElement;
    if (!flowElement) return;

    try {
      const dataUrl = await toPng(flowElement, {
        backgroundColor: '#0A0E1A',
        quality: 1,
        pixelRatio: 2
      });
      const a = document.createElement('a');
      a.download = `${projectName || 'aws-architecture'}.png`;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error('Failed to export PNG', err);
    }
  };

  const exportAsSvg = async () => {
    setExportDropdownOpen(false);
    const flowElement = document.querySelector('.react-flow') as HTMLElement;
    if (!flowElement) return;

    try {
      const dataUrl = await toSvg(flowElement, {
        backgroundColor: '#0A0E1A'
      });
      const a = document.createElement('a');
      a.download = `${projectName || 'aws-architecture'}.svg`;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error('Failed to export SVG', err);
    }
  };

  const exportAsJson = () => {
    setExportDropdownOpen(false);
    const data = {
      project: projectName,
      timestamp: new Date().toISOString(),
      nodes,
      edges
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `${projectName || 'aws-architecture'}.json`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header
      style={{
        backgroundColor: '#0B1120',
        borderBottom: '1px solid #1E293B',
        zIndex: 30,
        flexShrink: 0
      }}
    >
      {/* Upper Navigation Bar */}
      <div
        style={{
          height: '52px',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(30, 41, 59, 0.7)'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <button
            type="button"
            onClick={onBackToSite}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
            title="Return to SkySyncLab Overview"
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(197, 164, 109, 0.15)',
                border: '1.5px solid #C5A46D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C5A46D'
              }}
            >
              <Cloud size={18} strokeWidth={2.4} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#F8FAFC' }}>
                SkySync<span style={{ color: '#C5A46D' }}>Lab</span>
              </span>
              <span style={{ fontSize: '0.66rem', color: '#64748B', fontWeight: 700, display: 'block' }}>
                CLOUD • DEVOPS • AI
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '2px solid #C5A46D',
                paddingBottom: '14px',
                marginTop: '14px',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#F8FAFC',
                cursor: 'pointer'
              }}
            >
              Architecture Designer
            </button>

            <button
              type="button"
              onClick={() => setModal('templates', true)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Templates
            </button>

            <button
              type="button"
              onClick={() => setModal('projects', true)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Projects
            </button>

            <button
              type="button"
              onClick={() => window.open('https://aws.amazon.com/architecture/', '_blank')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              Documentation
            </button>
          </nav>
        </div>

        {/* User Info & Notification */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <Bell size={17} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px 4px 4px',
              borderRadius: '9999px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                fontSize: '0.74rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              S
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC' }}>
              Senthil
            </span>
          </div>
        </div>
      </div>

      {/* Main Title & Action Bar */}
      <div
        style={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#F8FAFC',
              margin: '0 0 2px 0',
              letterSpacing: '-0.02em'
            }}
          >
            AWS Architecture Designer
          </h1>
          <p
            style={{
              fontSize: '0.78rem',
              color: '#94A3B8',
              margin: 0
            }}
          >
            Design, connect and export standard AWS cloud architectures.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          {/* Validate Architecture Button */}
          <button
            type="button"
            onClick={runValidation}
            style={{
              padding: '7px 12px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '7px',
              color: '#CBD5E1',
              fontSize: '0.80rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10B981';
              e.currentTarget.style.color = '#10B981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#CBD5E1';
            }}
          >
            <ShieldCheck size={15} style={{ color: '#10B981' }} />
            <span>Validate</span>
          </button>

          {/* AI Architect Assistant Button */}
          <button
            type="button"
            onClick={() => setModal('ai', true)}
            style={{
              padding: '7px 12px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '7px',
              color: '#CBD5E1',
              fontSize: '0.80rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C925D1';
              e.currentTarget.style.color = '#C925D1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#CBD5E1';
            }}
          >
            <Sparkles size={15} style={{ color: '#C925D1' }} />
            <span>AI Architect</span>
          </button>

          {/* Terraform / CloudFormation IaC Code Generator */}
          <button
            type="button"
            onClick={() => {
              setCodeFormat('terraform');
              setModal('code', true);
            }}
            style={{
              padding: '7px 12px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '7px',
              color: '#CBD5E1',
              fontSize: '0.80rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#8C4FFF';
              e.currentTarget.style.color = '#8C4FFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.color = '#CBD5E1';
            }}
          >
            <FileCode size={15} style={{ color: '#8C4FFF' }} />
            <span>IaC Code</span>
          </button>

          {/* Save Project Button */}
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '7px 14px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '7px',
              color: '#F8FAFC',
              fontSize: '0.80rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C5A46D')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#334155')}
          >
            {saveSuccess ? <Check size={15} style={{ color: '#16A34A' }} /> : <Save size={15} />}
            <span>{saveSuccess ? 'Saved!' : 'Save Project'}</span>
          </button>

          {/* Export Diagram Button with Dropdown matching user mockup */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
              style={{
                padding: '7px 16px',
                backgroundColor: '#C5A46D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '7px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(197, 164, 109, 0.45)',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF8A00')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C5A46D')}
            >
              <Download size={15} />
              <span>Export Diagram</span>
              <ChevronDown size={14} />
            </button>

            {exportDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  padding: '6px',
                  minWidth: '190px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <button
                  type="button"
                  onClick={exportAsPng}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '0.80rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>🖼️ Export as PNG Image</span>
                </button>

                <button
                  type="button"
                  onClick={exportAsSvg}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '0.80rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>📐 Export as SVG Vector</span>
                </button>

                <button
                  type="button"
                  onClick={exportAsJson}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '0.80rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>📦 Export as JSON Schema</span>
                </button>

                <div style={{ height: '1px', backgroundColor: '#334155', margin: '4px 0' }} />

                <button
                  type="button"
                  onClick={() => {
                    setCodeFormat('terraform');
                    setModal('code', true);
                    setExportDropdownOpen(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#C5A46D',
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1E293B')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>⚡ Export as Terraform HCL</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
