import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Admin Routes (protected)
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;
