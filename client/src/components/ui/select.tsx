import * as React from "react";

export function Select({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function SelectTrigger({ children, className = "" }: { children: React.ReactNode; className?: string }) { 
  return <div className={`flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ${className}`}>{children}</div>; 
}
export function SelectValue({ placeholder }: { placeholder?: string }) { return <span>{placeholder}</span>; }
export function SelectContent({ children }: { children: React.ReactNode }) { return <div className="bg-[#0f172a] border border-white/10 rounded-md p-1 mt-1">{children}</div>; }
export function SelectItem({ children, value }: { children: React.ReactNode; value: string }) { 
  return <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-white/5 text-slate-200">{children}</div>; 
}
