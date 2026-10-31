import React, { useState, useEffect } from 'react';
import { X, FolderOpen, Trash2, ArrowRight, Clock, Plus } from 'lucide-react';
import { useArchitectureStore } from '../store';

export const ProjectListDialog: React.FC = () => {
  const { isProjectsOpen, setModal, resetCanvas } = useArchitectureStore();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isProjectsOpen) return;

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend offline, loading from localStorage', err);
      }

      // LocalStorage fallback
      const saved = localStorage.getItem('skysynclab_arch_project');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProjects([
            {
              id: 'local-1',
              name: parsed.name || 'architecture-diagram-1',
              description: parsed.description || 'Local autosaved diagram',
              updated_at: new Date().toISOString(),
              data: parsed.data
            }
          ]);
        } catch {}
      }
      setLoading(false);
    };

    fetchProjects();
  }, [isProjectsOpen]);

  if (!isProjectsOpen) return null;

  const handleLoadProject = async (p: any) => {
    if (p.data) {
      useArchitectureStore.setState({
        nodes: p.data.nodes || [],
        edges: p.data.edges || [],
        projectName: p.name || 'architecture-diagram-1',
        isProjectsOpen: false
      });
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/projects/${p.id}`);
      if (res.ok) {
        const details = await res.json();
        useArchitectureStore.setState({
          nodes: details.data.nodes || [],
          edges: details.data.edges || [],
          projectName: details.name || 'architecture-diagram-1',
          isProjectsOpen: false
        });
      }
    } catch (e) {
      console.error('Failed to load project details', e);
    }
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`http://127.0.0.1:8000/api/projects/${id}`, { method: 'DELETE' });
    } catch {}
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 10, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px'
      }}
      onClick={() => setModal('projects', false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: '#0F172A',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          color: '#F8FAFC',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(9, 9, 11, 0.15)',
                border: '1px solid #09090B',
                color: '#09090B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FolderOpen size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.08rem', fontWeight: 800 }}>
                Saved Architecture Projects
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                Stored in PostgreSQL & SQLite database
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                resetCanvas();
                setModal('projects', false);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '6px',
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                color: '#CBD5E1',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Plus size={14} />
              <span>New</span>
            </button>

            <button
              type="button"
              onClick={() => setModal('projects', false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Project List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => handleLoadProject(p)}
              style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              className="hover:border-orange-500"
            >
              <div>
                <div style={{ fontSize: '0.90rem', fontWeight: 800, color: '#F8FAFC' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Clock size={12} />
                  <span>{new Date(p.updated_at).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => handleDeleteProject(p.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title="Delete project"
                >
                  <Trash2 size={15} />
                </button>
                <div
                  style={{
                    padding: '5px 12px',
                    backgroundColor: '#09090B',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Open</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && !loading && (
            <div
              style={{
                textAlign: 'center',
                padding: '36px 12px',
                color: '#64748B',
                fontSize: '0.82rem'
              }}
            >
              No saved projects yet. Click "Save Project" in the header to store your first architecture.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
