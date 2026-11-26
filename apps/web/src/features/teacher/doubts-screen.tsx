import { useState } from "react";
import { Image as ImageIcon, Send } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import { localizeDoubt } from "@/lib/prototype-i18n";
import { usePrototypeState } from "@/lib/prototype-state";
import { TEACHER_COPY } from "./strings";

export function TeacherDoubtsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, replyToDoubt } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = TEACHER_COPY[lang];

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
    showToast(copy.replySentToast);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.doubtsPageTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <div className="flex gap-1 border-b border-[var(--sn-border)] text-base font-bold text-[var(--sn-text-secondary)]">
        {(
          [
            { id: "pending", label: copy.filterPending },
            { id: "answered", label: copy.filterAnswered },
            { id: "all", label: copy.filterAll },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`min-h-12 border-b-2 px-3 ${
              filter === tab.id
                ? "border-[var(--sn-primary)] text-[var(--sn-primary)]"
                : "border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-5">
        {visible.map((d) => {
          const text = localizeDoubt(d, lang);
          return (
            <article
              key={d.id}
              className="space-y-3 border-t border-[var(--sn-border)] py-5 first:border-t-0"
            >
              <div>
                <h3 className="text-base font-bold text-[var(--sn-text-main)]">
                  {d.studentName}
                </h3>
                <p className="text-base text-[var(--sn-text-muted)]">
                  {formatGrade(lang, d.grade)} ·{" "}
                  {formatSubject(lang, d.subject)} · {text.lessonTitle} ·{" "}
                  {text.createdAt}
                  {d.timestampTag ? ` · ${d.timestampTag}` : ""}
                </p>
              </div>
              <p className="text-base leading-relaxed text-[var(--sn-text-main)]">
                {text.question}
              </p>
              {d.photoLabel && (
                <p className="inline-flex items-center gap-1.5 text-base text-[var(--sn-text-secondary)]">
                  <ImageIcon className="h-4 w-4" />
                  <span>
                    {copy.photoPrefix} {d.photoLabel}
                  </span>
                </p>
              )}
              {d.reply ? (
                <div className="space-y-1.5 rounded-2xl bg-[var(--sn-olive)]/70 p-4">
                  <p className="text-base font-bold text-[var(--sn-primary)]">
                    {d.reply.teacherName} · {d.reply.repliedAt}
                  </p>
                  <p className="text-base leading-relaxed text-[var(--sn-text-main)]">
                    {text.replyText}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <textarea
                    rows={2}
                    value={drafts[d.id] ?? ""}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [d.id]: e.target.value,
                      }))
                    }
                    placeholder={copy.replyPlaceholder}
                    className="min-h-12 flex-1 rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendReply(d.id)}
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 text-base font-bold text-white"
                  >
                    <Send className="h-4 w-4" />
                    <span>{copy.sendReplyBtn}</span>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </SipNenaPortalShell>
  );
}
