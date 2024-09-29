import { create } from "zustand";

type Store = {
  showCreateWorkoutModal: boolean;
  setShowCreateWorkoutModal: (val: boolean) => void;

  showAddExerciseModal: boolean;
  setShowAddExerciseModal: (val: boolean) => void;

  showEditWorkoutDetailsModal: boolean;
  setShowEditWorkoutDetailModal: (val: boolean) => void;

  showEditSetModal: boolean;
  setShowEditSetModal: (val: boolean) => void;

  showEditExerciseModal: boolean;
  setShowEditExerciseModal: (val: boolean) => void;
};
export const useModalVisibilityStore = create<Store>((set) => ({
  showCreateWorkoutModal: false,
  setShowCreateWorkoutModal: (val) => set({ showCreateWorkoutModal: val }),

  showAddExerciseModal: false,
  setShowAddExerciseModal: (val) => set({ showAddExerciseModal: val }),

  showEditWorkoutDetailsModal: false,
  setShowEditWorkoutDetailModal: (val) => set({ showEditWorkoutDetailsModal: val }),

  showEditSetModal: false,
  setShowEditSetModal: (val) => set({ showEditSetModal: val }),

  showEditExerciseModal: false,
  setShowEditExerciseModal: (val) => set({ showEditExerciseModal: val }),
}));
