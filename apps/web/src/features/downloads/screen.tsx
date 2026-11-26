import { Link } from "@tanstack/react-router";
import { FileText, HardDrive, Trash2, Video, Wifi } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { ProgressBar } from "@/features/portal-shell/progress-bar";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  usePrototypeState,
  type DataSaverQuality,
} from "@/lib/prototype-state";

interface OfflineItem {
  id: string;
  kind: "PDF" | "Video";
  title: string;
  sizeMb: number;
  to: string;
}

const OFFLINE_CATALOG: OfflineItem[] = [
  {
    id: "tute-light-pdf",
    kind: "PDF",
    title: "Unit 7: Light, Mirrors & Ray Diagrams Tute (PDF)",
    sizeMb: 2,
    to: "/notes",
  },
  {
    id: "textbook-sci-g8",
    kind: "PDF",
    title: "NIE Official Grade 8 Science Part II Textbook",
    sizeMb: 14,
    to: "/notes",
  },
  {
    id: "video-mirrors-4",
    kind: "Video",
    title: "Lesson 4: Mirrors & Image Formation (480p Offline Pack)",
    sizeMb: 126,
    to: "/lesson",
  },
  {
    id: "note-light-short",
    kind: "PDF",
    title: "O/L Science — Electricity & Ohm's Law One-Page Note",
    sizeMb: 1,
    to: "/notes",
  },
];

const QUALITY_OPTIONS: Array<{
  id: DataSaverQuality;
  label: string;
  res: string;
  dataNote: string;
}> = [
  {
    id: "low",
    label: "Low (Data Saver)",
    res: "240p",
    dataNote: "~70 MB / hr",
  },
  {
    id: "medium",
    label: "Medium (Balanced)",
    res: "480p",
    dataNote: "~180 MB / hr",
  },
  {
    id: "high",
    label: "High (HD Clear)",
    res: "720p",
    dataNote: "~420 MB / hr",
  },
];

export function DownloadsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleDownload, setDataSaver } = usePrototypeState();
  const { toast, showToast } = useToastMessage();

  const downloaded = OFFLINE_CATALOG.filter((item) =>
    state.downloadedIds.includes(item.id),
  );
  const usedMb = downloaded.reduce((sum, item) => sum + item.sizeMb, 0);
  const storageLimitMb = 500;
  const pct = Math.min(100, Math.round((usedMb / storageLimitMb) * 100));

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title="Downloads & Data Saver"
      roleOverride="student"
      toastMessage={toast}
    >
      {/* Data Saver Quality Controls */}
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
              Mobile Data Saver &amp; Video Quality
            </h2>
            <p className="text-xs text-[var(--sn-text-muted)]">
              Optimize video streaming and offline downloads for Dialog,
              Mobitel, and Hutch mobile data packages.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !state.wifiOnlyDownloads;
              setDataSaver(state.dataSaverQuality, next);
              showToast(
                next
                  ? "Wi-Fi only downloads enabled"
                  : "Mobile data downloads allowed",
              );
            }}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold ${
              state.wifiOnlyDownloads
                ? "bg-[var(--sn-primary)] text-white"
                : "border border-slate-200 bg-slate-100 text-slate-700"
            }`}
          >
            <Wifi className="h-4 w-4" />
            <span>
              Wi-Fi Only Downloads: {state.wifiOnlyDownloads ? "ON" : "OFF"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {QUALITY_OPTIONS.map((opt) => {
            const active = state.dataSaverQuality === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setDataSaver(opt.id);
                  showToast(`Video quality set to ${opt.label}`);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-olive)]/70"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[var(--sn-text-main)]">
                    {opt.label}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                    {opt.res}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
                  Est. usage: {opt.dataNote}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Storage Indicator & Offline List */}
      <section className="rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-[var(--sn-primary)]" />
            <div>
              <h3 className="text-base font-extrabold text-[var(--sn-text-main)]">
                Offline Storage ({usedMb} MB / {storageLimitMb} MB used)
              </h3>
            </div>
          </div>
          <span className="text-xs font-extrabold text-[var(--sn-primary)]">
            {pct}%
          </span>
        </div>
        <ProgressBar value={pct} label="Offline storage used" />

        <div className="space-y-2.5 pt-2">
          {downloaded.length === 0 ? (
            <p className="text-xs text-[var(--sn-text-muted)]">
              No offline files saved. Visit Tutes &amp; Notes to save PDFs for
              offline revision.
            </p>
          ) : (
            downloaded.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[var(--sn-page-bg)]/50 p-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                    {item.kind === "Video" ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-extrabold text-[var(--sn-text-main)] sm:text-sm">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[var(--sn-text-muted)]">
                      {item.kind} • {item.sizeMb} MB • Ready Offline
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={item.to}
                    className="rounded-xl bg-[var(--sn-primary)] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    Open
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      toggleDownload(item.id);
                      showToast(`Removed ${item.title} from device`);
                    }}
                    aria-label={`Delete ${item.title}`}
                    className="rounded-xl border border-slate-200 p-1.5 text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </SipNenaPortalShell>
  );
}
