import { checkAccess } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";
import { Roles } from "../roles/page";
import { sql } from "@/db";
import { sendEmail } from "@/utils/email";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export function PendingUserCard({ user, role }: { user: User; role: Roles }) {
  async function approveEnrollment() {
    "use server";

    const client = await clerkClient();

    if (!(await checkAccess(role))) {
      await client.users.updateUser(user.id, {
        publicMetadata: {
          role: role,
        },
      });
    }
    await sql(
      `
      UPDATE ${role + "s"}
      SET pending_approval = FALSE
      WHERE id = $1`,
      [user.id]
    );

    await sendEmail({
      to: user.email,
      subject: "Enrollment Denied",
      body: `Dear ${user.first_name} ${user.last_name},\n\nYour enrollment request has been denied. Please contact support if you have questions.\n\nBest regards,\nHogwarts Admissions`,
    });
  }

  async function denyEnrollment() {
    "use server";

    await sql(
      `
      DELETE FROM ${role + "s"}
      WHERE id = $1
    `,
      [user.id]
    );

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
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          Approve
        </button>
      </form>
      <form action={denyEnrollment} className="mt-2">
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
