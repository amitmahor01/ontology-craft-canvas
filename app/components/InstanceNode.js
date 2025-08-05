import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

export default function InstanceNode({ data, selected }) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center select-none">
      <NodeResizer 
        color="#16a34a" 
        isVisible={selected} 
        minWidth={80} 
        minHeight={80} 
      />
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-50 border-2 border-green-400 shadow-sm">
        <span className="text-green-900 font-semibold text-base z-10">{data.label || 'Instance'}</span>
      </div>
      
      {/* Connection handles - using React Flow's built-in positioning */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-green-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-green-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-green-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-green-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}
