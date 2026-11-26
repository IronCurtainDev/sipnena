interface PlaylistNotesTabProps {
  onToast?: (msg: string) => void;
}

const LESSON_NOTES = [
  { id: "n1", title: "1. Light rays & sources", meta: "PDF · 1.2 MB" },
  { id: "n2", title: "2. Laws of reflection", meta: "PDF · 1.5 MB" },
  { id: "n3", title: "3. Spherical mirrors worksheet", meta: "PDF · 2.1 MB" },
  { id: "n4", title: "4. Concave formula (f = R/2)", meta: "PDF · 1.8 MB" },
  { id: "n5", title: "5. Convex mirrors", meta: "PDF · 1.4 MB" },
];

export function PlaylistNotesTab({ onToast }: PlaylistNotesTabProps) {
  return (
    <ul className="max-h-[560px] space-y-1 overflow-y-auto pr-1">
      {LESSON_NOTES.map((note) => (
        <li key={note.id}>
          <button
            type="button"
            onClick={() => onToast?.(`Downloading ${note.title}…`)}
            className="flex min-h-[56px] w-full flex-col items-start justify-center rounded-xl px-3 py-2 text-left transition hover:bg-[var(--sn-cream)]"
          >
            <span className="text-sm font-bold text-[var(--sn-text-main)]">
              {note.title}
            </span>
            <span className="text-sm text-[var(--sn-text-muted)]">
              {note.meta} · Download
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
