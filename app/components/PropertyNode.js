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
      
      {/* Connection handles - using React Flow's built-in positioning */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}
