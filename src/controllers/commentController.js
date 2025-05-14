import { getCommentsByPostIdService } from "../services/commentService.js";

export async function getCommentsByPostId(req, res) {
  const { id } = req.params;

  try {
    const comments = await getCommentsByPostIdService(id);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}