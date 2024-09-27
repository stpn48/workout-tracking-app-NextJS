import React from "react";
import { EditWorkoutModal } from "./EditWorkoutModal";
import { findWorkoutDetails } from "@/app/actions/findWorkoutDetails";

export async function WorkoutDetailsProvider() {
  //TODO: Get workout details on server, pass search params from parent page

  //Add better error handling

  const workoutDetails = await findWorkoutDetails(workoutId);

  return <EditWorkoutModal workoutDetails={workoutDetails} />;
}
