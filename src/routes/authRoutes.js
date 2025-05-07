import express from "express";
import { loginUser } from "../controllers/authController.js";
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

export default router;
