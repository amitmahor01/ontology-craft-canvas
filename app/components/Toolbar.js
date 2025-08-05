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

export default function Toolbar({ selectedNode, selectedEdge, onDeleteNode, onExport, onLabelChange }) {
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

  return (
    <div className="flex items-center gap-4 bg-gray-100 border-b border-gray-200 px-4 py-2">
      <span className="font-semibold text-lg">Ontology Canvas</span>
      {selectedElement && (
        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs font-semibold text-gray-600 mr-1">{typeLabel}</span>
          <input
            className="border rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={selectedElement.data?.label || ''}
            onChange={e => onLabelChange(e.target.value)}
            placeholder={`Edit ${typeLabel.toLowerCase()} label`}
            aria-label={`Edit ${typeLabel.toLowerCase()} label`}
          />
          <button
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center w-8 h-8 ml-1"
            title={`Delete Selected ${typeLabel}`}
            onClick={onDeleteNode}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <button
        className="ml-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onExport}
      >
        Export to Turtle
      </button>
    </div>
  );
}