import { NextResponse } from "next/server";
import { sql } from "@/db";

export async function GET() {
  try {
    const houseCounts = await sql`
      SELECT 
        h.house_name AS house,
        COUNT(s.id)::int AS count
      FROM 
        houses h
      LEFT JOIN 
        students s ON h.id = s.house_id
      GROUP BY 
        h.house_name
      ORDER BY 
        h.house_name;
    `;
    return NextResponse.json(houseCounts);
  } catch (error) {
    console.error("Error fetching house counts:", error);
    return NextResponse.json({ error: "Failed to fetch house counts" }, { status: 500 });
  }
}
