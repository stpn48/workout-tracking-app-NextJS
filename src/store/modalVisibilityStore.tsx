import { create } from "zustand";

type Store = {
  showCreateWorkoutModal: boolean;
  setShowCreateWorkoutModal: (val: boolean) => void;

  showAddExerciseModal: boolean;
  setShowAddExerciseModal: (val: boolean) => void;

  showEditWorkoutDetailsModal: boolean;
  setEditWorkoutDetailModal: (val: boolean) => void;
};
export const useModalVisibilityStore = create<Store>((set) => ({
  showCreateWorkoutModal: false,
  setShowCreateWorkoutModal: (val) => set({ showCreateWorkoutModal: val }),

  showAddExerciseModal: false,
  setShowAddExerciseModal: (val) => set({ showAddExerciseModal: val }),

  showEditWorkoutDetailsModal: false,
  setEditWorkoutDetailModal: (val) => set({ showEditWorkoutDetailsModal: val }),
}));
