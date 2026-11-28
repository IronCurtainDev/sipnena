import { Link } from "@tanstack/react-router";
import { FileText, HardDrive, Trash2, Video, Wifi } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { ProgressBar } from "@/features/portal-shell/progress-bar";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { usePrototypeState } from "@/lib/prototype-state";
import { DOWNLOADS_COPY, OFFLINE_CATALOG, QUALITY_OPTIONS } from "./strings";

export function DownloadsScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, toggleDownload, setDataSaver } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = DOWNLOADS_COPY[lang];

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
      title={copy.pageTitle}
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="space-y-4 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-[var(--sn-text-main)]">
              {copy.heading}
            </h2>
            <p className="text-xs text-[var(--sn-text-muted)]">{copy.sub}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !state.wifiOnlyDownloads;
              setDataSaver(state.dataSaverQuality, next);
              showToast(next ? copy.wifiOnToast : copy.wifiOffToast);
            }}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold ${
              state.wifiOnlyDownloads
                ? "bg-[var(--sn-primary)] text-white"
                : "border border-slate-200 bg-slate-100 text-slate-700"
            }`}
          >
            <Wifi className="h-4 w-4" />
            <span>
              {copy.wifiOnly}{" "}
              {state.wifiOnlyDownloads ? copy.onLabel : copy.offLabel}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {QUALITY_OPTIONS.map((opt) => {
            const active = state.dataSaverQuality === opt.id;
            const label = opt.localizedLabel[lang];
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setDataSaver(opt.id);
                  showToast(`${copy.qualityToastPrefix} ${label}`);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-olive)]/70"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[var(--sn-text-main)]">
                    {label}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[var(--sn-primary)]">
                    {opt.res}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
                  {copy.estUsagePrefix} {opt.localizedDataNote[lang]}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-[var(--sn-primary)]" />
            <h3 className="text-base font-extrabold text-[var(--sn-text-main)]">
              {copy.storageHeading} ({usedMb} MB / {storageLimitMb} MB{" "}
              {copy.usedWord})
            </h3>
          </div>
          <span className="text-xs font-extrabold text-[var(--sn-primary)]">
            {pct}%
          </span>
        </div>
        <ProgressBar value={pct} label={copy.storageHeading} />

        <div className="space-y-2.5 pt-2">
          {downloaded.length === 0 ? (
            <p className="text-xs text-[var(--sn-text-muted)]">
              {copy.emptyText}
            </p>
          ) : (
            downloaded.map((item) => {
              const title = item.localizedTitle[lang];
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[var(--sn-page-bg)]/50 p-3.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sn-olive)] text-[var(--sn-primary)]">
                      {item.kindKey === "Video" ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-extrabold text-[var(--sn-text-main)] sm:text-sm">
                        {title}
                      </p>
                      <p className="text-xs text-[var(--sn-text-muted)]">
                        {item.localizedKind[lang]} • {item.sizeMb} MB •{" "}
                        {copy.readyOffline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={item.to}
                      className="rounded-xl bg-[var(--sn-primary)] px-3 py-1.5 text-xs font-bold text-white"
                    >
                      {copy.openBtn}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        toggleDownload(item.id);
                        showToast(`${copy.removedToastPrefix} ${title}`);
                      }}
                      aria-label={title}
                      className="rounded-xl border border-slate-200 p-1.5 text-slate-500 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </SipNenaPortalShell>
  );
}
