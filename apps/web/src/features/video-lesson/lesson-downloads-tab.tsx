interface LessonDownloadsTabProps {
  onToast: (msg: string) => void;
}

const DOWNLOAD_ITEMS = [
  {
    id: "dl-1",
    title: "Lesson summary (Sinhala & English)",
    meta: "PDF · 1.4 MB",
  },
  {
    id: "dl-2",
    title: "Ray tracing practice worksheet",
    meta: "PDF · 820 KB",
  },
  {
    id: "dl-3",
    title: "Term 1 checkpoint prep guide",
    meta: "PDF · 2.8 MB",
  },
];

export function LessonDownloadsTab({ onToast }: LessonDownloadsTabProps) {
  return (
    <div className="space-y-4">
      <p className="text-base text-[var(--sn-text-secondary)]">
        Free handouts for homework and term tests. Download or open a preview.
      </p>
      <ul className="space-y-1">
        {DOWNLOAD_ITEMS.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 border-t border-[var(--sn-border)] py-4 first:border-t-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-base font-bold text-[var(--sn-text-main)]">
                {item.title}
              </p>
              <p className="text-sm text-[var(--sn-text-muted)]">{item.meta}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onToast(`Opening preview: ${item.title}`)}
                className="inline-flex min-h-[48px] items-center rounded-2xl border border-[var(--sn-border)] px-4 text-sm font-bold text-[var(--sn-text-main)]"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => onToast(`Downloading ${item.title}…`)}
                className="inline-flex min-h-[48px] items-center rounded-2xl bg-[var(--sn-primary)] px-4 text-sm font-bold text-[var(--sn-cream)]"
              >
                Download
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
