import { describe, it, expect } from "vitest";
import { useStoreZustand } from "./../zustand-store";

const course = {
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
};
const initialState = useStoreZustand.getState();
describe("Zustand store", () => {
  beforeEach(() => {
    useStoreZustand.setState(initialState);
  });
  it("should be able to ss", () => {
    const { play } = useStoreZustand.getState();

    play([1, 2]);

    const { currentLessonIndex, currentModuleIndex } =
      useStoreZustand.getState();
    expect(currentModuleIndex).to.equal(1);
    expect(currentLessonIndex).to.equal(2);
  });

  it("should be able to play next video automatically", () => {
    useStoreZustand.setState({ course });

    const { currentLessonIndex, currentModuleIndex } =
      useStoreZustand.getState();

    const { playNext } = useStoreZustand.getState();
    playNext();

    expect(currentModuleIndex).to.equal(0);
    expect(currentLessonIndex).to.equal(0);
  });
});
