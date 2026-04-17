import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PosyanduLayout } from "@/components/posyandu/Layout";
import { useToast } from "@/hooks/use-toast"; // Assuming this hook exists based on Toaster presence
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPosyanduPatientSchema } from "@shared/schema"; // Assuming schema needs to be imported from shared or relative

// We need to define schema locally if importing from schema.ts is hard due to file structure, 
// but ideally we import. App.tsx assumes '@' points to src. 
// If schema.ts is in root, we might have issues importing it from client/src unless we use relative paths up.
// For now, I'll mock the schema usage or assume I can import it.
// Wait, schema.ts is in root (../../../../schema). 
// But Vite alias '@shared' points to 'shared'. Maybe I should verify if schema is in shared?
// list_dir of root saw schema.ts in root.
// I will just use standard fetch and manual validation or try to import if possible.

export default function PosyanduRegister() {
    const [location, setLocation] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "",
        nik: "",
        type: "BAYI_BALITA",
        dob: "",
        gender: "L",
        parentName: "",
        address: ""
    });

    const mutation = useMutation({
        mutationFn: async (newPatient: any) => {
            const res = await fetch("/api/posyandu/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newPatient,
                    dob: new Date(newPatient.dob).toISOString() // Ensure simplified date string for backend
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to register");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posyandu-patients"] });
            toast({
                title: "Berhasil",
                description: "Pasien berhasil didaftarkan ke arsip digital.",
            });
            setLocation("/posyandu/patients");
        },
        onError: (error: Error) => {
            toast({
                title: "Gagal",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <PosyanduLayout>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Registrasi Pasien Baru</CardTitle>
                    <CardDescription>Masukkan data lengkap untuk arsip digital Posyandu.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Kategori Layanan</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(val) => setFormData({ ...formData, type: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BAYI_BALITA">Bayi & Balita</SelectItem>
                                    <SelectItem value="IBU_HAMIL">Ibu Hamil</SelectItem>
                                    <SelectItem value="LANSIA">Lansia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                            <Input
                                id="nik"
                                value={formData.nik}
                                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="dob">Tanggal Lahir</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    required
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(val) => setFormData({ ...formData, gender: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="L">Laki-laki</SelectItem>
                                        <SelectItem value="P">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {formData.type === "BAYI_BALITA" && (
                            <div className="grid gap-2">
                                <Label htmlFor="parentName">Nama Orang Tua</Label>
                                <Input
                                    id="parentName"
                                    value={formData.parentName}
                                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Menyimpan..." : "Simpan Arsip Digital"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </PosyanduLayout>
    );
}
