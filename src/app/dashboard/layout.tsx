import React from "react";

import { Links } from "./components/Links";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="main-bg fixed inset-0 min-h-screen w-screen p-5">
      <Links />
      {children}
    </div>
  );
}
