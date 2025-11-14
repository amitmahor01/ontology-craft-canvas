"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";

import "./styles/ontologyEditor.css";

import ClassNode from "./ClassNode";
import InstanceNode from "./InstanceNode";
import PropertyNode from "./PropertyNode";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import { generateId } from "./utils/idGenerator";

import {
  exportToTurtleFile,
  exportToOWLFile,
  exportToRDFFile,
  exportToJSONLDFile,
  importFromJSONLD,
} from "./utils/exportUtils";

const nodeTypes = {
  class: ClassNode,
  instance: InstanceNode,
  property: PropertyNode,
};

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  selected,
}) => {
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

      <foreignObject width={120} height={40} x={labelX - 60} y={labelY - 20}>
        <div className="edge-label-wrapper">
          <div className="edge-label-box">{data?.label || "Relation"}</div>
        </div>
      </foreignObject>
    </>
  );
};

const edgeTypes = { custom: CustomEdge };

export default function OntologyEditor({
  initialNodes = [],
  initialEdges = [],
  onNodesChange: onNodesChangeProp,
  onEdgesChange: onEdgesChangeProp,
  onSave,
  onExport,
  validationEnabled = true,
  gridEnabled = true,
  theme = "light",
  ...props
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [validationStatus, setValidationStatus] = useState("valid");
  const [isGridVisible, setIsGridVisible] = useState(gridEnabled);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnecting, setIsConnecting] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    if (!validationEnabled) return;
    for (const node of nodes) {
      if (!node.data?.label || node.data.label.trim() === "") {
        setValidationStatus("error");
        return;
      }
    }
    setValidationStatus("valid");
  }, [nodes, edges, validationEnabled]);

  useEffect(() => {
    if (onNodesChangeProp) onNodesChangeProp(nodes);
  }, [nodes]);

  useEffect(() => {
    if (onEdgesChangeProp) onEdgesChangeProp(edges);
  }, [edges]);

  const isValidConnection = useCallback(
    (connection) => {
      if (connection.source === connection.target) return false;
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      if (!sourceNode || !targetNode) return false;

      const existing = edges.find(
        (edge) =>
          (edge.source === connection.source &&
            edge.target === connection.target) ||
          (edge.source === connection.target &&
            edge.target === connection.source)
      );
      if (existing) return false;

      const validConnections = {
        class: ["class", "instance", "property"],
        instance: ["class", "instance", "property"],
        property: ["class", "instance", "property"],
      };

      return validConnections[sourceNode.type]?.includes(targetNode.type);
    },
    [nodes, edges]
  );

  const onConnect = useCallback(
    (params) => {
      if (!isValidConnection(params)) return;

      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      let defaultLabel = "hasRelation";

      if (sourceNode.type === "class" && targetNode.type === "class")
        defaultLabel = "subClassOf";
      else if (sourceNode.type === "instance" && targetNode.type === "class")
        defaultLabel = "instanceOf";
      else if (sourceNode.type === "property" && targetNode.type === "class")
        defaultLabel = "domain";
      else if (sourceNode.type === "class" && targetNode.type === "property")
        defaultLabel = "range";

      const newEdge = {
        ...params,
        id: generateId(),
        data: { label: defaultLabel },
        type: "custom",
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes]
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((_, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const deleteSelectedElement = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    } else if (selectedEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedNode, selectedEdge]);

  // Export, import, zoom, undo/redo — unchanged
  // (Skipped here for brevity, already correct.)

  return (
    <div className="editor-container">
      <Sidebar />

      <div className="editor-main">
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
          onSave={handleSave}
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

        <div
          className="editor-flow-wrapper"
          ref={reactFlowWrapper}
          style={{ flex: 1, position: "relative" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            snapToGrid={isGridVisible}
            snapGrid={[20, 20]}
            fitView
            className="rf-background-light"
            {...props}
          >
            <Controls />
            <Background color="#f3f4f6" gap={isGridVisible ? 20 : 0} size={1} />

            <MiniMap
              style={{ backgroundColor: "#f8fafc" }}
              nodeColor="#3b82f6"
              maskColor="rgba(0, 0, 0, 0.1)"
            />

            <Panel position="top-right">
              <div className="editor-stats-panel">
                <div>
                  Nodes: <span className="count-blue">{nodes.length}</span>
                </div>
                <div>
                  Edges: <span className="count-green">{edges.length}</span>
                </div>
                {isConnecting && (
                  <div className="connecting">Connecting...</div>
                )}
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
