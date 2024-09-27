"use client";

import { useModalVisibilityStore } from "@/store/modalVisibilityStore";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function WorkoutDetailsModalVisibility({ children }: Props) {
  const { editWorkoutModalVisible } = useModalVisibilityStore();

  return <>{editWorkoutModalVisible && children}</>;
}
