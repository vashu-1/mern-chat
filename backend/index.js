import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";
dotenv.config({});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://mern-chat-frontend-4r6p.onrender.com", // Production
  process.env.FRONTEND_URL, // Environment variable for flexibility
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server & Socket.io listening at port ${process.env.PORT}`);
});
