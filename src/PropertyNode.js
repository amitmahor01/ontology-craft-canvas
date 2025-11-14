import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";

export default function PropertyNode({ data, selected }) {
  const containerStyle = {
    position: "relative",
    width: "144px",
    height: "112px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const diamondStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "12px",
    paddingRight: "12px",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    background: "#fef9c3",
    border: "2px solid #fde047",
  };

  const headerTextStyle = {
    fontWeight: "bold",
    color: "#854d0e",
    fontSize: "12px",
    marginBottom: "4px",
    textAlign: "center",
  };

  const labelTextStyle = {
    fontWeight: "600",
    color: "#713f12",
    fontSize: "14px",
    lineHeight: "1.1",
    textAlign: "center",
  };

  const handleStyle = {
    width: "12px",
    height: "12px",
    backgroundColor: "#facc15",
    border: "2px solid white",
    transition: "background-color 0.2s",
    zIndex: 1000,
  };

  return (
    <div style={containerStyle}>
      <NodeResizer
        color="#eab308"
        isVisible={selected}
        minWidth={144}
        minHeight={112}
      />

      <div style={diamondStyle}>
        <div style={{ textAlign: "center" }}>
          <div style={headerTextStyle}>Property</div>
          <div style={labelTextStyle}>{data.label || "Property"}</div>
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyle}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
      />
    </div>
  );
}
