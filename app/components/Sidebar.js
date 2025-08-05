const items = [
  { type: 'class', label: 'Class' },
  { type: 'instance', label: 'Instance' },
  { type: 'property', label: 'Property' },
];

function TypeShape({ type, label }) {
  if (type === 'class') {
    return (
      <div
        className="bg-blue-50 border-2 border-blue-400 rounded-lg w-28 h-14 flex items-center justify-center select-none shadow-sm"
      >
        <span className="text-blue-900 font-semibold text-base">{label}</span>
      </div>
    );
  }
  if (type === 'instance') {
    return (
      <div
        className="bg-green-50 border-2 border-green-400 rounded-full w-20 h-20 flex items-center justify-center select-none shadow-sm"
      >
        <span className="text-green-900 font-semibold text-base">{label}</span>
      </div>
    );
  }
  if (type === 'property') {
    return (
      <div
        className="bg-yellow-50 border-2 border-yellow-400 w-28 h-20 flex items-center justify-center select-none shadow-sm px-2"
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
  const onDragStart = (event, type, label) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-44 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-6 items-center">
      <div className="font-bold mb-2 self-start">Ontology Elements</div>
      {items.map((item) => (
        <div
          key={item.type}
          className="cursor-move"
          draggable
          onDragStart={(e) => onDragStart(e, item.type, item.label)}
        >
          <TypeShape type={item.type} label={item.label} />
        </div>
      ))}
    </aside>
  );
}