import { Link } from "@tanstack/react-router";
import { Radio, X } from "lucide-react";
import type { TimetableSession } from "./mock-data";

export function LivePlayerModal({
  session,
  onClose,
}: {
  session: TimetableSession | null;
  onClose: () => void;
}) {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--sn-border)] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
              LIVE STREAM
            </span>
            <p className="truncate text-sm font-extrabold text-[var(--sn-text-main)]">
              {session.topic}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close live player"
            className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center bg-slate-900 p-6 text-center text-white">
          <Radio className="h-10 w-10 text-emerald-400" />
          <p className="mt-3 text-base font-bold">
            Connected to {session.teacher}&apos;s Classroom
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Channel: {session.channel} • Data Saver: 480p Smooth Stream
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              to="/doubts"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
            >
              Ask a Doubt Live
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/15 px-4 py-2 text-xs font-bold text-white"
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
