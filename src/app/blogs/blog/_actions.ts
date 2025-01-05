"use server";

import { sql } from "@/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
export interface Comment {
  id: number;
  blog_id: number;
  parent_id: number | null;
  commenter_id: string;
  content: string;
  created_at: string;
}

export async function getClerkData(id: string) {
  const client = await clerkClient();

  try {
    const user = await client.users.getUser(id);
    return {
      fullName: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      imageUrl: user.imageUrl,
    };
  } catch (e: any) {
    return null;
  }
}

export async function fetchComments(blogId: number, parentId: number | null) {
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
  content: string
) {
  const { userId } = await auth();

  if (!userId) return;
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
      ${userId},
      ${content}
    )
  `;
}
