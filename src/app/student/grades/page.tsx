import { auth, clerkClient } from "@clerk/nextjs/server";
import { sql } from "@/db";
import { redirect } from "next/navigation";
import { checkAccess, checkRole } from "@/utils/roles";
import { Roles } from "@/types/globals";
import { sendEmail } from "@/utils/email";
import { useUser } from "@clerk/nextjs";
type RowType = {
    id: number;
    name: string;
    e1: number | null;
    e2: number | null;
    e3: number | null;
    l: number | null;
    lr: number ;
  };
export default async function EnrollmentApprovalsPage() {
    const { sessionClaims } = await auth();
  if (!(await checkAccess("student")) || !sessionClaims) {
    redirect("/");
  }
  const id =sessionClaims.sub
 
  const rows = await sql`
  SELECT 
    student_id || course_id as id,
    course_name AS name,
    exam1_grade AS e1,
    exam2_grade  AS e2,
    exam3_grade AS e3,
    lab_grade AS l,
    lab_ratio AS lr
FROM 
    student_course_grades
    inner join courses on courses.id = student_course_grades.course_id
  WHERE student_id = ${id}
` as RowType[];


const grades = rows.map((grade)=>({...grade,
    maxGrade:Math.max(
    grade.e1! ,
    grade.e2! ,
    grade.e3! ,
  ),finGrade:Math.max(
    grade.e1! ,
    grade.e2! ,
    grade.e3! ,
  )*(1-grade.lr)+(grade.lr)*grade.l!}))
  
const average = grades.reduce((acc,curr)=>acc+curr.finGrade,0)/grades.length

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pending Enrollments</h1>
      {grades.length === 0 ? (
        <p className="text-gray-500">No grades at the moment.</p>
      ) : (
        <>
        <div className="grid grid-cols-8 font-bold mb-5">
         
            <div>Course name</div>
            <div>Exam p1 grade</div>
            <div>Exam p2 grade</div>
            <div>Exam p3 grade</div>
            <div className="indent-1">Final exam grade</div>
            <div  className="indent-2">Laboratory grade</div>
            <div  className="indent-2">Lab percentage</div>
            <div  className="indent-3">Final grade</div>
        </div>
        <div className="flex flex-col">
            
          {grades.map((grade) => {
                
            return(
            <div className="grid grid-cols-8 gap-4" key={grade.id}> 
                <div className="font-semibold"> {grade.name?? "Not presented"}</div>
                <div> {grade.e1?? "Not presented"}</div>
                <div> {grade.e2?? "Not presented"}</div>
                <div> {grade.e3?? "Not presented"}</div>
                <div> { grade.maxGrade ?  grade.maxGrade.toFixed(2) : "Not presented"}</div>
                <div> {grade.l?? "Not presented"}</div>
                <div> {grade.lr*100 + "%"}</div>
                <div>{grade.finGrade ?  grade.finGrade.toFixed(2) : "Not presented"}</div>
                <div> </div>
            </div>)
           
          })}
        </div>
        <div  className="font-bold mt-5">
            Average
        </div>
        <div  className="font-extrabold">
            {average}
        </div>
        </>
      )}
    </div>
  );
}

// function PendingUserCard({ user }: { user: User }) {
//   async function approveEnrollment(formData: FormData) {
//     "use server";

//     const userId = formData.get("userId") as string;
//     const client = await clerkClient();

//     if (await checkRole("guest")) {
//       await client.users.updateUser(userId, {
//         publicMetadata: {
//           role: "student",
//         },
//       });
//     }

//     await sql`
//       UPDATE students
//       SET pending_approval = FALSE
//       WHERE id = ${user.id}
//     `;
//   }

//   async function denyEnrollment(formData: FormData) {
//     "use server";

//     const userId = formData.get("userId") as string;

//     await sql`
//       DELETE FROM students
//       WHERE id = ${user.id}
//     `;

//     await sendEmail({
//       to: user.email,
//       subject: "Enrollment Denied",
//       body: `Dear ${user.first_name} ${user.last_name},\n\nYour enrollment request has been denied. Please contact support if you have questions.\n\nBest regards,\nHogwarts Admissions`,
//     });
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow border hover:shadow-lg transition">
//       <h2 className="text-lg font-semibold">
//         {user.first_name} {user.last_name}
//       </h2>
//       <p className="text-sm text-gray-500">{user.email}</p>
//       <form action={approveEnrollment} className="mt-4 space-y-2">
//         <input type="hidden" name="userId" value={user.id} />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
//         >
//           Approve
//         </button>
//       </form>
//       <form action={denyEnrollment} className="mt-2">
//         <input type="hidden" name="userId" value={user.id} />
//         <button
//           type="submit"
//           className="w-full bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
//         >
//           Deny
//         </button>
//       </form>
//     </div>
//   );
// }
