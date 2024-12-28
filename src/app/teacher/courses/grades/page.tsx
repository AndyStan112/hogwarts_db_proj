import { sql } from "@/db";
import React from "react";

type Props = {
  searchParams: { id?: string };
};

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

export default async function CourseGradesPage({ searchParams }: Props) {
  const courseId = searchParams.id;

  if (!courseId) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p className="text-gray-500 mt-4">No course ID provided in the URL.</p>
      </div>
    );
  }

  const teacherId = "clerk_teacher_1"; // Placeholder teacher ID
  const courseDetails = (await sql`
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
    WHERE t.id = ${teacherId} AND c.id = ${courseId}
  `) as RowType[];

  if (!courseDetails || courseDetails.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p className="text-gray-500 mt-4">The requested course does not exist.</p>
      </div>
    );
  }

  const course = courseDetails[0];

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-4/5">
        <h1 className="text-4xl font-bold mb-8">Grades for {course.cn}</h1>
        <div className="grid grid-cols-6 gap-4 bg-white p-4 rounded-lg shadow-md font-bold">
          <div>First Name</div>
          <div>Last Name</div>
          <div>Exam 1</div>
          <div>Exam 2</div>
          <div>Exam 3</div>
          <div>Lab</div>
        </div>
        {courseDetails.map((student) => (
          <div
            key={student.sid}
            className="grid grid-cols-6 gap-4 border border-t bg-white p-4 hover:bg-gray-200 transition-colors duration-200"
          >
            <div>{student.sfn}</div>
            <div>{student.sln}</div>
            <div>{student.e1 ?? "N/A"}</div>
            <div>{student.e2 ?? "N/A"}</div>
            <div>{student.e3 ?? "N/A"}</div>
            <div>{student.lg ?? "N/A"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
