# 🎮 LockedIn

A gamified productivity app that turns focus sessions into an immersive 3D RPG experience. Earn XP, level up, and compete with friends in real-time focus rooms!

## 🌟 Features

- 🎯 **3D Pomodoro-style focus sessions** with interactive 3D elements
- 🏆 **Real-time Global Leaderboards** and competitive rankings
- 👥 **Multiplayer Focus Rooms** (live avatar statuses via Socket.io)
- 🎨 **Character progression** and XP leveling system
- 📊 **Animated Daily quests and challenges**
- 🔥 **Stunning Glassmorphism UI** with Framer Motion animations

## 🛠️ Tech Stack

### Frontend
- **React 19 (Vite)**
- **Tailwind CSS v4** (Custom Dark Mode & Glassmorphism)
- **Framer Motion** (Micro-animations)
- **React Three Fiber & Drei** (3D Environment)
- **Zustand** (Local State Management)
- **Socket.io Client** (Real-time syncing)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Socket.io** (Room Management)
- **JWT Authentication**

## 📦 Project Structure
```
lockedin/
├── backend/          # Node.js REST API + WebSocket server
├── frontend/         # React Vite application 
└── README.md         # You are here
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend Setup

1. Navigate to the backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file (see `.env.example`)
```bash
MONGODB_URI=your-mongodb-connection-string
PORT=5000
JWT_SECRET=your-secret-key
```

4. Run the development server
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

Server runs at `http://localhost:5173`. Open it in your browser to experience the 3D focus app!

## 📋 Development Status

- ✅ **Phase 1:** Core MVP - Scaffolding & Design System
- ✅ **Phase 2:** Core Focus Timer & 3D Gamification
- ✅ **Phase 3:** Backend Integration (User & Auth structure)
- ✅ **Phase 4:** Real-time Multi-player (Focus Rooms via Socket.io)
- ✅ **Phase 5:** Progression UI & Leaderboards

## 📝 License

MIT

## 👨‍💻 Developer

Built as a portfolio project to showcase full-stack MERN + 3D Gamification development skills.

---

**⭐ Star this repo if you find it interesting!**