import { useState } from "react";
import { Plus, Radio } from "lucide-react";
import { SipNenaPortalShell } from "@/features/portal-shell/portal-shell";
import { useSipNenaLanguage } from "@/features/portal-shell/use-sipnena-lang";
import { useToastMessage } from "@/features/portal-shell/use-toast";
import {
  usePrototypeState,
  type TeacherLiveSession,
} from "@/lib/prototype-state";
import { TEACHER_EXTRA_COPY } from "./schedule-strings";
import { ScheduleSessionCard } from "./schedule-session-card";
import {
  ScheduleSessionForm,
  type SessionFormValue,
} from "./schedule-session-form";

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function sortSessions(sessions: TeacherLiveSession[]) {
  return [...sessions].sort((a, b) => {
    const dayDiff =
      DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });
}

export function TeacherScheduleScreen() {
  const [lang, setLang] = useSipNenaLanguage();
  const { state, update } = usePrototypeState();
  const { toast, showToast } = useToastMessage();
  const copy = TEACHER_EXTRA_COPY[lang];
  const [editingId, setEditingId] = useState<string | null | "new">(null);

  const sessions = sortSessions(state.teacherLiveSessions);
  const editingSession =
    editingId && editingId !== "new"
      ? (sessions.find((item) => item.id === editingId) ?? null)
      : null;

  const saveSession = (value: SessionFormValue) => {
    update((prev) => {
      if (value.id) {
        return {
          ...prev,
          teacherLiveSessions: prev.teacherLiveSessions.map((item) =>
            item.id === value.id
              ? {
                  ...item,
                  ...value,
                  id: value.id,
                  streamKey: value.streamKey ?? item.streamKey,
                }
              : item,
          ),
        };
      }
      const id = `live-${Date.now()}`;
      return {
        ...prev,
        teacherLiveSessions: [
          {
            id,
            day: value.day,
            time: value.time,
            subject: value.subject,
            grade: value.grade,
            topic: value.topic,
            mediumLabel: value.mediumLabel,
            channel: value.channel,
            meetingUrl: value.meetingUrl,
            materialsReady: value.materialsReady,
            streamKey: `sn-demo-${id.slice(-6)}`,
          },
          ...prev.teacherLiveSessions,
        ],
      };
    });
    setEditingId(null);
    showToast(copy.sessionSavedToast);
  };

  const openMeeting = (session: TeacherLiveSession) => {
    if (!session.meetingUrl) {
      showToast(copy.meetingUrlMissing);
      return;
    }
    window.open(session.meetingUrl, "_blank", "noopener,noreferrer");
    showToast(copy.meetingOpenedToast);
  };

  const deleteSession = (session: TeacherLiveSession) => {
    if (!window.confirm(copy.deleteConfirm)) return;
    update((prev) => ({
      ...prev,
      teacherLiveSessions: prev.teacherLiveSessions.filter(
        (item) => item.id !== session.id,
      ),
    }));
    if (editingId === session.id) setEditingId(null);
    showToast(copy.sessionDeletedToast);
  };

  const toggleReady = (session: TeacherLiveSession) => {
    update((prev) => ({
      ...prev,
      teacherLiveSessions: prev.teacherLiveSessions.map((item) =>
        item.id === session.id
          ? { ...item, materialsReady: !item.materialsReady }
          : item,
      ),
    }));
  };

  const copyKey = async (session: TeacherLiveSession) => {
    try {
      await navigator.clipboard.writeText(session.streamKey);
    } catch {
      // Demo still shows toast if clipboard is blocked.
    }
    showToast(copy.keyCopiedToast);
  };

  return (
    <SipNenaPortalShell
      lang={lang}
      onLanguageChange={setLang}
      title={copy.schedulePageTitle}
      roleOverride="teacher"
      toastMessage={toast}
    >
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--sn-primary)]">
            {copy.scheduleHeading}
          </h2>
          <p className="mt-1 text-base text-[var(--sn-text-secondary)]">
            {copy.scheduleSub}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditingId("new")}
          data-testid="teacher-new-live-session"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 text-base font-bold text-white hover:bg-[var(--sn-primary-hover)]"
        >
          <Plus className="h-5 w-5" />
          <span>{copy.newSessionBtn}</span>
        </button>
      </section>

      {editingId !== null ? (
        <ScheduleSessionForm
          key={editingId}
          lang={lang}
          copy={copy}
          initial={editingSession}
          onSave={saveSession}
          onCancel={() => setEditingId(null)}
        />
      ) : null}

      <section data-testid="teacher-live-sessions">
        {sessions.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-[var(--sn-border)] bg-[var(--sn-olive)]/20 p-10 text-center">
            <Radio className="mx-auto h-10 w-10 text-[var(--sn-primary)] opacity-40" />
            <h3 className="mt-4 text-xl font-extrabold text-[var(--sn-primary)]">
              {copy.emptyHeading}
            </h3>
            <p className="mt-2 text-base text-[var(--sn-text-secondary)]">
              {copy.emptyBody}
            </p>
            <button
              type="button"
              onClick={() => setEditingId("new")}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[var(--sn-primary)] px-6 text-base font-bold text-white"
            >
              <Plus className="h-4 w-4" />
              <span>{copy.newSessionBtn}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <ScheduleSessionCard
                key={session.id}
                lang={lang}
                copy={copy}
                session={session}
                onEdit={(item) => setEditingId(item.id)}
                onDelete={deleteSession}
                onToggleReady={toggleReady}
                onCopyKey={(item) => void copyKey(item)}
                onStart={openMeeting}
              />
            ))}
          </div>
        )}
      </section>
    </SipNenaPortalShell>
  );
}
