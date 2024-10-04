import { CompletedExercisesList } from "./components/CompletedExercisesList";
import { getCompletedExercises } from "@/app/actions/getCompletedExercises";
import React from "react";

export default async function CompletedExercisesPage() {
  const completedExercises = await getCompletedExercises();

  return <CompletedExercisesList completedExercises={completedExercises} />;
}
