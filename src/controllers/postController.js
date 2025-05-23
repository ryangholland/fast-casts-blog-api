import {
  getPublishedPosts,
  getPublishedPostsByTagSlug,
  getAllPostsService,
  getPostByIdService,
  createPostService,
  updatePostService,
  deletePostService,
} from "../services/postService.js";

export const getAllPosts = async (req, res) => {
  const { tag } = req.query;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = tag
      ? await getPublishedPostsByTagSlug(tag, page, limit)
      : await getPublishedPosts(page, limit);

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllPostsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await getAllPostsService(page, limit);

    res.json(posts);
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
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

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, published } = req.body;

  try {
    const updatedPost = await updatePostService(id, {
      title,
      content,
      excerpt,
      published: !!published,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deletePostService(id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(204).send(); // No Content
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
