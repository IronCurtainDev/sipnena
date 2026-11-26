import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Calendar,
  ExternalLink,
  Play,
  Radio,
  Users,
  Video,
} from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import { LivePlayerModal } from "./live-player-modal";
import {
  PAST_RECORDINGS,
  WEEKLY_TIMETABLE,
  type TimetableSession,
} from "./mock-data";

export function LiveAndScheduleScreen({
  defaultTab = "live",
}: {
  defaultTab?: "live" | "timetable" | "recordings";
}) {
  const [lang, setLang] = useSipNenaLanguage();
  const { toast, showToast } = useToastMessage();
  const [tab, setTab] = useState<"live" | "timetable" | "recordings">(
    defaultTab,
  );
  const [countdownSec, setCountdownSec] = useState(14 * 60 + 38);
  const [activeLiveSession, setActiveLiveSession] =
    useState<TimetableSession | null>(null);
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setCountdownSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const liveSession = WEEKLY_TIMETABLE[0]!;
  const mins = Math.floor(countdownSec / 60);
  const secs = countdownSec % 60;

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={
        tab === "timetable"
          ? "Weekly Class Timetable"
          : "Live Classes & Recordings"
      }
      roleOverride="student"
      toastMessage={toast}
    >
      <section className="rounded-3xl bg-[var(--sn-primary)] p-5 text-[var(--sn-cream)] shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-extrabold text-white">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                <span>LIVE NOW</span>
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                Next Q&amp;A Segment in {String(mins).padStart(2, "0")}:
                {String(secs).padStart(2, "0")}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-200">
                <Users className="h-3.5 w-3.5" />
                <span>342 students watching</span>
              </span>
            </div>
            <h2 className="text-xl font-extrabold sm:text-2xl">
              Grade {liveSession.grade} {liveSession.subject}:{" "}
              {liveSession.topic}
            </h2>
            <p className="text-xs text-[var(--sn-cream)]/85 sm:text-sm">
              {liveSession.teacher} • {liveSession.medium} • Low-data mode
              supported
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveLiveSession(liveSession)}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-[var(--sn-cream)] px-5 text-xs font-extrabold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Join Mock Live Player</span>
            </button>
            <button
              type="button"
              onClick={() =>
                showToast("Opening Zoom Classroom link (Demo preview)...")
              }
              className="inline-flex min-h-[46px] items-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 px-4 text-xs font-bold text-white hover:bg-white/20"
            >
              <span>Zoom</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                showToast("Opening YouTube Live unlisted stream (Demo)...")
              }
              className="inline-flex min-h-[46px] items-center gap-1.5 rounded-2xl border border-white/25 bg-white/10 px-4 text-xs font-bold text-white hover:bg-white/20"
            >
              <span>YouTube Live</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "live", label: "Live & Upcoming", icon: Radio },
            {
              id: "timetable",
              label: "Weekly Timetable (Mon–Sun)",
              icon: Calendar,
            },
            { id: "recordings", label: "Past Recordings", icon: Video },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                tab === item.id
                  ? "bg-[var(--sn-primary)] text-white"
                  : "border border-[var(--sn-border)] bg-white text-[var(--sn-text-secondary)] hover:bg-[var(--sn-olive)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {tab === "recordings" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PAST_RECORDINGS.map((rec) => (
            <article
              key={rec.id}
              className="flex flex-col justify-between rounded-3xl border border-[var(--sn-border)] bg-white p-5 shadow-xs"
            >
              <div>
                <span className="rounded-full bg-[var(--sn-olive)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                  Grade {rec.grade} • {rec.subject}
                </span>
                <h3 className="mt-2.5 text-base font-extrabold text-[var(--sn-text-main)]">
                  {rec.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--sn-text-muted)]">
                  {rec.teacher} • {rec.recordedOn} • {rec.duration}
                </p>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <Link
                  to="/lesson"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-4 py-2 text-xs font-bold text-white"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Watch Recorded Lesson</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {WEEKLY_TIMETABLE.map((slot) => {
            const reminded = reminders.includes(slot.id);
            return (
              <article
                key={slot.id}
                className={`flex flex-col justify-between rounded-3xl border p-4 shadow-xs ${
                  slot.isLiveNow
                    ? "border-2 border-[var(--sn-primary)] bg-[var(--sn-olive)]/60"
                    : "border-[var(--sn-border)] bg-white"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-[var(--sn-primary)] px-2.5 py-1 text-xs font-extrabold text-white">
                      {slot.day} • {slot.time}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-[var(--sn-primary)]">
                      Grade {slot.grade} • {slot.subject}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-sm font-extrabold text-[var(--sn-text-main)]">
                    {slot.topic}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--sn-text-muted)]">
                    {slot.teacher} • {slot.medium} • {slot.channel}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setReminders((prev) =>
                        reminded
                          ? prev.filter((x) => x !== slot.id)
                          : [...prev, slot.id],
                      );
                      showToast(
                        reminded
                          ? "Reminder removed"
                          : `Reminder set for ${slot.day} ${slot.time}`,
                      );
                    }}
                    className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold ${
                      reminded
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Bell className="h-3.5 w-3.5" />
                    <span>{reminded ? "Reminder On" : "Remind Me"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLiveSession(slot)}
                    className="rounded-xl bg-[var(--sn-primary)] px-4 py-1.5 text-xs font-bold text-white"
                  >
                    {slot.isLiveNow ? "Join Live" : "Open Stream"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <LivePlayerModal
        session={activeLiveSession}
        onClose={() => setActiveLiveSession(null)}
      />
    </SipNenaPortalShell>
  );
}
