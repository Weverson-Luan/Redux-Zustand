import { ChevronDown } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

import { Lesson } from "../lesson";
// import { useAppDispatch, useAppSelector } from "../../redux-store";
// import { play } from "../../features/player/slice";
import { useStoreZustand } from "../../zustand-store";

interface IModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ title, amountOfLessons, moduleIndex }: IModuleProps) {
  // const dispatch = useAppDispatch();
  const { currentLessonIndex, currentModuleIndex, play } = useStoreZustand();
  // selecionado aulas de cada modulo especifico
  const lessons = useStoreZustand((state) => {
    return state.course?.modules[moduleIndex].lessons;
  });

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex w-10 h-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="test-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-4 h-4 ml-auto text-zinc-400 group-data-[state=open]:rotate-180" />
      </Collapsible.Trigger>

      {/**NAVEGAÇÃO DA AULAS */}

      <Collapsible.Content>
        <nav className="flex flex-col relative gap-4 p-6">
          {lessons?.map((lesson, lessonIndex) => {
            const isCurrent =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex;
            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isCurrent={isCurrent}
                onPlay={() => play([moduleIndex, lessonIndex])}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
