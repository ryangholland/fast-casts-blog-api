import { PrismaClient } from "@prisma/client";
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

  // Create 3 tags
  const tagData = [
    { name: "JavaScript", slug: "javascript" },
    { name: "React", slug: "react" },
    { name: "Node.js", slug: "node-js" },
  ];

  for (const tag of tagData) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  // Fetch all tags for reuse
  const allTags = await prisma.tag.findMany();

  // Create 3 posts with varying tag combinations
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "Post with all tags",
        content: "Covers JS, React, and Node.js",
        excerpt: "Everything you need to know...",
        published: true,
        authorId: user.id,
        tags: { connect: allTags.map((tag) => ({ id: tag.id })) },
      },
    }),
    prisma.post.create({
      data: {
        title: "Post with 2 tags",
        content: "Covers just JavaScript and React",
        excerpt: "React and JS overview...",
        published: true,
        authorId: user.id,
        tags: {
          connect: allTags
            .filter((tag) => tag.slug !== "node-js")
            .map((tag) => ({ id: tag.id })),
        },
      },
    }),
    prisma.post.create({
      data: {
        title: "Post with 1 tag",
        content: "Only JavaScript here.",
        excerpt: "JS-focused content...",
        published: true,
        authorId: user.id,
        tags: {
          connect: allTags
            .filter((tag) => tag.slug === "javascript")
            .map((tag) => ({ id: tag.id })),
        },
      },
    }),
  ]);

  // Create comments: 2 on post[0], 1 on post[1], none on post[2]
  await prisma.comment.createMany({
    data: [
      {
        name: "Alice",
        content: "This was super helpful!",
        postId: posts[0].id,
      },
      {
        name: "Bob",
        content: "Nice breakdown, thanks!",
        postId: posts[0].id,
      },
      {
        name: "Charlie",
        content: "Looking forward to more.",
        postId: posts[1].id,
      },
    ],
  });

  console.log("Tags, posts, and comments seeded.");
  await prisma.$disconnect();
};

seed().catch((e) => {
  console.error("Seeding error:", e);
  process.exit(1);
});
