import { ExerciseDetails } from "@/types/type";
import React from "react";
import { SetCard } from "./SetCard";

type Props = {
  exercise: ExerciseDetails;
};

export default function ExerciseCard({ exercise }: Props) {
  return (
    <div>
      <h1>{exercise.name}</h1>
      <div>
        {exercise.sets.map((set) => (
          <SetCard key={set.id} set={set} />
        ))}
      </div>
    </div>
  );
}
