"use client";

import { useEffect, useState } from "react";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Course = {
  id: number;
  course_name: string;
  is_mandatory: boolean;
};

type HouseData = {
  id: number;
  house_name: string;
  mandatoryCourses: Course[];
  optionalCourses: Course[];
};

export default function RegisterPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [houses, setHouses] = useState<HouseData[]>([]);
  const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);
  const [optionalCoursesSelected, setOptionalCoursesSelected] = useState<
    number[]
  >([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.primaryEmailAddress?.emailAddress ?? "");
    }
  }, [user]);

  useEffect(() => {
    async function fetchHouses() {
      const response = await fetch("/api/houses");
      const data = await response.json();
      setHouses(data);
    }
    fetchHouses();
  }, []);
  if (isLoaded && !user) {
    return <RedirectToSignIn />;
  }

  const userRole = user?.publicMetadata?.role;
  if (userRole === "student") {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">You are already a student!</h1>
        <p>No need to register again.</p>
      </div>
    );
  }

  const handleOptionalCourseChange = (courseId: number) => {
    if (optionalCoursesSelected.includes(courseId)) {
      setOptionalCoursesSelected((prev) =>
        prev.filter((id) => id !== courseId)
      );
    } else {
      if (optionalCoursesSelected.length < 3) {
        setOptionalCoursesSelected((prev) => [...prev, courseId]);
      } else {
        alert("You can only pick 3 optional courses!");
      }
    }
  };

  const handleMagicHatSelection = () => {
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];
    setSelectedHouseId(randomHouse.id);
    setOptionalCoursesSelected([]);
    alert(`The magic hat has chosen: ${randomHouse.house_name}!`);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedHouseId) {
      alert("Please select a house.");
      return;
    }

    if (optionalCoursesSelected.length !== 3) {
      alert("You must select exactly 3 optional courses!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user?.id,
          firstName,
          lastName,
          phoneNumber,
          email,
          houseId: selectedHouseId,
          optionalCourses: optionalCoursesSelected,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      router.push("/guest/register/thanks");
    } catch (error) {
      alert("There was an error submitting the form: " + error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register as a Student</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            className="w-full border rounded p-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input
            className="w-full border rounded p-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="gap-3 flex flex-col">
          <label className="block font-medium">Choose Your House</label>
          <button
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded shadow w-1/3 "
            onClick={handleMagicHatSelection}
          >
            Let the Magic Hat Choose
          </button>
          <select
            className="w-full border rounded p-2"
            onChange={(e) => {
              setSelectedHouseId(Number(e.target.value));
              setOptionalCoursesSelected([]);
            }}
            value={selectedHouseId || ""}
            required
          >
            <option value="">-- Select a House --</option>
            {houses.map((house) => (
              <option key={house.id} value={house.id}>
                {house.house_name}
              </option>
            ))}
          </select>
        </div>

        {selectedHouseId && (
          <div>
            <h2 className="font-semibold mt-4">Mandatory Courses</h2>
            <ul className="list-disc list-inside">
              {houses
                .find((h) => h.id === selectedHouseId)
                ?.mandatoryCourses.map((course) => (
                  <li key={course.id}>{course.course_name}</li>
                ))}
            </ul>

            <h2 className="font-semibold mt-4">Choose 3 Optional Courses</h2>
            <div className="grid grid-cols-2 gap-2">
              {houses
                .find((h) => h.id === selectedHouseId)
                ?.optionalCourses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={optionalCoursesSelected.includes(course.id)}
                      onChange={() => handleOptionalCourseChange(course.id)}
                    />
                    <span>{course.course_name}</span>
                  </label>
                ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
