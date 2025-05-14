import express from "express";
import {
  getAllPostsAdmin,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import {
  getCommentsByPostId,
  submitComment,
} from "../controllers/commentController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Routes (must be above /:id to avoid conflicts)
router.get("/admin", authenticate, getAllPostsAdmin);

// Public Routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/:id/comments", getCommentsByPostId);
router.post("/:id/comments", submitComment);

// Admin Routes (continued)
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;
