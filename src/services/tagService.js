import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllTagsService() {
  return prisma.tag.findMany({
    orderBy: { name: "asc" },
  });
}
