import { SetDetails } from "@/types/type";
import React from "react";

type Props = {
  sets: SetDetails[];
  handleSetClick: (setIndex: number) => void;
};

export function SetList({ sets, handleSetClick }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {sets.length === 0 && (
        <p className="text-secondary flex w-full justify-center text-sm">No sets added...</p>
      )}

      {sets.length > 0 && (
        <div className="text-secondary flex items-center justify-between gap-4 text-xs font-bold uppercase">
          <h1>SET NUMBER</h1>
          <h1>SET NAME</h1>
          <h1>REP COUNT</h1>
        </div>
      )}

      {sets.map((set, setIndex) => (
        <div
          key={set.name + setIndex.toString()}
          onClick={() => handleSetClick(setIndex)}
          className={`${setIndex % 2 === 0 ? "main-bg" : "secondary-bg"} flex cursor-pointer items-center justify-between rounded-lg px-4 py-2`}
        >
          <h1>{setIndex + 1}.</h1>
          <h1>{set.name}</h1>
          <p>{set.reps}</p>
        </div>
      ))}
    </div>
  );
}
