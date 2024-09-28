"use client";

import { Button } from "@/app/components/Button";
import { Workout } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  workout: Workout;
};

export function WorkoutCard({ workout }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/workout/${workout.id}`)}
      className="main-border-color secondary-bg relative flex w-[300px] flex-col gap-1 rounded-lg border p-4"
    >
      <div className="flex flex-col">
        <h1 className="text-base">{workout.name}</h1>
        <p className="text-secondary">{workout.description}</p>
      </div>
      <p>{workout.estimated_time} min</p>
      <Button className="absolute bottom-4 right-4">Log</Button>
    </div>
  );
}
