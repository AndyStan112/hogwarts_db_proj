
import { sql } from "@/db";
import Image from "next/image";

import React, { useEffect, useState } from "react";

type HierarchyType = {
  headOfHouse: string | null;
  ghost: string | null;
  prefects: string[];
};
const houseName="Gryffindor";

    

const Gryffindor = async() => {
const headOfHouseQuery = await sql`
  SELECT CONCAT(T.FIRST_NAME, ' ', T.LAST_NAME) AS name
  FROM TEACHERS T
  JOIN HOUSES H ON T.ID = H.HEAD_TEACHER_ID
  WHERE H.HOUSE_NAME = ${houseName}
`;
const headOfHouse = headOfHouseQuery[0]?.name || null;


const ghostQuery = await sql`
  SELECT CONCAT(G.GHOST_NAME, ' (', G.GHOST_MORTAL_NAME,')') AS name
  FROM GHOSTS G
  JOIN HOUSES H ON G.ID = H.GHOST_ID
  WHERE H.HOUSE_NAME = ${houseName}
`;
const ghost = ghostQuery[0]?.name || null;


const prefectsQuery = await sql`
  SELECT CONCAT(s.last_name, ' ', s.first_name) AS name
  FROM students s
  JOIN (
      SELECT scg.student_id, MAX(
          GREATEST(scg.exam1_grade, scg.exam2_grade, scg.exam3_grade) * (1 - c.lab_ratio) 
          + scg.lab_grade * c.lab_ratio
      ) AS max_grade
      FROM student_course_grades scg
      JOIN courses c ON scg.course_id = c.id
      GROUP BY scg.student_id
  ) sub ON sub.student_id = s.id
  WHERE s.house_id = (SELECT id FROM houses WHERE HOUSE_NAME= ${houseName})
  ORDER BY sub.max_grade DESC
  LIMIT 2
`;

const prefects = prefectsQuery.map((prefect) => prefect.name) || [];

const hierarchy: HierarchyType = {
  headOfHouse,
  ghost,
  prefects,
};
  

  return (
    <div className="bg-yellow-50 p-6 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-5xl mt-20">
        <div className="relative flex justify-center mb-8 items-center">
          <div className="relative group flex flex-col items-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-red-700 bg-gradient-to-br from-yellow-50 to-red-100">
              <img
                src="/images/Gryffindor_Crest.jpeg"
                alt="Gryffindor Crest"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 bg-red-700 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 group-hover:opacity-90 group-hover:translate-y-1">
              Gryffindor Crest
            </div>
          </div>
          <div className="ml-8 max-w-md">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Gryffindor</h1>
            <p className="text-gray-700 text-md">
              Gryffindor House, founded by Godric Gryffindor, values courage,
              bravery, and determination. It is a home for those who stand up
              for what is right, even when it's hard. Its members often become
              the heroes of their stories, showing resilience in the face of
              challenges.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            What Gryffindor Expects from Students
          </h2>
          <p className="text-md text-gray-700">
            Gryffindor welcomes students who possess extraordinary bravery and
            a strong sense of justice. It values individuals who are willing to
            take risks and face challenges head-on. The house fosters a culture
            of loyalty, fearlessness, and chivalry. Students often demonstrate a
            willingness to protect their friends and fight for noble causes.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-red-600 mb-6 text-center mt-16">
            House Hierarchy
          </h2>
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-red-500">House Ghost</h3>
              <p className="text-gray-700">{hierarchy.ghost || "Loading..."}</p>
            </div>
            <div className="h-8 w-0.5 bg-red-500"></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-red-500">Head of House</h3>
              <p className="text-gray-700">
                {hierarchy.headOfHouse || "Loading..."}
              </p>
            </div>
            <div className="h-8 w-0.5 bg-red-500"></div>
            <div className="flex gap-6">
              {hierarchy.prefects.map((prefect, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center w-48"
                >
                  <h3 className="text-lg font-bold text-red-500">Prefect</h3>
                  <p className="text-gray-700">{prefect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-md text-gray-700">
            Gryffindor is led by the Head of House, who ensures that the
            students uphold the values of courage and bravery. The House Ghost,
            Nearly Headless Nick, serves as a friendly guide and historical
            figure for the students. Prefects are chosen to help maintain order
            and assist younger students in adapting to Hogwarts life. Together,
            these individuals create a supportive and disciplined environment
            for Gryffindor's members.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 mt-16">
            Gryffindor Dormitories
          </h2>
          
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative group w-80 h-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src="/images/gdorms.jpg"
              alt="Gryffindor Dormitory"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(137,108,58,0.9)] via-[rgba(137,108,58,0.5)] to-transparent flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-3xl font-semibold text-white drop-shadow-md">
                Gryffindor
              </h3>
              <p className="text-lg font-light text-white drop-shadow-sm mt-2">
                Safe in a Gryffindor's stronghold
              </p>
            </div>
          </div>
        </div>
            <div>
            <p className="text-md text-gray-700 mt-10">
            Gryffindor's dormitories are located in one of the highest towers of
            Hogwarts, offering breathtaking views of the castle grounds. The
            entrance is concealed behind the portrait of the Fat Lady, who
            requires a password for entry. The common room is warm and inviting,
            with a roaring fireplace and plush armchairs, perfect for unwinding
            after a long day of classes.
          </p>
            </div>
      </div>
    </div>
  );
};

export default Gryffindor;
