"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

type HouseData = {
  house: string;
  count: number;
};

export default function HouseChart() {
  const [houseData, setHouseData] = useState<HouseData[]>([]);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    async function fetchHouseData() {
      try {
        const response = await fetch("/api/houses/count");
        const data: HouseData[] = await response.json();
        console.log("Fetched Data:", data); // Debug fetched data
        setHouseData(data);
      } catch (error) {
        console.error("Error fetching house data:", error);
      }
    }

    fetchHouseData();
  }, []);

  if (houseData.length === 0) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center bg-transparent">
        <p className="text-gray-500">Loading or no data available...</p>
      </div>
    );
  }

  const COLORS = ["#AE0001", "#FFDB00", "#000A90", "#2A623D"];
  const totalStudents = houseData.reduce((sum, house) => sum + house.count, 0);
  const dataWithPercentages = houseData.map((house, index) => ({
    ...house,
    percentage: ((house.count / totalStudents) * 100).toFixed(2),
    color: COLORS[index % COLORS.length],
  }));

  console.log("Data With Percentages:", dataWithPercentages); // Debug transformed data

  return (
    <div className="p-8 bg-transparent min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Student Distribution by House</h1>
      <div className="flex justify-center mb-6">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            chartType === "bar" ? "bg-[#d1ab59] text-black" : "bg-gray-300"
          }`}
          onClick={() => setChartType("bar")}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            chartType === "pie" ? "bg-[#d1ab59] text-black" : "bg-gray-300"
          }`}
          onClick={() => setChartType("pie")}
        >
          Pie Chart
        </button>
      </div>
      <div className="relative w-full h-[400px] max-w-3xl mx-auto">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataWithPercentages}>
              <XAxis dataKey="house" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8">
                {dataWithPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentages}
                dataKey="count"
                nameKey="house"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60} // Adjusted for a doughnut style
                label={({ house, percentage }) =>
                  `${house}: ${percentage}%`
                }
              >
                {dataWithPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
