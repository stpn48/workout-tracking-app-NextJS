import { create } from "zustand";

type Store = {
  createWorkoutModalVisible: boolean;
  setCreateWorkoutModalVisible: (val: boolean) => void;

  editWorkoutModalVisible: boolean;
  setEditWorkoutModalVisibilityVisible: (val: boolean) => void;
};
export const useModalVisibilityStore = create<Store>((set) => ({
  createWorkoutModalVisible: false,
  setCreateWorkoutModalVisible: (val) => set({ createWorkoutModalVisible: val }),

  editWorkoutModalVisible: false,
  setEditWorkoutModalVisibilityVisible: (val) => set({ editWorkoutModalVisible: val }),
}));
