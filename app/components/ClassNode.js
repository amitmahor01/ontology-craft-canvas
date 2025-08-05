import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

export default function ClassNode({ data, selected }) {
  return (
    <div className="relative w-28 h-14 flex items-center justify-center select-none">
      <NodeResizer 
        color="#2563eb" 
        isVisible={selected} 
        minWidth={112} 
        minHeight={56} 
      />
      <div className="absolute inset-0 flex items-center justify-center bg-blue-50 border-2 border-blue-400 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="font-bold text-blue-800 text-sm mb-1">Class</div>
          <div className="text-blue-900 font-semibold text-lg">{data.label || 'Class'}</div>
        </div>
      </div>
      {/* Handles absolutely positioned at the midpoints of each edge */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-blue-400 border-2 border-white z-20"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-blue-400 border-2 border-white z-20"
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!absolute top-1/2 -translate-y-1/2 -left-2 w-3 h-3 bg-blue-400 border-2 border-white z-20"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!absolute top-1/2 -translate-y-1/2 -right-2 w-3 h-3 bg-blue-400 border-2 border-white z-20"
      />
    </div>
  );
}