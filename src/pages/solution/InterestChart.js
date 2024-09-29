import React, { useState, useEffect } from "react";
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
import axios from "axios";

const InterestChart = ({ onDataLoad }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/income/incomeList", {
          financialIncomeId: 7,
        });

        const rawData = response.data;

        const months = [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
        ];
        const initialData = months.map((month) => ({
          name: month,
          이자: 0,
          배당: 0,
        }));

        rawData.forEach((item) => {
          const date = new Date(item.incomeDate);
          const monthIndex = date.getMonth();
          if (item.incomeType === 34) {
            initialData[monthIndex]["이자"] += item.incomeAccount;
          } else if (item.incomeType === 35) {
            initialData[monthIndex]["배당"] += item.incomeAccount;
          }
        });

        setData(initialData);
        onDataLoad(initialData); // 데이터 로드 후 분산 평가 호출
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchData();
  }, [onDataLoad]);

  return (
    <div
      style={{
        marginLeft: "-35px",
        width: "120%",
        fontSize: "12px",
        marginTop: "20px",
      }}
    >
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
