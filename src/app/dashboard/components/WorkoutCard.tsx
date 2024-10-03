import { Button } from "@/app/components/Button";
import { Workout } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  workout: Workout;
};

export function WorkoutCard({ workout }: Props) {
  return (
    <div className="main-border-color secondary-bg relative flex w-[300px] cursor-default flex-col gap-1 rounded-lg border p-4">
      <Link className="cursor-pointer" href={`/workout/${workout.id}`}>
        <div className="flex flex-col">
          <h1 className="text-base">{workout.name}</h1>
          <p className="text-secondary">{workout.description}</p>
        </div>
        <p>{workout.estimated_time} min</p>
      </Link>

      <Link className="absolute bottom-4 right-4" href={`/workout/log/${workout.id}`}>
        <Button>Log</Button>
      </Link>
    </div>
  );
}
