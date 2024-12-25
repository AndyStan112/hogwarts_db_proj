import { NextResponse } from "next/server";
import { sql } from "@/db";
type RowType = {
  house_id: number;
  house_name: string;
  course_id: number | null;
  course_name: string | null;
  is_mandatory: boolean | null;
};
export async function GET() {
  try {
    const rows: RowType[] = (await sql`
      SELECT 
        h.id AS house_id, 
        h.house_name,
        c.id AS course_id, 
        c.course_name, 
        hc.is_mandatory
      FROM houses h
      LEFT JOIN house_courses hc ON h.id = hc.house_id
      LEFT JOIN courses c ON hc.course_id = c.id
      ORDER BY h.id, c.id
    `) as RowType[];
    if (!rows) {
      console.error("Error in GET /api/houses: no rows");
    }
    const houseMap = new Map<
      number,
      {
        id: number;
        house_name: string;
        mandatoryCourses: { id: number; course_name: string }[];
        optionalCourses: { id: number; course_name: string }[];
      }
    >();

    for (const row of rows) {
      if (!houseMap.has(row.house_id)) {
        houseMap.set(row.house_id, {
          id: row.house_id,
          house_name: row.house_name,
          mandatoryCourses: [],
          optionalCourses: [],
        });
      }

      if (row.course_id) {
        const newCourse = {
          id: row.course_id,
          course_name: row.course_name || "",
        };
        if (row.is_mandatory) {
          houseMap.get(row.house_id)?.mandatoryCourses.push(newCourse);
        } else {
          houseMap.get(row.house_id)?.optionalCourses.push(newCourse);
        }
      }
    }

    const houses = Array.from(houseMap.values());

    return NextResponse.json(houses);
  } catch (error: any) {
    console.error("Error in GET /api/houses:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
