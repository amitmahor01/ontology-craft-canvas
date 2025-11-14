var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  ClassNode: () => ClassNode,
  InstanceNode: () => InstanceNode,
  OntologyEditor: () => OntologyEditor,
  PropertyNode: () => PropertyNode,
  Sidebar: () => Sidebar,
  Toolbar: () => Toolbar
});
module.exports = __toCommonJS(index_exports);

// src/OntologyEditor.js
var import_react2 = __toESM(require("react"));
var import_reactflow4 = __toESM(require("reactflow"));
var import_style7 = require("reactflow/dist/style.css");

// src/ClassNode.js
var import_reactflow = require("reactflow");
var import_node_resizer = require("@reactflow/node-resizer");
var import_style = require("reactflow/dist/style.css");
var import_style2 = require("@reactflow/node-resizer/dist/style.css");
var import_jsx_runtime = require("react/jsx-runtime");
function ClassNode({ data, selected }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "classnode-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_node_resizer.NodeResizer,
      {
        color: "#2563eb",
        isVisible: selected,
        minWidth: 128,
        minHeight: 64
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "classnode-box", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "classnode-title", children: "Class" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "classnode-label", children: data.label || "Class" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reactflow.Handle,
      {
        type: "target",
        position: import_reactflow.Position.Top,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reactflow.Handle,
      {
        type: "source",
        position: import_reactflow.Position.Bottom,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reactflow.Handle,
      {
        type: "target",
        position: import_reactflow.Position.Left,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reactflow.Handle,
      {
        type: "source",
        position: import_reactflow.Position.Right,
        className: "classnode-handle",
        style: { zIndex: 1e3 }
      }
    )
  ] });
}

// src/InstanceNode.js
var import_reactflow2 = require("reactflow");
var import_node_resizer2 = require("@reactflow/node-resizer");
var import_style3 = require("reactflow/dist/style.css");
var import_style4 = require("@reactflow/node-resizer/dist/style.css");
var import_jsx_runtime2 = require("react/jsx-runtime");
function InstanceNode({ data, selected }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "instance-node-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_node_resizer2.NodeResizer,
      {
        color: "#16a34a",
        isVisible: selected,
        minWidth: 96,
        minHeight: 96
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "instance-node-inner", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "instance-node-label-wrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "instance-node-title", children: "Instance" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "instance-node-content", children: data.label || "Instance" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_reactflow2.Handle,
      {
        type: "target",
        position: import_reactflow2.Position.Top,
        className: "instance-node-handle"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_reactflow2.Handle,
      {
        type: "source",
        position: import_reactflow2.Position.Bottom,
        className: "instance-node-handle"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_reactflow2.Handle,
      {
        type: "target",
        position: import_reactflow2.Position.Left,
        className: "instance-node-handle"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_reactflow2.Handle,
      {
        type: "source",
        position: import_reactflow2.Position.Right,
        className: "instance-node-handle"
      }
    )
  ] });
}

// src/PropertyNode.js
var import_reactflow3 = require("reactflow");
var import_node_resizer3 = require("@reactflow/node-resizer");
var import_style5 = require("reactflow/dist/style.css");
var import_style6 = require("@reactflow/node-resizer/dist/style.css");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: containerStyle, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_node_resizer3.NodeResizer,
      {
        color: "#eab308",
        isVisible: selected,
        minWidth: 144,
        minHeight: 112
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: diamondStyle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: headerTextStyle, children: "Property" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: labelTextStyle, children: data.label || "Property" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_reactflow3.Handle,
      {
        type: "target",
        position: import_reactflow3.Position.Top,
        style: handleStyle
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_reactflow3.Handle,
      {
        type: "source",
        position: import_reactflow3.Position.Bottom,
        style: handleStyle
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_reactflow3.Handle,
      {
        type: "target",
        position: import_reactflow3.Position.Left,
        style: handleStyle
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_reactflow3.Handle,
      {
        type: "source",
        position: import_reactflow3.Position.Right,
        style: handleStyle
      }
    )
  ] });
}

