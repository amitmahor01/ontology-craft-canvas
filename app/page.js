'use client';

import { useState, useCallback, useRef } from 'react';
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
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: generateId(),
        data: { label: 'hasRelation' },
        type: 'custom',
        animated: false,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');

      if (typeof type === 'undefined' || !type) {
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
    // Convert nodes and edges to RDF triples
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
        />
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
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
