"use server";
import { sql } from "@/db";


export async function createBlogPost(title: string, xmlContent: string, authorId: string|null) {
  try {
    await sql`
      INSERT INTO blogs (title, content, author_id, created_at)
      VALUES (${title}, ${xmlContent}, ${authorId}, NOW());
    `;
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { success: false, message: "Database error." };
  }
}
