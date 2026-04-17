import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PosyanduLayout } from "@/components/posyandu/Layout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useLocation } from "wouter";

export default function PosyanduInputRecord() {
    const { toast } = useToast();
    const [location, setLocation] = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    // Search for patient to record
    const { data: searchResults } = useQuery({
        queryKey: ["patient-search", searchQuery],
        queryFn: async () => {
            if (!searchQuery) return [];
            const res = await fetch(`/api/posyandu/patients?q=${encodeURIComponent(searchQuery)}`);
            if (!res.ok) throw new Error("Search failed");
            return res.json();
        },
        enabled: searchQuery.length > 2
    });

    const [recordData, setRecordData] = useState({
        weight: "",
        height: "",
        headCircumference: "",
        bloodPressure: "",
        notes: "",
        officerName: ""
    });

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch("/api/posyandu/records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    patientId: selectedPatient.id
                })
            });
            if (!res.ok) throw new Error("Failed to save record");
            return res.json();
        },
        onSuccess: () => {
            toast({ title: "Berhasil", description: "Data pemeriksaan tersimpan." });
            setLocation("/posyandu");
        },
        onError: (err: Error) => {
            toast({ title: "Gagal", description: err.message, variant: "destructive" });
        }
    });

    if (!selectedPatient) {
        return (
            <PosyanduLayout>
                <Card>
                    <CardHeader>
                        <CardTitle>Cari Pasien</CardTitle>
                        <CardDescription>Cari nama pasien untuk mulai mencatat pemeriksaan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Ketikan nama..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            {searchResults?.map((p: any) => (
                                <div
                                    key={p.id}
                                    className="p-3 border rounded-md cursor-pointer hover:bg-accent flex justify-between items-center"
                                    onClick={() => setSelectedPatient(p)}
                                >
                                    <div>
                                        <div className="font-medium">{p.name}</div>
                                        <div className="text-xs text-muted-foreground">{p.type} - {p.nik}</div>
                                    </div>
                                    <Button size="sm" variant="outline">Pilih</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </PosyanduLayout>
        );
    }

    return (
        <PosyanduLayout>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Input Pemeriksaan</CardTitle>
                        <Button variant="ghost" onClick={() => setSelectedPatient(null)} size="sm">Ganti Pasien</Button>
                    </div>
                    <CardDescription>
                        Mencatat data untuk: <strong>{selectedPatient.name}</strong> ({selectedPatient.type})
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(recordData); }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="weight">Berat Badan (kg/text)</Label>
                                <Input
                                    id="weight"
                                    value={recordData.weight}
                                    onChange={e => setRecordData({ ...recordData, weight: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="height">Tinggi/Panjang Badan (cm)</Label>
                                <Input
                                    id="height"
                                    value={recordData.height}
                                    onChange={e => setRecordData({ ...recordData, height: e.target.value })}
                                />
                            </div>
                        </div>

                        {selectedPatient.type === "BAYI_BALITA" && (
                            <div className="grid gap-2">
                                <Label htmlFor="head">Lingkar Kepala (cm)</Label>
                                <Input
                                    id="head"
                                    value={recordData.headCircumference}
                                    onChange={e => setRecordData({ ...recordData, headCircumference: e.target.value })}
                                />
                            </div>
                        )}

                        {(selectedPatient.type === "IBU_HAMIL" || selectedPatient.type === "LANSIA") && (
                            <div className="grid gap-2">
                                <Label htmlFor="bp">Tekanan Darah</Label>
                                <Input
                                    id="bp"
                                    value={recordData.bloodPressure}
                                    onChange={e => setRecordData({ ...recordData, bloodPressure: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Catatan Kesehatan / Keluhan</Label>
                            <Textarea
                                id="notes"
                                value={recordData.notes}
                                onChange={e => setRecordData({ ...recordData, notes: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="officer">Nama Petugas/Kader</Label>
                            <Input
                                id="officer"
                                value={recordData.officerName}
                                onChange={e => setRecordData({ ...recordData, officerName: e.target.value })}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            Simpan Data
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </PosyanduLayout>
    );
}
