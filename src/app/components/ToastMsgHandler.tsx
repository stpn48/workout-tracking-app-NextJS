"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  msg: string;
  type: "success" | "error";
};

export function ToastMsgHandler({ msg, type }: Props) {
  useEffect(() => {
    if (msg) {
      switch (type) {
        case "success":
          toast.success(msg);
          break;
        case "error":
          toast.error(msg);
          break;
      }
    }
  }, [msg]);

  return null;
}
