import { PlayCircle, Video } from "lucide-react";

interface ILessonProps {
  title: string;
  duration: string;
  isCurrent?: boolean;
  onPlay: () => void;
}

export function Lesson({
  title,
  duration,
  isCurrent = false,
  onPlay,
}: ILessonProps) {
  return (
    <button
      data-active={isCurrent}
      onClick={onPlay}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100"
    >
      {isCurrent ? (
        <PlayCircle
          color={"rgb(52 211 153"}
          className="w-4 h-4 text-zinc-400"
        />
      ) : (
        <Video className="w-4 h-4 text-zinc-400" />
      )}
      <span>{title}</span>

      <span className="ml-auto font-mono text-zinc-500">{duration}</span>
    </button>
  );
}
