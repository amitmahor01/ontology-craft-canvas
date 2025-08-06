'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Panel,
  getBezierPath,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ClassNode from './components/ClassNode';
import InstanceNode from './components/InstanceNode';
import PropertyNode from './components/PropertyNode';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { generateId } from './utils/idGenerator';
import { 
  exportToTurtleFile, 
  exportToOWLFile, 
  exportToRDFFile, 
  exportToJSONLDFile,
  importFromJSONLD
} from './utils/exportUtils';

const nodeTypes = {
  class: ClassNode,
  instance: InstanceNode,
  property: PropertyNode,
};

// Enhanced custom edge component with better label handling
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, data, selected }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        stroke={selected ? "#2563eb" : "#555"}
        strokeWidth={selected ? 3 : 2}
        markerEnd={MarkerType.ArrowClosed}
      />
      <foreignObject
        width={120}
        height={40}
        x={labelX - 60}
        y={labelY - 20}
        className="edge-label-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="flex items-center justify-center h-full">
          <div className="bg-white px-2 py-1 rounded border text-xs font-medium text-gray-700 shadow-sm">
            {data?.label || 'Relation'}
          </div>
        </div>
      </foreignObject>
    </>
  );
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function OntologyCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [validationStatus, setValidationStatus] = useState('valid');
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnecting, setIsConnecting] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Improved connection validation - more flexible for ontology relationships
  const isValidConnection = useCallback((connection) => {
    // Prevent self-connections
    if (connection.source === connection.target) {
      return false;
    }

    // Get source and target nodes
    const sourceNode = nodes.find(node => node.id === connection.source);
    const targetNode = nodes.find(node => node.id === connection.target);

    if (!sourceNode || !targetNode) {
      return false;
    }

    // Check for existing connections between these nodes
    const existingConnection = edges.find(edge => 
      (edge.source === connection.source && edge.target === connection.target) ||
      (edge.source === connection.target && edge.target === connection.source)
    );

    if (existingConnection) {
      return false;
    }

    // More flexible connection rules for ontology relationships
    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    // Allow all valid ontology relationships
    const validConnections = {
      class: ['class', 'instance', 'property'], // Class can connect to class (subclass), instance, or property
      instance: ['class', 'instance', 'property'], // Instance can connect to class, instance, or property
      property: ['class', 'instance', 'property'], // Property can connect to class, instance, or property
    };

    return validConnections[sourceType]?.includes(targetType) || false;
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => {
      // Validate the connection
      if (!isValidConnection(params)) {
        console.warn('Invalid connection attempted:', params);
        return;
      }

      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);

      // Generate appropriate default label based on node types
      let defaultLabel = 'hasRelation';
      if (sourceNode.type === 'class' && targetNode.type === 'class') {
        defaultLabel = 'subClassOf';
      } else if (sourceNode.type === 'instance' && targetNode.type === 'class') {
        defaultLabel = 'instanceOf';
      } else if (sourceNode.type === 'property' && targetNode.type === 'class') {
        defaultLabel = 'domain';
      } else if (sourceNode.type === 'class' && targetNode.type === 'property') {
        defaultLabel = 'range';
      }

      const newEdge = {
        ...params,
        id: generateId(),
        data: { label: defaultLabel },
        type: 'custom',
        animated: false,
        style: { stroke: '#555', strokeWidth: 2 },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      setIsConnecting(false);
    },
    [setEdges, isValidConnection, nodes]
  );

  const onConnectStart = useCallback((event, params) => {
    setIsConnecting(true);
    console.log('Connection start:', params);
  }, []);

  const onConnectEnd = useCallback((event) => {
    setIsConnecting(false);
    console.log('Connection end:', event);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        console.warn('ReactFlow instance not ready');
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');

      if (typeof type === 'undefined' || !type) {
        console.warn('No type data in drop event');
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: generateId(),
        type,
        position,
        data: { label: label || type.charAt(0).toUpperCase() + type.slice(1) },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const deleteSelectedElement = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => 
        edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ));
      setSelectedNode(null);
    } else if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedNode, selectedEdge, setNodes, setEdges]);

  const exportToTurtle = useCallback(() => {
    exportToTurtleFile(nodes, edges);
  }, [nodes, edges]);

  const exportToOWL = useCallback(() => {
    exportToOWLFile(nodes, edges);
  }, [nodes, edges]);

  const exportToRDF = useCallback(() => {
    exportToRDFFile(nodes, edges);
  }, [nodes, edges]);

  const exportToJSONLD = useCallback(() => {
    exportToJSONLDFile(nodes, edges);
  }, [nodes, edges]);

  const onLabelChange = useCallback((newLabel) => {
    if (selectedNode) {
      setNodes((nds) => nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      ));
      setSelectedNode((node) => node ? { ...node, data: { ...node.data, label: newLabel } } : node);
    } else if (selectedEdge) {
      setEdges((eds) => eds.map((edge) =>
        edge.id === selectedEdge.id
          ? { ...edge, data: { ...edge.data, label: newLabel } }
          : edge
      ));
      setSelectedEdge((edge) => edge ? { ...edge, data: { ...edge.data, label: newLabel } } : edge);
    }
  }, [selectedNode, selectedEdge, setNodes, setEdges]);

  // Toolbar functions
  const onUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousState = history[newIndex];
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  const onRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextState = history[newIndex];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  }, [historyIndex, history, setNodes, setEdges]);

  const onSave = useCallback(() => {
    const currentState = { nodes, edges };
    const dataStr = JSON.stringify(currentState);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ontology-canvas.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const onImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.jsonld,.ttl,.owl,.rdf';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target.result;
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            if (fileExtension === 'jsonld') {
              const importedData = importFromJSONLD(content);
              setNodes(importedData.nodes || []);
              setEdges(importedData.edges || []);
            } else if (fileExtension === 'json') {
              const importedState = JSON.parse(content);
              setNodes(importedState.nodes || []);
              setEdges(importedState.edges || []);
            } else {
              console.warn('Import format not yet supported:', fileExtension);
              alert('Import format not yet supported. Please use JSON-LD or JSON format.');
            }
          } catch (error) {
            console.error('Error importing file:', error);
            alert('Error importing file. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges]);

  const onZoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  }, [reactFlowInstance]);

  const onZoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  }, [reactFlowInstance]);

  const onFitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance]);

  const onToggleGrid = useCallback(() => {
    setIsGridVisible(!isGridVisible);
  }, [isGridVisible]);

  // Update history when nodes or edges change
  useEffect(() => {
    const currentState = { nodes, edges };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [nodes, edges]);

  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Toolbar 
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onDeleteNode={deleteSelectedElement}
          onExportTurtle={exportToTurtle}
          onExportOWL={exportToOWL}
          onExportRDF={exportToRDF}
          onExportJSONLD={exportToJSONLD}
          onImport={onImport}
          onLabelChange={onLabelChange}
          onUndo={onUndo}
          onRedo={onRedo}
          onSave={onSave}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onFitView={onFitView}
          onToggleGrid={onToggleGrid}
          validationStatus={validationStatus}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          isGridVisible={isGridVisible}
          isConnecting={isConnecting}
        />
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            connectionMode="loose"
            snapToGrid={isGridVisible}
            snapGrid={[20, 20]}
            deleteKeyCode="Delete"
            multiSelectionKeyCode="Shift"
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            panOnScroll={false}
            preventScrolling={true}
            className="bg-white"
          >
            <Controls />
            <Background 
              color="#f3f4f6" 
              gap={isGridVisible ? 20 : 0}
              size={1}
            />
            <MiniMap 
              style={{ backgroundColor: '#f8fafc' }}
              nodeColor="#3b82f6"
              maskColor="rgba(0, 0, 0, 0.1)"
            />
            <Panel position="top-right" className="bg-white p-3 rounded-lg shadow-md border">
              <div className="text-sm text-gray-600 space-y-1">
                <div>Nodes: <span className="font-semibold text-blue-600">{nodes.length}</span></div>
                <div>Edges: <span className="font-semibold text-green-600">{edges.length}</span></div>
                {isConnecting && (
                  <div className="text-orange-600 font-medium">Connecting...</div>
                )}
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
