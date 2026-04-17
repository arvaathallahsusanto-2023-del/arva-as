import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ecoStakeholders } from "@/lib/db/schema";

export async function GET() {
  try {
    const result = await db.query.ecoStakeholders.findMany({
      with: {
        researchWorks: true,
        connectionsInitiated: true
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch network" }, { status: 500 });
  }
}
