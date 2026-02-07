# 🎮 LockedIn

A gamified productivity app that turns focus sessions into an RPG experience. Earn XP, level up, and compete with friends in real-time focus rooms!

## 🌟 Features

- 🎯 **Pomodoro-style focus sessions** with XP rewards
- 🏆 **Real-time leaderboards** and competitive rankings
- 👥 **Multiplayer focus rooms** (2-5 people working together)
- 🎨 **Character progression** with unlockable classes
- 📊 **Daily quests and challenges**
- 🔥 **Streak tracking** with visual rewards

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Socket.io Client
- React Query
- Zustand

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- Passport.js (Google OAuth)

## 📦 Project Structure
```
lockedin/
├── backend/          # Node.js REST API + WebSocket server
├── frontend/         # React application (coming soon)
└── README.md         # You are here
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- Google OAuth credentials

### Backend Setup

1. Navigate to backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
MONGODB_URI=your-mongodb-connection-string
PORT=5000
NODE_ENV=development
```

4. Run development server
```bash
npm run dev
```

Server runs at `http://localhost:5000`

### Frontend Setup
Coming soon...

## 📋 Development Roadmap

- [x] **Phase 1:** Core MVP - Solo focus engine
  - [x] Server setup
  - [x] User model
  - [ ] Session model
  - [ ] Focus timer API
  - [ ] XP/leveling system

- [ ] **Phase 2:** Social layer
  - [ ] Leaderboards
  - [ ] Friend system

- [ ] **Phase 3:** Real-time features
  - [ ] Focus rooms
  - [ ] Live presence tracking

- [ ] **Phase 4:** Engagement features
  - [ ] Daily quests
  - [ ] Character customization
  - [ ] Achievement system

## 🎯 Current Status

**Phase 1 - In Progress**
- ✅ Backend server running
- ✅ MongoDB connected
- ✅ User model created
- 🔄 Building Session model next

## 📝 License

MIT

## 👨‍💻 Developer

Built as a portfolio project to showcase full-stack MERN development skills.

---

**⭐ Star this repo if you find it interesting!**