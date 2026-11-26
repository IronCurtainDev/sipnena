import React, { useState } from "react";
import { MessageCircle, Send, ThumbsUp } from "lucide-react";

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
  const [posts, setPosts] = useState<DiscussionPost[]>([
    {
      id: "post-1",
      author: "Sanduni Ranasinghe (Grade 8)",
      role: "student",
      time: "2 hours ago",
      question:
        "Why is a concave mirror called a converging mirror, but a convex mirror is called diverging?",
      reply: {
        author: "Ms. Menaka Jayawardena (Science Mentor)",
        role: "teacher",
        text: "Great question Sanduni! Parallel light rays hitting a concave mirror bounce towards each other to meet at a single focal point (converge). On a convex mirror, rays spread outwards (diverge). Review Figure 2 in the video!",
        time: "1 hour ago",
      },
      likes: 5,
    },
    {
      id: "post-2",
      author: "Tharindu Silva (Grade 8)",
      role: "student",
      time: "Yesterday",
      question:
        "In our school exam, if incident angle is 40°, what is the angle between incident ray and reflected ray?",
      reply: {
        author: "Ms. Menaka Jayawardena (Science Mentor)",
        role: "teacher",
        text: "Since i = r = 40°, the total angle between the two rays is i + r = 40° + 40° = 80°! Remember that trick for the term test!",
        time: "Yesterday",
      },
      likes: 8,
    },
  ]);

  const [questionInput, setQuestionInput] = useState("");

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    const newPost: DiscussionPost = {
      id: `post-${Date.now()}`,
      author: "Kasun Perera (You)",
      role: "student",
      time: "Just now",
      question: questionInput.trim(),
      likes: 1,
    };
    setPosts([newPost, ...posts]);
    setQuestionInput("");
    onToast("Question posted! Ms. Menaka will review shortly.");
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    );
    onToast("Marked as helpful! 👍");
  };

  return (
    <div className="space-y-6">
      {/* Ask Question Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
          <MessageCircle className="h-5 w-5 text-[var(--sn-primary)]" />
          <span>Ask a Question or Share a Thought</span>
        </div>
        <p className="text-xs text-slate-500">
          Get answers from Ms. Menaka Jayawardena and classmates in your grade.
        </p>

        <form onSubmit={handlePostQuestion} className="space-y-3">
          <textarea
            rows={2}
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="E.g., How do I draw the focal point ray when object is beyond 2F?"
            className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--sn-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--sn-primary)]"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[var(--sn-primary-hover)] active:scale-95 transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Post Question</span>
            </button>
          </div>
        </form>
      </section>

      {/* Discussion Stream */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="space-y-3 border-t border-[var(--sn-border)] py-5 first:border-t-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-[var(--sn-text-main)]">
                  {post.author}
                </h4>
                <span className="text-sm text-[var(--sn-text-muted)]">
                  {post.time}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleLike(post.id)}
                className="flex min-h-[40px] items-center gap-1 rounded-xl border border-[var(--sn-border)] px-3 text-sm text-[var(--sn-text-secondary)]"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes}</span>
              </button>
            </div>

            <p className="text-base leading-relaxed text-[var(--sn-text-main)]">
              {post.question}
            </p>

            {post.reply && (
              <div className="space-y-1.5 rounded-2xl bg-[var(--sn-olive)]/70 p-4">
                <p className="text-sm font-bold text-[var(--sn-primary)]">
                  Teacher · {post.reply.author} · {post.reply.time}
                </p>
                <p className="text-base leading-relaxed text-[var(--sn-text-main)]">
                  {post.reply.text}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
