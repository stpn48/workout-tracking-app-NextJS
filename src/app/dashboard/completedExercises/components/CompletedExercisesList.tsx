import { CompletedExercise } from "@prisma/client";
import React from "react";
import { CompletedExerciseCard } from "./CompletedExerciseCard";
import prisma from "@/lib/prisma";

type Props = {
  completedExercises: CompletedExercise[];
};

export async function CompletedExercisesList({ completedExercises }: Props) {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      {completedExercises.length === 0 && (
        <p className="text-secondary flex w-full justify-center text-xs">
          You hasn't completed any exercise yet.
        </p>
      )}
      {completedExercises.map((completedExercise, i) => {
        return <CompletedExerciseCard completedExercise={completedExercise} />;
      })}
    </div>
  );
}
