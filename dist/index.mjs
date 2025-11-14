// src/OntologyEditor.js
import React, { useState as useState2, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Panel,
  getBezierPath,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

// src/ClassNode.js
import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";
import { jsx, jsxs } from "react/jsx-runtime";
function ClassNode({ data, selected }) {
  return /* @__PURE__ */ jsxs("div", { className: "classnode-container", children: [
    /* @__PURE__ */ jsx(
      NodeResizer,
      {
        color: "#2563eb",
        isVisible: selected,
        minWidth: 128,
        minHeight: 64
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "classnode-box", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "classnode-title", children: "Class" }),
      /* @__PURE__ */ jsx("div", { className: "classnode-label", children: data.label || "Class" })
    ] }) }),
    /* @__PURE__ */ jsx(
      Handle,
      {
        type: "target",
        position: Position.Top,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    ),
    /* @__PURE__ */ jsx(
      Handle,
      {
        type: "source",
        position: Position.Bottom,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    ),
    /* @__PURE__ */ jsx(
      Handle,
      {
        type: "target",
        position: Position.Left,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    ),
    /* @__PURE__ */ jsx(
      Handle,
      {
        type: "source",
        position: Position.Right,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    )
  ] });
}

// src/InstanceNode.js
import { Handle as Handle2, Position as Position2 } from "reactflow";
import { NodeResizer as NodeResizer2 } from "@reactflow/node-resizer";
import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function InstanceNode({ data, selected }) {
  return /* @__PURE__ */ jsxs2("div", { className: "instance-node-container", children: [
    /* @__PURE__ */ jsx2(
      NodeResizer2,
      {
        color: "#16a34a",
        isVisible: selected,
        minWidth: 96,
        minHeight: 96
      }
    ),
    /* @__PURE__ */ jsx2("div", { className: "instance-node-inner", children: /* @__PURE__ */ jsxs2("div", { className: "instance-node-label-wrapper", children: [
      /* @__PURE__ */ jsx2("div", { className: "instance-node-title", children: "Instance" }),
      /* @__PURE__ */ jsx2("div", { className: "instance-node-content", children: data.label || "Instance" })
    ] }) }),
    /* @__PURE__ */ jsx2(
      Handle2,
      {
        type: "target",
        position: Position2.Top,
        className: "instance-node-handle"
      }
    ),
    /* @__PURE__ */ jsx2(
      Handle2,
      {
        type: "source",
        position: Position2.Bottom,
        className: "instance-node-handle"
      }
    ),
    /* @__PURE__ */ jsx2(
      Handle2,
      {
        type: "target",
        position: Position2.Left,
        className: "instance-node-handle"
      }
    ),
    /* @__PURE__ */ jsx2(
      Handle2,
      {
        type: "source",
        position: Position2.Right,
        className: "instance-node-handle"
      }
    )
  ] });
}

// src/PropertyNode.js
import { Handle as Handle3, Position as Position3 } from "reactflow";
import { NodeResizer as NodeResizer3 } from "@reactflow/node-resizer";
import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function PropertyNode({ data, selected }) {
  const containerStyle = {
    position: "relative",
    width: "144px",
    height: "112px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none"
  };
  const diamondStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "12px",
    paddingRight: "12px",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    background: "#fef9c3",
    border: "2px solid #fde047"
  };
  const headerTextStyle = {
    fontWeight: "bold",
    color: "#854d0e",
    fontSize: "12px",
    marginBottom: "4px",
    textAlign: "center"
  };
  const labelTextStyle = {
    fontWeight: "600",
    color: "#713f12",
    fontSize: "14px",
    lineHeight: "1.1",
    textAlign: "center"
  };
  const handleStyle = {
    width: "12px",
    height: "12px",
    backgroundColor: "#facc15",
    border: "2px solid white",
    transition: "background-color 0.2s",
    zIndex: 1e3
  };
  return /* @__PURE__ */ jsxs3("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsx3(
      NodeResizer3,
      {
        color: "#eab308",
        isVisible: selected,
        minWidth: 144,
        minHeight: 112
      }
    ),
    /* @__PURE__ */ jsx3("div", { style: diamondStyle, children: /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx3("div", { style: headerTextStyle, children: "Property" }),
      /* @__PURE__ */ jsx3("div", { style: labelTextStyle, children: data.label || "Property" })
    ] }) }),
    /* @__PURE__ */ jsx3(
      Handle3,
      {
        type: "target",
        position: Position3.Top,
        style: handleStyle
      }
    ),
    /* @__PURE__ */ jsx3(
      Handle3,
      {
        type: "source",
        position: Position3.Bottom,
        style: handleStyle
      }
    ),
    /* @__PURE__ */ jsx3(
      Handle3,
      {
        type: "target",
        position: Position3.Left,
        style: handleStyle
      }
    ),
    /* @__PURE__ */ jsx3(
      Handle3,
      {
        type: "source",
        position: Position3.Right,
        style: handleStyle
      }
    )
  ] });
}

