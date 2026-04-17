import { Link } from "wouter";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-shadow">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              ARJECT
              <span className="text-cyan-400 italic font-medium ml-1 text-sm">ECOSYSTEM</span>
            </span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/ecosystem">
            <a className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</a>
          </Link>
          <Link href="/ecosystem/network">
            <a className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Network</a>
          </Link>
        </nav>

        <Link href="/ecosystem/register">
          <a className="px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Explore Now
          </a>
        </Link>
      </div>
    </header>
  );
}
