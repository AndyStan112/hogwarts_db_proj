"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

export default function CourseGradesPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [courseDetails, setCourseDetails] = useState<RowType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<RowType | null>(null);
  const [filters, setFilters] = useState({ search: "" });

  useEffect(() => {
    if (!courseId) return;

    async function fetchCourseDetails() {
      try {
        const response = await fetch(`/api/teacher/course-grades?id=${courseId}`);
        const data: RowType[] = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  const handleSave = async () => {
    const exam1 = parseFloat((document.querySelector<HTMLInputElement>("#exam1")?.value ?? "0")) || 0;
    const exam2 = parseFloat((document.querySelector<HTMLInputElement>("#exam2")?.value ?? "0")) || 0;
    const exam3 = parseFloat((document.querySelector<HTMLInputElement>("#exam3")?.value ?? "0")) || 0;
    const lab = parseFloat((document.querySelector<HTMLInputElement>("#lab")?.value ?? "0")) || 0;

    if (isNaN(exam1) || isNaN(exam2) || isNaN(exam3) || isNaN(lab)) {
      alert("Please ensure all grades are valid numbers.");
      return;
    }

    try {
      const response = await fetch("/api/teacher/update-grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent?.sid,
          courseId,
          exam1,
          exam2,
          exam3,
          lab,
        }),
      });

      if (response.ok) {
        const updatedStudent: RowType = {
          ...selectedStudent!,
          e1: exam1,
          e2: exam2,
          e3: exam3,
          lg: lab,
          sid: selectedStudent?.sid ?? "",
          sfn: selectedStudent?.sfn ?? "",
          sln: selectedStudent?.sln ?? "",
          cn: selectedStudent?.cn ?? "",
        };

        setCourseDetails((prevDetails) =>
          prevDetails.map((student) =>
            student.sid === updatedStudent.sid ? updatedStudent : student
          )
        );

        setSelectedStudent(null);
        alert("Grades updated successfully!");
      } else {
        console.error("Failed to save grades");
      }
    } catch (error) {
      console.error("Error saving grades:", error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredDetails = courseDetails.filter(
    (student) =>
      student.sfn.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.sln.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-4/5">
        <h1 className="text-4xl font-bold mb-4">Grades</h1>

        <div className="mb-6 flex justify-start">
          <input
            name="search"
            type="text"
            placeholder="Search students by name"
            className="border rounded-lg px-4 py-2 w-1/2"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <div className="grid grid-cols-6 gap-4 bg-white p-4 rounded-lg shadow-md font-bold">
          <div>First Name</div>
          <div>Last Name</div>
          <div>Exam 1</div>
          <div>Exam 2</div>
          <div>Exam 3</div>
          <div>Lab</div>
        </div>

        {filteredDetails.map((student) => (
          <div
            key={student.sid}
            className="grid grid-cols-6 gap-4 border-t bg-white p-4 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <div>{student.sfn}</div>
            <div>{student.sln}</div>
            <div>{student.e1 !== null ? Number(student.e1).toFixed(2) : "N/A"}</div>
            <div>{student.e2 !== null ? Number(student.e2).toFixed(2) : "N/A"}</div>
            <div>{student.e3 !== null ? Number(student.e3).toFixed(2) : "N/A"}</div>
            <div>{student.lg !== null ? Number(student.lg).toFixed(2) : "N/A"}</div>
          </div>
        ))}

        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">
                Edit Grades for {selectedStudent.sfn} {selectedStudent.sln}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <label>
                  Exam 1
                  <input
                    type="number"
                    id="exam1"
                    className="border rounded p-2 w-full"
                    defaultValue={selectedStudent.e1 ?? ""}
                  />
                </label>
                <label>
                  Exam 2
                  <input
                    type="number"
                    id="exam2"
                    className="border rounded p-2 w-full"
                    defaultValue={selectedStudent.e2 ?? ""}
                  />
                </label>
                <label>
                  Exam 3
                  <input
                    type="number"
                    id="exam3"
                    className="border rounded p-2 w-full"
                    defaultValue={selectedStudent.e3 ?? ""}
                  />
                </label>
                <label>
                  Lab
                  <input
                    type="number"
                    id="lab"
                    className="border rounded p-2 w-full"
                    defaultValue={selectedStudent.lg ?? ""}
                  />
                </label>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-gray-200 px-4 py-2 rounded mr-4"
                  onClick={() => setSelectedStudent(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
