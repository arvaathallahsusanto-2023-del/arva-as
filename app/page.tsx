"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Library,
  Network,
  Globe,
  Scale,
  ArrowRight,
  BookOpen,
  Users,
  Landmark,
  Activity,
  Brain,
  ChevronRight,
  GraduationCap,
  Building2,
  Shield,
  Leaf,
  Star,
  TrendingUp,
  FileText,
} from "lucide-react";

// --- Data ---
const stakeholders = [
  {
    icon: GraduationCap,
    label: "Akademisi",
    desc: "Dosen, peneliti, dan mahasiswa S1–S3 bidang Ekonomi Islam",
    color: "text-cyan-400",
    glow: "group-hover:bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Building2,
    label: "Industri & Bisnis",
    desc: "Perbankan syariah, asuransi syariah, fintech halal, dan UMKM",
    color: "text-amber-400",
    glow: "group-hover:bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Landmark,
    label: "Pemerintah & Regulator",
    desc: "Kementerian, OJK, Bank Indonesia, BAZNAS, dan lembaga waqf",
    color: "text-emerald-400",
    glow: "group-hover:bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Shield,
    label: "Masyarakat Sipil",
    desc: "NGO, lembaga zakat, dan komunitas pemberdayaan ekonomi umat",
    color: "text-violet-400",
    glow: "group-hover:bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Globe,
    label: "Lembaga Internasional",
    desc: "IsDB, AAOIFI, IFSB, dan mitra riset global Ekonomi Islam",
    color: "text-blue-400",
    glow: "group-hover:bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Leaf,
    label: "Keuangan Sosial Islam",
    desc: "Ekosistem zakat, infaq, shadaqah, waqf produktif berbasis riset",
    color: "text-rose-400",
    glow: "group-hover:bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const stats = [
  { value: "500+", label: "Riset Skripsi & Disertasi" },
  { value: "120+", label: "Institusi Terhubung" },
  { value: "6", label: "Klaster Stakeholder" },
  { value: "15+", label: "Negara Terjangkau" },
];

const features = [
  {
    icon: Library,
    title: "Research Repository",
    desc: "Pangkalan data komprehensif riset skripsi dan disertasi Ekonomi Islam dari institusi unggulan di seluruh Indonesia dan dunia.",
    span: "md:col-span-2",
    color: "text-cyan-400",
    glow: "group-hover:bg-cyan-500/5",
  },
  {
    icon: Network,
    title: "Stakeholder Synergy",
    desc: "Hubungkan akademisi, regulator, dan praktisi industri melalui model jaringan dinamis berbasis riset.",
    span: "",
    color: "text-yellow-400",
    glow: "group-hover:bg-yellow-500/5",
  },
  {
    icon: Scale,
    title: "Islamic Framework",
    desc: "Dibangun di atas prinsip-prinsip Syariah dan model sosio-ekonomi Islam yang kuat untuk aplikasi lokal.",
    span: "",
    color: "text-emerald-400",
    glow: "group-hover:bg-emerald-500/5",
  },
  {
    icon: Globe,
    title: "Interconnected Impact",
    desc: "Terjemahkan temuan akademik menjadi keputusan kebijakan global dan struktur ekonomi Islam yang kokoh.",
    span: "md:col-span-2",
    color: "text-blue-400",
    glow: "group-hover:bg-blue-500/5",
  },
  {
    icon: Brain,
    title: "AI-Powered Mapping",
    desc: "Pemetaan koneksi antar penelitian menggunakan kecerdasan buatan untuk menemukan irisan dan potensi kolaborasi.",
    span: "",
    color: "text-violet-400",
    glow: "group-hover:bg-violet-500/5",
  },
];

const researchAreas = [
  { icon: TrendingUp, label: "Perbankan & Keuangan Syariah" },
  { icon: Leaf, label: "Zakat & Wakaf Produktif" },
  { icon: Users, label: "Pemberdayaan Ekonomi Umat" },
  { icon: Activity, label: "Pasar Modal & Sukuk" },
  { icon: FileText, label: "Regulasi & Fatwa DSN-MUI" },
  { icon: Globe, label: "Ekonomi Islam Global" },
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Mirofish() {
  return (
    <div className="min-h-screen bg-[#020409] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020409]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Network className="w-4 h-4 text-black" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-widest text-white">ARJECT</span>
              <span className="text-[10px] text-cyan-400 font-medium tracking-wider">EcoIslam Hub</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            {["Ecosystem", "Research", "Stakeholders", "Network"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200 hover:text-cyan-400"
              >
                {item}
              </a>
            ))}
          </div>

          <Link href="/ecosystem/register">
            <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-black rounded-full hover:opacity-90 transition-opacity flex items-center gap-1.5">
              Join Network <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="ecosystem" className="pt-40 pb-28 px-6 relative grid-bg">
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-700/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8 tracking-widest uppercase">
              <Star className="w-3 h-3" />
              <span>Islamic Economics Research Network · ARVAAS</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]">
              <span className="block text-white">Connect the</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 glow-text">
                Ecosystem.
              </span>
              <span className="block text-3xl md:text-5xl font-light text-gray-500 mt-2 font-serif italic">
                Interconnected Knowledge.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Jembatan antara riset skripsi & disertasi Ekonomi Islam dengan stakeholder dunia nyata.
              Temukan, hubungkan, dan transformasikan pengetahuan menjadi dampak nyata bagi umat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/ecosystem/network">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] flex items-center gap-2 text-base"
                >
                  Explore Ecosystem <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/ecosystem">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors font-medium text-base"
                >
                  View Research Database
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 glow-cyan"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-[#020409] px-6 py-5 text-center">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STAKEHOLDERS ── */}
      <section id="stakeholders" className="py-28 px-6 relative">
        <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-4 tracking-widest uppercase">
              <Users className="w-3 h-3" /> Klaster Stakeholder
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Siapa yang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Terhubung?
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Platform ini mempertemukan enam klaster utama dalam ekosistem
              Ekonomi Islam yang saling interconnected.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stakeholders.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`group relative p-6 rounded-2xl bg-white/3 border ${s.border} overflow-hidden cursor-pointer transition-all duration-300`}
              >
                <div className={`absolute inset-0 ${s.glow} transition-colors duration-500`} />
                <s.icon className={`w-8 h-8 ${s.color} mb-4 relative z-10`} />
                <h3 className="text-lg font-bold mb-2 relative z-10">{s.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENTO FEATURES ── */}
      <section id="research" className="py-28 px-6 grid-bg relative">
        <div className="absolute left-1/4 bottom-0 w-[500px] h-[500px] bg-cyan-700/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-widest uppercase">
              <Activity className="w-3 h-3" /> Platform Architecture
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Ecosystem{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Architecture
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Menghubungkan riset dengan aplikasi industri dunia nyata melalui infrastruktur digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/8 overflow-hidden ${f.span}`}
              >
                <div className={`absolute inset-0 ${f.glow} transition-colors duration-500`} />
                <f.icon className={`w-10 h-10 ${f.color} mb-6 relative z-10`} />
                <h3 className="text-2xl font-bold mb-3 relative z-10">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10 max-w-md">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH AREAS ── */}
      <section id="network" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 tracking-widest uppercase">
                <BookOpen className="w-3 h-3" /> Klaster Riset
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Area Riset{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Prioritas
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Enam klaster penelitian utama yang menjadi fondasi ekosistem
                pengetahuan Ekonomi Islam di platform ini. Setiap klaster
                terkoneksi satu sama lain membentuk jaring pengetahuan yang komprehensif.
              </p>
              <button className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-sm transition-colors flex items-center gap-2">
                Lihat Semua Riset <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right — grid of research areas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {researchAreas.map((area, i) => (
                <motion.div
                  key={area.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 rounded-2xl bg-white/3 border border-white/8 hover:border-emerald-500/30 transition-colors cursor-pointer group"
                >
                  <area.icon className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-semibold text-gray-200 leading-snug">{area.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-cyan-500/20 p-12 text-center"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-violet-900/30" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-cyan-500/15 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-semibold mb-6 tracking-widest uppercase">
                <Star className="w-3 h-3" /> Join the Movement
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                Jadilah Bagian dari{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  Ekosistem.
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Bergabunglah dengan ratusan peneliti, praktisi, dan regulator yang
                berkolaborasi membangun masa depan Ekonomi Islam yang lebih kuat.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/ecosystem/register">
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
                    Daftar Sekarang <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors font-medium">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Network className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="text-sm font-bold tracking-wider text-white">ARJECT</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-gray-500 text-xs">EcoIslam Hub by ARVAAS</span>
          </div>
          <p className="text-xs text-gray-600 text-center">
            © 2026 ARVAAS. Platform Koneksi Ekosistem Riset Ekonomi Islam.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Tentang</a>
            <a href="#" className="hover:text-white transition-colors">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
