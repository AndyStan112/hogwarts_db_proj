"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { createComment, fetchComments, Comment } from "./_actions";

interface CommentSectionProps {
  blogId: number;
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function loadComments() {
      const topLevelComments = await fetchComments(blogId, null);
      setComments(topLevelComments);
    }
    loadComments();
  }, [blogId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;

    await createComment(blogId, null, commentText);
    setCommentText("");

    const topLevelComments = await fetchComments(blogId, null);
    setComments(topLevelComments);
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} blogId={blogId} />
          ))
        )}
      </div>
    </div>
  );
}
