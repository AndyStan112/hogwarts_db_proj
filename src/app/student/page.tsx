import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/student/grades"
          className="block bg-blue-500 text-white px-6 py-4 rounded shadow hover:bg-blue-600 transition"
        >
          Grades
        </Link>
        <Link
          href="/blogs/post"
          className="block bg-cyan-500 text-white px-6 py-4 rounded shadow hover:bg-blue-600 transition"
        >
          Post a blog
        </Link>
      </div>
    </div>
  );
}
