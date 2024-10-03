"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ExerciseCard } from "./ExerciseCard";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import toast from "react-hot-toast";
import { useExercises } from "@/hooks/useExercises";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import { EditExerciseModal } from "./EditExerciseModal";

const MemoExerciseCard = React.memo(ExerciseCard);

type Props = {
  workoutId: string;
};

export default function ExerciseList({ workoutId }: Props) {
  const { showEditExerciseModal, setShowEditExerciseModal } = useModalVisibilityStore();

  const {
    data: exercises,
    error,
    isLoading,
    isSuccess,
    isRefetching,
    isFetching,
  } = useExercises(workoutId);

  const [currEditingExerciseId, setCurrEditingExerciseId] = useState<string | null>(null);

  const handleCardClick = useCallback((exerciseId: string) => {
    setShowEditExerciseModal(true);
    setCurrEditingExerciseId(exerciseId);
  }, []);

  if (error) {
    toast.error(`Failed to load exercises ${error.message}`);
    return null;
  }

  if (isLoading || isRefetching || !isSuccess || isFetching) {
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
        {exercises.map((exercise, exerciseIndex) => (
          <MemoExerciseCard
            order={exerciseIndex + 1}
            key={exercise.id}
            exercise={exercise}
            onClick={() => handleCardClick(exercise.id)}
          />
        ))}
      </div>

      {showEditExerciseModal && (
        <EditExerciseModal exerciseId={currEditingExerciseId!} workoutId={workoutId} />
      )}
    </>
  );
}
