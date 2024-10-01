"use client";

import { Set } from "@prisma/client";
import React, { useCallback } from "react";

type Props = {
  sets: Set[];
  pushEffort: (effort: number) => void;
};

export function ExerciseSetList({ sets, pushEffort }: Props) {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      pushEffort(Number(e.target.value));
    },
    [pushEffort],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="text-secondary flex justify-between text-xs font-bold uppercase">
        <h1>SET NAME:</h1>
        <h1>YOUR EFFORT:</h1>
      </div>
      {sets.map((set) => (
        <div className="secondary-bg flex justify-between rounded-lg px-2 py-1" key={set.id}>
          <div>
            <h1>{set.name}</h1>
            <h1>goal reps: {set.reps}</h1>
          </div>
          <input
            onChange={handleOnChange}
            type="text"
            className="w-[50px] bg-inherit text-center text-lg outline-none"
            placeholder="8"
          />
        </div>
      ))}
    </div>
  );
}
