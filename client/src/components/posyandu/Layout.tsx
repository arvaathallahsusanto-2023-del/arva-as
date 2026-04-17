import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils"; // Assuming lib/utils exists or will need to be created if missing, but usually standard in shadcn

export function PosyanduLayout({ children }: { children: React.ReactNode }) {
    const [location] = useLocation();

    const navItems = [
        { href: "/posyandu", label: "Dashboard" },
        { href: "/posyandu/patients", label: "Data Pasien" },
        { href: "/posyandu/register", label: "Registrasi Baru" },
        { href: "/posyandu/record/new", label: "Input Pemeriksaan" },
    ];

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Sistem Informasi Posyandu</h1>
                <p className="text-muted-foreground">
                    Transformasi Administrasi & Optimalisasi Arsip Digital
                </p>
            </div>

            <nav className="flex items-center space-x-4 border-b pb-2 overflow-x-auto">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <a
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                                location === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </a>
                    </Link>
                ))}
            </nav>

            <div className="bg-card rounded-lg border shadow-sm p-6">
                {children}
            </div>
        </div>
    );
}
