"use client";

import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  options: string[];
  value: string;
  id?: string;
};

export function Select({ className, options, value: initialValue, id }: Props) {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <select
      id={id}
      value={value}
      onChange={handleOnChange}
      className={twMerge("main-border-color rounded-md border bg-black p-1 text-sm", className)}
    >
      {options.map((option) => (
        <option key={option} value={option} className="main-border-color flex justify-center border-b border-t bg-black">
          {option}
        </option>
      ))}
    </select>
  );
}
