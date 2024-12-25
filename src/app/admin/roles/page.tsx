import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "@/app/admin/roles/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "@/app/admin/roles/_actions";

export type Roles = "admin" | "student" | "teacher" | "guest";

export default async function RolesDashboard({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await searchParams).search;

  const client = await clerkClient();

  const users = query
    ? (await client.users.getUserList({ query })).data
    : (await client.users.getUserList()).data;

  const roles: Roles[] = ["admin", "student", "teacher", "guest"];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">
        This is the protected admin dashboard restricted to users with the{" "}
        <code className="bg-gray-200 px-1 py-0.5 rounded">admin</code> role.
      </p>

      <SearchUsers />

      <div className="mt-6">
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded shadow border hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </p>
                <p className="text-sm text-gray-600">
                  Role:{" "}
                  <span className="font-medium text-gray-800">
                    {user.publicMetadata.role as string}
                  </span>
                </p>
                <div className="mt-4 space-y-2">
                  <form action={setRole}>
                    <input type="hidden" name="id" value={user.id} />
                    <label htmlFor={`role-${user.id}`} className="sr-only">
                      Set Role
                    </label>
                    <select
                      name="role"
                      id={`role-${user.id}`}
                      className="w-full border rounded px-3 py-2 mb-2"
                      defaultValue={user.publicMetadata.role as string}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                      Update Role
                    </button>
                  </form>
                  <form action={removeRole}>
                    <input type="hidden" name="id" value={user.id} />
                    <button
                      type="submit"
                      className="w-full bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                    >
                      Remove Role
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
