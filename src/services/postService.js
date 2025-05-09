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