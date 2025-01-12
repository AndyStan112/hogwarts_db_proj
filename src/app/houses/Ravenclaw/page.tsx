import { sql } from "@/db";
import Image from "next/image";

import React, { useEffect, useState } from "react";
type HierarchyType = {
  headOfHouse: string | null;
  ghost: string | null;
  prefects: string[];
};
const houseName="Ravenclaw";

    

const Ravenclaw = async () => {
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
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-blue-700 bg-gradient-to-br from-blue-50 to-blue-200">
              <img
                src="/images/RavenclawCrest.jpeg"
                alt="Ravenclaw Crest"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 bg-blue-700 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 group-hover:opacity-90 group-hover:translate-y-1">
              Ravenclaw Crest
            </div>
          </div>
          <div className="ml-8 max-w-md">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Ravenclaw
            </h1>
            <p className="text-gray-700 text-md">
              Ravenclaw House, founded by Rowena Ravenclaw, values intelligence,
              creativity, wisdom, and a thirst for knowledge. It is a haven for
              those who seek to expand their minds and explore the mysteries of
              the world.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            What Ravenclaw Expects from Students
          </h2>
          <p className="text-md text-gray-700">
            Ravenclaw welcomes students who possess intellectual curiosity and a
            love of learning. The house values originality and independent
            thinking, encouraging its students to pursue their unique ideas and
            develop their talents. Ravenclaws are often creative problem-solvers
            who strive for academic and personal excellence.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center mt-16">
            House Hierarchy
          </h2>
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-blue-500">House Ghost</h3>
              <p className="text-gray-700">{hierarchy.ghost || "Loading..."}</p>
            </div>
            <div className="h-8 w-0.5 bg-blue-500"></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-blue-500">
                Head of House
              </h3>
              <p className="text-gray-700">
                {hierarchy.headOfHouse || "Loading..."}
              </p>
            </div>
            <div className="h-8 w-0.5 bg-blue-500"></div>
            <div className="flex gap-6">
              {hierarchy.prefects.map((prefect, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center w-48"
                >
                  <h3 className="text-lg font-bold text-blue-500">Prefect</h3>
                  <p className="text-gray-700">{prefect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-md text-gray-700">
            Ravenclaw is led by the Head of House, who fosters a culture of
            academic rigor and intellectual exploration. The House Ghost, the
            Grey Lady (Helena Ravenclaw), offers wisdom and guidance to the
            students. Prefects are chosen to help organize study groups and
            support their peers in achieving academic success.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 mt-16">
            Ravenclaw Dormitories
          </h2>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative group w-80 h-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src="/images/rdorms.jpg"
              alt="Ravenclaw Dormitory"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(48,79,158,0.9)] via-[rgba(48,79,158,0.5)] to-transparent flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-3xl font-semibold text-white drop-shadow-md">
                Ravenclaw
              </h3>
              <p className="text-lg font-light text-white drop-shadow-sm mt-2">
              Endless things to explore here.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-md text-gray-700 mt-10">
            Ravenclaw's dormitories are located in a tower high above Hogwarts,
            offering stunning views of the castle grounds. The entrance is
            concealed by a door that requires solving a riddle to enter, testing
            the wit and wisdom of its members. The common room is airy and
            filled with books, globes, and other tools of learning, making it a
            perfect place for intellectual inspiration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ravenclaw;
