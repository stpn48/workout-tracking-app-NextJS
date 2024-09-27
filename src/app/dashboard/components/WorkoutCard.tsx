import { Workout } from "@prisma/client";
import React from "react";

type Props = {
  workout: Workout;
};

export function WorkoutCard({ workout }: Props) {
  return (
    <div className="main-border-color secondary-bg flex w-[300px] flex-col gap-1 rounded-lg border p-4">
      <h1 className="text-base">{workout.name}</h1>
      <p>{workout.description}</p>
      <p>{workout.estimated_time}</p>
      <p>{workout.difficulty}</p>
    </div>
  );
}
