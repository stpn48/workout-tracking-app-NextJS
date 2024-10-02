import { CompletedExercise } from "@prisma/client";
import React from "react";
import { CompletedExerciseCard } from "./CompletedExerciseCard";
import prisma from "@/lib/prisma";

type Props = {
  completedExercises: CompletedExercise[];
};

export async function CompletedExercisesList({ completedExercises }: Props) {
  const exerciseNames: string[] = [];
  for (let completedExercise of completedExercises) {
    const exercise = await prisma.exercise.findFirst({
      where: {
        id: completedExercise.exercise_id,
      },
    });

    if (!exercise) {
      throw new Error("THIS SHOULD(WILL) NEVER HAPPEN");
    }

    exerciseNames.push(exercise.name);
  }
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      {completedExercises.map((completedExercise, i) => {
        return (
          <CompletedExerciseCard
            exerciseName={exerciseNames[i]}
            completedExercise={completedExercise}
          />
        );
      })}
    </div>
  );
}
