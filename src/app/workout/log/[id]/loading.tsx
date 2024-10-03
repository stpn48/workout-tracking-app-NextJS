import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="main-bg fixed inset-0 min-h-screen w-screen overflow-scroll p-4 text-white">
      <div className="flex flex-col gap-1">
        <div className="h-[19px] w-[100px] animate-pulse rounded-sm bg-stone-700" />
        <div className="h-[42px] w-[200px] animate-pulse rounded-sm bg-stone-700" />
      </div>
      <div className="mt-20 flex w-full justify-center">
        <LoadingSpinner />
      </div>

      <div className="absolute bottom-4 right-4 h-[32px] w-[58px] animate-pulse rounded-sm bg-stone-700" />
    </div>
  );
}
