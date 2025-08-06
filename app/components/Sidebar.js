'use client';

import { useState } from 'react';

// Enhanced ontology elements with categories and descriptions
const ontologyElements = [
  {
    category: 'Classes',
    description: 'Define concepts and categories',
    items: [
      { 
        type: 'class', 
        label: 'Class', 
        description: 'A concept or category',
        icon: '',
        color: 'blue'
      },
      { 
        type: 'class', 
        label: 'SubClass', 
        description: 'A specialized class',
        icon: '',
        color: 'blue'
      },
    ]
  },
  {
    category: 'Instances',
    description: 'Individual objects or entities',
    items: [
      { 
        type: 'instance', 
        label: 'Instance', 
        description: 'An individual object',
        icon: '',
        color: 'green'
      },
      { 
        type: 'instance', 
        label: 'Individual', 
        description: 'A specific entity',
        icon: '',
        color: 'green'
      },
    ]
  },
  {
    category: 'Properties',
    description: 'Relationships and attributes',
    items: [
      { 
        type: 'property', 
        label: 'Property', 
        description: 'A relationship or attribute',
        icon: '',
        color: 'yellow'
      },
      { 
        type: 'property', 
        label: 'DataProperty', 
        description: 'A data attribute',
        icon: '',
        color: 'yellow'
      },
      { 
        type: 'property', 
        label: 'ObjectProperty', 
        description: 'A relationship between objects',
        icon: '',
        color: 'yellow'
      },
    ]
  }
];

function ElementPreview({ type, label, color }) {
  const baseClasses = "w-16 h-12 flex items-center justify-center select-none shadow-sm hover:shadow-md transition-all duration-200 cursor-move";
  
  if (type === 'class') {
    return (
      <div className={`${baseClasses} bg-blue-50 border-2 border-blue-400 rounded-lg`}>
        <div className="text-center">
          <div className="font-bold text-blue-800 text-xs">Class</div>
          <div className="text-blue-900 font-semibold text-xs">{label}</div>
        </div>
      </div>
    );
  }
  
  if (type === 'instance') {
    return (
      <div className={`${baseClasses} bg-green-50 border-2 border-green-400 rounded-full`}>
        <div className="text-center">
          <div className="font-bold text-green-800 text-xs">Instance</div>
          <div className="text-green-900 font-semibold text-xs">{label}</div>
        </div>
      </div>
    );
  }
  
  if (type === 'property') {
    return (
      <div 
        className={`${baseClasses} px-2`}
        style={{ 
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 
          background: '#fef9c3', 
          border: '2px solid #fde047' 
        }}
      >
        <div className="text-center">
          <div className="font-bold text-yellow-800 text-xs">Property</div>
          <div className="text-yellow-900 font-semibold text-xs">{label}</div>
        </div>
      </div>
    );
  }
  
  return null;
}

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    ontologyElements.map((_, index) => index)
  );

  const onDragStart = (event, type, label) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const toggleCategory = (index) => {
    setExpandedCategories(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredElements = ontologyElements.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-bold text-lg text-gray-800 mb-2">Ontology Elements</h2>
        <p className="text-sm text-gray-600 mb-3">
          Drag and drop elements to create your ontology
        </p>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg 
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredElements.map((category, categoryIndex) => (
          <div key={category.category} className="space-y-2">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(categoryIndex)}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{category.category}</span>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {category.items.length}
                </span>
              </div>
              <svg 
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  expandedCategories.includes(categoryIndex) ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Category Description */}
            {expandedCategories.includes(categoryIndex) && (
              <p className="text-xs text-gray-600 px-2 mb-2">{category.description}</p>
            )}
            
            {/* Category Items */}
            {expandedCategories.includes(categoryIndex) && (
              <div className="space-y-3 pl-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={`${item.type}-${itemIndex}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                    <div
                      className="cursor-move hover:scale-105 transition-transform"
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type, item.label)}
                      title={`Drag to add ${item.label}`}
                    >
                      <ElementPreview type={item.type} label={item.label} color={item.color} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {filteredElements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">No elements found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          <p> Tip: Drag elements to the canvas to start building your ontology</p>
        </div>
      </div>
    </aside>
  );
}