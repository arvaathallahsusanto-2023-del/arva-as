import type { Express } from "express";
import type { Server } from "http";
import { db } from "./db.js";
import { ecoStakeholders, ecoResearchWorks, ecoConnections, insertEcoStakeholderSchema } from "./schema.js";
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

  // === ECOSYSTEM API ===

  // 1. Get Ecosystem Stats
  app.get("/api/ecosystem/stats", async (_req, res) => {
    try {
      const stakeholders = await db.query.ecoStakeholders.findMany();
      const research = await db.query.ecoResearchWorks.findMany();
      const connections = await db.query.ecoConnections.findMany();
      
      res.json({
        totalStakeholders: stakeholders.length,
        totalResearch: research.length,
        totalConnections: connections.length,
        clusters: stakeholders.reduce((acc: Record<string, number>, s: any) => {
          acc[s.cluster] = (acc[s.cluster] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      });
    } catch(e) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // 2. Register Stakeholder
  app.post("/api/ecosystem/stakeholders", async (req, res) => {
    try {
      const data = insertEcoStakeholderSchema.parse(req.body);
      const result = await db.insert(ecoStakeholders).values(data).returning();
      res.json(result[0]);
    } catch(e) {
      res.status(400).json({ error: e instanceof Error ? e.message : "Invalid data" });
    }
  });

  // 3. Get Network (Stakeholders + Research)
  app.get("/api/ecosystem/network", async (_req, res) => {
    try {
      const result = await db.query.ecoStakeholders.findMany({
        with: {
          researchWorks: true,
          connectionsInitiated: true
        }
      });
      res.json(result);
    } catch(e) {
      res.status(500).json({ error: "Failed to fetch network" });
    }
  });
}
