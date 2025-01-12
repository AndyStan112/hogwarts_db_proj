//teacher/courses/grades?id={course_id}

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/db";
import { redirect } from "next/navigation";
import { checkAccess } from "@/utils/roles";
import Link from "next/link";

type RowType = {
  id: string;
  fn: string;
  ln: string;
  cn: string;
  course_id: string;
};

export default async function TeacherCoursesPage() {
  const { sessionClaims } = await auth();
  if (!(await checkAccess("teacher")) || !sessionClaims) {
    redirect("/");
  }
   const id = sessionClaims.sub;

  const rows = (await sql`
    SELECT 
      t.id AS id,
      t.first_name AS fn,
      t.last_name AS ln,
      c.course_name AS cn,
      c.id as course_id
    FROM 
      teachers t
    JOIN courses c ON t.id = c.teacher_id
    WHERE t.id = ${id}
  `) as RowType[];

  const teacherName = rows.length > 0 ? `${rows[0].fn} ${rows[0].ln}` : "Teacher";
  const courses = rows.map((course, index) => ({
    index: index + 1,
    name: course.cn,
    id: course.course_id,
  }));

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-4/5">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses at the moment.</p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-6">
              Hello, {teacherName}! <br /> Please select the courses where you
              want to add the grades:
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {courses.map((course) => (
                 <Link
                 href={`/teacher/courses/grades/?id=${course.id}`}
                 key={course.id}
                 className="bg-white p-4 rounded shadow border hover:shadow-lg transition block"
               >
                  <b>Course {course.index}: </b>
                  {course.name}
                  </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
