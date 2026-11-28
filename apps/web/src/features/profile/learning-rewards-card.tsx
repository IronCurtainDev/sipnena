import { Flame, Shield, Trophy } from "lucide-react";
import {
  computeStudentLearningStats,
  resolveActiveStudentId,
  toggleStudentLeaderboardOptIn,
  useCoursesStore,
} from "@/data/courses";
import type { AppLanguage } from "@/lib/language";

interface LearningRewardsCardProps {
  lang: AppLanguage;
  grade: string;
}

export function LearningRewardsCard({ lang, grade }: LearningRewardsCardProps) {
  const { store } = useCoursesStore();
  const studentId = resolveActiveStudentId(store.activeStudentId);
  const stats = computeStudentLearningStats(store, studentId);
  const activeStudent = store.students.find((s) => s.id === studentId);
  const optIn = Boolean(activeStudent?.leaderboardOptIn);
  const isOl = Number(grade) >= 10;

  const labels =
    lang === "si"
      ? {
          heading: isOl ? "O/L සූදානම සහ ප්‍රගතිය" : "ඔබේ අධ්‍යයන ජයග්‍රහණ",
          streak: `දින ${stats.streakDays} අඛණ්ඩ රේඛාව`,
          freeze: stats.freezeAvailable
            ? "සතිපතා නිදහස් දිනය සක්‍රීයයි"
            : "රේඛා ආරක්ෂකය",
          xp: `${stats.xp} XP · පාඩම් ${stats.completedLessons}ක් අවසන්`,
          olTip: "අවධානය: වෘත්ත ප්‍රමේය සහ ප්‍රකාශ විද්‍යාව පුහුණු වන්න",
          leaderboardTitle: "පන්ති ප්‍රමුඛතා පුවරුව (විකල්ප)",
          optInToggle: optIn
            ? "පුවරුවෙන් ඉවත් වන්න"
            : "මගේ පන්ති පුවරුවට එක්වන්න",
          optInHint: "පළමු නම පමණක් පෙන්වයි — පෙරනිමියෙන් ක්‍රියාවිරහිතයි.",
        }
      : lang === "ta"
        ? {
            heading: isOl ? "சா/த பரீட்சை ஆயத்தம்" : "உங்கள் கற்றல் சாதனைகள்",
            streak: `${stats.streakDays} நாள் தொடர் கற்றல்`,
            freeze: stats.freezeAvailable
              ? "வார விடுமுறை பாதுகாப்பு தயார்"
              : "பாதுகாப்பு",
            xp: `${stats.xp} XP · ${stats.completedLessons} பாடங்கள் முடிந்தது`,
            olTip: "கவனம்: வட்டத் தேற்றங்கள் & ஒளியியல் பயிற்சி செய்யவும்",
            leaderboardTitle: "வகுப்புத் தரவரிசை (விருப்பம்)",
            optInToggle: optIn
              ? "பட்டியலிலிருந்து வெளியேறு"
              : "வகுப்புப் பட்டியலில் சேர்",
            optInHint:
              "முதல் பெயர் மட்டும் காட்டப்படும் — இயல்பாக அணைக்கப்பட்டது.",
          }
        : {
            heading: isOl
              ? "G.C.E. O/L Readiness & Focus"
              : "Your Streak, XP & Unit Badges",
            streak: `${stats.streakDays}-day study streak`,
            freeze: stats.freezeAvailable
              ? "Weekly freeze shield active"
              : "Streak shield locked",
            xp: `${stats.xp} XP · ${stats.completedLessons} lessons completed`,
            olTip: "Weakest focus topics: Circle Theorems, Mirror Equations",
            leaderboardTitle: "Class Leaderboard (Opt-in)",
            optInToggle: optIn
              ? "Leave class leaderboard"
              : "Join class leaderboard",
            optInHint: "First names and initials only. Off by default.",
          };

  const peers = store.students
    .filter((s) => s.leaderboardOptIn || (optIn && s.id === studentId))
    .map((s) => ({
      id: s.id,
      firstName: s.name.split(/\s+/)[0] ?? s.name,
      initials: s.avatarInitials,
      xp: s.id === studentId ? stats.xp : (s.xp ?? 0),
    }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <section
      aria-label={labels.heading}
      className="space-y-4 rounded-2xl border border-[var(--sn-border)] bg-[var(--sn-surface)] p-5 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-extrabold text-[var(--sn-primary)]">
          {labels.heading}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-950">
          <Trophy className="h-4 w-4" aria-hidden="true" />
          {labels.xp}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-cream)] p-3">
          <Flame
            className="h-6 w-6 shrink-0 text-amber-600"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-bold text-[var(--sn-text-main)]">
              {labels.streak}
            </p>
            <p className="text-xs text-[var(--sn-text-muted)]">
              <Shield className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
              {labels.freeze}
            </p>
          </div>
        </div>

        {isOl ? (
          <div className="rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/50 p-3 text-xs font-bold text-[var(--sn-primary)]">
            {labels.olTip}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-olive)]/40 p-3 text-xs font-bold text-[var(--sn-primary)]">
            <span className="rounded-full bg-white px-2.5 py-1">
              Unit 1 Starter
            </span>
            {stats.passedQuizzes > 0 ? (
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-900">
                Quiz Finisher
              </span>
            ) : null}
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-[var(--sn-border)] pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-[var(--sn-text-main)]">
              {labels.leaderboardTitle}
            </h3>
            <p className="text-xs text-[var(--sn-text-muted)]">
              {labels.optInHint}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleStudentLeaderboardOptIn(studentId)}
            className="min-h-11 rounded-xl border border-[var(--sn-border)] bg-[var(--sn-surface-muted)] px-3 text-xs font-bold text-[var(--sn-primary)] hover:bg-[var(--sn-olive)]"
          >
            {labels.optInToggle}
          </button>
        </div>

        {optIn && peers.length > 0 ? (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {peers.slice(0, 3).map((peer, idx) => (
              <li
                key={peer.id}
                className="flex items-center justify-between rounded-xl border border-[var(--sn-border)] px-3 py-2 text-xs font-bold"
              >
                <span>
                  #{idx + 1} {peer.firstName} ({peer.initials})
                </span>
                <span className="text-[var(--sn-primary)]">{peer.xp} XP</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
