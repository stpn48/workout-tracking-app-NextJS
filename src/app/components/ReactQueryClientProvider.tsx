"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus globally
    },
  },
});

export function ReactQueryClientProvider({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
