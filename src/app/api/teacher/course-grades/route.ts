import { sql } from "@/db";
import { NextResponse } from "next/server";

type RowType = {
  sid: string;
  sfn: string;
  sln: string;
  cn: string;
  e1: number | null;
  e2: number | null;
  e3: number | null;
  lg: number | null;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const courseId = url.searchParams.get("id");

  if (!courseId) {
    return new Response(
      JSON.stringify({ error: "Course ID not provided" }),
      { status: 400 }
    );
  }

  try {
    const data = await sql`
      SELECT 
        s.id as sid,
        s.first_name as sfn,
        s.last_name as sln,
        c.course_name as cn,
        scg.exam1_grade as e1,
        scg.exam2_grade as e2,
        scg.exam3_grade as e3,
        scg.lab_grade as lg
      FROM 
        teachers t
        JOIN courses c ON t.id = c.teacher_id
        JOIN student_course_grades scg ON scg.course_id = c.id
        JOIN students s ON s.id = scg.student_id
      WHERE c.id = ${courseId}
    ` as RowType[];

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching course data:", error);
    return  NextResponse.json(
     { "error": error },
      { status: 500 }
    );
  }
}
