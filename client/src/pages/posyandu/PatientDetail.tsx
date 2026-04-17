import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PosyanduLayout } from "@/components/posyandu/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export default function PosyanduPatientDetail() {
    const [match, params] = useRoute("/posyandu/patients/:id");
    const id = params?.id;

    const { data: patient, isLoading } = useQuery({
        queryKey: ["posyandu-patient", id],
        queryFn: async () => {
            const res = await fetch(`/api/posyandu/patients/${id}`);
            if (!res.ok) throw new Error("Failed to fetch patient");
            return res.json();
        },
        enabled: !!id
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

    if (!patient) {
        return (
            <PosyanduLayout>
                <div className="text-center py-12 text-muted-foreground">Pasien tidak ditemukan</div>
            </PosyanduLayout>
        );
    }

    return (
        <PosyanduLayout>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{patient.name}</CardTitle>
                        <CardDescription>
                            {patient.type.replace("_", " ")} | NIK: {patient.nik || "-"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                                <div className="font-semibold text-muted-foreground">Tanggal Lahir</div>
                                <div>{format(new Date(patient.dob), "dd MMMM yyyy")}</div>
                            </div>
                            <div>
                                <div className="font-semibold text-muted-foreground">Jenis Kelamin</div>
                                <div>{patient.gender === "L" ? "Laki-laki" : "Perempuan"}</div>
                            </div>
                            <div>
                                <div className="font-semibold text-muted-foreground">Orang Tua</div>
                                <div>{patient.parentName || "-"}</div>
                            </div>
                            <div>
                                <div className="font-semibold text-muted-foreground">Alamat</div>
                                <div>{patient.address || "-"}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Pemeriksaan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Berat</TableHead>
                                    <TableHead>Tinggi</TableHead>
                                    <TableHead>Lainnya</TableHead>
                                    <TableHead>Catatan</TableHead>
                                    <TableHead>Petugas</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patient.records && patient.records.length > 0 ? (
                                    patient.records.map((rec: any) => (
                                        <TableRow key={rec.id}>
                                            <TableCell>{format(new Date(rec.checkupDate), "dd/MM/yyyy")}</TableCell>
                                            <TableCell>{rec.weight}</TableCell>
                                            <TableCell>{rec.height}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-xs">
                                                    {rec.headCircumference && <div>LK: {rec.headCircumference}</div>}
                                                    {rec.bloodPressure && <div>TD: {rec.bloodPressure}</div>}
                                                </div>
                                            </TableCell>
                                            <TableCell>{rec.notes}</TableCell>
                                            <TableCell>{rec.officerName}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">Belum ada data pemeriksaan</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </PosyanduLayout>
    );
}
