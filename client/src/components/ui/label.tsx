import * as React from "react";

export function Label({ className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export function Table({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
    </div>
  );
}

export function TableHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <thead className={`[&_tr]:border-b border-white/10 ${className}`}>{children}</thead>;
}

export function TableBody({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>;
}

export function TableHead({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <th className={`h-12 px-4 text-left align-middle font-medium text-slate-400 [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>;
}

export function TableRow({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <tr className={`border-b border-white/10 transition-colors hover:bg-white/5 data-[state=selected]:bg-muted ${className}`}>{children}</tr>;
}

export function TableCell({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 text-slate-300 ${className}`}>{children}</td>;
}