// src/Sidebar.js
var import_react = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function ElementPreview({ type, label }) {
  const classMap = {
    class: "preview-class",
    instance: "preview-instance",
    property: "preview-property"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `element-preview ${classMap[type]}`, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "element-preview-content", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "preview-title", children: type.charAt(0).toUpperCase() + type.slice(1) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "preview-label", children: label })
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
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [expandedCategories, setExpandedCategories] = (0, import_react.useState)([0, 1, 2]);
  const toggleCategory = (idx) => setExpandedCategories(
    (prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
  );
  const filtered = ontologyElements.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) => item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter((cat) => cat.items.length);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("aside", { className: "sidebar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "sidebar-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "sidebar-title", children: "Ontology Elements" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "sidebar-subtext", children: "Drag and drop elements to create your ontology" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "search-wrapper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "input",
          {
            className: "search-input",
            placeholder: "Search elements...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "svg",
          {
            className: "search-icon",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-1 overflow-y-auto p-4", children: filtered.map((cat, idx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "category", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "button",
        {
          className: "category-header",
          onClick: () => toggleCategory(idx),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "category-title-wrapper", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "category-title", children: cat.category }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "category-count", children: cat.items.length })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: expandedCategories.includes(idx) ? "\u25B2" : "\u25BC" })
          ]
        }
      ),
      expandedCategories.includes(idx) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "category-description", children: cat.description }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "category-items", children: cat.items.map((item, itemIdx) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "category-item", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "category-item-label", children: item.label }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ElementPreview, { type: item.type, label: item.label })
            }
          )
        ] }, itemIdx)) })
      ] })
    ] }, cat.category)) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "sidebar-footer", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "sidebar-tip", children: "Tip: Drag elements to the canvas" }) })
  ] });
}

