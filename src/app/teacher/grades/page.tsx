
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "@/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clerkId,
      firstName,
      lastName,
      email,
      phoneNumber,
      houseId,
      optionalCourses,
    } = body;

    if (!clerkId || !houseId || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not logged in" }, { status: 400 });
    }
    const currentRole = user.publicMetadata?.role;

    if (currentRole === "student") {
      return NextResponse.json(
        { error: "User already has 'student' role" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO students (id, first_name, last_name, email, phone_number, house_id)
      VALUES (${clerkId}, ${firstName}, ${lastName}, ${email},${phoneNumber}, ${houseId})
 
    `;

    const houseCourses = await sql`
      SELECT course_id, is_mandatory
      FROM house_courses
      WHERE house_id = ${houseId}
    `;

    const mandatoryIds = houseCourses
      .filter((c: any) => c.is_mandatory)
      .map((c: any) => c.course_id);

    const chosenOptionalIds = optionalCourses;

    const allCourseIds = [...mandatoryIds, ...chosenOptionalIds];

    for (const courseId of allCourseIds) {
      await sql`
        INSERT INTO student_courses (student_id, course_id)
        VALUES (${clerkId}, ${courseId})
      `;

      await sql`
        INSERT INTO student_course_grades (
          student_id, 
          course_id, 
          exam1_grade, 
          exam2_grade, 
          exam3_grade, 
          lab_grade, 
          overall_grade
        )
        VALUES (${clerkId}, ${courseId}, NULL, NULL, NULL, NULL, NULL)
      `;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST /api/register:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
