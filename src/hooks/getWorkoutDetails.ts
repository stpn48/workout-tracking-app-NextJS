"use client";

import { findWorkoutDetails } from "@/app/actions/findWorkoutDetails";
import { WorkoutDetails } from "@/types/type";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export function getWorkoutDetails(workoutId: string | null, editWorkoutModalVisible: boolean) {
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails | null>(null);
  const [gettingWorkoutDetails, startGettingWorkoutDetails] = useTransition();

  useEffect(() => {
    if (!workoutId || !editWorkoutModalVisible) {
      return;
    }

    toast.loading("Fetching workout details...");

    startGettingWorkoutDetails(async () => {
      const { data, error } = await findWorkoutDetails(workoutId);

      if (error || !data) {
        toast.error(error || "Failed to fetch workout details");
        return;
      }

      toast.dismiss();

      toast.success("Workout details fetched successfully");
      setWorkoutDetails(data);
    });
  }, [workoutId, editWorkoutModalVisible]);

  return { workoutDetails, gettingWorkoutDetails };
}
