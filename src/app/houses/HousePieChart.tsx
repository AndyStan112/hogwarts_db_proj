"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

  const COLORS = ["#AE0001", "#FFDB00", "#000A90", "#2A623D"]; 

  type PieChartProps = {
    data: { house: string; count: number; color: string }[];
  };


  
  const HousePieChart = ({ data }: PieChartProps) => {


    console.log(data);
    const transformedData = data.map((house: { house: string; count: number; color: string }) => ({
  name: house.house,
  value: house.count
}));

    
    return (
    <div className="p-8 bg-transparent min-h-screen flex flex-col items-center">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={transformedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
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
