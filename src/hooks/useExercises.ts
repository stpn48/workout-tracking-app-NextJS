"use client";

import { getWorkoutExercises } from "@/app/actions/getWorkoutExercises";
import { useQuery } from "@tanstack/react-query";

export function useExercises(workoutId: string) {
  return useQuery({
    queryKey: ["workoutExercises", { workoutId }],
    queryFn: () => getWorkoutExercises(workoutId),
    staleTime: 5 * 60 * 1000, // 5 minutes of freshness (adjust as needed)
    refetchOnWindowFocus: false, // Disable refetching on window focus
    refetchOnMount: false, // Prevent refetching when remounting
    refetchOnReconnect: true, // Optional, only refetch when reconnecting to the internet
  });
}
