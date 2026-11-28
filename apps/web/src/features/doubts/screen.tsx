import { useMemo, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  Image as ImageIcon,
  MessageCirclePlus,
  ThumbsUp,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import { localizeDoubt } from "@/lib/prototype-i18n";
import { usePrototypeState } from "@/lib/prototype-state";
import { AskDoubtModal } from "./ask-doubt-modal";
import { DOUBTS_COPY } from "./strings";

const SUBJECTS = ["All", "Science", "Mathematics", "ICT", "English", "History"];

export function DoubtsAndQaScreen({
  courseScoped = false,
}: {
  courseScoped?: boolean;
}) {
  const { courseId } = useParams({ strict: false });
  const [lang, setLang] = useSipNenaLanguage();
  const { state, addDoubt, upvoteDoubt } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = DOUBTS_COPY[lang];

  const [subject, setSubject] = useState("All");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "answered" | "pending"
  >("all");
  const [isAskOpen, setIsAskOpen] = useState(false);

  const filteredDoubts = useMemo(
    () =>
      state.doubts.filter((d) => {
        if (subject !== "All" && d.subject !== subject) return false;
        if (statusFilter !== "all" && d.status !== statusFilter) return false;
        return true;
      }),
    [state.doubts, statusFilter, subject],
  );

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={courseScoped ? copy.courseQaTitle : copy.pageTitle}
      roleOverride="student"
      toastMessage={toast}
    >
      {courseScoped && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            to="/course"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--sn-primary)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{copy.backToCourse}</span>
          </Link>
          <Link
            to="/courses/$courseId/materials"
            params={{ courseId: courseId ?? "" }}
            className="rounded-xl border border-[var(--sn-border)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--sn-primary)]"
          >
            {copy.viewMaterials}
          </Link>
        </div>
      )}

      <section className="rounded-3xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[var(--sn-text-main)]">
              {copy.heroTitle}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--sn-text-secondary)]">
              {copy.heroSub}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAskOpen(true)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-5 text-xs font-bold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
          >
            <MessageCirclePlus className="h-4 w-4" />
            <span>{copy.askDoubtBtn}</span>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  subject === s
                    ? "bg-[var(--sn-primary)] text-white"
                    : "bg-[var(--sn-surface-muted)] text-[var(--sn-text-secondary)]"
                }`}
              >
                {formatSubject(lang, s)}
              </button>
            ))}
          </div>

          <div className="inline-flex rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] p-0.5 text-xs font-bold">
            {(
              [
                { id: "all", label: copy.statusAll },
                { id: "answered", label: copy.statusAnswered },
                { id: "pending", label: copy.statusPending },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id)}
                className={`rounded-lg px-3 py-1.5 ${
                  statusFilter === st.id
                    ? "bg-white text-[var(--sn-primary)] shadow-2xs"
                    : "text-[var(--sn-text-secondary)]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {filteredDoubts.map((d) => {
          const text = localizeDoubt(d, lang);
          return (
            <article
              key={d.id}
              className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                    {formatSubject(lang, d.subject)} •{" "}
                    {formatGrade(lang, d.grade)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      d.status === "answered"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {d.status === "answered"
                      ? copy.answeredBadge
                      : copy.pendingBadge}
                  </span>
                  {d.timestampTag && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                      <Clock className="h-3 w-3" /> {d.timestampTag}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => upvoteDoubt(d.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${
                    d.upvoted
                      ? "border-[var(--sn-primary)] bg-[var(--sn-surface-selected)] text-[var(--sn-primary)]"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>
                    {copy.helpfulLabel} ({d.upvotes})
                  </span>
                </button>
              </div>

              <p className="mt-2 text-xs font-semibold text-[var(--sn-text-muted)]">
                {d.studentName} • {text.lessonTitle} • {text.createdAt}
              </p>
              <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--sn-text-main)]">
                {text.question}
              </p>

              {d.photoLabel && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  <ImageIcon className="h-3.5 w-3.5 text-[var(--sn-primary)]" />
                  <span>
                    {copy.attachedPhotoPrefix} {d.photoLabel}
                  </span>
                </div>
              )}

              {d.reply && (
                <div className="mt-3 rounded-2xl border border-emerald-200 bg-[var(--sn-olive)]/55 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--sn-primary)]">
                    <BadgeCheck className="h-4 w-4 text-emerald-700" />
                    <span>
                      {d.reply.teacherName} • {copy.verifiedTeacherBadge}
                    </span>
                    <span className="font-normal text-[var(--sn-text-muted)]">
                      • {text.repliedAt}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--sn-text-main)] sm:text-sm">
                    {text.replyText}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <AskDoubtModal
        lang={lang}
        isOpen={isAskOpen}
        defaultCourseId={courseId}
        onClose={() => setIsAskOpen(false)}
        onSubmit={(payload) => {
          addDoubt({
            studentName: state.studentName,
            grade: state.grade,
            ...payload,
          });
          showToast(copy.postedToast);
        }}
      />
    </SipNenaPortalShell>
  );
}
