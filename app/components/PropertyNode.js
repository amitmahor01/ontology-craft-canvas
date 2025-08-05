import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

export default function PropertyNode({ data, selected }) {
  return (
    <div className="relative w-32 h-24 flex items-center justify-center select-none">
      <NodeResizer 
        color="#eab308" 
        isVisible={selected} 
        minWidth={128} 
        minHeight={96} 
      />
      <div 
        className="absolute inset-0 flex items-center justify-center px-2"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', background: '#fef9c3', border: '2px solid #fde047' }}
      >
        <span className="text-yellow-900 font-bold text-sm text-center whitespace-nowrap z-10">
          {data.label || 'Property'}
        </span>
      </div>
      {/* Handles absolutely positioned at the midpoints of each edge */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-yellow-400 border-2 border-white z-20"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-yellow-400 border-2 border-white z-20"
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!absolute top-1/2 -translate-y-1/2 -left-2 w-3 h-3 bg-yellow-400 border-2 border-white z-20"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!absolute top-1/2 -translate-y-1/2 -right-2 w-3 h-3 bg-yellow-400 border-2 border-white z-20"
      />
    </div>
  );
}