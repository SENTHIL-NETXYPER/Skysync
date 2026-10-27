import React, { useState, useEffect } from 'react';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import { useArchitectureStore } from '../store';
import { getAwsIcon } from '../../components/AwsIcons';

export const PropertiesSidebar: React.FC = () => {
  const { isPropertiesOpen, toggleProperties, selectedNode, updateNodeProperties } =
    useArchitectureStore();

  const [activeTab, setActiveTab] = useState<'General' | 'Advanced' | 'Tags'>('General');

  // Form State
  const [name, setName] = useState('');
  const [instanceType, setInstanceType] = useState('t3.micro');
  const [subnet, setSubnet] = useState('Private Subnet (10.0.2.0/24)');
  const [autoScaling, setAutoScaling] = useState('Enabled');
  const [minInstances, setMinInstances] = useState(2);
  const [maxInstances, setMaxInstances] = useState(6);
  const [notes, setNotes] = useState('');
  const [multiAz, setMultiAz] = useState(true);
  const [encrypted, setEncrypted] = useState(true);
  const [iamRole, setIamRole] = useState('NetXyper-EC2-InstanceRole');
  const [securityGroups, setSecurityGroups] = useState('sg-web-production');
  const [tags, setTags] = useState<{ key: string; value: string }[]>([
    { key: 'Environment', value: 'Production' },
    { key: 'Project', value: 'NetXyper' }
  ]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      const d = selectedNode.data || {};
      setName((d.label as string) || (d.service as string) || '');
      setInstanceType((d.instanceType as string) || 't3.micro');
      setSubnet((d.subnet as string) || 'Private Subnet (10.0.2.0/24)');
      setAutoScaling((d.autoScaling as string) || 'Enabled');
      setMinInstances((d.minInstances as number) || 2);
      setMaxInstances((d.maxInstances as number) || 6);
      setNotes((d.notes as string) || '');
      setMultiAz(d.multiAz !== false);
      setEncrypted(d.encrypted !== false);
      setIsSaved(false);
    }
  }, [selectedNode]);

  if (!isPropertiesOpen || !selectedNode || selectedNode.type === 'awsGroup') {
    return null;
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    updateNodeProperties(selectedNode.id, {
      label: name,
      instanceType,
      subnet,
      autoScaling,
      minInstances,
      maxInstances,
      notes,
      multiAz,
      encrypted,
      iamRole,
      securityGroups,
      tags
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1800);
  };

  const service = (selectedNode.data?.service as string) || 'Amazon EC2';
  const category = (selectedNode.data?.category as string) || 'Compute';

  return (
    <aside
      style={{
        width: '280px',
        backgroundColor: '#0B1120',
        borderLeft: '1px solid #1E293B',
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
            Properties
          </div>
          <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
            Configure the selected component
          </div>
        </div>
        <button
          type="button"
          onClick={toggleProperties}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Close properties"
        >
          <X size={16} />
        </button>
      </div>

      {/* Selected Component Header Card */}
      <div style={{ padding: '12px 14px 0 14px' }}>
        <div
          style={{
            backgroundColor: '#0F172A',
            border: '1px solid #1E293B',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {getAwsIcon(service, 36)}
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#F8FAFC' }}>
              {service}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>
              {category}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Tab Bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #1E293B',
          padding: '10px 14px 0 14px',
          gap: '16px'
        }}
      >
        {(['General', 'Advanced', 'Tags'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid #ED7100' : '2px solid transparent',
                paddingBottom: '8px',
                fontSize: '0.78rem',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#ED7100' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab Content Form */}
      <form
        onSubmit={handleApply}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {activeTab === 'General' && (
          <>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Instance type
              </label>
              <select
                value={instanceType}
                onChange={(e) => setInstanceType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="t3.micro">t3.micro (2 vCPU, 1 GiB)</option>
                <option value="t4g.xlarge">t4g.xlarge (4 vCPU, 16 GiB)</option>
                <option value="c6i.2xlarge">c6i.2xlarge (8 vCPU, 16 GiB)</option>
                <option value="m6i.large">m6i.large (2 vCPU, 8 GiB)</option>
                <option value="db.r6g.xlarge">db.r6g.xlarge (Aurora Multi-AZ)</option>
                <option value="Serverless">Serverless On-Demand</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Subnet
              </label>
              <select
                value={subnet}
                onChange={(e) => setSubnet(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Public Subnet (10.0.1.0/24)">Public Subnet (10.0.1.0/24)</option>
                <option value="Private Subnet (10.0.2.0/24)">Private Subnet (10.0.2.0/24) - App</option>
                <option value="Private Subnet (10.0.3.0/24)">Private Subnet (10.0.3.0/24) - DB</option>
                <option value="Private Subnet (10.0.4.0/24)">Private Subnet (10.0.4.0/24) - Storage</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Auto Scaling
              </label>
              <select
                value={autoScaling}
                onChange={(e) => setAutoScaling(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                  Min instances
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={minInstances}
                  onChange={(e) => setMinInstances(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '0.80rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                  Max instances
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={maxInstances}
                  onChange={(e) => setMaxInstances(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#F8FAFC',
                    fontSize: '0.80rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Technical notes or workload specs..."
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </>
        )}

        {activeTab === 'Advanced' && (
          <>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                IAM Instance Profile
              </label>
              <input
                type="text"
                value={iamRole}
                onChange={(e) => setIamRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                Security Groups
              </label>
              <input
                type="text"
                value={securityGroups}
                onChange={(e) => setSecurityGroups(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#F8FAFC',
                  fontSize: '0.80rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#CBD5E1' }}>
                <input
                  type="checkbox"
                  checked={multiAz}
                  onChange={(e) => setMultiAz(e.target.checked)}
                  style={{ accentColor: '#ED7100' }}
                />
                Multi-AZ High Availability
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#CBD5E1' }}>
                <input
                  type="checkbox"
                  checked={encrypted}
                  onChange={(e) => setEncrypted(e.target.checked)}
                  style={{ accentColor: '#ED7100' }}
                />
                KMS Volume Encryption at Rest
              </label>
            </div>
          </>
        )}

        {activeTab === 'Tags' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700 }}>
              Resource Tags
            </div>
            {tags.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={t.key}
                  onChange={(e) => {
                    const next = [...tags];
                    next[i].key = e.target.value;
                    setTags(next);
                  }}
                  placeholder="Key"
                  style={{
                    flex: 1,
                    padding: '5px 8px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    color: '#F8FAFC',
                    fontSize: '0.76rem'
                  }}
                />
                <input
                  type="text"
                  value={t.value}
                  onChange={(e) => {
                    const next = [...tags];
                    next[i].value = e.target.value;
                    setTags(next);
                  }}
                  placeholder="Value"
                  style={{
                    flex: 1,
                    padding: '5px 8px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    color: '#F8FAFC',
                    fontSize: '0.76rem'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setTags([...tags, { key: '', value: '' }])}
              style={{
                background: '#1E293B',
                border: '1px dashed #334155',
                color: '#94A3B8',
                borderRadius: '6px',
                padding: '6px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Plus size={13} /> Add Tag
            </button>
          </div>
        )}

        {/* Apply Changes Button matching solid AWS orange style */}
        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '9px 16px',
              backgroundColor: isSaved ? '#16A34A' : '#ED7100',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '7px',
              fontSize: '0.84rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.18s ease',
              boxShadow: '0 4px 12px rgba(237, 113, 0, 0.35)'
            }}
          >
            {isSaved ? <Check size={16} /> : null}
            <span>{isSaved ? 'Changes Applied' : 'Apply changes'}</span>
          </button>
        </div>
      </form>
    </aside>
  );
};
