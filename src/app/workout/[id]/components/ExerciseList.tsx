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

  const [exerciseCount, setExerciseCount] = useState(5);

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

  // TODO: move this into separate hook with the count mby
  useEffect(() => {
    if (isSuccess) {
      setExerciseCount(exercises!.length);
    }
  }, [isSuccess]);

  if (error) {
    toast.error(`Failed to load exercises ${error.message}`);
    return null;
  }

  if (isLoading || isRefetching || !isSuccess || exercises.length <= 0 || isFetching) {
    return (
      <div className="mt-8 flex flex-wrap gap-4">
        {Array(exerciseCount)
          .fill("")
          .map((_) => (
            <div className="main-border-color flex h-[150px] w-[250px] flex-col gap-4 rounded-lg border px-6 py-4">
              <div className="flex w-full justify-center">
                <div className="h-6 w-[80px] animate-pulse bg-stone-700" />
              </div>
              <div className="h-20 w-full animate-pulse bg-stone-700" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-4">
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
