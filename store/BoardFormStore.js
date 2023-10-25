import { create } from "zustand";

export const useBoardFormStore = create((set) => ({
  isOpen: false,
  boardFormState: "",
  setboardState: (value) => set({ boardFormState: value }),
  closeForm: () => set({ isOpen: false }),
  openForm: () => set({ isOpen: true }),
  boardLists: null,
  boardTodos: null,
  updateBoardLists: (value) => set({ boardLists: value }),
  updateBoardTodos: (value) => set({ boardTodos: value }),
}));
