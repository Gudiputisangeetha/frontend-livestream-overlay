# 🎬 Livestream Overlay Frontend (React)

This is the **frontend** for the Livestream Overlay Application built with React.  
It connects to the Flask backend via REST APIs and Socket.IO to manage overlays on a live video.

---

## 🚀 Features
- View livestream from RTSP URL
- Add, move, resize, or delete overlays
- Support for **text** and **image** overlays
- Real-time updates synced across clients

---

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Real-Time:** Socket.IO Client
- **Video Player:** HTML5 Video + MJPEG stream
- **Styling:** Tailwind CSS

---

## 📦 Folder Structure
frontend/
├─ public/
│ └─ index.html
├─ src/
│ ├─ App.jsx
│ ├─ index.jsx
│ ├─ api.js
│ └─ components/
│ ├─ VideoPlayer.jsx
│ └─ OverlaysManager.jsx
└─ package.json

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
2️⃣ Start the App
bash
Copy code
npm run dev
The app will run on:
👉 http://localhost:5173

🧩 Configuration
Make sure your backend (Flask) is running at http://localhost:5000.
The frontend automatically connects to this backend via api.js.

🧠 Usage Steps
Enter an RTSP stream URL.

Click Play to start the live video.

Add Text or Image overlays.

Drag overlays to move or resize.

Delete overlays as needed.

All changes auto-sync in real time.

🧠 Example Overlay Inputs
Text Overlay

Content: “Welcome to the stream”

Font Size: 24

Color: #ffffff

Opacity: 0.8

Image Overlay

URL: https://example.com/logo.png

Width/Height adjustable by drag








