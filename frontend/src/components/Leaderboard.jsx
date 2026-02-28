import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal } from 'lucide-react';

const mockLeaderboard = [
    { id: 1, username: 'FocusGod', level: 42, xp: 4250, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=god' },
    { id: 2, username: 'StudyMaster', level: 38, xp: 3820, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master' },
    { id: 3, username: 'Current_User', level: 12, xp: 1250, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
    { id: 4, username: 'GrindNeverStops', level: 11, xp: 1100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grind' },
    { id: 5, username: 'PomodoroKing', level: 8, xp: 840, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=king' },
];

export default function Leaderboard() {
    return (
        <div className="glass-panel p-4 md:p-6 w-full max-w-sm flex flex-col h-full max-h-[400px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Crown size={18} className="text-yellow-400" />
                    Top Focused
                </h3>
                <span className="text-xs text-zinc-400">Global</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                {mockLeaderboard.map((user, idx) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-sm ${user.username === 'Current_User'
                                ? 'bg-lockedin-primary/10 border-lockedin-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                                : 'bg-white/5 border-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="font-bold text-zinc-500 w-4 text-center">
                                {idx + 1 === 1 ? <Medal size={16} className="text-yellow-400" /> :
                                    idx + 1 === 2 ? <Medal size={16} className="text-zinc-300" /> :
                                        idx + 1 === 3 ? <Medal size={16} className="text-amber-600" /> :
                                            idx + 1}
                            </div>
                            <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-black/20" />
                            <div>
                                <p className={`text-sm font-semibold truncate max-w-[100px] ${user.username === 'Current_User' ? 'text-lockedin-primary' : 'text-white'}`}>
                                    {user.username}
                                </p>
                                <p className="text-xs text-zinc-400">Lvl {user.level}</p>
                            </div>
                        </div>

                        <div className="text-xs font-mono text-lockedin-secondary">
                            {user.xp} XP
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
