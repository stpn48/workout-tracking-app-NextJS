"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  error: string | null;
  successMsg: string;
};

export function ErrorHandler({ error, successMsg }: Props) {
  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
  }, [error, successMsg]);

  return null;
}
