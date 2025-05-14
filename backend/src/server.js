import express from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { userRoutes } from "./routes/user.route.js";
import { chatRoutes } from "./routes/chat.route.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3500",
    credentials: true,
  })
);
dotenv.config();

const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
app.listen(PORT, () => {
  connectDB();
  console.log("Server started", PORT);
});
