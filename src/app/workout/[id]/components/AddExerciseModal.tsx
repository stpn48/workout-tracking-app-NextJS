"use client";

import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";
import { createExercise } from "@/app/actions/createExercise";
import { useQueryClient } from "@tanstack/react-query";
import { ExerciseModal } from "./ExerciseModal";
import { SetDetails } from "@/types/type";

type Props = {
  workoutId: string;
};

export function AddExerciseModal({ workoutId }: Props) {
  const { showAddExerciseModal, setShowAddExerciseModal } = useModalVisibilityStore();

  const queryClient = useQueryClient();

  const [creatingExercise, startCreatingExercise] = useTransition();

  const handleAddExercise = useCallback(
    (formData: FormData, sets: SetDetails[]) => {
      const name = formData.get("name") as string;

      if (!name || sets.length <= 0) {
        console.log(name, sets);
        toast.error("Please fill out all fields");
        return;
      }

      startCreatingExercise(async () => {
        const { error } = await createExercise(name, sets, workoutId);

        if (error) {
          toast.error(error);
          return;
        }
        // invalidate the query to refetch the exercises
        queryClient.invalidateQueries({
          queryKey: ["workoutExercises", { workoutId }],
        });

        toast.success("Exercise created successfully");
        setShowAddExerciseModal(false);
      });
    },
    [queryClient, workoutId, setShowAddExerciseModal],
  );

  if (!showAddExerciseModal) {
    return null;
  }

  //TODO: Add a confirmation modal when the user tries to close the modal and has unsaved changes

  return (
    <ExerciseModal
      workoutId="workoutId"
      exerciseId="exerciseId"
      closeModal={() => setShowAddExerciseModal(false)}
      isPending={creatingExercise}
      submitFn={handleAddExercise}
      title="Add Exercise"
      finalButtonText="Add Exercise"
    />
  );
}
