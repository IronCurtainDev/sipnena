import { useState, type FormEvent } from "react";
import { Copy, MessageCircle, Plus, Trash2, Users } from "lucide-react";
import {
  addClassAnnouncement,
  addStudentToClass,
  createTeacherClass,
  pickLocalized,
  removeStudentFromClass,
  useCoursesStore,
  type Grade,
  type Medium,
} from "@/data/courses";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { formatGrade, formatMedium } from "@/lib/i18n-common";
import { BUILDER_EXTRA_COPY } from "./course-builder-strings";

export function TeacherClassesScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const extra = BUILDER_EXTRA_COPY[lang];
  const { store } = useCoursesStore();
  const { toast, showToast } = useToastMessage();
  const [className, setClassName] = useState("");
  const [grade, setGrade] = useState<Grade>(8);
  const [medium, setMedium] = useState<Medium>("si");
  const [studentNames, setStudentNames] = useState<Record<string, string>>({});
  const [noticeText, setNoticeText] = useState<Record<string, string>>({});

  const activeTeacherId = store.activeTeacherId;
  const myClasses = store.classes.filter(
    (cls) => Boolean(activeTeacherId) && cls.teacherId === activeTeacherId,
  );

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();
    if (!className.trim() || !activeTeacherId) return;
    try {
      createTeacherClass({
        name: className.trim(),
        grade,
        medium,
        year: 2026,
      });
      setClassName("");
      showToast(extra.createClassBtn);
    } catch {
      showToast("Select an active teacher first");
    }
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard fallback handled cleanly by toast.
    }
    showToast(extra.copiedToast);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={extra.classesPageTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <section className="rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--sn-primary)]">
              {extra.classesPageTitle}
            </h1>
            <p className="mt-1 text-base text-[var(--sn-text-secondary)]">
              {extra.classesSubtitle}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-2 text-sm font-bold text-[var(--sn-primary)]">
            <Users className="h-4 w-4" />
            {myClasses.length} classes · {store.students.length} students
          </span>
        </div>
      </section>

      <form
        onSubmit={handleCreateClass}
        className="grid grid-cols-1 gap-3 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 sm:grid-cols-12 sm:items-end"
      >
        <label className="space-y-1 text-sm font-bold sm:col-span-5">
          <span>{extra.classNameLabel}</span>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="8A Sinhala 2026"
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] px-3 text-base"
          />
        </label>
        <label className="space-y-1 text-sm font-bold sm:col-span-2">
          <span>Grade</span>
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value) as Grade)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
          >
            {[6, 7, 8, 9, 10, 11].map((g) => (
              <option key={g} value={g}>
                {formatGrade(lang, g)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold sm:col-span-2">
          <span>Medium</span>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value as Medium)}
            className="min-h-12 w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 text-base"
          >
            {(["si", "ta", "en"] as const).map((m) => (
              <option key={m} value={m}>
                {formatMedium(lang, m)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-white sm:col-span-3"
        >
          <Plus className="h-4 w-4" />
          <span>{extra.createClassBtn}</span>
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {myClasses.map((cls) => {
          const members = store.students.filter((s) =>
            cls.studentIds.includes(s.id),
          );
          const notices = store.announcements.filter(
            (a) => a.classId === cls.id,
          );
          return (
            <article
              key={cls.id}
              className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[var(--sn-primary)]">
                    {cls.name}
                  </h2>
                  <p className="text-sm text-[var(--sn-text-muted)]">
                    {formatGrade(lang, cls.grade)} ·{" "}
                    {formatMedium(lang, cls.medium)} · {members.length} students
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleCopyText(cls.inviteCode ?? cls.id)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 text-sm font-bold text-[var(--sn-primary)]"
                >
                  <Copy className="h-4 w-4" />
                  <span>
                    {extra.inviteCodeLabel}: {cls.inviteCode ?? cls.id}
                  </span>
                </button>
              </div>

              <ul className="divide-y divide-[var(--sn-border)] rounded-xl border border-[var(--sn-border)]">
                {members.map((stu) => (
                  <li
                    key={stu.id}
                    className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
                  >
                    <span className="font-semibold text-[var(--sn-text-main)]">
                      {stu.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeStudentFromClass(cls.id, stu.id)}
                      aria-label={`Remove ${stu.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={studentNames[cls.id] ?? ""}
                  onChange={(e) =>
                    setStudentNames((p) => ({ ...p, [cls.id]: e.target.value }))
                  }
                  placeholder={extra.studentNamePlaceholder}
                  className="min-h-11 flex-1 rounded-xl border border-[var(--sn-border)] px-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const name = (studentNames[cls.id] ?? "").trim();
                    if (!name) return;
                    addStudentToClass(cls.id, {
                      name,
                      grade: cls.grade,
                      medium: cls.medium,
                    });
                    setStudentNames((p) => ({ ...p, [cls.id]: "" }));
                  }}
                  className="min-h-11 rounded-xl bg-[var(--sn-primary)] px-3 text-sm font-bold text-white"
                >
                  {extra.addStudentBtn}
                </button>
              </div>

              <div className="space-y-2 border-t border-[var(--sn-border)] pt-3">
                <p className="text-sm font-bold text-[var(--sn-text-main)]">
                  {extra.postAnnouncementLabel}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={noticeText[cls.id] ?? ""}
                    onChange={(e) =>
                      setNoticeText((p) => ({ ...p, [cls.id]: e.target.value }))
                    }
                    placeholder={extra.announcementPlaceholder}
                    className="min-h-11 flex-1 rounded-xl border border-[var(--sn-border)] px-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const msg = (noticeText[cls.id] ?? "").trim();
                      if (!msg) return;
                      addClassAnnouncement(cls.id, msg, "Teacher");
                      setNoticeText((p) => ({ ...p, [cls.id]: "" }));
                      showToast(extra.postAnnouncementBtn);
                    }}
                    className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)] px-3 text-sm font-bold text-[var(--sn-primary)]"
                  >
                    {extra.postAnnouncementBtn}
                  </button>
                </div>
                {notices.slice(0, 2).map((n) => {
                  const messageText = pickLocalized(n.message, lang);
                  return (
                    <div
                      key={n.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-[var(--sn-surface-muted)] px-3 py-2 text-sm"
                    >
                      <span className="truncate">{messageText}</span>
                      <button
                        type="button"
                        onClick={() =>
                          void handleCopyText(
                            `[SipNena ${cls.name}] ${messageText}`,
                          )
                        }
                        className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-bold text-[var(--sn-primary)]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{extra.copyWhatsappNudge}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </SipNenaPortalShell>
  );
}
