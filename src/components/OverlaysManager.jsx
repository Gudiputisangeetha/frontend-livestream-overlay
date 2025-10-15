import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const OverlaysManager = ({ overlays, onDelete, onPositionChange, onSizeChange }) => {
  return (
    <>
      {overlays.map((o) => (
        <Draggable
          key={o._id}
          defaultPosition={{ x: o.position.x, y: o.position.y }}
          bounds="parent"
          onStop={(e, data) => onPositionChange(o._id, data.x, data.y)}
        >
          {o.type === "text" ? (
            <div style={{
              fontSize: o.fontSize,
              color: o.color,
              backgroundColor: `rgba(0,0,0,${o.opacity})`,
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "move",
              display: "inline-block",
              position: "relative",
            }}>
              {o.content}
              <button
                onClick={() => onDelete(o._id)}
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                  color: "#fff",
                  background: "transparent",
                  border: "none",
                  position: "absolute",
                  top: 0,
                  right: 0
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <ResizableBox
              width={o.width || 150}
              height={o.height || 50}
              minConstraints={[50, 30]}
              maxConstraints={[500, 300]}
              onResizeStop={(e, { size }) => onSizeChange(o._id, size.width, size.height)}
            >
              <div style={{ position: "relative" }}>
                <img src={o.url} alt="overlay" style={{
                  width: "100%",
                  height: "100%",
                  opacity: o.opacity,
                  borderRadius: "5px"
                }} />
                <button
                  onClick={() => onDelete(o._id)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </div>
            </ResizableBox>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default OverlaysManager;
