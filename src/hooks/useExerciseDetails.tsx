"use client";

import { getExerciseDetails } from "@/app/actions/getExerciseDetails";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  exerciseId: string;
  workoutId: string;
  onSuccess: () => void;
};

export function useExerciseDetails({ exerciseId, workoutId, onSuccess }: Props) {
  const queryUtils = useQuery({
    queryKey: [
      "exerciseDetails",
      {
        exerciseId,
        workoutId,
      },
    ],
    queryFn: () => getExerciseDetails(exerciseId, workoutId),
  });

  useEffect(() => {
    if (queryUtils.isSuccess) {
      onSuccess();
    }
  }, [queryUtils.isSuccess]);

  return { ...queryUtils };
}
