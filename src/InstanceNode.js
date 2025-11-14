import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

import "./styles/instance-node.css";

export default function InstanceNode({ data, selected }) {
  return (
    <div className="instance-node-container">
      <NodeResizer
        color="#16a34a"
        isVisible={selected}
        minWidth={96}
        minHeight={96}
      />

      <div className="instance-node-inner">
        <div className="instance-node-label-wrapper">
          <div className="instance-node-title">Instance</div>
          <div className="instance-node-content">
            {data.label || 'Instance'}
          </div>
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="instance-node-handle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="instance-node-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="instance-node-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="instance-node-handle"
      />
    </div>
  );
}
