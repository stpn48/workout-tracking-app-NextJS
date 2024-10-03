import { CompletedWorkout } from "@prisma/client";
import React from "react";

type Props = {
  completedWorkout: CompletedWorkout;
};

export function CompletedWorkoutCard({ completedWorkout }: Props) {
  return (
    <div className="main-border-color secondary-bg h-fit w-fit rounded-lg border p-4 text-sm">
      <h1 className="text-base">{completedWorkout.name}</h1>
      <p>times completed: {completedWorkout.timesCompleted}</p>
    </div>
  );
}
