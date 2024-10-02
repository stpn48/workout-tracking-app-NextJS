import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <LoadingSpinner />
    </div>
  );
}
