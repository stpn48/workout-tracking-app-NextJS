import { Workout } from "@prisma/client";
import React from "react";
import { WorkoutCard } from "./WorkoutCard";
import Image from "next/image";

type Props = {
  workouts: Workout[];
};

export function WorkoutCardList({ workouts }: Props) {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      {workouts.length === 0 && (
        <>
          <Image
            className="absolute right-[150px] top-[40px] rotate-6"
            alt="arrowImg"
            src={"/arrowImg.png"}
            width={320}
            height={320}
          />
          <p className="text-secondary mt-[80px] flex w-full justify-center text-xs">
            You have no created workouts yet. Stat here
          </p>
        </>
      )}
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
