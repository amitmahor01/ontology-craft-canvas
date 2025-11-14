"use client";

import { useState } from "react";
import "./styles/Sidebar.css";
import "./styles/ElementPreview.css";

function ElementPreview({ type, label }) {
  const classMap = {
    class: "preview-class",
    instance: "preview-instance",
    property: "preview-property",
  };

  return (
    <div className={`element-preview ${classMap[type]}`}>
      <div className="element-preview-content">
        <div className="preview-title">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        <div className="preview-label">{label}</div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const ontologyElements = [
    {
      category: "Classes",
      description: "Define concepts and categories",
      items: [
        { type: "class", label: "Class" },
        { type: "class", label: "SubClass" },
      ],
    },
    {
      category: "Instances",
      description: "Individual objects or entities",
      items: [
        { type: "instance", label: "Instance" },
        { type: "instance", label: "Individual" },
      ],
    },
    {
      category: "Properties",
      description: "Relationships and attributes",
      items: [
        { type: "property", label: "Property" },
        { type: "property", label: "DataProperty" },
        { type: "property", label: "ObjectProperty" },
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([0, 1, 2]);

  const toggleCategory = (idx) =>
    setExpandedCategories((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );

  const filtered = ontologyElements
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">Ontology Elements</div>
        <div className="sidebar-subtext">
          Drag and drop elements to create your ontology
        </div>

        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="search-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filtered.map((cat, idx) => (
          <div className="category" key={cat.category}>
            <button
              className="category-header"
              onClick={() => toggleCategory(idx)}
            >
              <div className="category-title-wrapper">
                <span className="category-title">{cat.category}</span>
                <span className="category-count">{cat.items.length}</span>
              </div>
              <span>{expandedCategories.includes(idx) ? "▲" : "▼"}</span>
            </button>

            {expandedCategories.includes(idx) && (
              <>
                <div className="category-description">{cat.description}</div>

                <div className="category-items">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="category-item">
                      <div className="flex-1">
                        <div className="category-item-label">{item.label}</div>
                      </div>
                      <div
                        className="category-item-drag"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData(
                            "application/reactflow",
                            item.type
                          );
                          e.dataTransfer.setData(
                            "application/label",
                            item.label
                          );
                        }}
                      >
                        <ElementPreview type={item.type} label={item.label} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-tip">Tip: Drag elements to the canvas</div>
      </div>
    </aside>
  );
}
