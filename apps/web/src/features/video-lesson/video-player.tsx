import { useState } from "react";
import {
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { RayDiagramGraphic } from "./ray-diagram-graphic";
import type { VideoLessonStrings } from "./strings";

interface VideoPlayerProps {
  t: VideoLessonStrings;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToast: (msg: string) => void;
  compact?: boolean;
}

export function VideoPlayer({
  t,
  isPlaying,
  onTogglePlay,
  onToast,
  compact = false,
}: VideoPlayerProps) {
  const [seconds, setSeconds] = useState(522); // 08:42
  const totalSeconds = 1110; // 18:30
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  const handleSkip = (delta: number) => {
    setSeconds((prev) => Math.min(totalSeconds, Math.max(0, prev + delta)));
  };

  const handleSpeedToggle = () => {
    const speeds = ["1.0x", "1.25x", "1.5x", "2.0x"];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const next = speeds[nextIdx] ?? "1.0x";
    setPlaybackSpeed(next);
    onToast(`Speed: ${next}`);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    onToast(isFullscreen ? "Exited Fullscreen" : "Fullscreen Mode");
  };

  const progressPercent = Math.round((seconds / totalSeconds) * 100);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl ${
        compact ? "rounded-none" : "rounded-2xl"
      }`}
    >
      {/* Top Meta Bar Overlay */}
      <div className="z-10 flex items-center justify-between bg-gradient-to-b from-slate-950/90 to-transparent px-4 py-2.5 text-xs font-semibold text-white/90">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Science • Grade 8</span>
          {!compact && (
            <>
              <span className="text-slate-500">•</span>
              <span className="font-normal text-slate-300">
                {t.videoAudioMeta}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToast("Subtitles: Sinhala & English")}
            className="rounded border border-white/10 bg-black/60 px-2 py-0.5 text-[11px] font-bold text-slate-200 hover:bg-black/80"
          >
            {t.ccOn}
          </button>
        </div>
      </div>

      {/* Main Video Canvas with Interactive Ray Diagram */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <RayDiagramGraphic isPlaying={isPlaying} compact={compact} />

        {/* Big Center Play/Pause Floating Circle */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/90 text-white shadow-2xl ring-4 ring-blue-400/30 backdrop-blur-xs transition hover:scale-105 active:scale-95 z-20"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 fill-current" />
          ) : (
            <Play className="ml-1 h-7 w-7 fill-current" />
          )}
        </button>
      </div>

      {/* In-Video Scrubber Bar */}
      <div className="relative z-10 w-full px-4 pt-2">
        <div
          role="slider"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setSeconds(Math.round(clickPos * totalSeconds));
          }}
          className="group/scrub relative flex h-3 w-full cursor-pointer items-center"
        >
          <div className="h-1.5 w-full rounded-full bg-slate-700/80 transition group-hover/scrub:h-2">
            <div
              className="h-full rounded-full bg-blue-500 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute -right-2 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-500 shadow-md group-hover/scrub:scale-125" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="z-10 flex items-center justify-between px-4 pb-3 pt-1 text-xs text-white">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onTogglePlay}
            className="text-white hover:text-blue-400"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSkip(-10)}
            className="text-slate-300 hover:text-white"
            aria-label="Skip back 10 seconds"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleSkip(10)}
            className="text-slate-300 hover:text-white"
            aria-label="Skip forward 10 seconds"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMuted(!isMuted);
              onToast(isMuted ? "Audio Unmuted" : "Audio Muted");
            }}
            className="text-slate-300 hover:text-white"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-red-400" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          <span className="font-mono text-slate-300">
            {formatTime(seconds)} / {formatTime(totalSeconds)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSpeedToggle}
            className="rounded bg-slate-800/80 px-2 py-0.5 font-bold text-slate-200 hover:bg-slate-700"
          >
            {playbackSpeed}
          </button>

          {!compact && (
            <button
              type="button"
              onClick={() => onToast("Video Quality: 720p HD (Optimal)")}
              className="rounded bg-slate-800/80 px-2 py-0.5 font-bold text-slate-200 hover:bg-slate-700"
            >
              {t.quality}
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="text-slate-300 hover:text-white"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

