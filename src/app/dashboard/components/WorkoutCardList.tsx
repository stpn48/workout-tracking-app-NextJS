"use client";

import { Workout } from "@prisma/client";
import React, { useState } from "react";
import { WorkoutCard } from "./WorkoutCard";
import Image from "next/image";
import { useOptimistic } from "react";
import { CreateWorkoutModal } from "./CreateWorkoutModal";
import { useModalVisibilityStore } from "@/store/modalVisibilityStore";

type Props = {
  workouts: Workout[];
};

export function WorkoutCardList({ workouts }: Props) {
  const { showCreateWorkoutModal, setShowCreateWorkoutModal } = useModalVisibilityStore();

  const [optimisticWorkouts, addOptimisticWorkout] = useOptimistic(
    workouts,
    (state, newWorkout: Workout) => {
      return [...state, newWorkout];
    },
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-4">
        {optimisticWorkouts.length === 0 && (
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
        {optimisticWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
      {showCreateWorkoutModal && (
        <CreateWorkoutModal
          addOptimisticWorkout={addOptimisticWorkout}
          closeModal={() => setShowCreateWorkoutModal(false)}
        />
      )}
    </>
  );
}
