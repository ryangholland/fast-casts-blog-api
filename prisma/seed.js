import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seed = async () => {
  const email = "admin@example.com";
  const password = "password123";

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log("User created:", user);
  } else {
    console.log("User already exists:", user.email);
  }

  const existingTag = await prisma.tag.findUnique({
    where: { slug: "javascript" },
  });

  if (!existingTag) {
    const tag = await prisma.tag.create({
      data: {
        name: "JavaScript",
        slug: "javascript",
      },
    });
    console.log("Tag created:", tag);
  } else {
    console.log("Tag already exists:", existingTag.name);
  }

  // Add more tags
  const tagData = [
    { name: "React", slug: "react" },
    { name: "Node.js", slug: "node-js" },
  ];

  for (const tag of tagData) {
    const existing = await prisma.tag.findUnique({ where: { slug: tag.slug } });
    if (!existing) {
      await prisma.tag.create({ data: tag });
      console.log("Tag created:", tag);
    } else {
      console.log("Tag already exists:", existing.slug);
    }
  }

  // Create a post authored by the admin
  const post = await prisma.post.create({
    data: {
      title: "Intro to React",
      content: "This is a post about React. It covers the basics.",
      excerpt: "Learn the basics of React...",
      published: true,
      authorId: user.id,
      tags: {
        connect: [{ slug: "react" }, { slug: "javascript" }],
      },
    },
  });
  console.log("Post created:", post);

  // Add comments
  await prisma.comment.create({
    data: {
      name: "Jane Doe",
      content: "Great post! Helped me get started.",
      postId: post.id,
    },
  });

  await prisma.comment.create({
    data: {
      name: "John Smith",
      content: "Looking forward to more posts like this.",
      postId: post.id,
    },
  });

  console.log("Comments added.");

  await prisma.$disconnect();
};

seed().catch((e) => {
  console.error("Seeding error:", e);
  process.exit(1);
});
