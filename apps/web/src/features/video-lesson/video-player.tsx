import React, { useEffect, useState } from "react";
import {
  Captions,
  Maximize2,
  Minimize2,
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
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [subtitles, setSubtitles] = useState<"en" | "si" | "ta" | "off">("si");
  const [quality, setQuality] = useState<string>("720p HD");

  // Live timer tick when video is playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= totalSeconds) {
          onToast("Lesson finished. You can take the section quiz.");
          return totalSeconds;
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalSeconds, onToast]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  const handleSkip = (delta: number) => {
    setSeconds((prev) => Math.min(totalSeconds, Math.max(0, prev + delta)));
  };

  const handleSpeedToggle = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const next = speeds[nextIdx] ?? 1.0;
    setPlaybackSpeed(next);
    onToast(`Speed: ${next}x`);
  };

  const handleSubtitlesToggle = () => {
    const modes: Array<"si" | "ta" | "en" | "off"> = ["si", "ta", "en", "off"];
    const nextIdx = (modes.indexOf(subtitles) + 1) % modes.length;
    const next = modes[nextIdx] ?? "si";
    setSubtitles(next);
    const label =
      next === "si"
        ? "සිංහල උපසිරැසි"
        : next === "ta"
          ? "தமிழ் வசனங்கள்"
          : next === "en"
            ? "English Captions"
            : "Subtitles Off";
    onToast(`Subtitles: ${label}`);
  };

  const handleQualityToggle = () => {
    const qualities = ["720p HD", "480p SD", "360p Data-Saver"];
    const nextIdx = (qualities.indexOf(quality) + 1) % qualities.length;
    const next = qualities[nextIdx] ?? "720p HD";
    setQuality(next);
    onToast(`Quality: ${next}`);
  };

  const progressPercent = Math.min(
    100,
    Math.round((seconds / totalSeconds) * 100),
  );

  return (
    <div
      className={`group relative flex flex-col overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all ${
        compact ? "rounded-none" : "rounded-2xl"
      } ${isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : ""}`}
    >
      {/* Top Meta Bar Overlay */}
      <div className="z-10 flex items-center justify-between bg-gradient-to-b from-slate-950/90 to-transparent px-4 py-2.5 text-sm font-semibold text-white/90">
        <div className="flex items-center gap-2">
          <span>{t.termBadge}</span>
          {!compact && (
            <>
              <span className="text-slate-500">·</span>
              <span className="font-normal text-slate-300">
                {t.videoAudioMeta}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSubtitlesToggle}
            className={`flex min-h-[36px] items-center gap-1 rounded-lg border px-2.5 py-1 text-sm font-bold transition ${
              subtitles !== "off"
                ? "border-[var(--sn-border-selected)]/60 bg-[var(--sn-primary)]/60 text-white"
                : "border-white/10 bg-black/60 text-slate-400 hover:text-white"
            }`}
          >
            <Captions className="h-4 w-4" />
            <span>{subtitles.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Main Video Canvas with Interactive Ray Diagram */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <RayDiagramGraphic isPlaying={isPlaying} compact={compact} />

        {/* Subtitle Line Overlay */}
        {subtitles !== "off" && (
          <div className="absolute bottom-6 inset-x-4 z-10 flex justify-center text-center pointer-events-none">
            <span className="rounded-lg bg-black/80 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-xs sm:text-sm">
              {subtitles === "si"
                ? "කිරණ සටහන: අවතල දර්පණයක නාභිය (F) ලක්ෂ්‍යය කේන්ද්‍රය (C) සහ ධ්‍රැවය (P) අතර මධ්‍යයේ පිහිටයි."
                : subtitles === "ta"
                  ? "கதிர் வரைபடம்: குழிவாடியின் குவியம் (F) முனையத்திற்கும் (P) வளைவு மையத்திற்கும் (C) நடுவில் அமையும்."
                  : "Ray diagram: The principal focus (F) sits exactly halfway between Pole (P) and Center (C)."}
            </span>
          </div>
        )}

        {/* Big Center Play/Pause Floating Circle */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sn-primary)]/90 text-[var(--sn-cream)] shadow-2xl ring-4 ring-[var(--sn-primary)]/30 backdrop-blur-xs transition hover:scale-105 active:scale-95 z-20"
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
              className="relative h-full rounded-full bg-[var(--sn-primary)] transition-all"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute -right-2 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--sn-primary)] shadow-md group-hover/scrub:scale-125" />
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
            className="text-white hover:text-[var(--sn-primary)] transition"
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
            className="text-slate-300 hover:text-white transition"
            aria-label="Skip back 10 seconds"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleSkip(10)}
            className="text-slate-300 hover:text-white transition"
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
            className="text-slate-300 hover:text-white transition"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-rose-400" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          <span className="font-mono text-slate-300 text-[11px] sm:text-xs">
            {formatTime(seconds)} / {formatTime(totalSeconds)}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleSpeedToggle}
            className="rounded bg-slate-800/80 px-2 py-0.5 font-bold text-slate-200 hover:bg-slate-700 transition text-[11px]"
          >
            {playbackSpeed}x
          </button>

          {!compact && (
            <button
              type="button"
              onClick={handleQualityToggle}
              className="rounded bg-slate-800/80 px-2 py-0.5 font-bold text-slate-200 hover:bg-slate-700 transition text-[11px]"
            >
              {quality}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-slate-300 hover:text-white transition"
            aria-label="Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
