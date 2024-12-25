import { clerkClient } from "@clerk/nextjs/server";
import { sql } from "@/db";
import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { Roles } from "@/types/globals";
import { sendEmail } from "@/utils/email";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export default async function EnrollmentApprovalsPage() {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  const pendingUsers = await sql`
    SELECT id,first_name,last_name,email FROM students
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
            <PendingUserCard key={user.id} user={user as User} />
          ))}
        </div>
      )}
    </div>
  );
}

function PendingUserCard({ user }: { user: User }) {
  async function approveEnrollment(formData: FormData) {
    "use server";

    const userId = formData.get("userId") as string;
    const client = await clerkClient();

    if (await checkRole("guest")) {
      await client.users.updateUser(userId, {
        publicMetadata: {
          role: "student",
        },
      });
    }

    await sql`
      UPDATE students
      SET pending_approval = FALSE
      WHERE id = ${user.id}
    `;
  }

  async function denyEnrollment(formData: FormData) {
    "use server";

    const userId = formData.get("userId") as string;

    await sql`
      DELETE FROM students
      WHERE id = ${user.id}
    `;

    await sendEmail({
      to: user.email,
      subject: "Enrollment Denied",
      body: `Dear ${user.first_name} ${user.last_name},\n\nYour enrollment request has been denied. Please contact support if you have questions.\n\nBest regards,\nHogwarts Admissions`,
    });
  }

  return (
    <div className="bg-white p-4 rounded shadow border hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-sm text-gray-500">{user.email}</p>
      <form action={approveEnrollment} className="mt-4 space-y-2">
        <input type="hidden" name="userId" value={user.id} />
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          Approve
        </button>
      </form>
      <form action={denyEnrollment} className="mt-2">
        <input type="hidden" name="userId" value={user.id} />
        <button
          type="submit"
          className="w-full bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Deny
        </button>
      </form>
    </div>
  );
}
