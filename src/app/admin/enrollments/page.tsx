import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the enrollments panel. Use the links below to manage
        enrollments.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/enrollments/students"
          className="block bg-blue-500 text-white px-6 py-4 rounded shadow hover:bg-blue-600 transition"
        >
          Manage Student Enrollments
        </Link>
        <Link
          href="/admin/enrollments/teachers"
          className="block bg-cyan-500 text-white px-6 py-4 rounded shadow hover:bg-blue-600 transition"
        >
          Manage Teacher Enrollments
        </Link>
      </div>
    </div>
  );
}
