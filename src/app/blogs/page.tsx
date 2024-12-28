"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Blog, Category, fetchBlogs, fetchCategories } from "./_actions";

export default function BlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    author: searchParams.get("author") || "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBlogs(filters);
      setBlogs(data.blogs);
    }

    async function fetchCategoryData() {
      const data = await fetchCategories();
      setCategories(data.categories);
    }

    fetchData();
    fetchCategoryData();
  }, [filters]);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    const updatedFilters = { ...filters, [name]: value };
    const query = new URLSearchParams(updatedFilters).toString();
    router.push(`/blogs?${query}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <form className="space-y-4">
          <div className="flex space-x-4">
            <input
              name="search"
              type="text"
              placeholder="Search blogs by text"
              className="flex-1 border rounded px-4 py-2"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <select
              name="category"
              className="border rounded px-4 py-2"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              name="author"
              type="text"
              placeholder="Search by author"
              className="border rounded px-4 py-2"
              value={filters.author}
              onChange={handleFilterChange}
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-4 rounded shadow border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700 text-sm mt-2">{blog.content}...</p>
              <a
                href={`/blogs/blog?id=${blog.id}`}
                className="text-blue-500 hover:underline mt-4 block"
              >
                Read more
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
