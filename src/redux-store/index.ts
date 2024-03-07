import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { player } from "../features/player/slice";

// fatia (slice)

// minha loja redux com estatdo global
export const store = configureStore({
  reducer: {
    player: player,
  },
});

// // actions
// export const { addTodo } = todoSlice.actions;

// typings
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
