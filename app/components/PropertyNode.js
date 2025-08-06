import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

export default function PropertyNode({ data, selected }) {
  return (
    <div className="relative w-36 h-28 flex items-center justify-center select-none">
      <NodeResizer 
        color="#eab308" 
        isVisible={selected} 
        minWidth={144} 
        minHeight={112} 
      />
      <div 
        className="absolute inset-0 flex items-center justify-center px-3"
        style={{ 
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 
          background: '#fef9c3', 
          border: '2px solid #fde047' 
        }}
      >
        <div className="text-center">
          <div className="font-bold text-yellow-800 text-xs mb-1">Property</div>
          <div className="text-yellow-900 font-semibold text-sm leading-tight">
            {data.label || 'Property'}
          </div>
        </div>
      </div>
      
      {/* Connection handles with better positioning */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white hover:bg-yellow-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white hover:bg-yellow-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white hover:bg-yellow-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-yellow-400 border-2 border-white hover:bg-yellow-500 transition-colors"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}
