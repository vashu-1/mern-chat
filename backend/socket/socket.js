import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://mern-chat-frontend-4r6p.onrender.com", // Production
  "https://mern-chat-frontend-4r6p.onrender.com/", // Production with trailing slash
  process.env.FRONTEND_URL, // Environment variable for flexibility
].filter(Boolean); // Remove undefined values

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) return callback(null, true);

      // Normalize origin by removing trailing slash
      const normalizedOrigin = origin.replace(/\/$/, "");
      const normalizedAllowedOrigins = allowedOrigins.map((url) =>
        url.replace(/\/$/, "")
      );

      if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId -> socketId}

io.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
