import React, { useState } from "react";
import { MessageCircle, Send, ThumbsUp } from "lucide-react";
import { getActiveStudent } from "@/data/courses";

interface LessonDiscussionTabProps {
  onToast: (msg: string) => void;
}

interface DiscussionPost {
  id: string;
  author: string;
  role: "teacher" | "student";
  time: string;
  question: string;
  reply?: {
    author: string;
    role: "teacher";
    text: string;
    time: string;
  };
  likes: number;
}

export function LessonDiscussionTab({ onToast }: LessonDiscussionTabProps) {
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [questionInput, setQuestionInput] = useState("");

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    const student = getActiveStudent();
    const author = student?.name
      ? `${student.name} (You)`
      : "You";
    const newPost: DiscussionPost = {
      id: `post-${Date.now()}`,
      author,
      role: "student",
      time: "Just now",
      question: questionInput.trim(),
      likes: 1,
    };
    setPosts([newPost, ...posts]);
    setQuestionInput("");
    onToast("Question posted.");
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    );
    onToast("Marked as helpful");
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-base">
          <MessageCircle className="h-5 w-5 text-[var(--sn-primary)]" />
          <span>Ask a Question or Share a Thought</span>
        </div>
        <p className="text-xs text-slate-500">
          Questions stay on this device for the prototype. Teachers can reply in
          the doubts desk.
        </p>

        <form onSubmit={handlePostQuestion} className="space-y-3">
          <textarea
            rows={2}
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Type your question about this lesson…"
            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[var(--sn-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sn-primary)] sm:text-sm"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white"
          >
            <Send className="h-4 w-4" />
            Post question
          </button>
        </form>
      </section>

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
          No discussion posts yet. Be the first to ask.
        </p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-slate-900">{post.author}</p>
                  <p className="text-xs text-slate-500">{post.time}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {post.likes}
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-800">{post.question}</p>
              {post.reply ? (
                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="font-bold text-slate-900">{post.reply.author}</p>
                  <p className="mt-1 text-slate-700">{post.reply.text}</p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