// src/Sidebar.js
import { useState } from "react";
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function ElementPreview({ type, label }) {
  const classMap = {
    class: "preview-class",
    instance: "preview-instance",
    property: "preview-property"
  };
  return /* @__PURE__ */ jsx4("div", { className: `element-preview ${classMap[type]}`, children: /* @__PURE__ */ jsxs4("div", { className: "element-preview-content", children: [
    /* @__PURE__ */ jsx4("div", { className: "preview-title", children: type.charAt(0).toUpperCase() + type.slice(1) }),
    /* @__PURE__ */ jsx4("div", { className: "preview-label", children: label })
  ] }) });
}
function Sidebar() {
  const ontologyElements = [
    {
      category: "Classes",
      description: "Define concepts and categories",
      items: [
        { type: "class", label: "Class" },
        { type: "class", label: "SubClass" }
      ]
    },
    {
      category: "Instances",
      description: "Individual objects or entities",
      items: [
        { type: "instance", label: "Instance" },
        { type: "instance", label: "Individual" }
      ]
    },
    {
      category: "Properties",
      description: "Relationships and attributes",
      items: [
        { type: "property", label: "Property" },
        { type: "property", label: "DataProperty" },
        { type: "property", label: "ObjectProperty" }
      ]
    }
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([0, 1, 2]);
  const toggleCategory = (idx) => setExpandedCategories(
    (prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
  );
  const filtered = ontologyElements.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) => item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter((cat) => cat.items.length);
  return /* @__PURE__ */ jsxs4("aside", { className: "sidebar", children: [
    /* @__PURE__ */ jsxs4("div", { className: "sidebar-header", children: [
      /* @__PURE__ */ jsx4("div", { className: "sidebar-title", children: "Ontology Elements" }),
      /* @__PURE__ */ jsx4("div", { className: "sidebar-subtext", children: "Drag and drop elements to create your ontology" }),
      /* @__PURE__ */ jsxs4("div", { className: "search-wrapper", children: [
        /* @__PURE__ */ jsx4(
          "input",
          {
            className: "search-input",
            placeholder: "Search elements...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx4(
          "svg",
          {
            className: "search-icon",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx4(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2",
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "flex-1 overflow-y-auto p-4", children: filtered.map((cat, idx) => /* @__PURE__ */ jsxs4("div", { className: "category", children: [
      /* @__PURE__ */ jsxs4(
        "button",
        {
          className: "category-header",
          onClick: () => toggleCategory(idx),
          children: [
            /* @__PURE__ */ jsxs4("div", { className: "category-title-wrapper", children: [
              /* @__PURE__ */ jsx4("span", { className: "category-title", children: cat.category }),
              /* @__PURE__ */ jsx4("span", { className: "category-count", children: cat.items.length })
            ] }),
            /* @__PURE__ */ jsx4("span", { children: expandedCategories.includes(idx) ? "\u25B2" : "\u25BC" })
          ]
        }
      ),
      expandedCategories.includes(idx) && /* @__PURE__ */ jsxs4(Fragment, { children: [
        /* @__PURE__ */ jsx4("div", { className: "category-description", children: cat.description }),
        /* @__PURE__ */ jsx4("div", { className: "category-items", children: cat.items.map((item, itemIdx) => /* @__PURE__ */ jsxs4("div", { className: "category-item", children: [
          /* @__PURE__ */ jsx4("div", { className: "flex-1", children: /* @__PURE__ */ jsx4("div", { className: "category-item-label", children: item.label }) }),
          /* @__PURE__ */ jsx4(
            "div",
            {
              className: "category-item-drag",
              draggable: true,
              onDragStart: (e) => {
                e.dataTransfer.setData(
                  "application/reactflow",
                  item.type
                );
                e.dataTransfer.setData(
                  "application/label",
                  item.label
                );
              },
              children: /* @__PURE__ */ jsx4(ElementPreview, { type: item.type, label: item.label })
            }
          )
        ] }, itemIdx)) })
      ] })
    ] }, cat.category)) }),
    /* @__PURE__ */ jsx4("div", { className: "sidebar-footer", children: /* @__PURE__ */ jsx4("div", { className: "sidebar-tip", children: "Tip: Drag elements to the canvas" }) })
  ] });
}

// src/Toolbar.js
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function ValidationStatus({ status }) {
  const statusConfig = {
    valid: { color: "green", icon: "\u2713", text: "Valid" },
    warning: { color: "yellow", icon: "\u26A0", text: "Warnings" },
    error: { color: "red", icon: "\u2717", text: "Errors" },
    loading: { color: "blue", icon: "\u27F3", text: "Checking..." }
  };
  const config = statusConfig[status] || statusConfig.valid;
  return /* @__PURE__ */ jsxs5("div", { className: "validation-status", children: [
    /* @__PURE__ */ jsx5("div", { className: `status-indicator ${config.color}` }),
    /* @__PURE__ */ jsx5("span", { className: "status-text", children: config.text })
  ] });
}
function Toolbar({
  selectedNode,
  selectedEdge,
  onDeleteNode,
  onExportTurtle,
  onExportOWL,
  onExportRDF,
  onExportJSONLD,
  onImport: onImport2,
  onLabelChange: onLabelChange2,
  onUndo: onUndo2,
  onRedo: onRedo2,
  onSave,
  onZoomIn: onZoomIn2,
  onZoomOut: onZoomOut2,
  onFitView: onFitView2,
  onToggleGrid: onToggleGrid2,
  validationStatus = "valid",
  canUndo = false,
  canRedo = false,
  isGridVisible = true,
  isConnecting = false
}) {
  const selectedElement = selectedNode || selectedEdge;
  let elementType = null;
  let typeLabel = "";
  if (selectedNode) {
    elementType = selectedNode.type;
    typeLabel = selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1);
  } else if (selectedEdge) {
    elementType = "edge";
    typeLabel = "Edge";
  }
  const breadcrumbItems = [
    { label: "Ontology Canvas" },
    ...selectedElement ? [
      { label: typeLabel },
      { label: selectedElement.data?.label || "Unnamed" }
    ] : []
  ];
  return /* @__PURE__ */ jsx5("div", { className: "toolbar-container", children: /* @__PURE__ */ jsxs5("div", { className: "toolbar", children: [
    /* @__PURE__ */ jsx5("div", { className: "breadcrumb", children: breadcrumbItems.map((item, index) => /* @__PURE__ */ jsxs5("div", { className: "breadcrumb-item", children: [
      index > 0 && /* @__PURE__ */ jsx5("span", { className: "breadcrumb-separator", children: "/" }),
      /* @__PURE__ */ jsx5("div", { className: "breadcrumb-label", children: item.label })
    ] }, index)) }),
    selectedElement && /* @__PURE__ */ jsxs5("div", { className: "element-editor", children: [
      /* @__PURE__ */ jsx5(
        "input",
        {
          className: "element-input",
          type: "text",
          value: selectedElement.data?.label || "",
          onChange: (e) => onLabelChange2(e.target.value),
          placeholder: `Edit ${typeLabel.toLowerCase()} label`
        }
      ),
      /* @__PURE__ */ jsx5("button", { className: "delete-btn", onClick: onDeleteNode, children: "\u2715" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "right-section", children: [
      isConnecting && /* @__PURE__ */ jsxs5("div", { className: "connecting", children: [
        /* @__PURE__ */ jsx5("div", { className: "connecting-dot" }),
        /* @__PURE__ */ jsx5("span", { children: "Connecting..." })
      ] }),
      /* @__PURE__ */ jsx5(ValidationStatus, { status: validationStatus }),
      /* @__PURE__ */ jsx5("div", { className: "divider" }),
      /* @__PURE__ */ jsxs5("div", { className: "action-group", children: [
        /* @__PURE__ */ jsx5("button", { className: "icon-btn", onClick: onUndo2, disabled: !canUndo, children: "\u21B6" }),
        /* @__PURE__ */ jsx5("button", { className: "icon-btn", onClick: onRedo2, disabled: !canRedo, children: "\u21B7" }),
        /* @__PURE__ */ jsx5("button", { className: "icon-btn", onClick: onSave, children: "\u{1F4BE}" })
      ] }),
      /* @__PURE__ */ jsx5("div", { className: "divider" }),
      /* @__PURE__ */ jsxs5("div", { className: "import-export", children: [
        /* @__PURE__ */ jsx5("button", { className: "import-btn", onClick: onImport2, children: "Import" }),
        /* @__PURE__ */ jsxs5("div", { className: "export-dropdown", children: [
          /* @__PURE__ */ jsx5("button", { className: "export-btn", children: "Export \u25BC" }),
          /* @__PURE__ */ jsxs5("div", { className: "dropdown-menu", children: [
            /* @__PURE__ */ jsx5("button", { onClick: onExportTurtle, children: "Turtle (.ttl)" }),
            /* @__PURE__ */ jsx5("button", { onClick: onExportOWL, children: "OWL/XML (.owl)" }),
            /* @__PURE__ */ jsx5("button", { onClick: onExportRDF, children: "RDF/XML (.rdf)" }),
            /* @__PURE__ */ jsx5("button", { onClick: onExportJSONLD, children: "JSON-LD (.jsonld)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx5("div", { className: "divider" }),
      /* @__PURE__ */ jsxs5("div", { className: "zoom-controls", children: [
        /* @__PURE__ */ jsx5("button", { className: "icon-btn", onClick: onZoomOut2, children: "\u2013" }),
        /* @__PURE__ */ jsx5("button", { className: "icon-btn", onClick: onZoomIn2, children: "+" }),
        /* @__PURE__ */ jsx5("button", { className: "icon-btn", onClick: onFitView2, children: "\u2927" }),
        /* @__PURE__ */ jsx5(
          "button",
          {
            className: `icon-btn ${isGridVisible ? "grid-active" : ""}`,
            onClick: onToggleGrid2,
            children: "#"
          }
        )
      ] })
    ] })
  ] }) });
}

// src/utils/idGenerator.js
var id = 0;
function generateId() {
  return `node_${id++}`;
}

// src/OntologyEditor.js
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var nodeTypes = {
  class: ClassNode,
  instance: InstanceNode,
  property: PropertyNode
};
var CustomEdge = ({
  id: id2,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  selected
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  return /* @__PURE__ */ jsxs6(Fragment2, { children: [
    /* @__PURE__ */ jsx6(
      "path",
      {
        id: id2,
        className: "react-flow__edge-path",
        d: edgePath,
        stroke: selected ? "#2563eb" : "#555",
        strokeWidth: selected ? 3 : 2,
        markerEnd: MarkerType.ArrowClosed
      }
    ),
    /* @__PURE__ */ jsx6("foreignObject", { width: 120, height: 40, x: labelX - 60, y: labelY - 20, children: /* @__PURE__ */ jsx6("div", { className: "edge-label-wrapper", children: /* @__PURE__ */ jsx6("div", { className: "edge-label-box", children: data?.label || "Relation" }) }) })
  ] });
};
var edgeTypes = { custom: CustomEdge };
function OntologyEditor({
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
  const [selectedNode, setSelectedNode] = useState2(null);
  const [selectedEdge, setSelectedEdge] = useState2(null);
  const [validationStatus, setValidationStatus] = useState2("valid");
  const [isGridVisible, setIsGridVisible] = useState2(gridEnabled);
  const [history, setHistory] = useState2([]);
  const [historyIndex, setHistoryIndex] = useState2(-1);
  const [isConnecting, setIsConnecting] = useState2(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState2(null);
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
        (edge) => edge.source === connection.source && edge.target === connection.target || edge.source === connection.target && edge.target === connection.source
      );
      if (existing) return false;
      const validConnections = {
        class: ["class", "instance", "property"],
        instance: ["class", "instance", "property"],
        property: ["class", "instance", "property"]
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
        type: "custom"
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
      setEdges(
        (eds) => eds.filter(
          (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    } else if (selectedEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedNode, selectedEdge]);
  return /* @__PURE__ */ jsxs6("div", { className: "editor-container", children: [
    /* @__PURE__ */ jsx6(Sidebar, {}),
    /* @__PURE__ */ jsxs6("div", { className: "editor-main", children: [
      /* @__PURE__ */ jsx6(
        Toolbar,
        {
          selectedNode,
          selectedEdge,
          onDeleteNode: deleteSelectedElement,
          onExportTurtle: exportToTurtle,
          onExportOWL: exportToOWL,
          onExportRDF: exportToRDF,
          onExportJSONLD: exportToJSONLD,
          onImport,
          onLabelChange,
          onUndo,
          onRedo,
          onSave: handleSave,
          onZoomIn,
          onZoomOut,
          onFitView,
          onToggleGrid,
          validationStatus,
          canUndo: historyIndex > 0,
          canRedo: historyIndex < history.length - 1,
          isGridVisible,
          isConnecting
        }
      ),
      /* @__PURE__ */ jsx6(
        "div",
        {
          className: "editor-flow-wrapper",
          ref: reactFlowWrapper,
          style: { flex: 1, position: "relative" },
          children: /* @__PURE__ */ jsxs6(
            ReactFlow,
            {
              nodes,
              edges,
              onNodesChange,
              onEdgesChange,
              onConnect,
              onNodeClick,
              onEdgeClick,
              onPaneClick,
              onInit: setReactFlowInstance,
              nodeTypes,
              edgeTypes,
              snapToGrid: isGridVisible,
              snapGrid: [20, 20],
              fitView: true,
              className: "rf-background-light",
              ...props,
              children: [
                /* @__PURE__ */ jsx6(Controls, {}),
                /* @__PURE__ */ jsx6(Background, { color: "#f3f4f6", gap: isGridVisible ? 20 : 0, size: 1 }),
                /* @__PURE__ */ jsx6(
                  MiniMap,
                  {
                    style: { backgroundColor: "#f8fafc" },
                    nodeColor: "#3b82f6",
                    maskColor: "rgba(0, 0, 0, 0.1)"
                  }
                ),
                /* @__PURE__ */ jsx6(Panel, { position: "top-right", children: /* @__PURE__ */ jsxs6("div", { className: "editor-stats-panel", children: [
                  /* @__PURE__ */ jsxs6("div", { children: [
                    "Nodes: ",
                    /* @__PURE__ */ jsx6("span", { className: "count-blue", children: nodes.length })
                  ] }),
                  /* @__PURE__ */ jsxs6("div", { children: [
                    "Edges: ",
                    /* @__PURE__ */ jsx6("span", { className: "count-green", children: edges.length })
                  ] }),
                  isConnecting && /* @__PURE__ */ jsx6("div", { className: "connecting", children: "Connecting..." })
                ] }) })
              ]
            }
          )
        }
      )
    ] })
  ] });
}
export {
  ClassNode,
  InstanceNode,
  OntologyEditor,
  PropertyNode,
  Sidebar,
  Toolbar
};
//# sourceMappingURL=index.mjs.map