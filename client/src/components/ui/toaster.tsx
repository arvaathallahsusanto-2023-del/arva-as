import * as React from "react";

export function Toaster() {
  return <div id="toaster-root" />;
}

export function Toast({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
