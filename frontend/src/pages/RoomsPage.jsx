import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, ArrowRight, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import { socket } from '../store/useRoomStore';
import MagneticButton from '../components/ui/MagneticButton';

export default function RoomsPage() {
    const [roomId, setRoomId] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        setError('');
        if (roomId.trim().length === 6) {
            navigate(`/room/${roomId.toUpperCase()}`);
        } else {
            setError('Room code must be 6 characters long.');
        }
    };

    const createRoom = () => {
        setIsCreating(true);
        setError('');
        socket.connect();
        socket.emit('create-room', (response) => {
            if (response.roomId) {
                navigate(`/room/${response.roomId}`);
            } else {
                setError('Failed to create room. Try again.');
                setIsCreating(false);
            }
        });
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center pt-24 z-10 relative pointer-events-auto px-6">
            <div className="glass-panel p-8 w-full max-w-md flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-lockedin-primary/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center relative z-10">
                    <div className="mx-auto w-16 h-16 bg-lockedin-primary/20 text-lockedin-primary rounded-2xl flex items-center justify-center mb-4 border border-lockedin-primary/30 shadow-[0_0_20px_#10b98140]">
                        <Users size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Focus Rooms</h2>
                    <p className="text-sm text-zinc-400">Join a friend's room or create your own to study together in real-time.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleJoin} className="flex flex-col gap-4 relative z-10 mt-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-widest pl-1">Join By Code (6 Digits)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="e.g. 129304"
                            maxLength={6}
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lockedin-primary font-mono tracking-widest transition-colors uppercase"
                        />
                        <button type="submit" className="p-3 bg-lockedin-primary/10 border border-lockedin-primary/30 rounded-xl text-lockedin-primary hover:bg-lockedin-primary/20 transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </form>

                <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-widest my-2 relative z-10">
                    <div className="flex-1 h-px bg-white/10"></div>
                    Or
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <MagneticButton
                    onClick={createRoom}
                    disabled={isCreating}
                    className="btn-primary w-full shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] relative z-10"
                >
                    <Plus size={18} /> {isCreating ? 'Creating...' : 'Create New Room'}
                </MagneticButton>
            </div>
        </motion.div>
    );
}
