import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ecoStakeholders, insertEcoStakeholderSchema } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = insertEcoStakeholderSchema.parse(body);
    const result = await db.insert(ecoStakeholders).values(data).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Invalid data" 
    }, { status: 400 });
  }
}
