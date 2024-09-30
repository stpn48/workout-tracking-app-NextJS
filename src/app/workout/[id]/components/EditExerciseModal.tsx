"use client";

import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseDetails } from "@/hooks/useExerciseDetails";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { updateExerciseDetails } from "@/app/actions/updateExerciseDetails";
import { ExerciseModal } from "./ExerciseModal";
import { SetDetails } from "@/types/type";
import { ModalBackDrop } from "@/app/components/ModalBackdrop";
import { ModalBody } from "@/app/components/ModalBody";

type Props = {
  workoutId: string;
  exerciseId: string;
};

export function EditExerciseModal({ exerciseId, workoutId }: Props) {
  const { showEditExerciseModal, setShowEditExerciseModal } = useModalVisibilityStore();

  const queryClient = useQueryClient();

  const [initialSets, setInitialSets] = useState<SetDetails[]>([]);

  const [updatingExercise, startUpdatingExercise] = useTransition();

  const { data: exerciseDetails, isLoading } = useExerciseDetails({
    exerciseId,
    workoutId,
    onSuccess: () => setInitialSets(exerciseDetails!.sets),
  });

  const handleUpdateExercise = useCallback((formData: FormData, sets: SetDetails[]) => {
    const name = formData.get("name") as string;

    if (!name || sets.length <= 0) {
      toast.error("Please enter a name for the exercise");
      return;
    }

    startUpdatingExercise(async () => {
      try {
        await updateExerciseDetails(exerciseId, workoutId, name, sets);
        queryClient.invalidateQueries({
          queryKey: ["workoutExercises", { workoutId }],
        });

        toast.success("Exercise updated successfully");
        setShowEditExerciseModal(false);
      } catch (e) {
        toast.error("Failed to update exercise");
      }
    });
  }, []);

  if (!showEditExerciseModal) {
    return null;
  }

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
      isPending={updatingExercise}
      submitFn={handleUpdateExercise}
      closeModal={() => setShowEditExerciseModal(false)}
    />
  );
}
