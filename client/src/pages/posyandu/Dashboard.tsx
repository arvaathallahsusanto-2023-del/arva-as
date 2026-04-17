import { useQuery } from "@tanstack/react-query";
import { PosyanduLayout } from "@/components/posyandu/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Assuming these exist
import { Loader2, TrendingUp, Users, FileText, PiggyBank } from "lucide-react";

export default function PosyanduDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ["posyandu-analytics"],
        queryFn: async () => {
            const res = await fetch("/api/posyandu/analytics");
            if (!res.ok) throw new Error("Failed to fetch analytics");
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <PosyanduLayout>
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </PosyanduLayout>
        );
    }

    return (
        <PosyanduLayout>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.totalPatients || 0}</div>
                        <p className="text-xs text-muted-foreground">Terdaftar dalam sistem</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pemeriksaan</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.totalRecords || 0}</div>
                        <p className="text-xs text-muted-foreground">Arsip digital tersimpan</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Efisiensi Waktu</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.efficiency?.timeSavedMinutes || 0} min</div>
                        <p className="text-xs text-muted-foreground">Waktu administrasi terpangkas</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Efisiensi Biaya</CardTitle>
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            Rp {data?.efficiency?.costSaved?.toLocaleString() || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Penghematan kertas & operasional</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Demografi Pasien</CardTitle>
                        <CardDescription>Distribusi kategori layanan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Bayi & Balita</span>
                                <span className="font-bold">{data?.byType?.infants || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Ibu Hamil</span>
                                <span className="font-bold">{data?.byType?.pregnant || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm">Lansia</span>
                                <span className="font-bold">{data?.byType?.elderly || 0}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status Sistem</CardTitle>
                        <CardDescription>Integrasi Layanan Primer (ILP)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2 text-green-600">
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="font-medium">Sistem Arsip Digital Aktif</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Semua data tersimpan aman di database terpusat dan siap untuk pelaporan real-time.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </PosyanduLayout>
    );
}
