import React from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <LoadingSpinner />
      <div className="absolute right-4 top-4 h-[28px] w-[116px] animate-pulse rounded-sm bg-stone-700" />
      <div className="absolute bottom-4 right-4 h-[28px] w-[71px] animate-pulse rounded-sm bg-stone-700" />
    </div>
  );
}
