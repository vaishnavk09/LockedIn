import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomStore } from '../store/useRoomStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, WifiOff, Link as LinkIcon, Check } from 'lucide-react';

export default function FocusRoom() {
    const { id } = useParams();
    const { roomId, users, isConnected, connectAndJoin, leaveRoom } = useRoomStore();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (id) {
            const demoUser = {
                username: `Studier_${Math.floor(Math.random() * 1000)}`,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
            };
            connectAndJoin(id, demoUser);
        }
        return () => leaveRoom();
    }, [id, connectAndJoin, leaveRoom]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!roomId) return null;

    return (
        <div className="glass-panel p-4 md:p-6 w-full max-w-sm mt-8 md:mt-0 flex flex-col h-full max-h-[400px]">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Users size={18} className="text-lockedin-secondary" />
                        Room: <span className="text-emerald-400 font-mono tracking-wider">{roomId}</span>
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-white/5 hover:bg-white/15 rounded-lg border border-white/10 transition-colors text-zinc-300 flex items-center gap-2 text-xs"
                    >
                        {copied ? <Check size={14} className="text-green-400" /> : <LinkIcon size={14} />}
                        {copied ? 'Copied' : 'Invite'}
                    </button>
                    {isConnected ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs font-mono">
                            <WifiOff size={12} /> Offline
                        </span>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                <div className="grid grid-cols-2 gap-3">
                    <AnimatePresence>
                        {users.map((u) => (
                            <motion.div
                                key={u.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                layout
                                className="flex flex-col items-center justify-center bg-white/5 border border-white/5 p-3 rounded-2xl backdrop-blur-sm relative group overflow-hidden"
                            >
                                <div className={`absolute inset-0 opacity-20 pointer-events-none transition-opacity ${u.status === 'focusing' ? 'bg-lockedin-primary' : 'bg-transparent'}`} />
                                <div className="relative">
                                    <img src={u.avatar} alt="avatar" className="w-14 h-14 rounded-full bg-black/40 border-2 border-white/10 mb-2 shadow-lg" />
                                    <span className={`absolute bottom-1 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#12191e] ${u.status === 'focusing' ? 'bg-lockedin-primary' : 'bg-zinc-500'}`} />
                                </div>
                                <p className="text-xs font-semibold truncate w-full text-center">{u.username}</p>

                                {u.timeLeft && u.status === 'focusing' ? (
                                    <div className="text-[10px] font-mono text-emerald-300 mt-1 font-bold">
                                        {Math.floor(u.timeLeft / 60)}:{(u.timeLeft % 60).toString().padStart(2, '0')}
                                    </div>
                                ) : (
                                    <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{u.status}</div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {users.length === 1 && (
                    <div className="text-center text-zinc-500 text-sm italic mt-8 p-4 bg-white/5 rounded-xl">
                        You're the first one here.<br />Copy the link to invite friends!
                    </div>
                )}
            </div>
        </div>
    );
}
