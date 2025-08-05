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
      {/* Handles absolutely positioned at the midpoints of each edge */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-green-400 border-2 border-white z-20"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-green-400 border-2 border-white z-20"
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!absolute top-1/2 -translate-y-1/2 -left-2 w-3 h-3 bg-green-400 border-2 border-white z-20"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!absolute top-1/2 -translate-y-1/2 -right-2 w-3 h-3 bg-green-400 border-2 border-white z-20"
      />
    </div>
  );
}