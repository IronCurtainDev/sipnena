import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Maximize2, Minimize2, Pause, Play } from "lucide-react";
import {
  loadYoutubeIframeApi,
  parseYoutubeVideoId,
  YOUTUBE_LESSON_PLAYER_VARS,
  type YoutubePlayer,
} from "@/lib/youtube";
import { formatVideoTime } from "./video-player-controls";

interface YoutubeLessonEmbedProps {
  src: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function YoutubeLessonEmbed({
  src,
  isPlaying,
  onTogglePlay,
}: YoutubeLessonEmbedProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YoutubePlayer | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const onTogglePlayRef = useRef(onTogglePlay);
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoId = parseYoutubeVideoId(src);
  const poster = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : undefined;

  isPlayingRef.current = isPlaying;
  onTogglePlayRef.current = onTogglePlay;

  useEffect(() => {
    if (!videoId || !mountRef.current) return;

    let cancelled = false;
    let player: YoutubePlayer | null = null;
    const host = mountRef.current;
    const el = document.createElement("div");
    host.appendChild(el);

    void loadYoutubeIframeApi()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(el, {
          videoId,
          width: "100%",
          height: "100%",
          host: "https://www.youtube-nocookie.com",
          playerVars: {
            ...YOUTUBE_LESSON_PLAYER_VARS,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return;
              playerRef.current = event.target;
              setReady(true);
              const duration = Math.floor(event.target.getDuration());
              if (duration > 0) setTotalSeconds(duration);
              if (isPlayingRef.current) event.target.playVideo();
              else event.target.pauseVideo();
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.ENDED && isPlayingRef.current) {
                onTogglePlayRef.current();
              }
            },
          },
        });
        playerRef.current = player;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      try {
        playerRef.current?.stopVideo();
        playerRef.current?.destroy();
      } catch {
        /* player may already be gone */
      }
      playerRef.current = null;
      setReady(false);
      host.innerHTML = "";
    };
  }, [videoId]);

  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player) return;
    if (isPlaying) player.playVideo();
    else player.pauseVideo();
  }, [isPlaying, ready]);

  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      const player = playerRef.current;
      if (!player) return;
      setSeconds(Math.floor(player.getCurrentTime() || 0));
      const duration = Math.floor(player.getDuration() || 0);
      if (duration > 0) setTotalSeconds(duration);
    };
    tick();
    if (!isPlaying) return;
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [ready, isPlaying]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(document.fullscreenElement === shellRef.current);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement === shell) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }
    void shell.requestFullscreen().catch(() => undefined);
  };

  if (!videoId) return null;

  const progressPercent =
    totalSeconds > 0
      ? Math.min(100, Math.round((seconds / totalSeconds) * 100))
      : 0;

  const seekToRatio = (clientX: number, target: HTMLElement) => {
    const player = playerRef.current;
    if (!player || totalSeconds <= 0) return;
    const rect = target.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = Math.floor(ratio * totalSeconds);
    player.seekTo(next, true);
    setSeconds(next);
  };

  const blockMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={shellRef}
      onContextMenu={blockMenu}
      className={`relative w-full overflow-hidden bg-black ${
        isFullscreen ? "h-full" : "aspect-[16/9]"
      }`}
    >
      {!ready && poster ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      ) : null}
      {/* Crop YouTube title/channel chrome — API no longer allows hiding it. */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={mountRef}
          className="absolute inset-x-0 -top-[14%] h-[128%] w-full [&_iframe]:h-full [&_iframe]:w-full"
        />
      </div>
      {/* Covers iframe so YouTube's own context menu never opens. */}
      <button
        type="button"
        aria-label={isPlaying ? "Pause lesson video" : "Play lesson video"}
        onClick={onTogglePlay}
        onContextMenu={blockMenu}
        className="absolute inset-0 z-[12] cursor-default bg-transparent"
      />

      {!isPlaying ? (
        <span className="pointer-events-none absolute inset-0 z-[13] m-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sn-primary)]/90 text-[var(--sn-cream)] shadow-2xl ring-4 ring-[var(--sn-primary)]/30">
          <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
        <div
          role="slider"
          aria-label="Lesson progress"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={(e) => {
            const player = playerRef.current;
            if (!player) return;
            if (e.key === "ArrowLeft") {
              const next = Math.max(0, seconds - 10);
              player.seekTo(next, true);
              setSeconds(next);
            }
            if (e.key === "ArrowRight") {
              const next = Math.min(totalSeconds, seconds + 10);
              player.seekTo(next, true);
              setSeconds(next);
            }
          }}
          onClick={(e) => seekToRatio(e.clientX, e.currentTarget)}
          className="mb-2 flex h-6 w-full cursor-pointer items-center"
        >
          <progress
            value={progressPercent}
            max={100}
            className="h-2 w-full overflow-hidden rounded-full accent-[var(--sn-primary)]"
          />
        </div>
        <div className="flex items-center gap-3 text-white">
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-white/10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5 fill-current" aria-hidden="true" />
            )}
          </button>
          <span className="text-sm font-semibold tabular-nums">
            {formatVideoTime(seconds)} / {formatVideoTime(totalSeconds)}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-white/10"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Maximize2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
