import { getPublishedPosts } from "../services/postService.js";

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await getPublishedPosts(page, limit);

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// To Do
export const getPostById = () => {};
export const createPost = () => {};
export const updatePost = () => {};
export const deletePost = () => {};
