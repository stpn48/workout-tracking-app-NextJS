"use client";

import React, { useCallback, useOptimistic, useState } from "react";
import { ExerciseCard } from "./ExerciseCard";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import toast from "react-hot-toast";
import { useExercises } from "@/hooks/useExercises";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import { EditExerciseModal } from "./EditExerciseModal";
import { ExerciseDetails } from "@/types/type";
import { AddExerciseModal } from "./AddExerciseModal";

type Props = {
  workoutId: string;
};

export default function ExerciseList({ workoutId }: Props) {
  const { showEditExerciseModal, setShowEditExerciseModal, showAddExerciseModal } =
    useModalVisibilityStore();

  const { data: exercises, error, isLoading, isSuccess } = useExercises(workoutId);

  const [optimisticExercises, addOptimisticExercise] = useOptimistic(
    exercises || [],
    (state, newExercise: ExerciseDetails) => {
      return [...state, newExercise];
    },
  );

  const [currEditingExerciseId, setCurrEditingExerciseId] = useState<string | null>(null);

  const handleCardClick = useCallback(
    (exerciseId: string) => {
      setShowEditExerciseModal(true);
      setCurrEditingExerciseId(exerciseId);
    },
    [setCurrEditingExerciseId, setShowEditExerciseModal],
  );

  if (error) {
    toast.error(`Failed to load exercises ${error.message}`);
    return null;
  }

  if (isLoading || !isSuccess) {
    return (
      <div className="mt-20 flex w-full justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-4">
        {exercises.length === 0 && (
          <p className="text-secondary flex w-full justify-center text-xs">
            No exercises. Add some
          </p>
        )}
        {optimisticExercises.map((exercise, exerciseIndex) => (
          <ExerciseCard
            order={exerciseIndex + 1}
            key={exercise.id}
            exercise={exercise}
            onClick={() => handleCardClick(exercise.id)}
          />
        ))}
      </div>

      {showAddExerciseModal && (
        <AddExerciseModal addOptimisticExercise={addOptimisticExercise} workoutId={workoutId} />
      )}

      {showEditExerciseModal && (
        <EditExerciseModal exerciseId={currEditingExerciseId!} workoutId={workoutId} />
      )}
    </>
  );
}
