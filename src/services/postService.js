import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPublishedPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return posts;
};

export const getAllPostsService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return posts;
};

export const getPostByIdService = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  // Only return post if it's published
  if (!post || !post.published) {
    return null;
  }

  return post;
};

export const createPostService = async ({
  title,
  content,
  excerpt,
  published,
  authorId,
}) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      excerpt,
      published,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  return post;
};

export const updatePostService = async (id, data) => {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return post;
  } catch (err) {
    if (err.code === "P2025") {
      // Record not found
      return null;
    }

    throw err;
  }
};

export const deletePostService = async (id) => {
  try {
    await prisma.post.delete({
      where: { id },
    });

    return true;
  } catch (err) {
    if (err.code === "P2025") {
      // Record not found
      return false;
    }

    throw err;
  }
};
