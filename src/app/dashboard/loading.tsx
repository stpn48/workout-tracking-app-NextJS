import React from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <LoadingSpinner />
    </div>
  );
}
