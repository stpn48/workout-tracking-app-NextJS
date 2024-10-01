import { SetDetails } from "@/types/type";
import React from "react";
import { Set } from "@prisma/client";
import { Input } from "@/app/components/Input";

type Props = {
  set: Set;
};

export function SetCard({ set }: Props) {
  return (
    <div>
      <h1>{set.name}</h1>
      <p>Goal Reps: {set.reps}</p>

      <div className="flex flex-col gap-1">
        <label className="text-secondary" htmlFor="user-effort">
          Your Effort:
        </label>
        <Input placeholder="Enter your effort" id="user-effort" />
      </div>
    </div>
  );
}
