import React, { useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MiniMap,
  useReactFlow,
  type Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useArchitectureStore } from './store';
import type { AwsCatalogItem } from './types';
import { AwsNode } from './components/AwsNode';
import { AwsGroupNode } from './components/AwsGroupNode';
import { TopHeader } from './components/TopHeader';
import { CatalogSidebar } from './components/CatalogSidebar';
import { PropertiesSidebar } from './components/PropertiesSidebar';
import { CanvasToolbar } from './components/CanvasToolbar';
import { StatusBar } from './components/StatusBar';
import { ValidationDialog } from './components/ValidationDialog';
import { CodeExportDialog } from './components/CodeExportDialog';
import { AiArchitectDialog } from './components/AiArchitectDialog';
import { TemplatesDialog } from './components/TemplatesDialog';
import { ProjectListDialog } from './components/ProjectListDialog';

interface ArchitectureDesignerAppProps {
  onBackToSite?: () => void;
}

const FlowCanvas: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    addCatalogNode
  } = useArchitectureStore();

  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const nodeTypes = useMemo(
    () => ({
      awsService: AwsNode,
      awsGroup: AwsGroupNode
    }),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const serviceJson = event.dataTransfer.getData('application/reactflow-aws');
      if (!serviceJson) return;

      try {
        const item: AwsCatalogItem = JSON.parse(serviceJson);
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY
        });
        addCatalogNode(item, position);
      } catch (err) {
        console.error('Error dropping item:', err);
      }
    },
    [screenToFlowPosition, addCatalogNode]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node);
    },
    [selectNode]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div
      ref={reactFlowWrapper}
      className="relative flex-1 h-full w-full overflow-hidden bg-[#0A0E1A]"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2.5}
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Meta', 'Shift']}
        selectionOnDrag={true}
        panOnDrag={[1, 2]}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#ED7100', strokeWidth: 2 }
        }}
        className="aws-designer-canvas"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.2}
          color="#1E293B"
          style={{ backgroundColor: '#070A12' }}
        />

        {/* Floating Canvas Action Toolbar */}
        <CanvasToolbar />

        {/* MiniMap in lower left */}
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(n) => {
            if (n.type === 'awsGroup') {
              return '#1E293B';
            }
            const cat = n.data?.category as string;
            switch (cat) {
              case 'Compute':
                return '#ED7100';
              case 'Storage':
                return '#16A34A';
              case 'Databases':
                return '#2563EB';
              case 'Networking':
                return '#8B5CF6';
              case 'AI & ML':
                return '#D946EF';
              case 'Security':
                return '#DC2626';
              default:
                return '#F59E0B';
            }
          }}
          maskColor="rgba(10, 14, 26, 0.75)"
          style={{
            bottom: 40,
            left: 20,
            backgroundColor: '#0F172A',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            width: 140,
            height: 90
          }}
        />
      </ReactFlow>
    </div>
  );
};

export const ArchitectureDesignerApp: React.FC<ArchitectureDesignerAppProps> = ({
  onBackToSite
}) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen w-screen bg-[#070A12] text-white overflow-hidden select-none font-sans">
        {/* Top Header Navigation & Primary Actions */}
        <TopHeader onBackToSite={onBackToSite} />

        {/* Studio Body: Catalog Sidebar | Canvas | Properties Sidebar */}
        <div className="relative flex flex-1 w-full h-[calc(100vh-100px)] overflow-hidden">
          <CatalogSidebar />
          <FlowCanvas />
          <PropertiesSidebar />
        </div>

        {/* Bottom Status Bar */}
        <StatusBar />

        {/* Interactive Studio Modals & Dialogs */}
        <ValidationDialog />
        <CodeExportDialog />
        <AiArchitectDialog />
        <TemplatesDialog />
        <ProjectListDialog />
      </div>
    </ReactFlowProvider>
  );
};

export default ArchitectureDesignerApp;