// src/Toolbar.js
var import_jsx_runtime5 = require("react/jsx-runtime");
function ValidationStatus({ status }) {
  const statusConfig = {
    valid: { color: "green", icon: "\u2713", text: "Valid" },
    warning: { color: "yellow", icon: "\u26A0", text: "Warnings" },
    error: { color: "red", icon: "\u2717", text: "Errors" },
    loading: { color: "blue", icon: "\u27F3", text: "Checking..." }
  };
  const config = statusConfig[status] || statusConfig.valid;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "validation-status", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `status-indicator ${config.color}` }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "status-text", children: config.text })
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "toolbar-container", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "toolbar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "breadcrumb", children: breadcrumbItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "breadcrumb-item", children: [
      index > 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "breadcrumb-separator", children: "/" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "breadcrumb-label", children: item.label })
    ] }, index)) }),
    selectedElement && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "element-editor", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "input",
        {
          className: "element-input",
          type: "text",
          value: selectedElement.data?.label || "",
          onChange: (e) => onLabelChange2(e.target.value),
          placeholder: `Edit ${typeLabel.toLowerCase()} label`
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "delete-btn", onClick: onDeleteNode, children: "\u2715" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "right-section", children: [
      isConnecting && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "connecting", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "connecting-dot" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "Connecting..." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ValidationStatus, { status: validationStatus }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "action-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "icon-btn", onClick: onUndo2, disabled: !canUndo, children: "\u21B6" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "icon-btn", onClick: onRedo2, disabled: !canRedo, children: "\u21B7" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "icon-btn", onClick: onSave, children: "\u{1F4BE}" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "import-export", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "import-btn", onClick: onImport2, children: "Import" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "export-dropdown", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "export-btn", children: "Export \u25BC" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dropdown-menu", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onExportTurtle, children: "Turtle (.ttl)" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onExportOWL, children: "OWL/XML (.owl)" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onExportRDF, children: "RDF/XML (.rdf)" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onExportJSONLD, children: "JSON-LD (.jsonld)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "divider" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "zoom-controls", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "icon-btn", onClick: onZoomOut2, children: "\u2013" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "icon-btn", onClick: onZoomIn2, children: "+" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "icon-btn", onClick: onFitView2, children: "\u2927" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  const [edgePath, labelX, labelY] = (0, import_reactflow4.getBezierPath)({
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "path",
      {
        id: id2,
        className: "react-flow__edge-path",
        d: edgePath,
        stroke: selected ? "#2563eb" : "#555",
        strokeWidth: selected ? 3 : 2,
        markerEnd: import_reactflow4.MarkerType.ArrowClosed
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("foreignObject", { width: 120, height: 40, x: labelX - 60, y: labelY - 20, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "edge-label-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "edge-label-box", children: data?.label || "Relation" }) }) })
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
  const [nodes, setNodes, onNodesChange] = (0, import_reactflow4.useNodesState)(initialNodes);
  const [edges, setEdges, onEdgesChange] = (0, import_reactflow4.useEdgesState)(initialEdges);
  const [selectedNode, setSelectedNode] = (0, import_react2.useState)(null);
  const [selectedEdge, setSelectedEdge] = (0, import_react2.useState)(null);
  const [validationStatus, setValidationStatus] = (0, import_react2.useState)("valid");
  const [isGridVisible, setIsGridVisible] = (0, import_react2.useState)(gridEnabled);
  const [history, setHistory] = (0, import_react2.useState)([]);
  const [historyIndex, setHistoryIndex] = (0, import_react2.useState)(-1);
  const [isConnecting, setIsConnecting] = (0, import_react2.useState)(false);
  const reactFlowWrapper = (0, import_react2.useRef)(null);
  const [reactFlowInstance, setReactFlowInstance] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    if (!validationEnabled) return;
    for (const node of nodes) {
      if (!node.data?.label || node.data.label.trim() === "") {
        setValidationStatus("error");
        return;
      }
    }
    setValidationStatus("valid");
  }, [nodes, edges, validationEnabled]);
  (0, import_react2.useEffect)(() => {
    if (onNodesChangeProp) onNodesChangeProp(nodes);
  }, [nodes]);
  (0, import_react2.useEffect)(() => {
    if (onEdgesChangeProp) onEdgesChangeProp(edges);
  }, [edges]);
  const isValidConnection = (0, import_react2.useCallback)(
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
  const onConnect = (0, import_react2.useCallback)(
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
      setEdges((eds) => (0, import_reactflow4.addEdge)(newEdge, eds));
    },
    [nodes]
  );
  const onNodeClick = (0, import_react2.useCallback)((_, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);
  const onEdgeClick = (0, import_react2.useCallback)((_, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);
  const onPaneClick = (0, import_react2.useCallback)(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);
  const deleteSelectedElement = (0, import_react2.useCallback)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "editor-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Sidebar, {}),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "editor-main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: "editor-flow-wrapper",
          ref: reactFlowWrapper,
          style: { flex: 1, position: "relative" },
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            import_reactflow4.default,
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
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_reactflow4.Controls, {}),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_reactflow4.Background, { color: "#f3f4f6", gap: isGridVisible ? 20 : 0, size: 1 }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  import_reactflow4.MiniMap,
                  {
                    style: { backgroundColor: "#f8fafc" },
                    nodeColor: "#3b82f6",
                    maskColor: "rgba(0, 0, 0, 0.1)"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_reactflow4.Panel, { position: "top-right", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "editor-stats-panel", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
                    "Nodes: ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "count-blue", children: nodes.length })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
                    "Edges: ",
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "count-green", children: edges.length })
                  ] }),
                  isConnecting && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "connecting", children: "Connecting..." })
                ] }) })
              ]
            }
          )
        }
      )
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClassNode,
  InstanceNode,
  OntologyEditor,
  PropertyNode,
  Sidebar,
  Toolbar
});
//# sourceMappingURL=index.js.map