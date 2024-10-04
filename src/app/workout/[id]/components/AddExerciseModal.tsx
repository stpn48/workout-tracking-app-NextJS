"use client";

import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { createExercise } from "@/app/actions/createExercise";
import { useQueryClient } from "@tanstack/react-query";
import { ExerciseModal } from "./ExerciseModal";
import { ExerciseDetails, SetDetails } from "@/types/type";
import { Set } from "@prisma/client";

type Props = {
  workoutId: string;
  addOptimisticExercise: (newExercise: ExerciseDetails) => void;
};

export function AddExerciseModal({ workoutId, addOptimisticExercise }: Props) {
  const { setShowAddExerciseModal } = useModalVisibilityStore();

  const queryClient = useQueryClient();

  const handleAddExercise = useCallback(
    async (formData: FormData, sets: SetDetails[]) => {
      const name = formData.get("name") as string;

      if (!name || sets.length <= 0) {
        console.log(name, sets);
        toast.error("Please fill out all fields");
        return;
      }

      addOptimisticExercise({
        id: "optimistic",
        name,
        sets: sets as Set[],
        workout_id: workoutId,
        created_at: new Date(),
      });

      setShowAddExerciseModal(false);

      const { error } = await createExercise(name, sets, workoutId);

      if (error) {
        toast.error(error);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["workoutExercises", { workoutId }] });

      toast.success("Exercise created successfully");
    },
    [queryClient, workoutId, setShowAddExerciseModal, addOptimisticExercise],
  );

  return (
    <ExerciseModal
      workoutId="workoutId"
      exerciseId="exerciseId"
      closeModal={() => setShowAddExerciseModal(false)}
      submitFn={handleAddExercise}
      title="Add Exercise"
      finalButtonText="Add Exercise"
    />
  );
}
