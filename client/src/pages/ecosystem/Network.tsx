import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Network, ArrowLeft, Building2, Users, Search, Share2, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function NetworkExplorer() {
  const [filter, setFilter] = useState("All");
  
  const { data: stakeholders, isLoading } = useQuery({
    queryKey: ["eco-network"],
    queryFn: async () => {
      const res = await fetch("/api/ecosystem/network");
      if (!res.ok) throw new Error("Failed to fetch network");
      return res.json();
    },
  });

  const filtered = stakeholders?.filter((s: any) => filter === "All" || s.cluster === filter) || [];

  return (
    <div className="min-h-screen bg-[#020409] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans pb-24">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none grid-bg opacity-30" />
      <div className="fixed top-1/4 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#020409]/80 backdrop-blur-xl sticky top-0 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/ecosystem">
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Network Explorer</h1>
              <div className="flex items-center gap-2 text-xs text-cyan-400 opacity-80 mt-0.5">
                <Network className="w-3 h-3" /> Jaringan Stakeholder & Riset
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari institusi/nama..." className="bg-[#0a0f18] border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm w-64 focus:outline-none focus:border-cyan-500/50" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["All", "Akademisi", "Industri & Bisnis", "Regulator", "Keuangan Sosial", "Masyarakat Sipil"].map(c => (
            <button 
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${filter === c ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Network Grid View */}
        {isLoading ? (
          <div className="flex justify-center py-20 text-cyan-400 animate-pulse">Memuat Jaringan...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s: any, i: number) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0a0f18] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10">
                    {s.cluster === 'Akademisi' ? <BookOpen className="w-6 h-6 text-violet-400" /> : <Building2 className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
                    {s.cluster}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{s.name}</h3>
                <p className="text-gray-400 text-sm font-medium mb-4">{s.role} di {s.institution}</p>
                
                {s.bio && (
                  <p className="text-gray-500 text-xs line-clamp-2 mb-6 leading-relaxed">
                    "{s.bio}"
                  </p>
                )}

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 flex-1 text-xs text-gray-400">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" /> 
                    {s.researchWorks?.length || 0} Riset
                  </div>
                  <div className="w-px h-4 bg-white/10 mx-2" />
                  <div className="flex items-center gap-1.5 flex-1 justify-end text-xs text-gray-400">
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" /> 
                    {s.connectionsInitiated?.length || 0} Koneksi
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
