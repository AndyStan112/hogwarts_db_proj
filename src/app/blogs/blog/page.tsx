import { notFound } from "next/navigation";
import { sql } from "@/db";
import { marked } from "marked";
import CommentSection from "./CommentSection";
import DOMPurify from "isomorphic-dompurify";
import { getClerkData } from "./_actions";
import { Blog } from "../_actions";
import Link from "next/link";

type BlogDetailProps = {
  searchParams: { id?: string };
};

async function getBlogById(id: string | undefined): Promise<Blog | null> {
  if (!id) return null;

  const [blog] = (await sql`
    SELECT 
      b.id, 
      b.title, 
      b.content, 
      b.author_id, 
      b.created_at, 
      STRING_AGG(c.category_name, ', ') AS categories
    FROM blogs b
    LEFT JOIN blog_categories bc ON b.id = bc.blog_id
    LEFT JOIN categories c ON bc.category_id = c.id
    WHERE b.id = ${id}
    GROUP BY b.id;
  `) as Blog[];

  return blog || null;
}

async function fetchRecommendedBlogs(blog: Blog): Promise<Blog[]> {
  if (!blog) return [];
  console.log(blog.id)
  const blogs =(await sql`
        SELECT DISTINCT 
        b.id, 
        b.title, 
        b.author_id, 
        b.created_at
        
       
    FROM blogs b
    LEFT JOIN blog_categories bc ON b.id = bc.blog_id
    LEFT JOIN categories c ON bc.category_id = c.id
    WHERE 
      (b.author_id = ${blog.author_id} 
      OR position(c.category_name IN ${blog.categories}) > 0)
      AND b.id != ${blog.id}
    GROUP BY b.id
    LIMIT 5;

  `) as Blog[];
  console.log(blogs)
  return blogs
}

export default async function BlogPage({ searchParams }: BlogDetailProps) {
  const blog = await getBlogById(searchParams.id);
  if (!blog) return notFound();

  const author = await getClerkData(blog.author_id);
  const recommendedBlogs = await fetchRecommendedBlogs(blog);

  const rawHtmlContent = await marked(blog.content.replaceAll("\\n", "\n"));
  const safeHtmlContent = DOMPurify.sanitize(rawHtmlContent);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex flex-col lg:flex-row lg:gap-8">

        <div className="lg:w-3/4">
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

            <div className="text-gray-500 text-sm mb-2">
              {author ? (
                <Link href={`/home?author=${author.username}`} className="flex items-center hover:underline">
                  <img
                    src={author.imageUrl}
                    alt={author.fullName ?? "Unknown Author"}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{author.fullName}</span>
                </Link>
              ) : (
                "Unknown Author"
              )}
            </div>

            <p className="text-gray-400 text-xs">{new Date(blog.created_at).toLocaleDateString()}</p>


            {blog.categories && (
              <div className="flex flex-wrap mt-2">
                {blog.categories.split(", ").map((category) => (
                  <Link
                    key={category}
                    href={`/home?category=${encodeURIComponent(category)}`}
                    className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-full mr-2 hover:bg-blue-200"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}

            <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
          </div>

          <div className="bg-white p-6 rounded shadow mt-6">
   
            <CommentSection blogId={blog.id} />
          </div>
        </div>

        <div className="lg:w-1/4">
          {(
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-3">Recommended Articles</h2>
              <ul className="space-y-3">
                {recommendedBlogs.length ? recommendedBlogs.map((rec) => (
                  <li key={"r"+rec.id} className="border-b pb-2">
                    <Link href={`/blogs/blog?id=${rec.id}`} className="text-blue-600 hover:underline">
                      {rec.title}
                    </Link>
                    <p className="text-gray-500 text-xs">{new Date(rec.created_at).toLocaleDateString()}</p>
                  </li>
                )) : "No similar blogs"}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
