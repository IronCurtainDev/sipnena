import { useState, type FormEvent } from "react";
import { FileUp, Pencil, Plus, Video } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  usePrototypeState,
  type TeacherLessonDraft,
} from "@/lib/prototype-state";

export function TeacherCoursesScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Science");
  const [grade, setGrade] = useState(8);
  const [term, setTerm] = useState<"Term 1" | "Term 2" | "Term 3">("Term 2");
  const [videoUrl, setVideoUrl] = useState(
    "https://media.sipnena.lk/g8-new-lesson.mp4",
  );
  const [tuteName, setTuteName] = useState("Lesson_Tute_Handout.pdf");

  const startEdit = (lesson: TeacherLessonDraft) => {
    setEditingId(lesson.id);
    setTitle(lesson.title);
    setSubject(lesson.subject);
    setGrade(lesson.grade);
    setTerm(lesson.term);
    setVideoUrl(lesson.videoUrl);
    setTuteName(lesson.tuteName);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (editingId) {
      update((prev) => ({
        ...prev,
        teacherLessons: prev.teacherLessons.map((l) =>
          l.id === editingId
            ? {
                ...l,
                title: title.trim(),
                subject,
                grade,
                term,
                videoUrl,
                tuteName,
              }
            : l,
        ),
      }));
      showToast("Lesson updated!");
      setEditingId(null);
    } else {
      update((prev) => ({
        ...prev,
        teacherLessons: [
          {
            id: `tl-${Date.now()}`,
            title: title.trim(),
            subject,
            grade,
            term,
            videoUrl,
            tuteName,
            duration: "22 mins",
            published: true,
          },
          ...prev.teacherLessons,
        ],
      }));
      showToast("New lesson & PDF tute uploaded!");
    }
    setTitle("");
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Teacher Studio — Lessons & Tutes"
      roleOverride="teacher"
      toastMessage={toast}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <form
          onSubmit={handleSave}
          className="space-y-3.5 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs lg:col-span-5"
        >
          <h2 className="text-base font-extrabold text-[var(--sn-text-main)]">
            {editingId ? "Edit Lesson & Tute" : "Create New Lesson"}
          </h2>

          <label className="block text-xs font-bold">
            <span className="mb-1 block">Lesson Title</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 8: Refraction & Prisms"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
            />
          </label>

          <div className="grid grid-cols-3 gap-2">
            <label className="block text-xs font-bold">
              <span className="mb-1 block">Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs"
              >
                <option value="Science">Science</option>
                <option value="Mathematics">Maths</option>
                <option value="ICT">ICT</option>
                <option value="History">History</option>
              </select>
            </label>
            <label className="block text-xs font-bold">
              <span className="mb-1 block">Grade</span>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs"
              >
                {[6, 7, 8, 9, 10, 11].map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-bold">
              <span className="mb-1 block">Term</span>
              <select
                value={term}
                onChange={(e) =>
                  setTerm(e.target.value as "Term 1" | "Term 2" | "Term 3")
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs"
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </label>
          </div>

          <label className="block text-xs font-bold">
            <span className="mb-1 block">Video Stream URL</span>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono"
            />
          </label>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[var(--sn-primary)]">
                <FileUp className="h-4 w-4" />
                <span>PDF Tute Attachment</span>
              </span>
              <label className="cursor-pointer rounded-lg bg-white px-2.5 py-1 text-[11px] text-[var(--sn-primary)] shadow-2xs">
                <span>Browse PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setTuteName(file.name);
                  }}
                />
              </label>
            </div>
            <p className="mt-1 truncate text-[11px] text-slate-600">
              Selected: {tuteName}
            </p>
          </div>

          <div className="flex gap-2">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                }}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] py-2.5 text-xs font-bold text-white"
            >
              <Plus className="h-4 w-4" />
              <span>{editingId ? "Save Changes" : "Publish Lesson"}</span>
            </button>
          </div>
        </form>

        <section className="space-y-3 lg:col-span-7">
          <h2 className="text-base font-extrabold text-[var(--sn-text-main)]">
            Uploaded Lessons ({state.teacherLessons.length})
          </h2>
          {state.teacherLessons.map((lesson) => (
            <article
              key={lesson.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[var(--sn-border)] bg-white p-4 shadow-xs"
            >
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--sn-primary)]">
                  Grade {lesson.grade} • {lesson.subject} • {lesson.term}
                </span>
                <h3 className="mt-1.5 truncate text-sm font-extrabold text-[var(--sn-text-main)]">
                  {lesson.title}
                </h3>
                <p className="mt-0.5 flex items-center gap-2 truncate text-xs text-[var(--sn-text-muted)]">
                  <Video className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{lesson.tuteName}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => startEdit(lesson)}
                className="inline-flex items-center gap-1 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 py-2 text-xs font-bold text-[var(--sn-primary)]"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
            </article>
          ))}
        </section>
      </div>
    </SipNenaPortalShell>
  );
}
