import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const stakeholders = await db.query.ecoStakeholders.findMany();
    const research = await db.query.ecoResearchWorks.findMany();
    const connections = await db.query.ecoConnections.findMany();
    
    const clusters = stakeholders.reduce((acc: Record<string, number>, s) => {
      acc[s.cluster] = (acc[s.cluster] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      totalStakeholders: stakeholders.length,
      totalResearch: research.length,
      totalConnections: connections.length,
      clusters
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
