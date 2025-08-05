'use client';


function TypeIcon({ type }) {
  if (type === 'class') {
    return (
      <div className="w-7 h-7 flex items-center justify-center">
        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg w-6 h-6" />
      </div>
    );
  }
  if (type === 'instance') {
    return (
      <div className="w-7 h-7 flex items-center justify-center">
        <div className="bg-green-50 border-2 border-green-400 rounded-full w-6 h-6" />
      </div>
    );
  }
  if (type === 'property') {
    return (
      <div className="w-7 h-7 flex items-center justify-center">
        <div
          className="bg-yellow-50 border-2 border-yellow-400 w-6 h-6"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
      </div>
    );
  }
  if (type === 'edge') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" className="mx-1">
        <line x1="6" y1="22" x2="22" y2="6" stroke="#555" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="#555" />
          </marker>
        </defs>
      </svg>
    );
  }
  return null;
}

function ValidationStatus({ status }) {
  const statusConfig = {
    valid: { color: 'bg-green-500', icon: '✓', text: 'Valid' },
    warning: { color: 'bg-yellow-500', icon: '⚠', text: 'Warnings' },
    error: { color: 'bg-red-500', icon: '✗', text: 'Errors' },
    loading: { color: 'bg-blue-500', icon: '⟳', text: 'Checking...' }
  };

  const config = statusConfig[status] || statusConfig.valid;

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`}></div>
      <span className="text-sm font-medium text-gray-700">{config.text}</span>
    </div>
  );
}

export default function Toolbar({ 
  selectedNode, 
  selectedEdge, 
  onDeleteNode, 
  onExport, 
  onLabelChange,
  onUndo,
  onRedo,
  onSave,
  onZoomIn,
  onZoomOut,
  onFitView,
  onToggleGrid,
  validationStatus = 'valid',
  canUndo = false,
  canRedo = false,
  isGridVisible = true
}) {
  const selectedElement = selectedNode || selectedEdge;
  let elementType = null;
  let typeLabel = '';
  
  if (selectedNode) {
    elementType = selectedNode.type;
    typeLabel = selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1);
  } else if (selectedEdge) {
    elementType = 'edge';
    typeLabel = 'Edge';
  }

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: 'Ontology Canvas', },
    ...(selectedElement ? [
      { label: typeLabel, icon: elementType === 'edge' ? '' : '' },
      { label: selectedElement.data?.label || 'Unnamed',  }
    ] : [])
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Main Toolbar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Breadcrumb */}
        <div className="flex items-center gap-2">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
                <span>{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Section - Element Editor */}
        {selectedElement && (
          <div className="flex items-center gap-3">
            <TypeIcon type={elementType} />
            <div className="flex items-center gap-2">
              <input
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={selectedElement.data?.label || ''}
                onChange={e => onLabelChange(e.target.value)}
                placeholder={`Edit ${typeLabel.toLowerCase()} label`}
                aria-label={`Edit ${typeLabel.toLowerCase()} label`}
              />
              <button
                className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                title={`Delete Selected ${typeLabel}`}
                onClick={onDeleteNode}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Right Section - Actions & Controls */}
        <div className="flex items-center gap-3">
          {/* Validation Status */}
          <ValidationStatus status={validationStatus} />

          {/* Action Buttons */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
            <button
              className={`p-2 rounded-md transition-colors ${canUndo ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${canRedo ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000-12H6" />
              </svg>
            </button>
            <button
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
              onClick={onSave}
              title="Save"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.636 1.732l.88 2.674a2.25 2.25 0 002.636 1.732h3.86a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6.75v6.75A2.25 2.25 0 002.25 13.5z" />
              </svg>
            </button>
          </div>

          {/* Import/Export */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
            <button
              className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
              onClick={onExport}
              title="Export to Turtle"
            >
              Export
            </button>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
            <button
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
              onClick={onZoomOut}
              title="Zoom Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5H6" />
              </svg>
            </button>
            <button
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
              onClick={onZoomIn}
              title="Zoom In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3H7.5" />
              </svg>
            </button>
            <button
              className="p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
              onClick={onFitView}
              title="Fit to Screen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0l3.194 3.194M20.25 3.75h-4.5m4.5 0v4.5m0-4.5l-3.194 3.194M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0l3.194-3.194M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5l-3.194-3.194" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${isGridVisible ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={onToggleGrid}
              title="Toggle Grid"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018.25 20.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}