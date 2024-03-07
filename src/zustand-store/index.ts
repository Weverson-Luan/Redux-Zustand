import { create } from "zustand";
import { api } from "../http/axios";

type ICourse = {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
};
export type IPlayerState = {
  currentModuleIndex: number;
  currentLessonIndex: number;
  course: ICourse | null;
  isLoading: boolean;

  // metodos
  play: (moduleAndLessonIndex: [number, number]) => void;
  playNext: () => void;
  load: () => Promise<void>;
};

// criando a store do zustand
export const useStoreZustand = create<IPlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    load: async () => {
      set({
        isLoading: true,
      });
      const response = await api.get(`courses/1`);

      return set({
        course: response.data,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;
      // atualizando o estado dentro da loja
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },

    playNext: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();
      //pegando indice da aula atual
      const nextLessonIndex = currentLessonIndex + 1;

      //verificar se exite uma proxima lesson
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
        return;
      }

      if (!nextLesson) {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          });

          return;
        }
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStoreZustand((state) => {
    const { currentModuleIndex, currentLessonIndex } = state;

    const currentModule = state.course?.modules[currentModuleIndex];

    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentLesson, currentModule };
  });
};
