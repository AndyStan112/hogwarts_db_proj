import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { studentId, courseId, exam1, exam2, exam3, lab } = await req.json();

    await sql`
      UPDATE student_course_grades
      SET
        exam1_grade = ${exam1},
        exam2_grade = ${exam2},
        exam3_grade = ${exam3},
        lab_grade = ${lab}
      WHERE
        student_id = ${studentId} AND course_id = ${courseId}
    `;

    return NextResponse.json({ success: true });
  } catch (error:any) {
    console.error("Error updating grades:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
