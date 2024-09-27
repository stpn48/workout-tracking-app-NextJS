"use client";

import { useModalVisibilityStore } from "@/store/modalVisiblityStore";
import React from "react";
import { EditWorkoutModal } from "./EditWorkoutModal";

export function EditWorkoutModalVisibility() {
  const { editWorkoutModalVisible } = useModalVisibilityStore();

  return <>{editWorkoutModalVisible && <EditWorkoutModal />}</>;
}
