import { useEffect } from "react";

import { MessageCircle } from "lucide-react";

import { Header } from "../../components/header";
import { Video } from "../../components/video";
import { Module } from "../../components/module";

import { useCurrentLesson, useStoreZustand } from "../../zustand-store";

// redux
// import { useAppDispatch, useAppSelector } from "../../redux-store";
// import { loadCourse, useCurrentLesson } from "../../features/player/slice";

export function Player() {
  // const dispatch = useAppDispatch();
  const { course, load } = useStoreZustand();

  const { currentLesson } = useCurrentLesson();

  // const modules = useAppSelector((state) => {
  //   return state.player.course?.modules;
  // });

  const getData = async () => {
    await load();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo ${currentLesson?.title}`;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gab-6">
        <div className="flex items-center justify-between pb-4">
          {/**HEADER */}
          <Header />

          {/**ACTIONS */}
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        {/**MAIN APP */}
        <main className="flex relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          {/**MODULOS */}
          <aside className="w-80 absolute divide-y-2 divide-zinc-900 top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {/**MODULOS ONE */}
            {course?.modules?.length &&
              course?.modules?.map((module, index) => (
                <Module
                  key={String(module?.id)}
                  title={module?.title}
                  moduleIndex={index}
                  amountOfLessons={module?.lessons?.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
