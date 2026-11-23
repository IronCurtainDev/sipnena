import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  aspectRatio?: string;
}

export function AnimatedStudentsScene({
  className = "",
  aspectRatio = "aspect-video",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (media.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else if (video.paused) {
        void video.play().catch(() => undefined);
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-100 ${aspectRatio} flex items-center justify-center select-none shadow-xs ${className}`}
    >
      <video
        ref={videoRef}
        src="/videos/students-studying.mp4"
        autoPlay
        loop
        muted
        playsInline
        data-respect-reduced-motion
        className="w-full h-full object-cover select-none"
        aria-label="Students studying"
      />
    </div>
  );
}
