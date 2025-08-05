'use client';

import { useState } from 'react';

// Simplified items without categories
const elements = [
  { type: 'class', label: 'Class',  },
  { type: 'instance', label: 'Instance', },
  { type: 'property', label: 'Property',},
];

function TypeShape({ type, label }) {
  if (type === 'class') {
    return (
      <div
        className="bg-blue-50 border-2 border-blue-400 rounded-lg w-28 h-14 flex items-center justify-center select-none shadow-sm hover:shadow-md transition-shadow"
      >
        <span className="text-blue-900 font-semibold text-base">{label}</span>
      </div>
    );
  }
  if (type === 'instance') {
    return (
      <div
        className="bg-green-50 border-2 border-green-400 rounded-full w-20 h-20 flex items-center justify-center select-none shadow-sm hover:shadow-md transition-shadow"
      >
        <span className="text-green-900 font-semibold text-base">{label}</span>
      </div>
    );
  }
  if (type === 'property') {
    return (
      <div
        className="bg-yellow-50 border-2 border-yellow-400 w-28 h-20 flex items-center justify-center select-none shadow-sm hover:shadow-md transition-shadow px-2"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      >
        <span className="text-yellow-900 font-bold text-sm text-center whitespace-nowrap">
          {label}
        </span>
      </div>
    );
  }
  return null;
}

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event, type, label) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredElements = elements.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="font-bold text-lg text-gray-800 mb-3">Ontology Elements</h2>
        
        {/* Search Bar */}
       
      </div>

      {/* Elements List */}
      <div className="flex-1 space-y-4">
        {filteredElements.map((item, index) => (
          <div
            key={`${item.type}-${index}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <div
              className="cursor-move hover:scale-105 transition-transform"
              draggable
              onDragStart={(e) => onDragStart(e, item.type, item.label)}
            >
              <TypeShape type={item.type} label={item.label} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}