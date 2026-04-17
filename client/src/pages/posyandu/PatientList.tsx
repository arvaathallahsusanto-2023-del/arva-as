import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PosyanduLayout } from "@/components/posyandu/Layout";
import { Input } from "@/components/ui/input"; // Assuming exists
import { Button } from "@/components/ui/button"; // Assuming exists
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Assuming exists
import { Search, UserPlus } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function PosyanduPatientList() {
    const [search, setSearch] = useState("");

    const { data: patients, isLoading } = useQuery({
        queryKey: ["posyandu-patients", search],
        queryFn: async () => {
            const res = await fetch(`/api/posyandu/patients?q=${encodeURIComponent(search)}`);
            if (!res.ok) throw new Error("Failed to fetch patients");
            return res.json();
        },
    });

    return (
        <PosyanduLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Data Pasien</h2>
                    <p className="text-muted-foreground">Kelola data bayi, ibu hamil, dan lansia.</p>
                </div>
                <Link href="/posyandu/register">
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Registrasi Baru
                    </Button>
                </Link>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Cari nama atau NIK..."
                    className="pl-8 max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Tanggal Lahir</TableHead>
                            <TableHead>Terdaftar</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : patients?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Tidak ada data ditemukan</TableCell>
                            </TableRow>
                        ) : (
                            patients?.map((patient: any) => (
                                <TableRow key={patient.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{patient.name}</span>
                                            <span className="text-xs text-muted-foreground">{patient.nik || "-"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {patient.type.replace("_", " ")}
                                        </span>
                                    </TableCell>
                                    <TableCell>{patient.gender === "L" ? "Laki-laki" : "Perempuan"}</TableCell>
                                    <TableCell>{format(new Date(patient.dob), "dd MMM yyyy")}</TableCell>
                                    <TableCell>{format(new Date(patient.registeredAt), "dd/MM/yyyy")}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/posyandu/patients/${patient.id}`}>Detail</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </PosyanduLayout>
    );
}
