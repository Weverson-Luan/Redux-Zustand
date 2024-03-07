import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../http/axios";

import { useAppSelector } from "../../redux-store";

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
};

const initialState: IPlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: true,
};

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get(`courses/1`);

  return response.data;
});
export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    playNext: (state) => {
      //pegando indice da aula atual
      const nextLessonIndex = state.currentLessonIndex + 1;

      //verificar se exite uma proxima lesson
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
        return;
      }

      if (!nextLesson) {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
          return;
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.course = action.payload;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, playNext } = playerSlice.actions;

//hook

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;

    const currentModule = state.player.course?.modules[currentModuleIndex];

    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentLesson, currentModule };
  });
};
