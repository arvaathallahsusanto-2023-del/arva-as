"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Network, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterStakeholder() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      cluster: formData.get("cluster"),
      institution: formData.get("institution"),
      role: formData.get("role"),
      contactEmail: formData.get("email"),
      bio: formData.get("bio"),
    };

    try {
      const res = await fetch("/api/ecosystem/stakeholders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal mendaftar");
      }
      
      setStatus("success");
      setTimeout(() => router.push("/ecosystem"), 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020409] text-white selection:bg-cyan-500/30 overflow-hidden font-sans relative flex items-center justify-center py-12 px-6">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="fixed top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Link href="/ecosystem">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Dashboard
          </button>
        </Link>

        <div className="bg-[#0a0f18]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Network className="w-48 h-48 text-cyan-400" />
          </div>

          <div className="relative z-10 mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4 tracking-widest uppercase">
              Join The Network
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">Registrasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Stakeholder</span></h1>
            <p className="text-gray-400">Daftarkan profil Anda untuk bergabung ke dalam hub kolaborasi Ekonomi Islam ARVAAS.</p>
          </div>

          {status === "success" && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl flex items-center gap-4 mb-8 text-emerald-400">
               <CheckCircle2 className="w-8 h-8 shrink-0" />
               <div>
                 <h3 className="font-bold text-lg">Pendaftaran Berhasil!</h3>
                 <p className="text-sm opacity-80">Profil Anda telah ditambahkan ke database. Mengalihkan kembali...</p>
               </div>
            </motion.div>
          )}

          {status === "error" && (
            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-center gap-3 mb-8 text-rose-400 text-sm">
               <AlertCircle className="w-5 h-5 shrink-0" /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-gray-400 font-semibold uppercase">Nama Lengkap</label>
                <input required name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors text-white" placeholder="Cth: Dr. Ahmad" />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-gray-400 font-semibold uppercase">Email Kontak</label>
                <input required type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors text-white" placeholder="email@contoh.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-gray-400 font-semibold uppercase">Klaster Ekosistem</label>
                <select required name="cluster" className="w-full bg-[#0a0f18] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer">
                  <option value="">Pilih Klaster...</option>
                  <option value="Akademisi">Akademisi (Peneliti/Mhs)</option>
                  <option value="Industri & Bisnis">Industri & Bisnis (Perbankan/Fintech)</option>
                  <option value="Regulator">Pemerintah & Regulator (OJK/BI)</option>
                  <option value="Masyarakat Sipil">Masyarakat Sipil (NGO/BAZNAS)</option>
                  <option value="Keuangan Sosial">Keuangan Sosial (Wakaf/Zakat)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-gray-400 font-semibold uppercase">Peran / Jabatan</label>
                <input required name="role" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors text-white" placeholder="Cth: Dosen / Direktur" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-wider text-gray-400 font-semibold uppercase">Asal Institusi</label>
              <input required name="institution" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors text-white" placeholder="Cth: Universitas Indonesia / Bank X" />
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-wider text-gray-400 font-semibold uppercase">Bidang Minat / Bio Singkat</label>
              <textarea name="bio" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-colors resize-none text-white" placeholder="Deskripsikan fokus riset atau bisnis Anda..." />
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                {status === "loading" ? "Menyimpan..." : "Kirim Pendaftaran"} <Send className="w-4 h-4 ml-1" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
