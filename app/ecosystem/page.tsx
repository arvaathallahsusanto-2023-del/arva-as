"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Network, Users, BookOpen, Activity, ChevronRight, Share2, Globe, Search } from "lucide-react";
import Link from "next/link";

export default function EcosystemDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["eco-stats"],
    queryFn: async () => {
      const res = await fetch("/api/ecosystem/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen bg-[#020409] text-white selection:bg-cyan-500/30 font-sans pb-24">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none grid-bg opacity-30" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#020409]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Network className="w-4 h-4 text-black" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-widest text-white">ARJECT</span>
              <span className="text-[10px] text-cyan-400 font-medium tracking-wider">ECOSYSTEM HUB</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/ecosystem/network" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Explorer</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-widest uppercase">
              <Activity className="w-3 h-3" /> Live Database
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">Stakeholder <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Dashboard</span></h1>
            <p className="text-gray-400 text-lg">Pusat data riset dan koneksi aktor Ekonomi Islam.</p>
          </div>
          
          <Link href="/ecosystem/register">
            <button className="mt-6 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center gap-2">
              <Users className="w-4 h-4" /> Daftar Stakeholder
            </button>
          </Link>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Stakeholders", value: stats?.totalStakeholders || 0, icon: Users, color: "text-cyan-400", glow: "from-cyan-500/20", border: "border-cyan-500/20" },
            { label: "Research Database", value: stats?.totalResearch || 0, icon: BookOpen, color: "text-violet-400", glow: "from-violet-500/20", border: "border-violet-500/20" },
            { label: "Established Connections", value: stats?.totalConnections || 0, icon: Share2, color: "text-emerald-400", glow: "from-emerald-500/20", border: "border-emerald-500/20" },
          ].map((stat, i) => (
             <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`relative p-6 rounded-3xl bg-[#0a0f18] border ${stat.border} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.glow} to-transparent opacity-50`} />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-6`} />
                <div>
                  <div className="text-5xl font-black mb-1">
                    {isLoading ? "..." : stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-500" />
             <div className="relative z-10">
               <Globe className="w-10 h-10 text-cyan-400 mb-6" />
               <h3 className="text-2xl font-bold mb-3">Network Explorer</h3>
               <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
                 Lihat visualisasi jaringan dan interkoneksi antara peneliti, hasil riset, dan pelaku industri Ekonomi Islam secara real-time.
               </p>
               <Link href="/ecosystem/network">
                 <button className="text-cyan-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                   Telusuri Jaringan <ChevronRight className="w-4 h-4" />
                 </button>
               </Link>
             </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors group relative overflow-hidden flex flex-col justify-end"
          >
             <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/5 transition-colors duration-500" />
             <div className="relative z-10">
               <Search className="w-10 h-10 text-violet-400 mb-6" />
               <h3 className="text-2xl font-bold mb-3">Pencarian Riset</h3>
               <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
                 Temukan paper penelitian, jurnal akademik, dan skripsi di dalam database repository riset Ekonomi Islam ARVAAS.
               </p>
               <button className="px-5 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 text-sm font-medium transition-colors">
                 Cari Publikasi (Coming Soon)
               </button>
             </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
