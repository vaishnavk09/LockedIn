import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { create } from 'zustand';

// Singleton socket instance connected to backend
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
export const socket = io(SOCKET_URL, { autoConnect: false });

export const useRoomStore = create((set, get) => ({
    roomId: null,
    users: [],
    isConnected: false,

    connectAndJoin: (roomId, user) => {
        socket.connect();
        socket.emit('join-room', { roomId, user });

        socket.on('room-users', (users) => {
            set({ users });
        });

        socket.on('connect', () => set({ isConnected: true }));
        socket.on('disconnect', () => set({ isConnected: false }));

        set({ roomId });
    },

    syncStatus: (status, timeLeft, mode) => {
        const { roomId, isConnected } = get();
        if (isConnected && roomId) {
            socket.emit('sync-status', { roomId, status, timeLeft, mode });
        }
    },

    leaveRoom: () => {
        socket.disconnect();
        set({ roomId: null, users: [], isConnected: false });
    }
}));

// Hook to auto-sync timer state to the room
export function useSocketSync(timerState, userProfile) {
    const { syncStatus, isConnected } = useRoomStore();

    useEffect(() => {
        if (isConnected) {
            syncStatus(
                timerState.isActive ? 'focusing' : 'idle',
                timerState.timeLeft,
                timerState.mode.name
            );
        }
    }, [timerState.timeLeft, timerState.isActive, timerState.mode, isConnected, syncStatus]);
}
