import {
  getPublishedPosts,
  getPostByIdService,
  createPostService,
} from "../services/postService.js";

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await getPublishedPosts(page, limit);

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await getPostByIdService(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error("Error fetching post by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  const { title, content, excerpt, published } = req.body;

  try {
    const newPost = await createPostService({
      title,
      content,
      excerpt,
      published: !!published,
      authorId: req.user.userId, // comes from JWT
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// To Do
export const updatePost = () => {};
export const deletePost = () => {};
