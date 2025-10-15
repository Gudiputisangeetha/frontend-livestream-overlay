import React, { useEffect, useState } from "react";
import { overlaysAPI } from "../api";
import { io } from "socket.io-client";
import OverlaysManager from "./OverlaysManager";

const socket = io("http://localhost:5000");

const VideoPlayer = ({ rtspUrl }) => {
  const [overlays, setOverlays] = useState([]);
  const [overlayType, setOverlayType] = useState("text");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");
  const [opacity, setOpacity] = useState(0.8);

  const fetchOverlays = async () => {
    const { data } = await overlaysAPI.getAll();
    setOverlays(data);
  };

  useEffect(() => {
    fetchOverlays();

    socket.on("overlay_added", (overlay) => setOverlays((prev) => [...prev, overlay]));
    socket.on("overlay_updated", (overlay) =>
      setOverlays((prev) => prev.map((o) => (o._id === overlay._id ? overlay : o)))
    );
    socket.on("overlay_deleted", ({ _id }) =>
      setOverlays((prev) => prev.filter((o) => o._id !== _id))
    );

    return () => socket.off();
  }, []);

  const addOverlay = async () => {
    let payload;
    if (overlayType === "text") {
      if (!text.trim()) return;
      payload = {
        type: "text",
        content: text,
        position: { x: 50, y: 50 },
        fontSize,
        color,
        opacity
      };
    } else if (overlayType === "image") {
      if (!imageUrl.trim()) return;
      payload = {
        type: "image",
        url: imageUrl,
        position: { x: 50, y: 50 },
        width: 150,
        height: 50,
        opacity
      };
    }
    await overlaysAPI.create(payload);
    setText("");
    setImageUrl("");
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src={`http://localhost:5000/stream?url=${encodeURIComponent(rtspUrl)}`}
        alt="Livestream"
        style={{ width: "100%", height: "100%", display: "block" }}
      />

      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "rgba(0,0,0,0.5)",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 1000
      }}>
        <select value={overlayType} onChange={(e) => setOverlayType(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        {overlayType === "text" && (
          <>
            <input type="text" placeholder="Overlay text" value={text} onChange={(e) => setText(e.target.value)} style={{ marginLeft: "5px" }} />
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ marginLeft: "5px" }} />
            <input type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} min={10} max={100} style={{ width: "60px", marginLeft: "5px" }} />
            <input type="number" value={opacity} step={0.1} min={0.1} max={1} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: "60px", marginLeft: "5px" }} />
          </>
        )}

        {overlayType === "image" && (
          <>
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ marginLeft: "5px" }} />
            <input type="number" value={opacity} step={0.1} min={0.1} max={1} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: "60px", marginLeft: "5px" }} />
          </>
        )}

        <button onClick={addOverlay} style={{ marginLeft: "5px" }}>Add Overlay</button>
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <OverlaysManager
          overlays={overlays}
          onDelete={async (id) => await overlaysAPI.delete(id)}
          onPositionChange={async (id, x, y) => await overlaysAPI.update(id, { "position.x": x, "position.y": y })}
          onSizeChange={async (id, width, height) => await overlaysAPI.update(id, { width, height })}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
