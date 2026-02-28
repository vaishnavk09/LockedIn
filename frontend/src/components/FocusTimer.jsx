import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';

export default function FocusTimer() {
    const { mode, timeLeft, isActive, toggleTimer, resetTimer, setMode, tick } = useTimerStore();

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                tick();
            }, 1000);
        } else if (!isActive && interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, tick]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((mode.duration - timeLeft) / mode.duration) * 100;

    // Dynamic colors mapped directly to tailwind utility classes
    const progressBgClass = mode.name === 'Focus' ? 'bg-lockedin-primary' : mode.name === 'Short Break' ? 'bg-lockedin-secondary' : 'bg-lockedin-accent';
    const textClass = mode.name === 'Focus' ? 'text-lockedin-primary' : mode.name === 'Short Break' ? 'text-lockedin-secondary' : 'text-lockedin-accent';

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto relative z-10">
            <div className="glass-panel p-8 w-full flex flex-col items-center relative overflow-hidden">

                {/* Progress Background Glow */}
                <div
                    className={`absolute bottom-0 left-0 h-1 ${progressBgClass} transition-all duration-1000 ease-linear shadow-[0_0_15px_currentColor]`}
                    style={{ width: `${progress}%` }}
                />

                {/* Mode Selector */}
                <div className="flex bg-white/5 rounded-full p-2 mb-10 shadow-inner border border-white/5 gap-2">
                    <button
                        onClick={() => setMode('POMODORO')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${mode.name === 'Focus' ? 'bg-lockedin-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Target size={16} /> Focus
                    </button>
                    <button
                        onClick={() => setMode('SHORT_BREAK')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${mode.name === 'Short Break' ? 'bg-lockedin-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Coffee size={16} /> Short
                    </button>
                    <button
                        onClick={() => setMode('LONG_BREAK')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${mode.name === 'Long Break' ? 'bg-lockedin-accent text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Coffee size={16} /> Long
                    </button>
                </div>

                {/* Timer Display */}
                <div className="relative mb-10 mt-4 w-48 h-48 flex flex-col items-center justify-center">
                    <AnimatePresence mode="popLayout">
                        <motion.h2
                            key={timeLeft}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-7xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        >
                            {formatTime(timeLeft)}
                        </motion.h2>
                    </AnimatePresence>
                    <p className={`${textClass} font-medium tracking-widest uppercase text-sm mt-4 flex items-center gap-2`}>
                        <span className={`w-2 h-2 rounded-full ${progressBgClass} animate-pulse`} />
                        {mode.name}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTimer}
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all active:scale-90 shadow-xl border border-white/10 hover:border-white/30 backdrop-blur-md ${isActive ? 'bg-white/10 hover:bg-white/20' :
                            mode.name === 'Focus' ? 'bg-lockedin-primary hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' :
                                mode.name === 'Short Break' ? 'bg-lockedin-secondary hover:bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)]' :
                                    'bg-lockedin-accent hover:bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
                            }`}
                    >
                        {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 active:scale-90"
                        title="Reset Timer"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
