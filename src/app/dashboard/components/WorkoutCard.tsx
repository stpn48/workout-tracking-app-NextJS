import { Workout } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  workout: Workout;
};

export function WorkoutCard({ workout }: Props) {
  return (
    <div className="main-border-color secondary-bg relative flex w-[300px] cursor-default flex-col gap-1 rounded-lg border p-4">
      <Link className="cursor-default" href={`/workout/${workout.id}`}>
        <div className="flex flex-col">
          <h1 className="text-base">{workout.name}</h1>
          <p className="text-secondary">{workout.description}</p>
        </div>
        <p>{workout.estimated_time} min</p>
      </Link>
      <Link
        className="absolute bottom-4 right-4 rounded-md bg-white px-2 py-1 text-black"
        href={`/workout/log/${workout.id}`}
      >
        Log
      </Link>
    </div>
  );
}
