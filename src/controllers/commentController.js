import {
  getCommentsByPostIdService,
  createCommentService,
} from "../services/commentService.js";

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

export async function submitComment(req, res) {
  const { id } = req.params;
  const { name, content } = req.body;

  // Basic validation
  if (!name || !content) {
    return res.status(400).json({ error: "Name and content are required" });
  }
  if (name.length > 50 || content.length > 500) {
    return res.status(400).json({ error: "Name or content too long" });
  }

  try {
    const newComment = await createCommentService(id, name, content);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error submitting comment:", error);
    res.status(500).json({ error: "Failed to submit comment" });
  }
}
