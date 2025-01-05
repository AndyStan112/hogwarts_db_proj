"use client";
import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import {  createBlogPost } from "./_actions";
import { Category, fetchCategories } from "../_actions";
import { useUser } from "@clerk/nextjs";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [xmlContent, setXmlContent] = useState("<blog>\n  <p>Start writing...</p>\n</blog>");
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const {categories} = await fetchCategories();
      setCategories(categories);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    try {
      setPreview(DOMPurify.sanitize(xmlContent));
      setError("");
    } catch (err) {
      setError("Invalid XML format");
    }
  }, [xmlContent]);


  const handleSubmit = async () => {
    if (!title.trim() || !xmlContent.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }
    
    setLoading(true);
    const response = await createBlogPost(title, xmlContent, user ?user.id:null);
    setLoading(false);

    if (response.success) {
      alert("Blog posted successfully!");
      setTitle("");
      setXmlContent("<blog>\n  <p>Start writing...</p>\n</blog>");
      setSelectedCategories([]);
    } else {
      setError(response.message || "Failed to post blog.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Create New Blog</h1>

        <input
          type="text"
          className="w-full border rounded px-4 py-2 mb-4"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Categories:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategories.includes(category) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
                  )
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <label className="block font-semibold mb-2">Blog Content (XML Format):</label>
        <div className="border rounded bg-gray-50 p-2">
          <textarea
            className="w-full h-48 p-2 font-mono text-sm bg-transparent border-none outline-none"
            value={xmlContent}
            onChange={(e) => setXmlContent(e.target.value)}
          />
        </div>

      
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <h2 className="text-lg font-semibold mb-2">Live Render</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: preview }} />
        </div>


        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          className={`mt-6 px-6 py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </div>
    </div>
  );
}
