import { NextResponse } from "next/server";
import { sql } from "@/db";

type HierarchyType = {
  headOfHouse: string | null;
  ghost: string | null;
  prefects: string[];
};

export async function GET() {
  try {
    // Query for the head of house
    const headOfHouseQuery = await sql`
      SELECT CONCAT(T.FIRST_NAME, ' ', T.LAST_NAME) AS name
      FROM TEACHERS T
      JOIN HOUSES H ON T.ID = H.HEAD_TEACHER_ID
      WHERE H.HOUSE_NAME = 'Gryffindor'
    `;
    const headOfHouse = headOfHouseQuery[0]?.name || null;

    // Query for the house ghost
    const ghostQuery = await sql`
      SELECT CONCAT(G.GHOST_NAME, ' ', G.GHOST_MORTAL_NAME) AS name
      FROM GHOSTS G
      JOIN HOUSES H ON G.ID = H.GHOST_ID
      WHERE H.HOUSE_NAME = 'Gryffindor'
    `;
    const ghost = ghostQuery[0]?.name || null;

    // Query for the prefects
    const prefectsQuery = await sql`
      SELECT CONCAT(s.last_name, ' ', s.first_name) AS name
      FROM students s
      JOIN (
          SELECT scg.student_id, MAX(
              GREATEST(scg.exam1_grade, scg.exam2_grade, scg.exam3_grade) * (1 - c.lab_ratio) 
              + scg.lab_grade * c.lab_ratio
          ) AS max_grade
          FROM student_course_grades scg
          JOIN courses c ON scg.course_id = c.id
          GROUP BY scg.student_id
      ) sub ON sub.student_id = s.id
      WHERE s.house_id = (SELECT id FROM houses WHERE house_name = 'Gryffindor')
      ORDER BY sub.max_grade DESC
      LIMIT 2
    `;
    const prefects = prefectsQuery.map((prefect: { name: string }) => prefect.name) || [];

    // Structure the response
    const hierarchy: HierarchyType = {
      headOfHouse,
      ghost,
      prefects,
    };

    return NextResponse.json(hierarchy);
  } catch (error: any) {
    console.error("Error in GET /api/houses/gryffindor:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
