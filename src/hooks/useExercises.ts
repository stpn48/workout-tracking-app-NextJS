"use client";

import { getWorkoutExercises } from "@/app/actions/getWorkoutExercises";
import { useQuery } from "@tanstack/react-query";

export function useExercises(workoutId: string) {
  return useQuery({
    queryKey: ["workoutExercises", { workoutId }],
    queryFn: () => getWorkoutExercises(workoutId),
  });
}
