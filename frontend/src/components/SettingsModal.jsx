import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Save, Box, Hexagon, CircleDashed } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';

export default function SettingsModal() {
    const { settings, updateSettings } = useTimerStore();
    const [isOpen, setIsOpen] = useState(false);

    // Local state for edits
    const [pomodoro, setPomodoro] = useState(Math.floor(settings.pomodoro / 60));
    const [shortBreak, setShortBreak] = useState(Math.floor(settings.shortBreak / 60));
    const [longBreak, setLongBreak] = useState(Math.floor(settings.longBreak / 60));
    const [model, setModel] = useState(settings.model);

    const handleSave = () => {
        updateSettings({
            pomodoro: pomodoro * 60,
            shortBreak: shortBreak * 60,
            longBreak: longBreak * 60,
            model,
        });
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
            >
                <Settings size={20} />
            </button>

            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-lockedin-surface border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col"
                            >
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Settings className="text-lockedin-primary" />
                                    Personalization
                                </h2>

                                <div className="space-y-6">
                                    {/* Time Settings */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Timer Durations (Min)</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs text-zinc-500">Focus</label>
                                                <input
                                                    type="number"
                                                    value={pomodoro}
                                                    onChange={(e) => setPomodoro(Number(e.target.value))}
                                                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-lockedin-primary font-mono w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs text-zinc-500">Short Break</label>
                                                <input
                                                    type="number"
                                                    value={shortBreak}
                                                    onChange={(e) => setShortBreak(Number(e.target.value))}
                                                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-lockedin-secondary font-mono w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs text-zinc-500">Long Break</label>
                                                <input
                                                    type="number"
                                                    value={longBreak}
                                                    onChange={(e) => setLongBreak(Number(e.target.value))}
                                                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-lockedin-accent font-mono w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3D Model Settings */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Focus Core Theme</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <button
                                                onClick={() => setModel('Crystal')}
                                                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${model === 'Crystal' ? 'border-lockedin-primary bg-lockedin-primary/10 text-lockedin-primary' : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}`}
                                            >
                                                <Hexagon size={24} />
                                                <span className="text-[10px] uppercase font-bold tracking-wider text-center">Neon Crystal</span>
                                            </button>
                                            <button
                                                onClick={() => setModel('Void')}
                                                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${model === 'Void' ? 'border-lockedin-primary bg-lockedin-primary/10 text-lockedin-primary' : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}`}
                                            >
                                                <CircleDashed size={24} />
                                                <span className="text-[10px] uppercase font-bold tracking-wider text-center">Dark Void</span>
                                            </button>
                                            <button
                                                onClick={() => setModel('Orbit')}
                                                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${model === 'Orbit' ? 'border-lockedin-primary bg-lockedin-primary/10 text-lockedin-primary' : 'border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}`}
                                            >
                                                <Box size={24} />
                                                <span className="text-[10px] uppercase font-bold tracking-wider text-center">Data Orbit</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <button
                                        onClick={handleSave}
                                        className="w-full btn-primary bg-lockedin-primary hover:bg-lockedin-primary/80 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        Save Preferences
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
