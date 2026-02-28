import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import { SignInPage, SignUpPage } from './pages/AuthPages';
import RoomsPage from './pages/RoomsPage';
import BackgroundScene from './components/3d/BackgroundScene';

import { useTimerStore } from './store/useTimerStore';
import { useSocketSync } from './store/useRoomStore';

function App() {
  const timerState = useTimerStore();
  const { sessionCount } = timerState;
  const [showCelebration, setShowCelebration] = useState(false);
  const prevSessionCount = React.useRef(sessionCount);

  // Hook up the auto sync
  useSocketSync(timerState, { username: 'Current_User' });

  // Trigger celebration when sessionCount increments
  useEffect(() => {
    if (sessionCount > prevSessionCount.current) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
      prevSessionCount.current = sessionCount;
    }
  }, [sessionCount]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans">
      <div className="bg-noise" />
      <BackgroundScene />

      <Navbar />

      <div className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room/:id" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
        </Routes>
      </div>

      {/* Celebratory Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -50 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm"
          >
            <div className="text-center">
              <Motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mx-auto w-24 h-24 bg-lockedin-primary/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_#10b981]"
              >
                <Star size={48} className="text-lockedin-accent" fill="currentColor" />
              </Motion.div>
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 drop-shadow-xl mb-2">
                +50 XP
              </h1>
              <p className="text-2xl text-white font-bold tracking-widest uppercase shadow-black drop-shadow-md">
                Focus Session Complete!
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
