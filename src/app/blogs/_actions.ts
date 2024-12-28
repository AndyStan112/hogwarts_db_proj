"use server";
import { sql } from "@/db";

export type Category = {
  name: string;
  id: number;
};

export type Blog = {
  id: number;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
};

export async function fetchCategories() {
  const categories = (await sql`
      SELECT 
        id, 
        category_name AS name 
      FROM categories
    `) as Category[];
  return { categories };
}

interface BlogFilters {
  search?: string;
  category?: string;
  author?: string;
}

export async function fetchBlogs(filters: BlogFilters) {
  const { search = "", category = "", author = "" } = filters;

  const blogs = (await sql`
   SELECT DISTINCT
      b.id,
      b.title,
      LEFT(b.content, 100) AS content,
      b.author_id,
      b.created_at
    FROM blogs b
    LEFT JOIN blog_categories bc ON bc.blog_id = b.id
    LEFT JOIN categories c ON bc.category_id = c.id
    LEFT JOIN teachers t ON t.id = b.author_id
    LEFT JOIN students s ON s.id = b.author_id
    WHERE
      (
        ${search} = '' 
        OR b.title ILIKE '%' || ${search} || '%'
        OR b.content ILIKE '%' || ${search} || '%'
      )
      AND
      (
        ${category} = ''
        OR CAST(c.id AS TEXT) = ${category}
      )
      AND
      (
        ${author} = ''
        OR CONCAT(t.first_name, ' ', t.last_name) ILIKE '%' || ${author} || '%'
        OR CONCAT(s.first_name, ' ', s.last_name) ILIKE '%' || ${author} || '%'
      )
    ORDER BY b.created_at DESC
  `) as Blog[];

  return { blogs };
}
