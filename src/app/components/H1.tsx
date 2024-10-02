import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function H1({ className, children }: Props) {
  return <h1 className={twMerge("text-[28px] font-bold text-white", className)}>{children}</h1>;
}
