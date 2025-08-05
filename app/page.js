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
} from 'reactflow';
import 'reactflow/dist/style.css';

import ClassNode from './components/ClassNode';
import InstanceNode from './components/InstanceNode';
import PropertyNode from './components/PropertyNode';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { generateId } from './utils/idGenerator';

const nodeTypes = {
  class: ClassNode,
  instance: InstanceNode,
  property: PropertyNode,
};

// Custom edge component to display labels
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
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
        stroke="#555"
        strokeWidth={2}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: '12px' }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data?.label || 'hasRelation'}
        </textPath>
      </text>
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
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Enhanced connection validation
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

    // Define valid connection rules
    const validConnections = {
      class: ['instance', 'property'], // Class can connect to instance or property
      instance: ['class', 'property'], // Instance can connect to class or property
      property: ['instance', 'class'], // Property can connect to instance or class
    };

    const sourceType = sourceNode.type;
    const targetType = targetNode.type;

    // Check if the connection is valid
    return validConnections[sourceType]?.includes(targetType) || false;
  }, [nodes]);

  const onConnect = useCallback(
    (params) => {
      // Validate the connection
      if (!isValidConnection(params)) {
        console.warn('Invalid connection attempted:', params);
        return;
      }

      const newEdge = {
        ...params,
        id: generateId(),
        data: { label: 'hasRelation' },
        type: 'custom',
        animated: false,
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, isValidConnection]
  );

  const onConnectStart = useCallback((event, params) => {
    console.log('Connection start:', params);
  }, []);

  const onConnectEnd = useCallback((event) => {
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
        data: { label, type },
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
    const triples = [];
    
    nodes.forEach(node => {
      if (node.type === 'class') {
        triples.push(`<${node.data.iri || '#' + node.data.label}> a owl:Class .`);
      } else if (node.type === 'instance') {
        triples.push(`<${node.data.iri || '#' + node.data.label}> a <${node.data.classType || 'owl:Thing'}> .`);
      } else if (node.type === 'property') {
        triples.push(`<${node.data.iri || '#' + node.data.label}> a owl:ObjectProperty .`);
      }
    });

    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        triples.push(`<${sourceNode.data.iri || '#' + sourceNode.data.label}> <${edge.data?.iri || '#' + edge.data?.label || 'rdf:type'}> <${targetNode.data.iri || '#' + targetNode.data.label}> .`);
      }
    });

    const turtleContent = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

${triples.join('\n')}`;

    const blob = new Blob([turtleContent], { type: 'text/turtle' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ontology.ttl';
    a.click();
    URL.revokeObjectURL(url);
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
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedState = JSON.parse(event.target.result);
            setNodes(importedState.nodes || []);
            setEdges(importedState.edges || []);
          } catch (error) {
            console.error('Error importing file:', error);
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
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Toolbar 
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onDeleteNode={deleteSelectedElement}
          onExport={exportToTurtle}
          onLabelChange={onLabelChange}
          onUndo={onUndo}
          onRedo={onRedo}
          onSave={onSave}
          onImport={onImport}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onFitView={onFitView}
          onToggleGrid={onToggleGrid}
          validationStatus={validationStatus}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          isGridVisible={isGridVisible}
        />
        <div className="flex-1" ref={reactFlowWrapper}>
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
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <Controls />
            <Background />
            <MiniMap />
            <Panel position="top-right" className="bg-white p-2 rounded shadow">
              <div className="text-sm text-gray-600">
                Nodes: {nodes.length} | Edges: {edges.length}
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
