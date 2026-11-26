import { useState, type FormEvent } from "react";
import { DAY_LABELS } from "@/features/live-schedule/strings";
import { formatSubject } from "@/lib/i18n-common";
import type { AppLanguage } from "@/lib/language";
import type {
  TeacherLiveChannel,
  TeacherLiveDay,
  TeacherLiveSession,
} from "@/lib/prototype-state";
import type { TeacherScheduleCopy } from "./schedule-strings";

const SUBJECTS = ["Science", "Mathematics", "ICT", "History", "English"];
const DAYS: TeacherLiveDay[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
const CHANNELS: TeacherLiveChannel[] = ["Zoom Live", "YouTube Live"];

export type SessionFormValue = Omit<TeacherLiveSession, "id" | "streamKey"> & {
  id?: string;
  streamKey?: string;
};

interface ScheduleSessionFormProps {
  lang: AppLanguage;
  copy: TeacherScheduleCopy;
  initial: TeacherLiveSession | null;
  onSave: (value: SessionFormValue) => void;
  onCancel: () => void;
}

export function ScheduleSessionForm({
  lang,
  copy,
  initial,
  onSave,
  onCancel,
}: ScheduleSessionFormProps) {
  const [topic, setTopic] = useState(initial?.topic ?? "");
  const [day, setDay] = useState<TeacherLiveDay>(initial?.day ?? "Mon");
  const [time, setTime] = useState(initial?.time ?? "04:30 PM");
  const [subject, setSubject] = useState(initial?.subject ?? "Science");
  const [grade, setGrade] = useState(initial?.grade ?? 8);
  const [mediumLabel, setMediumLabel] = useState(
    initial?.mediumLabel ?? "Sinhala & English",
  );
  const [channel, setChannel] = useState<TeacherLiveChannel>(
    initial?.channel ?? "Zoom Live",
  );
  const [meetingUrl, setMeetingUrl] = useState(initial?.meetingUrl ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!topic.trim() || !time.trim()) return;
    onSave({
      id: initial?.id,
      streamKey: initial?.streamKey,
      topic: topic.trim(),
      day,
      time: time.trim(),
      subject,
      grade,
      mediumLabel: mediumLabel.trim() || copy.mediumPlaceholder,
      channel,
      meetingUrl: meetingUrl.trim(),
      materialsReady: initial?.materialsReady ?? false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-[2rem] border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5"
      data-testid="teacher-live-session-form"
      aria-labelledby="teacher-live-form-heading"
    >
      <h3
        id="teacher-live-form-heading"
        className="text-lg font-bold text-[var(--sn-text-main)]"
      >
        {initial ? copy.formEditHeading : copy.formCreateHeading}
      </h3>

      <label className="block text-base font-bold" htmlFor="live-topic">
        <span className="mb-1.5 block">{copy.topicField}</span>
        <input
          id="live-topic"
          type="text"
          required
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder={copy.topicPlaceholder}
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-base font-bold" htmlFor="live-day">
          <span className="mb-1.5 block">{copy.dayField}</span>
          <select
            id="live-day"
            value={day}
            onChange={(event) => setDay(event.target.value as TeacherLiveDay)}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-3 text-base"
          >
            {DAYS.map((item) => (
              <option key={item} value={item}>
                {DAY_LABELS[item][lang]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-base font-bold" htmlFor="live-time">
          <span className="mb-1.5 block">{copy.timeField}</span>
          <input
            id="live-time"
            type="text"
            required
            value={time}
            onChange={(event) => setTime(event.target.value)}
            placeholder={copy.timePlaceholder}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-base font-bold" htmlFor="live-subject">
          <span className="mb-1.5 block">{copy.subjectField}</span>
          <select
            id="live-subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-3 text-base"
          >
            {SUBJECTS.map((item) => (
              <option key={item} value={item}>
                {formatSubject(lang, item)}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="space-y-2">
          <legend className="text-base font-bold">{copy.gradeField}</legend>
          <div className="flex flex-wrap gap-2">
            {[6, 7, 8, 9, 10, 11].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setGrade(item)}
                className={`min-h-12 rounded-xl px-3 text-base font-bold ${
                  grade === item
                    ? "bg-[var(--sn-primary)] text-white"
                    : "bg-[var(--sn-olive)] text-[var(--sn-primary)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-base font-bold" htmlFor="live-medium">
          <span className="mb-1.5 block">{copy.mediumField}</span>
          <input
            id="live-medium"
            type="text"
            value={mediumLabel}
            onChange={(event) => setMediumLabel(event.target.value)}
            placeholder={copy.mediumPlaceholder}
            className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
          />
        </label>
        <label className="block text-base font-bold" htmlFor="live-channel">
          <span className="mb-1.5 block">{copy.channelField}</span>
          <select
            id="live-channel"
            value={channel}
            onChange={(event) =>
              setChannel(event.target.value as TeacherLiveChannel)
            }
            className="w-full rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface)] px-3 py-3 text-base"
          >
            {CHANNELS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-base font-bold" htmlFor="live-meeting-url">
        <span className="mb-1.5 block">{copy.meetingUrlField}</span>
        <input
          id="live-meeting-url"
          type="url"
          value={meetingUrl}
          onChange={(event) => setMeetingUrl(event.target.value)}
          placeholder={
            channel === "YouTube Live"
              ? copy.meetingUrlPlaceholderYoutube
              : copy.meetingUrlPlaceholderZoom
          }
          spellCheck={false}
          autoCapitalize="none"
          data-testid="teacher-live-meeting-url"
          className="w-full rounded-xl border border-[var(--sn-border)] px-3 py-3 text-base"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-xl bg-[var(--sn-primary)] px-4 text-base font-bold text-white"
        >
          {copy.saveSessionBtn}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-12 items-center rounded-xl border border-[var(--sn-border)] px-4 text-base font-bold text-[var(--sn-text-main)]"
        >
          {copy.cancelBtn}
        </button>
      </div>
    </form>
  );
}
