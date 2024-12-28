"use client";

import { useState, useEffect } from "react";
import { fetchComments, createComment, Comment } from "./_actions";
import { FaReply } from "react-icons/fa";
import { getClerkData } from "./_actions";

interface CommentItemProps {
  comment: Comment;
  blogId: number;
}

export default function CommentItem({ comment, blogId }: CommentItemProps) {
  const [commenterName, setCommenterName] = useState("Loading user...");
  const [commenterAvatar, setCommenterAvatar] = useState(
    "/images/default-avatar.png"
  );

  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    async function loadCommenter() {
      try {
        const user = await getClerkData(comment.commenter_id);
        const fullName = user
          ? user.fullName ??
            [user.firstName, user.lastName].filter(Boolean).join(" ") ??
            user.username ??
            "Unknown User"
          : "Unknown User";

        setCommenterName(fullName);
        if (user)
          setCommenterAvatar(user.imageUrl || "/images/default-avatar.png");
      } catch (err) {
        console.error("Failed to load user from Clerk:", err);
      }
    }

    loadCommenter();
  }, []);

  async function loadReplies() {
    const childComments = await fetchComments(blogId, comment.id);
    setReplies(childComments);
    setShowReplies(true);
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyText.trim()) return;

    await createComment(blogId, comment.id, replyText);
    setReplyText("");

    const childComments = await fetchComments(blogId, comment.id);
    setReplies(childComments);
    setShowReplies(true);
    setShowReplyForm(false);
  }

  return (
    <div className="border-l-2 border-gray-300 pl-4 my-2">
      <div className="flex items-center space-x-2 mb-1">
        <img
          src={commenterAvatar}
          alt={"Avatar"}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{commenterName}</span>
        <span className="text-xs text-gray-500">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>

      <div className="mb-2 text-gray-700">{comment.content}</div>

      <div className="flex items-center space-x-4 mb-2 text-sm">
        {!showReplies && (
          <button className="text-blue-500" onClick={loadReplies}>
            View Replies
          </button>
        )}

        {showReplies && replies.length > 0 && (
          <button
            className="text-blue-500"
            onClick={() => setShowReplies(false)}
          >
            Hide Replies
          </button>
        )}

        <button
          className="flex items-center text-blue-500"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <FaReply className="mr-1" />
          Reply
        </button>
      </div>

      {showReplyForm && (
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
            Post Reply
          </button>
        </form>
      )}

      {showReplies &&
        replies.map((rep) => (
          <div key={rep.id} className="ml-4 mt-2">
            <CommentItem comment={rep} blogId={blogId} />
          </div>
        ))}
    </div>
  );
}
