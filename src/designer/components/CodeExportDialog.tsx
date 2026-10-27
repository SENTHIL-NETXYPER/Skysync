import React, { useState, useEffect } from 'react';
import { X, Copy, Download, Check, FileCode } from 'lucide-react';
import { useArchitectureStore } from '../store';

export const CodeExportDialog: React.FC = () => {
  const {
    isCodeExportOpen,
    setModal,
    codeFormat,
    setCodeFormat,
    nodes,
    edges,
    projectName
  } = useArchitectureStore();

  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isCodeExportOpen) return;

    const fetchCode = async () => {
      setLoading(true);
      const endpoint =
        codeFormat === 'terraform'
          ? 'http://127.0.0.1:8000/api/generate-terraform'
          : 'http://127.0.0.1:8000/api/generate-cloudformation';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes, edges })
        });
        if (res.ok) {
          const data = await res.json();
          setCode(data.code);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend code generator offline, generating in browser', err);
      }

      // Browser Fallback Generator
      if (codeFormat === 'terraform') {
        const lines = [
          '# SkySyncLab Cloud Infrastructure - Terraform Blueprint',
          `# Generated: ${new Date().toISOString()}`,
          '',
          'terraform {',
          '  required_version = ">= 1.5.0"',
          '  required_providers {',
          '    aws = { source = "hashicorp/aws", version = "~> 5.0" }',
          '  }',
          '}',
          '',
          'provider "aws" {',
          '  region = "ap-south-1"',
          '  default_tags { tags = { ManagedBy = "SkySyncLab-Architect" } }',
          '}',
          '',
          'resource "aws_vpc" "main" {',
          '  cidr_block           = "10.0.0.0/16"',
          '  enable_dns_hostnames = true',
          '  tags = { Name = "skysynclab-vpc" }',
          '}'
        ];

        nodes.forEach((n) => {
          if (n.type === 'awsGroup') return;
          const svc = (n.data?.service as string) || '';
          const name = ((n.data?.label as string) || 'resource').toLowerCase().replace(/[^a-z0-9_]/g, '_');
          if (svc.includes('EC2')) {
            lines.push(`\nresource "aws_instance" "${name}" {`);
            lines.push(`  ami           = "ami-03f4878e83d3e318f"`);
            lines.push(`  instance_type = "${n.data?.instanceType || 't3.micro'}"`);
            lines.push(`  tags          = { Name = "${n.data?.label}" }`);
            lines.push(`}`);
          } else if (svc.includes('S3')) {
            lines.push(`\nresource "aws_s3_bucket" "${name}" {`);
            lines.push(`  bucket_prefix = "skysynclab-${name}-"`);
            lines.push(`}`);
          } else if (svc.includes('Aurora') || svc.includes('RDS')) {
            lines.push(`\nresource "aws_rds_cluster" "${name}" {`);
            lines.push(`  cluster_identifier = "skysynclab-${name}"`);
            lines.push(`  engine             = "aurora-postgresql"`);
            lines.push(`  database_name      = "appdb"`);
            lines.push(`  storage_encrypted  = true`);
            lines.push(`}`);
          }
        });

        setCode(lines.join('\n'));
      } else {
        const yaml = [
          "AWSTemplateFormatVersion: '2010-09-09'",
          "Description: SkySyncLab Cloud Architecture Blueprint - CloudFormation",
          "Resources:",
          "  VPC:",
          "    Type: AWS::EC2::VPC",
          "    Properties:",
          "      CidrBlock: 10.0.0.0/16",
          "      EnableDnsHostnames: true"
        ];
        setCode(yaml.join('\n'));
      }
      setLoading(false);
    };

    fetchCode();
  }, [isCodeExportOpen, codeFormat, nodes, edges]);

  if (!isCodeExportOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${projectName || 'aws-architecture'}.${codeFormat === 'terraform' ? 'tf' : 'yaml'}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
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
      onClick={() => setModal('code', false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          backgroundColor: '#0F172A',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '22px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          color: '#F8FAFC',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(140, 79, 255, 0.15)',
                border: '1px solid #8C4FFF',
                color: '#8C4FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileCode size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.08rem', fontWeight: 800 }}>
                Infrastructure as Code (IaC) Export
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                Instant Terraform HCL & CloudFormation templates derived from your canvas
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModal('code', false)}
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

        {/* Format Selector Tab */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            borderBottom: '1px solid #1E293B',
            paddingBottom: '8px'
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setCodeFormat('terraform')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.80rem',
                fontWeight: 700,
                backgroundColor: codeFormat === 'terraform' ? '#8C4FFF' : '#1E293B',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Terraform (HCL)
            </button>
            <button
              type="button"
              onClick={() => setCodeFormat('cloudformation')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.80rem',
                fontWeight: 700,
                backgroundColor: codeFormat === 'cloudformation' ? '#ED7100' : '#1E293B',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              AWS CloudFormation (YAML)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                padding: '6px 12px',
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: '#F8FAFC',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {copied ? <Check size={14} style={{ color: '#16A34A' }} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              style={{
                padding: '6px 14px',
                backgroundColor: '#ED7100',
                border: 'none',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Content Box */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#090D16',
            border: '1px solid #1E293B',
            borderRadius: '10px',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            lineHeight: 1.55,
            color: '#E2E8F0',
            whiteSpace: 'pre-wrap'
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
              Generating production IaC template from architecture...
            </div>
          ) : (
            code
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #1E293B' }}>
          <button
            type="button"
            onClick={() => setModal('code', false)}
            style={{
              padding: '7px 18px',
              borderRadius: '8px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              color: '#F8FAFC',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
