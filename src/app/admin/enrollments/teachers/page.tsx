import { sql } from "@/db";
import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";

import { PendingUserCard, User } from "../PendingUserCard";

export default async function EnrollmentApprovalsPage() {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  const pendingUsers = await sql`
    SELECT id,first_name,last_name,email FROM teachers
    WHERE pending_approval = TRUE
  `;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pending Enrollments</h1>
      {pendingUsers.length === 0 ? (
        <p className="text-gray-500">No pending enrollments at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingUsers.map((user) => (
            <PendingUserCard key={user.id} user={user as User} role="teacher" />
          ))}
        </div>
      )}
    </div>
  );
}
