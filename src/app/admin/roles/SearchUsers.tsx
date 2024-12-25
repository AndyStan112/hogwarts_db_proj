"use client";

import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <form
        className="flex items-center space-x-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <label htmlFor="search" className="sr-only">
          Search for users
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search users by name or email"
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};
