/** Parse a YouTube watch / share / embed / shorts URL into a video id. */
export function parseYoutubeVideoId(raw: string | undefined | null): string | null {
  const value = raw?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id && /^[\w-]{11}$/.test(id) ? id : null;
      }
      const parts = url.pathname.split("/").filter(Boolean);
      if (
        (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") &&
        parts[1] &&
        /^[\w-]{11}$/.test(parts[1])
      ) {
        return parts[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function isYoutubeUrl(raw: string | undefined | null): boolean {
  return parseYoutubeVideoId(raw) !== null;
}

/** Minimal chrome for in-lesson playback (API-driven controls). */
export const YOUTUBE_LESSON_PLAYER_VARS = {
  controls: 0,
  rel: 0,
  modestbranding: 1,
  playsinline: 1,
  iv_load_policy: 3,
  enablejsapi: 1,
  fs: 0,
  disablekb: 1,
  cc_load_policy: 0,
  // Deprecated; ignored by modern players, kept for older embeds.
  showinfo: 0,
} as const;

export function youtubeEmbedUrl(
  raw: string | undefined | null,
  options?: { autoplay?: boolean; origin?: string },
): string | null {
  const id = parseYoutubeVideoId(raw);
  if (!id) return null;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(YOUTUBE_LESSON_PLAYER_VARS)) {
    params.set(key, String(value));
  }
  if (options?.autoplay) params.set("autoplay", "1");
  if (options?.origin) params.set("origin", options.origin);
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export type YoutubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

type YoutubeNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YoutubePlayer }) => void;
        onStateChange?: (event: { data: number; target: YoutubePlayer }) => void;
      };
    },
  ) => YoutubePlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

declare global {
  interface Window {
    YT?: YoutubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let iframeApiPromise: Promise<YoutubeNamespace> | null = null;

/** Load the official YouTube IFrame API once per page. */
export function loadYoutubeIframeApi(): Promise<YoutubeNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API requires a browser"));
  }
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (iframeApiPromise) return iframeApiPromise;

  iframeApiPromise = new Promise((resolve, reject) => {
    const finish = () => {
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YouTube API failed to load"));
    };

    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prior?.();
      finish();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      tag.onerror = () => {
        iframeApiPromise = null;
        reject(new Error("YouTube API script error"));
      };
      document.head.appendChild(tag);
    } else if (window.YT?.Player) {
      finish();
    }
  });

  return iframeApiPromise;
}
