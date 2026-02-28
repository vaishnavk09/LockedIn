import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swords, LogIn, Moon, Sun } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SettingsModal from './SettingsModal';
import { useTimerStore } from '../store/useTimerStore';

export default function Navbar() {
    const { level, xp } = useTimerStore();

    // Theme Toggle Logic
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.classList.contains('light') ? false : true;
    });

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.add('light');
            setIsDark(false);
        } else {
            document.documentElement.classList.remove('light');
            setIsDark(true);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center pointer-events-auto bg-lockedin-surface/50 backdrop-blur-xl border-b border-white/5 shadow-lg">
            <div className="flex items-center gap-8">
                <Link to="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <Swords size={24} className="text-lockedin-primary" /> LockedIn
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors">Dashboard</Link>
                    <Link to="/rooms" className="text-sm font-bold text-zinc-300 hover:text-white transition-colors">Rooms</Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Settings Button is now integrated cleanly */}
                <SettingsModal />

                <SignedIn>
                    <div className="hidden sm:flex bg-white/5 rounded-xl px-4 py-1.5 border border-white/5 shadow-inner flex-col items-end">
                        <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Level {level}</span>
                        <p className="text-[10px] text-zinc-300 font-mono">{xp} / {100 * level} XP</p>
                    </div>
                    <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 border-2 border-lockedin-primary" } }} />
                </SignedIn>

                <SignedOut>
                    <Link to="/sign-in" className="btn-primary py-2 px-4 shadow-none hover:shadow-[0_0_15px_#10b98180] text-sm">
                        <LogIn size={16} /> Sign In
                    </Link>
                </SignedOut>
            </div>
        </nav>
    );
}
