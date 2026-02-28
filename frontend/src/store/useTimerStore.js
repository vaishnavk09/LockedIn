import { create } from 'zustand';

export const FOCUS_MODES = {
    POMODORO: { name: 'Focus', duration: 25 * 60, color: 'lockedin-primary' },
    SHORT_BREAK: { name: 'Short Break', duration: 5 * 60, color: 'lockedin-secondary' },
    LONG_BREAK: { name: 'Long Break', duration: 15 * 60, color: 'lockedin-accent' },
};

const getInitialSettings = () => ({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    model: 'Icosahedron', // 'Icosahedron', 'TorusKnot', 'Box'
});

export const useTimerStore = create((set, get) => ({
    settings: getInitialSettings(),
    mode: { ...FOCUS_MODES.POMODORO, duration: getInitialSettings().pomodoro },
    timeLeft: getInitialSettings().pomodoro,
    isActive: false,
    sessionCount: 0,
    xp: 0,
    level: 1,

    setMode: (modeKey) => {
        set((state) => {
            const baseMode = FOCUS_MODES[modeKey];
            const durationKey = modeKey === 'POMODORO' ? 'pomodoro' : modeKey === 'SHORT_BREAK' ? 'shortBreak' : 'longBreak';
            const duration = state.settings[durationKey];
            return {
                mode: { ...baseMode, duration },
                timeLeft: duration,
                isActive: false
            };
        });
    },

    updateSettings: (newSettings) => {
        set((state) => {
            const currentSettings = state.settings;
            const updatedSettings = { ...currentSettings, ...newSettings };

            // If the timer is NOT active, dynamically update the time left to reflect the new setting if applicable
            let updatedMode = state.mode;
            let updatedTimeLeft = state.timeLeft;

            if (!state.isActive) {
                const currentDurationKey = state.mode.name === 'Focus' ? 'pomodoro' : state.mode.name === 'Short Break' ? 'shortBreak' : 'longBreak';
                updatedMode = { ...state.mode, duration: updatedSettings[currentDurationKey] };
                updatedTimeLeft = updatedSettings[currentDurationKey];
            }

            return {
                settings: updatedSettings,
                mode: updatedMode,
                timeLeft: updatedTimeLeft
            };
        });
    },

    toggleTimer: () => {
        set((state) => ({ isActive: !state.isActive }));
    },

    tick: () => {
        const { timeLeft, isActive, mode, completeSession } = get();
        if (!isActive) return;

        if (timeLeft > 0) {
            set({ timeLeft: timeLeft - 1 });
        } else {
            completeSession();
        }
    },

    completeSession: () => {
        const { mode, sessionCount, xp, level, settings } = get();
        let newSessionCount = sessionCount;
        let newXp = xp;
        let newLevel = level;

        if (mode.name === FOCUS_MODES.POMODORO.name) {
            newSessionCount += 1;
            newXp += 50; // Earn 50 XP per Pomodoro
            if (newXp >= 100 * newLevel) { // Basic leveling logic
                newLevel += 1;
                newXp = newXp - (100 * newLevel);
            }

            // Auto-switch to break
            const isLongBreak = newSessionCount % 4 === 0;
            get().setMode(isLongBreak ? 'LONG_BREAK' : 'SHORT_BREAK');
        } else {
            // Auto-switch back to focus after break
            get().setMode('POMODORO');
        }

        set({
            isActive: false,
            sessionCount: newSessionCount,
            xp: newXp,
            level: newLevel
        });

        // Play sound/animation logic can be handled via side-effects where this store is used
    },

    resetTimer: () => {
        const { mode } = get();
        set({ timeLeft: mode.duration, isActive: false });
    }
}));
