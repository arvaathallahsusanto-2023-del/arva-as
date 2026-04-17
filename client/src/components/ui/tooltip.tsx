import * as React from "react";

// Minimal reproduction of TooltipProvider to fix build errors
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
