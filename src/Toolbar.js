"use client";

import "./styles/toolbar.css";

function ValidationStatus({ status }) {
  const statusConfig = {
    valid: { color: "green", icon: "✓", text: "Valid" },
    warning: { color: "yellow", icon: "⚠", text: "Warnings" },
    error: { color: "red", icon: "✗", text: "Errors" },
    loading: { color: "blue", icon: "⟳", text: "Checking..." },
  };

  const config = statusConfig[status] || statusConfig.valid;

  return (
    <div className="validation-status">
      <div className={`status-indicator ${config.color}`}></div>
      <span className="status-text">{config.text}</span>
    </div>
  );
}

export default function Toolbar({
  selectedNode,
  selectedEdge,
  onDeleteNode,
  onExportTurtle,
  onExportOWL,
  onExportRDF,
  onExportJSONLD,
  onImport,
  onLabelChange,
  onUndo,
  onRedo,
  onSave,
  onZoomIn,
  onZoomOut,
  onFitView,
  onToggleGrid,
  validationStatus = "valid",
  canUndo = false,
  canRedo = false,
  isGridVisible = true,
  isConnecting = false,
}) {
  const selectedElement = selectedNode || selectedEdge;
  let elementType = null;
  let typeLabel = "";

  if (selectedNode) {
    elementType = selectedNode.type;
    typeLabel =
      selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1);
  } else if (selectedEdge) {
    elementType = "edge";
    typeLabel = "Edge";
  }

  const breadcrumbItems = [
    { label: "Ontology Canvas" },
    ...(selectedElement
      ? [
          { label: typeLabel },
          { label: selectedElement.data?.label || "Unnamed" },
        ]
      : []),
  ];

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="breadcrumb-item">
              {index > 0 && <span className="breadcrumb-separator">/</span>}
              <div className="breadcrumb-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Selected Element Editor */}
        {selectedElement && (
          <div className="element-editor">
            <input
              className="element-input"
              type="text"
              value={selectedElement.data?.label || ""}
              onChange={(e) => onLabelChange(e.target.value)}
              placeholder={`Edit ${typeLabel.toLowerCase()} label`}
            />

            <button className="delete-btn" onClick={onDeleteNode}>
              ✕
            </button>
          </div>
        )}

        {/* Right Section */}
        <div className="right-section">
          {isConnecting && (
            <div className="connecting">
              <div className="connecting-dot"></div>
              <span>Connecting...</span>
            </div>
          )}

          <ValidationStatus status={validationStatus} />

          <div className="divider"></div>

          {/* Undo / Redo / Save */}
          <div className="action-group">
            <button className="icon-btn" onClick={onUndo} disabled={!canUndo}>
              ↶
            </button>

            <button className="icon-btn" onClick={onRedo} disabled={!canRedo}>
              ↷
            </button>

            <button className="icon-btn" onClick={onSave}>
              💾
            </button>
          </div>

          <div className="divider"></div>

          {/* Import / Export */}
          <div className="import-export">
            <button className="import-btn" onClick={onImport}>
              Import
            </button>

            <div className="export-dropdown">
              <button className="export-btn">Export ▼</button>

              <div className="dropdown-menu">
                <button onClick={onExportTurtle}>Turtle (.ttl)</button>
                <button onClick={onExportOWL}>OWL/XML (.owl)</button>
                <button onClick={onExportRDF}>RDF/XML (.rdf)</button>
                <button onClick={onExportJSONLD}>JSON-LD (.jsonld)</button>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* View Controls */}
          <div className="zoom-controls">
            <button className="icon-btn" onClick={onZoomOut}>
              –
            </button>
            <button className="icon-btn" onClick={onZoomIn}>
              +
            </button>
            <button className="icon-btn" onClick={onFitView}>
              ⤧
            </button>

            <button
              className={`icon-btn ${isGridVisible ? "grid-active" : ""}`}
              onClick={onToggleGrid}
            >
              #
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
