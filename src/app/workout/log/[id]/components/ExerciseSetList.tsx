"use client";

import { Set } from "@prisma/client";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  sets: Set[];
  addEffort: (setId: string, effort: number) => void;
  removeEffort: (setId: string) => void;
};

export function ExerciseSetList({ sets, addEffort, removeEffort }: Props) {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setId: string) => {
      if (!e.target.value) {
        toast.success("Removing effort");
        removeEffort(setId);
        return;
      }

      addEffort(setId, Number(e.target.value));
    },
    [addEffort],
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
            onChange={(event) => handleOnChange(event, set.id)}
            type="text"
            className="w-[50px] bg-inherit text-center text-lg outline-none"
            placeholder="8"
          />
        </div>
      ))}
    </div>
  );
}
