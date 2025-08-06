import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

export default function InstanceNode({ data, selected }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center select-none">
      <NodeResizer 
        color="#16a34a" 
        isVisible={selected} 
        minWidth={96} 
        minHeight={96} 
      />
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-50 border-2 border-green-400 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-center px-2">
          <div className="font-bold text-green-800 text-xs mb-1">Instance</div>
          <div className="text-green-900 font-semibold text-sm leading-tight">
            {data.label || 'Instance'}
          </div>
        </div>
      </div>
      
      {/* Connection handles with better positioning */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-green-400 border-2 border-white hover:bg-green-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-green-400 border-2 border-white hover:bg-green-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-green-400 border-2 border-white hover:bg-green-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-green-400 border-2 border-white hover:bg-green-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}
