import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
};

export function Input({ className, name, type, onChange, placeholder, disabled }: Props) {
  return (
    <input
      type={type}
      className={twMerge(
        "main-border-color rounded-md border bg-inherit px-2 py-1 outline-none",
        className,
        disabled && "opacity-50",
        disabled && "cursor-not-allowed",
      )}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
