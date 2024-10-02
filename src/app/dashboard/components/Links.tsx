"use client";

import { H1 } from "@/app/components/H1";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export function Links({}: Props) {
  const pathname = usePathname();

  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    if (pathname === "/dashboard") {
      setActive(1);
    } else if (pathname === "/dashboard/completedExercises") {
      setActive(2);
    } else if (pathname === "/dashboard/completedWorkouts") {
      setActive(3);
    }
  }, []);

  return (
    <div className="flex gap-4">
      <Link href="/dashboard" onClick={() => setActive(1)}>
        <H1 className={`${active !== 1 && "text-[#313131]"}`}>Your Workouts</H1>
      </Link>
      <Link href="/dashboard/completedExercises" onClick={() => setActive(2)}>
        <H1 className={`${active !== 2 && "text-[#313131]"}`}>Completed Exercises</H1>
      </Link>
      <Link href="/dashboard/completedWorkouts" onClick={() => setActive(3)}>
        <H1 className={`${active !== 3 && "text-[#313131]"}`}>Completed Workouts</H1>
      </Link>
    </div>
  );
}
