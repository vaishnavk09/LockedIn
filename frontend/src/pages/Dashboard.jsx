import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronUp, Trophy } from 'lucide-react';
import FocusTimer from '../components/FocusTimer';
import FocusRoom from '../components/FocusRoom';
import Leaderboard from '../components/Leaderboard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function Dashboard() {
    const [showQuests, setShowQuests] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 w-full p-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden pointer-events-none"
        >
            {/* Quests Overlay Toggle (Top Left) */}
            <motion.div variants={itemVariants} className="absolute top-24 left-6 md:left-12 z-40 pointer-events-auto">
                <motion.button
                    onClick={() => setShowQuests(!showQuests)}
                    className="glass-panel px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Daily Quests <ChevronUp size={16} className={showQuests ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </motion.button>

                <AnimatePresence>
                    {showQuests && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 10, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-10 left-0 glass-panel p-6 w-80 shadow-2xl border border-lockedin-primary/30 pointer-events-auto origin-top-left"
                        >
                            <h3 className="font-bold text-lg mb-4 text-lockedin-primary flex items-center gap-2">
                                <Star size={18} /> Daily Quests
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between text-sm bg-white/5 p-3 rounded-lg border border-white/5 hover:border-lockedin-primary/30 transition-colors">
                                    <span className="text-zinc-300">Complete 1 Pomodoro</span>
                                    <span className="text-lockedin-secondary font-mono text-xs">+50 XP</span>
                                </li>
                                <li className="flex items-center justify-between text-sm bg-white/5 p-3 rounded-lg border border-white/5 hover:border-lockedin-primary/30 transition-colors">
                                    <span className="text-zinc-300">Join a Focus Room</span>
                                    <span className="text-lockedin-secondary font-mono text-xs">+20 XP</span>
                                </li>
                                <li className="flex items-center justify-between text-sm bg-black/40 p-3 rounded-lg border border-white/5 opacity-50">
                                    <span className="text-zinc-500 line-through">Login today</span>
                                    <span className="text-zinc-600 font-mono text-xs">Done</span>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Leaderboard Overlay Toggle (Top Right) */}
            <motion.div variants={itemVariants} className="absolute top-24 right-6 md:right-12 z-40 pointer-events-auto flex flex-col items-end">
                <motion.button
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className="glass-panel px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Trophy size={16} className="text-amber-400" /> Leaderboard <ChevronUp size={16} className={showLeaderboard ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </motion.button>

                <AnimatePresence>
                    {showLeaderboard && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 10, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-10 right-0 z-50 origin-top-right pointer-events-auto pt-2"
                        >
                            {/* Wrap Leaderboard inside a responsive container so it acts like a popup */}
                            <div className="w-80 sm:w-96 shadow-2xl filter drop-shadow-2xl">
                                <Leaderboard />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Focus Room (Bottom Right / Absolute) */}
            <motion.div variants={itemVariants} className="absolute bottom-6 right-6 md:right-12 z-30 pointer-events-auto origin-bottom-right hidden md:block">
                <FocusRoom />
            </motion.div>

            {/* Center: The Timer */}
            <motion.div variants={itemVariants} className="pointer-events-auto z-20 w-full max-w-md flex justify-center mt-[-5vh]">
                <FocusTimer />
            </motion.div>
        </motion.div>
    );
}
