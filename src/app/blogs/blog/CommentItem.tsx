"use client";

import { useState } from "react";
import type { Comment } from "./_actions";
import { fetchComments, createComment } from "./_actions";

interface CommentItemProps {
  comment: Comment;
  blogId: number;
}

export default function CommentItem({ comment, blogId }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState("");

  async function loadReplies() {
    const childComments = await fetchComments(blogId, comment.id);
    setReplies(childComments);
    setShowReplies(true);
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyText.trim()) return;

    await createComment(blogId, comment.id, "some-user-id", replyText);
    setReplyText("");

    const childComments = await fetchComments(blogId, comment.id);
    setReplies(childComments);
    setShowReplies(true);
  }

  return (
    <div className="border-l-2 border-gray-300 pl-4">
      <div className="mb-2">
        <div className="text-gray-700">{comment.content}</div>
        <div className="text-xs text-gray-500">
          By: {comment.commenter_id} on{" "}
          {new Date(comment.created_at).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-2">
        {!showReplies && (
          <button className="text-sm text-blue-500" onClick={loadReplies}>
            View Replies
          </button>
        )}
        {showReplies && replies.length > 0 && (
          <button
            className="text-sm text-blue-500"
            onClick={() => setShowReplies(false)}
          >
            Hide Replies
          </button>
        )}
      </div>

      <form onSubmit={handleReply} className="mb-4">
        <textarea
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-1 bg-gray-200 px-3 py-1 rounded text-sm"
        >
          Reply
        </button>
      </form>
      {showReplies &&
        replies.map((rep) => (
          <div key={rep.id} className="ml-4 mt-2">
            <CommentItem comment={rep} blogId={blogId} />
          </div>
        ))}
    </div>
  );
}
