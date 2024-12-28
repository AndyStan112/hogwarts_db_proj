"use server";

import { sql } from "@/db";
export interface Comment {
  id: number;
  blog_id: number;
  parent_id: number | null;
  commenter_id: string;
  content: string;
  created_at: string;
}
export async function fetchComments(blogId: number, parentId: number | null) {
  console.log(blogId, parentId);
  const comments = (await sql`
    SELECT 
      id, 
      blog_id, 
      parent_id,
      commenter_id,
      content,
      created_at
    FROM blog_comments
    WHERE blog_id = ${blogId}
      AND (
        (${parentId}::int IS NULL AND parent_id IS NULL)
        OR (parent_id = ${parentId}::int)
      )
    ORDER BY created_at ASC
  `) as Comment[];
  return comments;
}

export async function createComment(
  blogId: number,
  parentId: number | null,
  commenterId: string,
  content: string
) {
  await sql`
    INSERT INTO blog_comments (
      blog_id,
      parent_id,
      commenter_id,
      content
    )
    VALUES (
      ${blogId},
      ${parentId},
      ${commenterId},
      ${content}
    )
  `;
}
