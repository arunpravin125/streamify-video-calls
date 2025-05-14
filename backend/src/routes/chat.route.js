import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { generateStreamToken } from "../lib/stream.js";

export const chatRoutes = express.Router();

chatRoutes.get("/token", protectRoute, async (req, res) => {
  try {
    const token = generateStreamToken(req.user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error);
    res.status(500).json({ message: "internal Server error" });
  }
});
