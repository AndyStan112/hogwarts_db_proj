"use client";

import React, { useEffect, useState } from "react";

const Gryffindor = () => {
  const [hierarchy, setHierarchy] = useState({
    headOfHouse: null,
    ghost: null,
    prefects: [],
  });

  useEffect(() => {
    fetch("/api/houses/gryffindor")
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
        console.error("Failed to fetch Gryffindor hierarchy:", error);
        setHierarchy({
          headOfHouse: "Error fetching data",
          ghost: "Error fetching data",
          prefects: [],
        });
      });
  }, []);

  return (
    <div className="bg-yellow-50 p-6">
      {/* Banner Section */}
      <div className="relative">
        <img
          src="/images/Gryffindor_Crest.jpeg"
          alt="Gryffindor Banner"
          className="h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* House Information */}
      <div className="mt-6 text-center">
        <h1 className="text-4xl font-bold text-red-600">Gryffindor</h1>
        <p className="mt-4 text-lg">
          The bravest of wizards are placed right in this house.
        </p>
      </div>

      {/* Hierarchy Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">House Hierarchy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Head of House */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-red-500">Head of House</h3>
            <p>{hierarchy.headOfHouse || "Loading..."}</p>
          </div>

          {/* House Ghost */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-red-500">House Ghost</h3>
            <p>{hierarchy.ghost || "Loading..."}</p>
          </div>

          {/* Prefects */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-red-500">Prefects</h3>
            {hierarchy.prefects.length > 0 ? (
              <ul>
                {hierarchy.prefects.map((prefect, index) => (
                  <li key={index}>{prefect}</li>
                ))}
              </ul>
            ) : (
              <p>No prefects available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Dormitory Image */}
      <div className="mt-6">
        <img
          src="/images/gdorms.jpg"
          alt="Gryffindor Dormitory"
          className="w-full max-w-3xl mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Gryffindor;
