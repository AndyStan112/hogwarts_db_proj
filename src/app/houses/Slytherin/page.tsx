"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";

const Slytherin = () => {
  const [hierarchy, setHierarchy] = useState({
    headOfHouse: "",
    ghost: "",
    prefects: [] as string[],
  });
  

  useEffect(() => {
    fetch("/api/houses/house?name=Slytherin")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setHierarchy(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Slytherin hierarchy:", error);
        setHierarchy({
          headOfHouse: "Error fetching data",
          ghost: "Error fetching data",
          prefects: [],
        });
      });
  }, []);

  return (
    <div className="bg-yellow-50 p-6 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-5xl mt-20">
        <div className="relative flex justify-center mb-8 items-center">
          <div className="relative group flex flex-col items-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-green-700 bg-gradient-to-br from-green-50 to-green-200">
              <Image
                src="/images/SlytherinCrest.jpeg"
                alt="Slytherin Crest"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 bg-green-700 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 group-hover:opacity-90 group-hover:translate-y-1">
              Slytherin Crest
            </div>
          </div>
          <div className="ml-8 max-w-md">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Slytherin
            </h1>
            <p className="text-gray-700 text-md">
              Slytherin House, founded by Salazar Slytherin, values ambition,
              cunning, resourcefulness, and determination. Its members are often
              known for their drive to achieve greatness and willingness to take
              risks to achieve their goals.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            What Slytherin Expects from Students
          </h2>
          <p className="text-md text-gray-700">
            Slytherin welcomes students who are ambitious, resourceful, and
            determined to succeed. The house values leadership qualities,
            strategic thinking, and the ability to make difficult decisions. Its
            students are often known for their loyalty to their own and their
            willingness to seize opportunities.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-green-600 mb-6 text-center mt-16">
            House Hierarchy
          </h2>
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-green-500">House Ghost</h3>
              <p className="text-gray-700">{hierarchy.ghost || "Loading..."}</p>
            </div>
            <div className="h-8 w-0.5 bg-green-500"></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-green-500">
                Head of House
              </h3>
              <p className="text-gray-700">
                {hierarchy.headOfHouse || "Loading..."}
              </p>
            </div>
            <div className="h-8 w-0.5 bg-green-500"></div>
            <div className="flex gap-6">
              {hierarchy.prefects.map((prefect, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center w-48"
                >
                  <h3 className="text-lg font-bold text-green-500">Prefect</h3>
                  <p className="text-gray-700">{prefect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-md text-gray-700">
            Slytherin is led by the Head of House, who encourages students to
            strive for their full potential while maintaining the values of
            cunning and ambition. The House Ghost, the Bloody Baron, is a
            mysterious and intimidating figure who oversees the students.
            Prefects are selected to inspire and guide younger students to
            achieve excellence.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4 mt-16">
            Slytherin Dormitories
          </h2>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative group w-80 h-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/sdorms"
              alt="Slytherin Dormitory"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(137,108,58,0.9)] via-[rgba(137,108,58,0.5)] to-transparent flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-3xl font-semibold text-white drop-shadow-md">
                Slytherin
              </h3>
              <p className="text-lg font-light text-white drop-shadow-sm mt-2">
                Ambition flows within these walls.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-md text-gray-700 mt-10">
            Slytherin’s dormitories are located in the dungeons beneath
            Hogwarts, giving them a unique and atmospheric environment. The
            entrance is concealed by a stone wall that opens only with a
            password. The common room features green lanterns, dark leather
            furniture, and views of the Black Lake, creating a serene yet
            ambitious atmosphere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slytherin;
