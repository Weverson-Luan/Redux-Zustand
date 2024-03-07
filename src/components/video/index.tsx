import ReactPlayer from "react-player";
// import { playNext, useCurrentLesson } from "../../features/player/slice";
// import { useAppDispatch, useAppSelector } from "../../redux-store";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStoreZustand } from "../../zustand-store";

export function Video() {
  // const dispatch = useAppDispatch();
  const { playNext } = useStoreZustand();

  const { currentLesson } = useCurrentLesson();

  const isCourseLoading = useStoreZustand((state) => state.isLoading);

  const handleAutoPlay = () => {
    playNext();
  };

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          controls
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handleAutoPlay}
        />
      )}
    </div>
  );
}
