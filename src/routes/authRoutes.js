import express from "express";
import { loginUser, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /auth/login
router.post("/login", loginUser);

// GET /auth/protected – for testing JWT verification
router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

// GET /auth/me
router.get("/me", authenticate, getMe)

export default router;
