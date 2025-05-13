import { getAllTagsService } from "../services/tagService.js";

export async function getAllTags(req, res) {
  try {
    const tags = await getAllTagsService();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
}
