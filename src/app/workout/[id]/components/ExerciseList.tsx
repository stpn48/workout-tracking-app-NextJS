"use client";

import React, { useCallback, useState } from "react";
import { ExerciseCard } from "./ExerciseCard";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import toast from "react-hot-toast";
import { useExercises } from "@/hooks/useExercises";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import { EditExerciseModal } from "./EditExerciseModal";

type Props = {
  workoutId: string;
};

export default function ExerciseList({ workoutId }: Props) {
  const { showEditExerciseModal, setShowEditExerciseModal } = useModalVisibilityStore();

  const { data: exercises, error, isLoading, isSuccess } = useExercises(workoutId);

  const [currEditingExerciseId, setCurrEditingExerciseId] = useState<string | null>(null);

  const handleCardClick = useCallback((exerciseId: string) => {
    setShowEditExerciseModal(true);
    setCurrEditingExerciseId(exerciseId);
  }, []);

  if (error) {
    toast.error(`Failed to load exercises ${error.message}`);
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!exercises) {
    return null;
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-4">
        {exercises.map((exercise) => (
          <ExerciseCard
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
