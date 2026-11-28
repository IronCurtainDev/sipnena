import { useEffect, useRef, useState } from "react";
import { Captions, Headphones, Pause, Play } from "lucide-react";
import { isYoutubeUrl } from "@/lib/youtube";
import { RayDiagramGraphic } from "./ray-diagram-graphic";
import type { VideoLessonStrings } from "./strings";
import {
  QUALITY_META,
  VideoControlsBar,
  type QualityId,
} from "./video-player-controls";
import { YoutubeLessonEmbed } from "./youtube-lesson-embed";

interface VideoPlayerProps {
  t: VideoLessonStrings;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToast: (msg: string) => void;
  compact?: boolean;
  src?: string;
  poster?: string;
}

const MOCK_TOTAL_SECONDS = 1110;

function getInitialQuality(): QualityId {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return "240p";
  }
  if (typeof window !== "undefined" && window.innerWidth < 768) return "360p";
  return "720p";
}

export function VideoPlayer({
  t,
  isPlaying,
  onTogglePlay,
  onToast,
  compact = false,
  src,
  poster,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const youtube = isYoutubeUrl(src);
  const hasHtmlVideo = Boolean(src?.trim()) && !youtube;
  const [seconds, setSeconds] = useState(hasHtmlVideo ? 0 : 522);
  const [totalSeconds, setTotalSeconds] = useState(
    hasHtmlVideo ? 0 : MOCK_TOTAL_SECONDS,
  );
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [subtitles, setSubtitles] = useState<"en" | "si" | "ta" | "off">("si");
  const [quality, setQuality] = useState<QualityId>(getInitialQuality);
  const [audioOnly, setAudioOnly] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!hasHtmlVideo || !video) return;
    const onTime = () => setSeconds(Math.floor(video.currentTime));
    const onMeta = () => {
      if (Number.isFinite(video.duration)) {
        setTotalSeconds(Math.floor(video.duration));
      }
    };
    const onEnded = () => {
      onToast("Lesson finished. You can take the section quiz.");
      if (isPlaying) onTogglePlay();
    };
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("ended", onEnded);
    };
  }, [hasHtmlVideo, src, isPlaying, onTogglePlay, onToast]);

  useEffect(() => {
    const video = videoRef.current;
    if (!hasHtmlVideo || !video) return;
    video.muted = isMuted;
    video.playbackRate = playbackSpeed;
    if (isPlaying) void video.play().catch(() => undefined);
    else video.pause();
    return () => video.pause();
  }, [hasHtmlVideo, isPlaying, isMuted, playbackSpeed, src]);

  useEffect(() => {
    if (hasHtmlVideo || youtube || !isPlaying) return;
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
  }, [hasHtmlVideo, youtube, isPlaying, playbackSpeed, totalSeconds, onToast]);

  if (youtube && src) {
    return (
      <div
        className={`overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl ${
          compact ? "rounded-none" : "rounded-2xl"
        }`}
      >
        <YoutubeLessonEmbed
          src={src}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
        />
      </div>
    );
  }

  const handleSkip = (delta: number) => {
    if (hasHtmlVideo && videoRef.current) {
      const next = Math.min(
        totalSeconds,
        Math.max(0, videoRef.current.currentTime + delta),
      );
      videoRef.current.currentTime = next;
      setSeconds(Math.floor(next));
      return;
    }
    setSeconds((prev) => Math.min(totalSeconds, Math.max(0, prev + delta)));
  };

  const progressPercent =
    totalSeconds > 0
      ? Math.min(100, Math.round((seconds / totalSeconds) * 100))
      : 0;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`group relative flex flex-col overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl ${
        compact ? "rounded-none" : "rounded-2xl"
      } ${isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : ""}`}
    >
      <div className="z-10 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-b from-slate-950/90 to-transparent px-4 py-2.5 text-xs font-semibold text-white/95 sm:text-sm">
        <div className="flex items-center gap-2">
          <span>{t.termBadge}</span>
          {!compact && (
            <>
              <span className="text-slate-400">·</span>
              <span className="font-normal text-slate-200">
                {t.videoAudioMeta} (~{QUALITY_META[quality].mb} MB)
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setAudioOnly((v) => !v);
              onToast(audioOnly ? "Video stream enabled" : "Audio + slides");
            }}
            aria-pressed={audioOnly}
            className={`flex min-h-11 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-bold ${
              audioOnly
                ? "border-emerald-300 bg-emerald-800 text-white"
                : "border-white/15 bg-black/60 text-slate-200"
            }`}
          >
            <Headphones className="h-4 w-4" />
            <span>{audioOnly ? "Audio + Slides" : "Slides"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const modes: Array<"si" | "ta" | "en" | "off"> = [
                "si",
                "ta",
                "en",
                "off",
              ];
              const next =
                modes[(modes.indexOf(subtitles) + 1) % modes.length] ?? "si";
              setSubtitles(next);
              onToast(next === "off" ? "Subtitles Off" : `Captions: ${next}`);
            }}
            className={`flex min-h-11 items-center gap-1 rounded-lg border px-2.5 text-xs font-bold ${
              subtitles !== "off"
                ? "border-[var(--sn-border-selected)]/60 bg-[var(--sn-primary)]/70 text-white"
                : "border-white/15 bg-black/60 text-slate-300"
            }`}
          >
            <Captions className="h-4 w-4" />
            <span>{subtitles.toUpperCase()}</span>
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {audioOnly ? (
          <div className="flex h-full items-center justify-center bg-slate-900 text-white">
            <Headphones className="h-10 w-10 text-emerald-300" />
          </div>
        ) : hasHtmlVideo ? (
          <video
            ref={videoRef}
            key={src}
            src={src}
            poster={poster}
            playsInline
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            className="h-full w-full bg-black object-contain"
            onClick={onTogglePlay}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <RayDiagramGraphic isPlaying={isPlaying} compact={compact} />
        )}
        <button
          type="button"
          onClick={onTogglePlay}
          className="absolute inset-0 z-20 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sn-primary)]/90 text-[var(--sn-cream)] shadow-2xl ring-4 ring-[var(--sn-primary)]/30"
          aria-label={isPlaying ? "Pause lesson video" : "Play lesson video"}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 fill-current" />
          ) : (
            <Play className="ml-1 h-7 w-7 fill-current" />
          )}
        </button>
      </div>

      <div className="relative z-10 w-full px-4 pt-2">
        <div
          role="slider"
          aria-label="Lesson progress scrubber"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") handleSkip(-10);
            if (e.key === "ArrowRight") handleSkip(10);
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const next = Math.round(
              ((e.clientX - rect.left) / rect.width) * (totalSeconds || 0),
            );
            if (hasHtmlVideo && videoRef.current) {
              videoRef.current.currentTime = next;
            }
            setSeconds(next);
          }}
          className="flex h-6 w-full cursor-pointer items-center"
        >
          <progress
            value={progressPercent}
            max={100}
            className="h-2 w-full overflow-hidden rounded-full accent-[var(--sn-primary)]"
          />
        </div>
      </div>

      <VideoControlsBar
        isPlaying={isPlaying}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        seconds={seconds}
        totalSeconds={totalSeconds || MOCK_TOTAL_SECONDS}
        playbackSpeed={playbackSpeed}
        quality={quality}
        onTogglePlay={onTogglePlay}
        onSkip={handleSkip}
        onToggleMute={() => {
          setIsMuted(!isMuted);
          onToast(isMuted ? "Audio Unmuted" : "Audio Muted");
        }}
        onSpeedToggle={() => {
          const speeds = [1.0, 1.25, 1.5, 2.0];
          const next =
            speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length] ?? 1;
          setPlaybackSpeed(next);
          onToast(`Speed: ${next}x`);
        }}
        onQualityToggle={() => {
          const order: QualityId[] = ["240p", "360p", "720p"];
          const next =
            order[(order.indexOf(quality) + 1) % order.length] ?? "360p";
          setQuality(next);
          onToast(`Video quality: ${QUALITY_META[next].label}`);
        }}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />
    </div>
  );
}
