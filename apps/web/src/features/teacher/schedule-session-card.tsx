import {
  CheckCircle2,
  Copy,
  Pencil,
  Trash2,
  Video,
} from "lucide-react";
import { DAY_LABELS } from "@/features/live-schedule/strings";
import { formatGrade, formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type { TeacherLiveSession } from "@/lib/prototype-state";
import type { TeacherScheduleCopy } from "./schedule-strings";

interface ScheduleSessionCardProps {
  lang: AppLanguage;
  copy: TeacherScheduleCopy;
  session: TeacherLiveSession;
  onEdit: (session: TeacherLiveSession) => void;
  onDelete: (session: TeacherLiveSession) => void;
  onToggleReady: (session: TeacherLiveSession) => void;
  onCopyKey: (session: TeacherLiveSession) => void;
  onStart: (session: TeacherLiveSession) => void;
}

export function ScheduleSessionCard({
  lang,
  copy,
  session,
  onEdit,
  onDelete,
  onToggleReady,
  onCopyKey,
  onStart,
}: ScheduleSessionCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-[2rem] border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs">
      <div>
        <p className="text-base font-bold text-[var(--sn-primary)]">
          {DAY_LABELS[session.day][lang]} · {session.time}
        </p>
        <p className="mt-1 text-base text-[var(--sn-text-muted)]">
          {formatGrade(lang, session.grade)} ·{" "}
          {formatSubject(lang, session.subject)}
        </p>
        <h3 className="mt-3 text-lg leading-snug font-extrabold text-[var(--sn-text-main)]">
          {session.topic}
        </h3>
        <p className="mt-2 text-base text-[var(--sn-text-secondary)]">
          {session.mediumLabel} · {session.channel}
        </p>
        {session.meetingUrl ? (
          <p className="mt-2 truncate text-base font-semibold text-[var(--sn-primary)]">
            {session.meetingUrl}
          </p>
        ) : (
          <p className="mt-2 text-base text-[var(--sn-text-muted)]">
            {copy.meetingUrlMissing}
          </p>
        )}
        <p
          className={`mt-3 text-base font-semibold ${
            session.materialsReady
              ? "text-[var(--sn-primary)]"
              : "text-[var(--sn-text-muted)]"
          }`}
        >
          {session.materialsReady ? copy.materialsReady : copy.markReady}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onEdit(session)}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-3 text-base font-bold text-white"
          >
            <Pencil className="h-4 w-4" />
            <span>{copy.editSessionBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(session)}
            aria-label={copy.deleteSessionBtn}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--sn-border)] text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-[var(--sn-border)] pt-3">
          <button
            type="button"
            onClick={() => onToggleReady(session)}
            className={`inline-flex min-h-12 items-center gap-1.5 rounded-xl px-3 text-base font-bold ${
              session.materialsReady
                ? "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                : "border border-[var(--sn-border)] text-[var(--sn-text-main)]"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {session.materialsReady ? copy.materialsReady : copy.markReady}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onCopyKey(session)}
            className="inline-flex min-h-12 items-center gap-1.5 rounded-xl border border-[var(--sn-border)] px-3 text-base font-bold text-[var(--sn-primary)]"
          >
            <Copy className="h-4 w-4" />
            <span>{copy.copyKeyBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => onStart(session)}
            disabled={!session.meetingUrl}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--sn-primary)] px-3 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Video className="h-4 w-4" />
            <span>
              {session.meetingUrl
                ? copy.openMeetingBtn
                : copy.startBroadcastBtn}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
