import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-cyan-500"></div>
              <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
                Arvaas Arject
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Membangun ekosistem Ekonomi Islam global melalui pemetaan riset dan sinergi stakeholder secara cerdas dan terintegrasi.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/"><a className="hover:text-cyan-400 transition-colors">Home</a></Link></li>
              <li><Link href="/ecosystem"><a className="hover:text-cyan-400 transition-colors">Dashboard</a></Link></li>
              <li><Link href="/ecosystem/network"><a className="hover:text-cyan-400 transition-colors">Network</a></Link></li>
              <li><Link href="/posyandu"><a className="hover:text-cyan-400 transition-colors">Posyandu Digital</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Kontak</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span>Email: contact@arvaas.id</span>
              </li>
              <li>
                <span>Platform: Islamic Economics Ecosystem</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Arva Athallah Susanto. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
