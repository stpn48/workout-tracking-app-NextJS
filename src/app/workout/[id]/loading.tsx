import React from "react";

export default function loading() {
  return (
    <div className="main-bg fixed inset-0 min-h-screen w-screen overflow-scroll p-4 text-white">
      <div className="flex flex-col gap-3">
        <div className="h-5 w-[100px] animate-pulse rounded-md bg-stone-700" />
        <div className="h-7 w-[200px] animate-pulse rounded-md bg-stone-700" />
        <div className="h-5 w-[200px] animate-pulse rounded-md bg-stone-700" />
      </div>

      <div className="absolute right-4 top-4 flex gap-2">
        <div className="h-7 w-[150px] animate-pulse rounded-sm bg-stone-700" />
        <div className="h-7 w-[100px] animate-pulse rounded-sm bg-stone-700" />
      </div>
    </div>
  );
}
