import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <LoadingSpinner />
    </div>
  );
}
