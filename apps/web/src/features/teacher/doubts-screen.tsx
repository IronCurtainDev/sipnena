import { useState } from "react";
import { BadgeCheck, Clock, Image as ImageIcon, Send } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";

export function TeacherDoubtsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, replyToDoubt } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const [filter, setFilter] = useState<"pending" | "answered" | "all">(
    "pending",
  );
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const visible = state.doubts.filter((d) =>
    filter === "all" ? true : d.status === filter,
  );

  const handleSendReply = (doubtId: string) => {
    const text = drafts[doubtId]?.trim();
    if (!text) return;
    replyToDoubt(doubtId, "Ms. Menaka Jayawardena", text);
    setDrafts((prev) => ({ ...prev, [doubtId]: "" }));
    showToast("Verified teacher reply sent! Visible on student /doubts.");
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Teacher Studio — Student Doubts Queue"
      roleOverride="teacher"
      toastMessage={toast}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[var(--sn-border)] bg-white p-4 shadow-xs">
        <p className="text-xs font-bold text-[var(--sn-text-secondary)]">
          Filter Student Questions:
        </p>
        <div className="flex gap-1.5">
          {(["pending", "answered", "all"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold capitalize ${
                filter === tab
                  ? "bg-[var(--sn-primary)] text-white"
                  : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visible.map((d) => (
          <article
            key={d.id}
            className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                Grade {d.grade} • {d.subject}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  d.status === "pending"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {d.status}
              </span>
              {d.timestampTag && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold">
                  <Clock className="h-3 w-3" /> {d.timestampTag}
                </span>
              )}
            </div>

            <p className="mt-2 text-xs text-[var(--sn-text-muted)]">
              {d.studentName} • {d.lessonTitle} • {d.createdAt}
            </p>
            <p className="mt-1.5 text-sm font-bold text-[var(--sn-text-main)]">
              {d.question}
            </p>

            {d.photoLabel && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Photo: {d.photoLabel}</span>
              </div>
            )}

            {d.reply ? (
              <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs">
                <p className="flex items-center gap-1 font-extrabold text-emerald-900">
                  <BadgeCheck className="h-4 w-4" />
                  <span>{d.reply.teacherName}</span>
                </p>
                <p className="mt-1 text-emerald-950">{d.reply.text}</p>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={drafts[d.id] ?? ""}
                  onChange={(e) =>
                    setDrafts((prev) => ({ ...prev, [d.id]: e.target.value }))
                  }
                  placeholder="Write verified explanation for student..."
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleSendReply(d.id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </SipNenaPortalShell>
  );
}
