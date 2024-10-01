import { Input } from "@/app/components/Input";
import { ExerciseDetails } from "@/types/type";
import React from "react";
import ExerciseCard from "./ExerciseCard";

type Props = {
  exercises: ExerciseDetails[];
};

export function ExerciseList({ exercises }: Props) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* TODO: make this into separate component and improve design */}
      {exercises.length === 0 && <p>No exercises found</p>}
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
