import type { Express } from "express";
import type { Server } from "http";
import { db } from "./db";
import { posyanduPatients, posyanduRecords, insertPosyanduPatientSchema, insertPosyanduRecordSchema } from "./schema";
import { eq } from "drizzle-orm";
/**
 * Semua routing API didefinisikan di sini
 * Akan dipanggil sekali oleh index.ts (initOnce)
 */
export async function registerRoutes(
  _server: Server,
  app: Express,
): Promise<void> {
  // contoh health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      time: new Date().toISOString(),
    });
  });

  // Posyandu: Patients
  app.get("/api/posyandu/patients", async (req, res) => {
    const { q } = req.query;
    // In a real app, use like/ilike for search. For now, just return all or filter in memory if needed.
    // For this implementation, we will fetch all and sort by registeredAt desc
    const result = await db.query.posyanduPatients.findMany({
      orderBy: (table, { desc }) => [desc(table.registeredAt)],
    });

    if (q && typeof q === 'string') {
      const lowerQ = q.toLowerCase();
      const filtered = result.filter(p =>
        p.name.toLowerCase().includes(lowerQ) ||
        (p.nik && p.nik.includes(lowerQ))
      );
      return res.json(filtered);
    }
    res.json(result);
  });

  app.post("/api/posyandu/patients", async (req, res) => {
    try {
      const patient = insertPosyanduPatientSchema.parse(req.body);
      const result = await db.insert(posyanduPatients).values(patient).returning();
      res.json(result[0]);
    } catch (e) {
      res.status(400).json({ error: e instanceof Error ? e.message : "Invalid data" });
    }
  });

  app.get("/api/posyandu/patients/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const patient = await db.query.posyanduPatients.findFirst({
      where: eq(posyanduPatients.id, id),
      with: {
        records: {
          orderBy: (recs, { desc }) => [desc(recs.checkupDate)]
        }
      }
    });

    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  });

  // Posyandu: Records
  app.post("/api/posyandu/records", async (req, res) => {
    try {
      const record = insertPosyanduRecordSchema.parse(req.body);
      const result = await db.insert(posyanduRecords).values(record).returning();
      res.json(result[0]);
    } catch (e) {
      res.status(400).json({ error: e instanceof Error ? e.message : "Invalid data" });
    }
  });

  app.get("/api/posyandu/analytics", async (req, res) => {
    // Determine counts
    const patients = await db.select().from(posyanduPatients);
    const records = await db.select().from(posyanduRecords);

    const totalPatients = patients.length;
    const infants = patients.filter(p => p.type === "BAYI_BALITA").length;
    const pregnant = patients.filter(p => p.type === "IBU_HAMIL").length;
    const elderly = patients.filter(p => p.type === "LANSIA").length;

    // Efficiency Calculation (Mock)
    // Assume each digital record saves 10 minutes of manual work @ Rp 20.000/hour labor cost equivalent
    // + Paper cost saving Rp 500 per record
    const recordsCount = records.length;
    const timeSavedMinutes = recordsCount * 10;
    const costSaved = (recordsCount * 500) + ((timeSavedMinutes / 60) * 20000);

    res.json({
      totalPatients,
      byType: { infants, pregnant, elderly },
      totalRecords: recordsCount,
      efficiency: {
        timeSavedMinutes,
        costSaved: Math.round(costSaved)
      }
    });
  });
}
