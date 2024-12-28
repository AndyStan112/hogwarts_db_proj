import { notFound } from "next/navigation";
import { sql } from "@/db"; // adjust path to your db
import { marked } from "marked";
import CommentSection from "./CommentSection";
import DOMPurify from "isomorphic-dompurify";
type BlogDetailProps = {
  searchParams: { id?: string };
};

interface Blog {
  id: number;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

async function getBlogById(id: string | undefined): Promise<Blog | null> {
  if (!id) return null;

  const [blog] = (await sql`
    SELECT 
      id, 
      title, 
      content, 
      author_id, 
      created_at
    FROM blogs
    WHERE id = ${id}
  `) as Blog[];
  return blog || null;
}

export default async function BlogPage({ searchParams }: BlogDetailProps) {
  const search = await searchParams;
  const blog = await getBlogById(await search.id);

  if (!blog) {
    return notFound();
  }

  const rawHtmlContent = await marked(blog.content.replaceAll("\\n", "\n"));

  const safeHtmlContent = DOMPurify.sanitize(rawHtmlContent);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: safeHtmlContent }}
        />
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <CommentSection blogId={blog.id} />
      </div>
    </div>
  );
}
