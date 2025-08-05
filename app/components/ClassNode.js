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
      
      {/* Connection handles - using React Flow's built-in positioning */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-blue-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-blue-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-blue-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-blue-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}