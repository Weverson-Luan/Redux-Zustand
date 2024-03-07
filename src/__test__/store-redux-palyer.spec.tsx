import { describe, expect } from "vitest";
import {
  player as reducerPlayer,
  play,
  playNext,
  IPlayerState,
} from "../features/player/slice";

const mockDataState: IPlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: "Iniciando com NodeJs",
        lessons: [
          { id: "Jai8w6K_GnY", title: "Introdução", duration: "13:45" },
          {
            id: "w-DW4DhDfcw",
            title: "Estilização do Post",
            duration: "10:05",
          },
        ],
      },
      {
        id: 2,
        title: "JavaScript do Zero",
        lessons: [
          {
            id: "gE48FQXRZ_o",
            title: "Operadores lógicos",
            duration: "13:45",
          },
          {
            id: "Ng_Vk4tBl0g",
            title: "Condição ternária",
            duration: "10:05",
          },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
};
describe("player slice", () => {
  it("should be able to play", () => {
    const state = reducerPlayer(mockDataState, play([1, 2]));

    expect(state.currentModuleIndex).to.equal(1);
    expect(state.currentLessonIndex).to.equal(2);
  });

  it("should be able to play next video automatically", () => {
    const state = reducerPlayer(mockDataState, playNext());

    expect(state.currentModuleIndex).to.equal(0);
    expect(state.currentLessonIndex).to.equal(1);
  });

  it("should be able to jumo to next module automatically", () => {
    const newDataState = {
      ...mockDataState,
      currentLessonIndex: 1,
    };
    const state = reducerPlayer(newDataState, playNext());

    expect(state.currentModuleIndex).to.equal(1);
    expect(state.currentLessonIndex).to.equal(0);
  });
});
