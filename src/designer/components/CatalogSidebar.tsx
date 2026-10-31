import React from 'react';
import { Search, X, Plus } from 'lucide-react';
import { useArchitectureStore } from '../store';
import { AWS_CATALOG } from '../catalogData';
import type { AwsCategory } from '../types';
import { getAwsIcon } from '../../components/AwsIcons';

const CATEGORIES: AwsCategory[] = [
  'All',
  'Compute',
  'Storage',
  'Networking',
  'Databases',
  'AI & ML',
  'Containers',
  'Integration',
  'Security',
  'Management',
  'Migration'
];

export const CatalogSidebar: React.FC = () => {
  const {
    isCatalogOpen,
    toggleCatalog,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    addCatalogNode
  } = useArchitectureStore();

  if (!isCatalogOpen) return null;

  const filteredItems = AWS_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spec.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const onDragStart = (event: React.DragEvent, item: any) => {
    event.dataTransfer.setData('application/reactflow/item', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#0B1120',
        borderRight: '1px solid #1E293B',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        zIndex: 20,
        flexShrink: 0
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: '16px 14px 12px 16px',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#F8FAFC' }}>
            AWS Components
          </div>
          <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
            Drag and drop to the canvas
          </div>
        </div>
        <button
          type="button"
          onClick={toggleCatalog}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px'
          }}
          title="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Search Input */}
      <div style={{ padding: '12px 14px' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '10px',
              color: '#64748B',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AWS services..."
            style={{
              width: '100%',
              padding: '7px 10px 7px 30px',
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '7px',
              color: '#F8FAFC',
              fontSize: '0.80rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* Category Pills (2-column wrap) */}
      <div
        style={{
          padding: '0 12px 12px 12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px'
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '4px 9px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: isActive ? 800 : 600,
                backgroundColor: isActive ? '#C5A46D' : '#1E293B',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                border: isActive ? '1px solid #C5A46D' : '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Components List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 12px 16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.service}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            onClick={() => addCatalogNode(item)}
            style={{
              backgroundColor: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: '8px',
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'grab',
              transition: 'all 0.18s ease'
            }}
            className="hover:border-slate-500 hover:bg-slate-800"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {getAwsIcon(item.service, 30)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    lineHeight: 1.2
                  }}
                >
                  {item.service}
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#64748B',
                    fontWeight: 500
                  }}
                >
                  {item.category}
                </div>
              </div>
            </div>

            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '3px'
              }}
              title="Add to canvas"
            >
              <Plus size={14} />
            </button>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '24px 8px',
              color: '#64748B',
              fontSize: '0.78rem'
            }}
          >
            No matching AWS services found.
          </div>
        )}
      </div>
    </aside>
  );
};
