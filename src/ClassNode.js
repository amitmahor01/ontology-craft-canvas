import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";

import "./styles/class-node.css";

export default function ClassNode({ data, selected }) {
  return (
    <div className="classnode-container">
      <NodeResizer
        color="#2563eb"
        isVisible={selected}
        minWidth={128}
        minHeight={64}
      />

      <div className="classnode-box">
        <div>
          <div className="classnode-title">Class</div>
          <div className="classnode-label">{data.label || "Class"}</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="classnode-handle"
        style={{ zIndex: 1000 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="classnode-handle"
        style={{ zIndex: 1000 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="classnode-handle"
        style={{ zIndex: 1000 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="classnode-handle"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
}
