import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

export type QualityId = "240p" | "360p" | "720p";

export const QUALITY_META: Record<QualityId, { label: string; mb: number }> = {
  "240p": { label: "240p Saver (~14 MB)", mb: 14 },
  "360p": { label: "360p Standard (~28 MB)", mb: 28 },
  "720p": { label: "720p HD (~58 MB)", mb: 58 },
};

export function formatVideoTime(sec: number): string {
  const mins = Math.floor(sec / 60);
  const remainder = sec % 60;
  return `${String(mins).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function VideoControlsBar({
  isPlaying,
  isMuted,
  isFullscreen,
  seconds,
  totalSeconds,
  playbackSpeed,
  quality,
  onTogglePlay,
  onSkip,
  onToggleMute,
  onSpeedToggle,
  onQualityToggle,
  onToggleFullscreen,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  seconds: number;
  totalSeconds: number;
  playbackSpeed: number;
  quality: QualityId;
  onTogglePlay: () => void;
  onSkip: (delta: number) => void;
  onToggleMute: () => void;
  onSpeedToggle: () => void;
  onQualityToggle: () => void;
  onToggleFullscreen: () => void;
}) {
  return (
    <div className="z-10 flex flex-wrap items-center justify-between gap-2 px-4 pb-3 pt-1 text-xs text-white">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onTogglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-white hover:bg-white/10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onSkip(-10)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10 hover:text-white"
          aria-label="Skip back 10 seconds"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onSkip(10)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10 hover:text-white"
          aria-label="Skip forward 10 seconds"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10 hover:text-white"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-rose-400" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <span className="font-mono text-xs text-slate-200">
          {formatVideoTime(seconds)} / {formatVideoTime(totalSeconds)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSpeedToggle}
          aria-label={`Playback speed ${playbackSpeed}x`}
          className="min-h-11 rounded-xl bg-slate-800/90 px-3 text-xs font-bold text-slate-100 hover:bg-slate-700"
        >
          {playbackSpeed}x
        </button>

        <button
          type="button"
          onClick={onQualityToggle}
          aria-label={`Video quality ${quality}`}
          className="min-h-11 rounded-xl bg-slate-800/90 px-3 text-xs font-bold text-slate-100 hover:bg-slate-700"
        >
          {quality}
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10 hover:text-white"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
