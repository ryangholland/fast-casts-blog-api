import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Base test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Register /auth routes
app.use("/auth", authRoutes);

// Register /posts routes
app.use("/posts", postRoutes);

// Register /tags routes
app.use("/tags", tagRoutes);

export default app;
