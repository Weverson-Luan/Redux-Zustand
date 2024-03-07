import { useCurrentLesson, useStoreZustand } from "../../zustand-store";

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson();
  const { isLoading } = useStoreZustand();

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gab-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo "{currentModule?.title}"
      </span>
    </div>
  );
}
