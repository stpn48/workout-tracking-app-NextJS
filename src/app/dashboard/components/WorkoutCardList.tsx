import { Workout } from "@prisma/client";
import React from "react";
import { WorkoutCard } from "./WorkoutCard";

const MemoWorkoutCard = React.memo(WorkoutCard);

type Props = {
  workouts: Workout[];
};

export function WorkoutCardList({ workouts }: Props) {
  return (
    <div className="flex flex-wrap gap-4 pt-8">
      {workouts.map((workout) => (
        <MemoWorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
