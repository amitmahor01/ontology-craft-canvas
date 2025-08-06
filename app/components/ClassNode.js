import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

export default function ClassNode({ data, selected }) {
  return (
    <div className="relative w-32 h-16 flex items-center justify-center select-none">
      <NodeResizer 
        color="#2563eb" 
        isVisible={selected} 
        minWidth={128} 
        minHeight={64} 
      />
      <div className="absolute inset-0 flex items-center justify-center bg-blue-50 border-2 border-blue-400 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="text-center px-2">
          <div className="font-bold text-blue-800 text-xs mb-1">Class</div>
          <div className="text-blue-900 font-semibold text-sm leading-tight">
            {data.label || 'Class'}
          </div>
        </div>
      </div>
      
      {/* Connection handles with better positioning */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-blue-400 border-2 border-white hover:bg-blue-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-blue-400 border-2 border-white hover:bg-blue-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-blue-400 border-2 border-white hover:bg-blue-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-blue-400 border-2 border-white hover:bg-blue-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}