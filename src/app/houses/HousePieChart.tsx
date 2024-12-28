"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const HousePieChart = () => {
  const COLORS = ["#AE0001", "#FFDB00", "#000A90", "#2A623D"]; 
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    async function fetchHouseData() {
      try {
        const response = await fetch("/api/houses/count");
        const fetchedData = await response.json();
        const transformedData = fetchedData.map((house: { house: string; count: string }) => ({
          name: house.house,
          value: parseInt(house.count, 10),
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching house data:", error);
      }
    }

    fetchHouseData();
  }, []);

  console.log(data);
  
  if (data.length === 0) {
    return (
      <div className="p-8 bg-transparent min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading or no data available...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-transparent min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Student Distribution by House</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HousePieChart;
