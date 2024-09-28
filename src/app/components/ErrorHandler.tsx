"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  error: string | null;
};

export function ErrorHandler({ error }: Props) {
  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
  }, [error]);

  return null;
}
