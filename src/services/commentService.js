import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCommentsByPostIdService(postId) {
  return prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCommentService(postId, name, content) {
  return prisma.comment.create({
    data: {
      postId: Number(postId),
      name,
      content,
    },
  });
}
