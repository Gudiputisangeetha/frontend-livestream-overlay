import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const LandingPage = () => {
  const [rtspUrl, setRtspUrl] = useState("");
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    if (!rtspUrl.trim()) return alert("Please enter a valid RTSP URL");
    setPlay(true);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", background: "#000" }}>
      {!play ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}>
          <h1 style={{ color: "#fff", marginBottom: "20px" }}>Enter RTSP URL to Watch Live Stream</h1>
          <input
            type="text"
            placeholder="rtsp://your-stream-url"
            value={rtspUrl}
            onChange={(e) => setRtspUrl(e.target.value)}
            style={{
              padding: "10px",
              width: "400px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "10px"
            }}
          />
          <button
            onClick={handlePlay}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#28a745",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Play
          </button>
        </div>
      ) : (
        <VideoPlayer rtspUrl={rtspUrl} />
      )}
    </div>
  );
};

export default LandingPage;
