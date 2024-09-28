import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import React from "react";

export default function loading() {
  return (
    <div className="main-bg fixed inset-0 flex min-h-screen w-screen items-center justify-center p-4 text-white">
      <LoadingSpinner />
    </div>
  );
}
