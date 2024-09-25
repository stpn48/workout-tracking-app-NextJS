import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function LoadingSpinner({ className }: Props) {
  return <div className={twMerge("h-4 w-4 animate-spin rounded-full border-t border-t-white", className)}></div>;
}
