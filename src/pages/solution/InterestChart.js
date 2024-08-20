import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1월", 이자: 50, 배당: 50 },
  { name: "2월", 이자: 60, 배당: 55 },
  { name: "3월", 이자: 65, 배당: 63 },
  { name: "4월", 이자: 70, 배당: 67 },
  { name: "5월", 이자: 80, 배당: 72 },
  { name: "6월", 이자: 95, 배당: 85 },
  { name: "7월", 이자: 100, 배당: 95 },
  { name: "8월", 이자: 120, 배당: 110 },
  { name: "9월", 이자: 130, 배당: 115 },
  { name: "10월", 이자: 140, 배당: 130 },
];

const InterestChart = () => {
  return (
    <div style={{ marginLeft: "-35px", width: "120%", marginTop: "20px" }}>
      {" "}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="이자"
            stroke="#FF5BA1"
            strokeWidth={4}
          />
          <Line
            type="monotone"
            dataKey="배당"
            stroke="#5BC9FF"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InterestChart;
