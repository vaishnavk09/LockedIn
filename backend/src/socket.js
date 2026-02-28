const { Server } = require("socket.io");

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // allow frontend access
            methods: ["GET", "POST"]
        }
    });

    const rooms = new Map();

    const generateRoomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("create-room", (callback) => {
            let roomId = generateRoomCode();
            while (rooms.has(roomId)) {
                roomId = generateRoomCode();
            }
            rooms.set(roomId, new Map());
            callback({ roomId });
            console.log(`Room created: ${roomId}`);
        });

        socket.on("join-room", ({ roomId, user }, callback) => {
            if (!rooms.has(roomId)) {
                if (callback) callback({ error: "Room not found" });
                return;
            }

            socket.join(roomId);
            const roomUsers = rooms.get(roomId);
            roomUsers.set(socket.id, { ...user, id: socket.id, status: 'idle', avatarId: Math.floor(Math.random() * 5) });

            io.to(roomId).emit("room-users", Array.from(roomUsers.values()));
            if (callback) callback({ success: true });
            console.log(`${user?.username || socket.id} joined room ${roomId}`);
        });

        socket.on("sync-status", ({ roomId, status, timeLeft, mode }) => {
            const roomUsers = rooms.get(roomId);
            if (roomUsers && roomUsers.has(socket.id)) {
                const userData = roomUsers.get(socket.id);
                roomUsers.set(socket.id, { ...userData, status, timeLeft, mode });
                io.to(roomId).emit("room-users", Array.from(roomUsers.values()));
            }
        });

        socket.on("send-emote", ({ roomId, emote }) => {
            socket.to(roomId).emit("receive-emote", { userId: socket.id, emote });
        });

        socket.on("leave-room", ({ roomId }) => {
            socket.leave(roomId);
            const roomUsers = rooms.get(roomId);
            if (roomUsers && roomUsers.has(socket.id)) {
                roomUsers.delete(socket.id);
                io.to(roomId).emit("room-users", Array.from(roomUsers.values()));
                if (roomUsers.size === 0) {
                    rooms.delete(roomId);
                }
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            rooms.forEach((roomUsers, roomId) => {
                if (roomUsers.has(socket.id)) {
                    roomUsers.delete(socket.id);
                    io.to(roomId).emit("room-users", Array.from(roomUsers.values()));
                    if (roomUsers.size === 0) {
                        rooms.delete(roomId);
                    }
                }
            });
        });
    });

    return io;
};

module.exports = setupSocket;
