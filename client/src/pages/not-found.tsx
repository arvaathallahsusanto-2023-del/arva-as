import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 bg-[#020617]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white tracking-tighter">404 Page Not Found</h1>
        <p className="text-slate-400">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link href="/">
          <a className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Back to Ecosystem
          </a>
        </Link>
      </div>
    </div>
  );
}
