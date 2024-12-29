"use client";

import React, { useEffect, useState } from "react";

const Hufflepuff = () => {
  const [hierarchy, setHierarchy] = useState({
    headOfHouse: null,
    ghost: null,
    prefects: [],
  });

  useEffect(() => {
    fetch("/api/houses/hufflepuff")
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
        console.error("Failed to fetch Hufflepuff hierarchy:", error);
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
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-200">
              <img
                src="/images/HufflepuffCrest.jpeg"
                alt="Hufflepuff Crest"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 bg-yellow-500 text-black text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 group-hover:opacity-90 group-hover:translate-y-1">
              Hufflepuff Crest
            </div>
          </div>
          <div className="ml-8 max-w-md">
            <h1 className="text-4xl font-bold text-yellow-600 mb-4">
              Hufflepuff
            </h1>
            <p className="text-gray-700 text-md">
              Hufflepuff House, founded by Helga Hufflepuff, values hard work,
              patience, loyalty, and fair play. It is known for its inclusive
              nature, welcoming students who are willing to dedicate themselves
              to their studies and friendships.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
            What Hufflepuff Expects from Students
          </h2>
          <p className="text-md text-gray-700">
            Hufflepuff welcomes students who are kind-hearted, dependable, and
            committed. The house values inclusivity and hard work, recognizing
            that success comes from perseverance and dedication. Students in
            Hufflepuff are known for being supportive teammates and loyal
            friends.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-6 text-center mt-16">
            House Hierarchy
          </h2>
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-yellow-600">House Ghost</h3>
              <p className="text-gray-700">{hierarchy.ghost || "Loading..."}</p>
            </div>
            <div className="h-8 w-0.5 bg-yellow-500"></div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-64">
              <h3 className="text-lg font-bold text-yellow-600">
                Head of House
              </h3>
              <p className="text-gray-700">
                {hierarchy.headOfHouse || "Loading..."}
              </p>
            </div>
            <div className="h-8 w-0.5 bg-yellow-600"></div>
            <div className="flex gap-6">
              {hierarchy.prefects.map((prefect, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center w-48"
                >
                  <h3 className="text-lg font-bold text-yellow-600">Prefect</h3>
                  <p className="text-gray-700">{prefect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-md text-gray-700">
            Hufflepuff is led by the Head of House, who fosters a sense of
            fairness and community among its members. The House Ghost, the Fat
            Friar, is a cheerful and welcoming figure who enjoys supporting the
            students. Prefects are chosen to guide and mentor younger students,
            ensuring everyone feels included and valued.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-4 mt-16">
            Hufflepuff Dormitories
          </h2>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative group w-80 h-80 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img
              src="/images/hdorms.jpg"
              alt="Hufflepuff Dormitory"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(221,187,118,0.9)] via-[rgba(221,187,118,0.5)] to-transparent flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-3xl font-semibold text-white drop-shadow-md">
                Hufflepuff
              </h3>
              <p className="text-lg font-light text-white drop-shadow-sm mt-2">
              Cozy as a badger in a den!
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-md text-gray-700 mt-10">
            Hufflepuff’s dormitories are located near the Hogwarts kitchens,
            offering a cozy and homey environment. The entrance is concealed
            behind a stack of barrels that require a rhythmic tap to enter. The
            common room is earthy and warm, with plants, overstuffed sofas, and
            a golden glow that makes every student feel at home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hufflepuff;
