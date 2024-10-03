import { CompletedExercisesList } from "./components/CompletedExercisesList";
import { getCompletedExercises } from "@/app/actions/getCompletedExercises";
import { ToastMsgHandler } from "@/app/components/ToastMsgHandler";
import React from "react";

export default async function CompletedExercisesPage() {
  let errorMessage = "";
  let completedExercises;

  try {
    completedExercises = await getCompletedExercises();
  } catch (e: unknown) {
    errorMessage = e as string;
    return;
  }

  return (
    <>
      {errorMessage && <ToastMsgHandler msg={errorMessage} type="error" />}
      <CompletedExercisesList completedExercises={completedExercises} />
    </>
  );
}
