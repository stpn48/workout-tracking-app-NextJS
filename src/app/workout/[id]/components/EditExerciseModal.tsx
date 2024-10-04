"use client";

import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseDetails } from "@/hooks/useExerciseDetails";
import { updateExerciseDetails } from "@/app/actions/updateExerciseDetails";
import { ExerciseModal } from "./ExerciseModal";
import { ExerciseDetails, SetDetails } from "@/types/type";
import { ModalBackDrop } from "@/app/components/ModalBackDrop";
import { ModalBody } from "@/app/components/ModalBody";
import { Set } from "@prisma/client";

type Props = {
  workoutId: string;
  exerciseId: string;
  updateOptimisticExercise: (exerciseId: string, newData: ExerciseDetails) => void;
};

export function EditExerciseModal({ exerciseId, workoutId, updateOptimisticExercise }: Props) {
  const { setShowEditExerciseModal } = useModalVisibilityStore();

  const queryClient = useQueryClient();

  const [initialSets, setInitialSets] = useState<SetDetails[]>([]);

  const { data: exerciseDetails, isLoading } = useExerciseDetails({
    exerciseId,
    workoutId,
    onSuccess: () => setInitialSets(exerciseDetails!.sets),
  });

  const handleUpdateExercise = useCallback(
    async (formData: FormData, sets: SetDetails[]) => {
      const name = formData.get("name") as string;

      if (!name || sets.length <= 0) {
        toast.error("Please enter a name for the exercise");
        return;
      }

      const dupeSets = sets as Set[];

      updateOptimisticExercise(exerciseId, {
        id: exerciseId,
        name,
        workout_id: workoutId,
        sets: dupeSets,
        created_at: new Date(),
      });

      setShowEditExerciseModal(false);

      try {
        await updateExerciseDetails(exerciseId, workoutId, name, sets);
        queryClient.invalidateQueries({
          queryKey: ["workoutExercises", { workoutId }],
        });

        toast.success("Exercise updated successfully");
      } catch {
        toast.error("Failed to update exercise");
      }
    },
    [exerciseId, workoutId, queryClient, setShowEditExerciseModal, updateOptimisticExercise],
  );

  if (isLoading || !exerciseDetails || initialSets.length === 0) {
    return (
      <ModalBackDrop>
        <ModalBody className="relative h-[433px] w-[328px] p-10">
          <section className="flex flex-col gap-8">
            <div className="h-7 w-[200px] animate-pulse rounded-sm bg-stone-700" />
            <div className="flex flex-col gap-1">
              <div className="h-3 w-[100px] animate-pulse rounded-sm bg-stone-700" />
              <div className="h-7 w-full animate-pulse rounded-sm bg-stone-700" />
            </div>
            <div className="h-20 w-full animate-pulse rounded-sm bg-stone-700" />
            <div className="h-7 w-full animate-pulse rounded-sm bg-stone-700" />
            <div className="flex justify-center gap-2">
              <div className="h-7 w-[100px] animate-pulse rounded-sm bg-stone-700" />
              <div className="h-7 w-[100px] animate-pulse rounded-sm bg-stone-700" />
            </div>
          </section>
        </ModalBody>
      </ModalBackDrop>
    );
  }

  return (
    <ExerciseModal
      removeButton
      exerciseId={exerciseId}
      workoutId={workoutId}
      title="Edit Exercise"
      initialSets={initialSets}
      initialName={exerciseDetails.name}
      finalButtonText="Save"
      submitFn={handleUpdateExercise}
      closeModal={() => setShowEditExerciseModal(false)}
    />
  );
}
