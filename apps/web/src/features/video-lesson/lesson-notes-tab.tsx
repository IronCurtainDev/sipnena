import { useState, type FormEvent } from "react";

interface LessonNotesTabProps {
  onToast: (msg: string) => void;
  revisionNotes?: { title: string; body: string }[];
  emptyLabel?: string;
}

interface SavedNote {
  id: string;
  timestamp: string;
  text: string;
}

const REVISION_POINTS = [
  {
    title: "Light travels straight",
    body: "In a uniform medium, light moves in straight lines. Ray arrows show the direction.",
  },
  {
    title: "Normal line",
    body: "An imaginary line at 90° to the mirror at the point of incidence.",
  },
  {
    title: "Law of reflection (i = r)",
    body: "Angle of incidence equals angle of reflection, both measured from the normal.",
  },
  {
    title: "Concave focus",
    body: "For a concave mirror, f is half of radius R. Formula: f = R / 2.",
  },
];

export function LessonNotesTab({
  onToast,
  revisionNotes,
  emptyLabel,
}: LessonNotesTabProps) {
  const points = revisionNotes ?? REVISION_POINTS;
  const [personalNotes, setPersonalNotes] = useState<SavedNote[]>(() =>
    revisionNotes
      ? []
      : [
          {
            id: "note-1",
            timestamp: "Today",
            text: "Normal is always 90° to the mirror. Measure i and r from the normal.",
          },
        ],
  );
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setPersonalNotes([
      {
        id: `note-${Date.now()}`,
        timestamp: "Just now",
        text: newNoteText.trim(),
      },
      ...personalNotes,
    ]);
    setNewNoteText("");
    onToast("Note saved.");
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="text-base font-bold text-[var(--sn-text-main)]">
          Key revision points
        </h3>
        {points.length === 0 ? (
          <p className="text-base text-[var(--sn-text-secondary)]">
            {emptyLabel}
          </p>
        ) : null}
        <ol className="space-y-3">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="border-t border-[var(--sn-border)] pt-3 first:border-t-0 first:pt-0"
            >
              <p className="text-sm font-bold text-[var(--sn-primary)]">
                {index + 1}. {point.title.replace(/^\d+\.\s*/, "")}
              </p>
              <p className="mt-1 text-base text-[var(--sn-text-secondary)]">
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-bold text-[var(--sn-text-main)]">
          My notes
        </h3>
        <form onSubmit={handleAddNote} className="space-y-2">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            rows={3}
            placeholder="Write a short note…"
            className="w-full rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-4 py-3 text-base text-[var(--sn-text-main)] outline-none focus:border-[var(--sn-primary)]"
          />
          <button
            type="submit"
            className="inline-flex min-h-[48px] items-center rounded-2xl bg-[var(--sn-primary)] px-5 text-sm font-bold text-[var(--sn-cream)]"
          >
            Save note
          </button>
        </form>
        <ul className="space-y-3">
          {personalNotes.map((note) => (
            <li
              key={note.id}
              className="border-t border-[var(--sn-border)] pt-3"
            >
              <p className="text-sm text-[var(--sn-text-muted)]">
                {note.timestamp}
              </p>
              <p className="text-base text-[var(--sn-text-main)]">
                {note.text}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPersonalNotes((prev) =>
                    prev.filter((n) => n.id !== note.id),
                  );
                  onToast("Note removed");
                }}
                className="mt-1 text-sm font-semibold text-[var(--sn-primary)]"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
