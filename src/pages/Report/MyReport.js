import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../../assets/css/Report.css";
import { ReactComponent as ArrowRight } from "../../assets/svg/arrow-right.svg";

const initialMonthData = [
  { name: "1월", income: 0, invest: 0 },
  { name: "2월", income: 0, invest: 0 },
  { name: "3월", income: 0, invest: 0 },
  { name: "4월", income: 0, invest: 0 },
  { name: "5월", income: 0, invest: 0 },
  { name: "6월", income: 0, invest: 0 },
  { name: "7월", income: 0, invest: 0 },
  { name: "8월", income: 0, invest: 0 },
  { name: "9월", income: 0, invest: 0 },
  { name: "10월", income: 0, invest: 0 },
  { name: "11월", income: 0, invest: 0 },
  { name: "12월", income: 0, invest: 0 },
];

const RADIAN = Math.PI / 180;
const commonFontStyle = {
  fontFamily: "Pretendard-Regular",
  fontSize: "14px",
  color: "#B3B3B3",
  fontWeight: "bold",
};
const xFontStyle = {
  fontFamily: "Pretendard-Regular",
  fontSize: "14px",
  color: "#B3B3B3",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((acc, cur) => acc + cur.value, 0);
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h4 style={{ fontSize: "18px", marginBottom: "5px" }}>{label}</h4>
        <div className="tooltip-box">
          <p style={{ color: "#AAAAAA" }}>
            이자{" "}
            <span style={{ color: "#AAAAAA" }}>
              {payload.find((item) => item.name === "income")?.value}원
            </span>
          </p>
        </div>
        <div className="tooltip-box">
          <p style={{ color: "#AAAAAA" }}>
            배당{" "}
            <span style={{ color: "#AAAAAA" }}>
              {payload.find((item) => item.name === "invest")?.value}원
            </span>
          </p>
        </div>
        <div className="tooltip-box">
          <p style={{ color: "#18CD8C" }}>합계 {total}원</p>
        </div>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
};

const formatKoreanCurrency = (value) => {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(0)}억`;
  } else if (value >= 10000000) {
    return `${(value / 10000000).toFixed(0)}천만`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}백만`;
  } else if (value >= 100000) {
    return `${(value / 100000).toFixed(0)}십만`;
  } else if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}만`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}천`;
  } else if (value >= 100) {
    return `${(value / 100).toFixed(0)}백`;
  }
  return value.toString();
};

const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;

  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx="5" ry="5" />
  );
};

const MyReport = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [totalInterestIncome, setTotalInterestIncome] = useState(0);
  const [totalDividendIncome, setTotalDividendIncome] = useState(0);
  const [monthlyData, setMonthlyData] = useState(initialMonthData);
  const [differenceFromLastMonth, setDifferenceFromLastMonth] = useState(0);

  const financialIncomeIds = {
    2024: 7,
    2023: 6,
    2022: 5,
    2021: 4,
    2020: 3,
    2019: 2,
    2018: 1,
  };
  const fetchIncomeData = async () => {
    const financialIncomeId = financialIncomeIds[selectedYear];
    try {
      const response = await axios.post(
        "http://localhost:8080/api/income/incomeList",
        {
          financialIncomeId,
        }
      );
      let interestIncome = 0;
      let dividendIncome = 0;
      let lastMonthTotal = 0;

      // 월별 데이터 초기화
      let updatedMonthlyData = [...initialMonthData];

      response.data.forEach((item) => {
        const incomeDate = new Date(item.incomeDate);
        const monthIndex = incomeDate.getMonth(); // 0-11

        if (item.incomeType === 34) {
          interestIncome += item.incomeAccount; // 이자소득 합산
          updatedMonthlyData[monthIndex].income += item.incomeAccount; // 월별 이자소득 추가
        } else if (item.incomeType === 35 || item.incomeType === 36) {
          dividendIncome += item.incomeAccount; // 배당소득 합산
          updatedMonthlyData[monthIndex].invest += item.incomeAccount; // 월별 배당소득 추가
        }
      });

      if (selectedYear === 2024) {
        updatedMonthlyData = updatedMonthlyData.slice(0, 9);
      }

      const currentMonthTotal =
        updatedMonthlyData[updatedMonthlyData.length - 1].income +
        updatedMonthlyData[updatedMonthlyData.length - 1].invest; // 마지막 달의 합계
      lastMonthTotal =
        updatedMonthlyData[updatedMonthlyData.length - 2]?.income +
          updatedMonthlyData[updatedMonthlyData.length - 2]?.invest || 0; // 마지막 전 달의 합계

      const difference = currentMonthTotal - lastMonthTotal;
      setDifferenceFromLastMonth(difference);

      setTotalDividendIncome(dividendIncome);
      setTotalInterestIncome(interestIncome);
      setMonthlyData(updatedMonthlyData); // 월별 데이터 상태 업데이트
      console.log(response.data);
      console.log(updatedMonthlyData);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  useEffect(() => {
    fetchIncomeData(); // 연도 선택이 변경될 때마다 데이터 요청
  }, [selectedYear]);

  const data = [
    { name: "종합과세배당소득", value: totalDividendIncome, fill: "#0BB6EC" },
    { name: "종합과세이자소득", value: totalInterestIncome, fill: "#0FC9BA" },
    { name: "Gross-up배당소득", value: 0, fill: "#D9D9D9" },
  ];

  return (
    <div className="my-report-container">
      <div className="my-fi-box">
        <span>나의 금융소득</span>
        <br />
        {(totalInterestIncome + totalDividendIncome).toLocaleString()}원
      </div>
      <p>요약</p>
      <div className="select-year">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: "5px",
            border: "1px solid #E3E3E3",
            fontSize: "14px",
          }}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="legend-container">
        {data.map((entry, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ background: entry.fill }}
            ></span>
            <span
              className="legend-text"
              style={{ fontSize: "14px", color: "#757575" }}
            >
              {entry.name}
            </span>
          </div>
        ))}
      </div>
      <div className="income-total-box">
        <div className="income-row">
          <span className="income-label">이자소득</span>
          <span className="income-value">
            {totalInterestIncome.toLocaleString()}원
          </span>
          <ArrowRight className="arrow-right-icon" />
        </div>
        <div className="income-row">
          <span className="income-label">배당소득</span>
          <span className="income-value">
            {totalDividendIncome.toLocaleString()}원
          </span>
          <ArrowRight className="arrow-right-icon" />
        </div>
        <hr />
        <div className="total-row" style={{ marginTop: "30px" }}>
          <span className="total-label">합계</span>
          <span className="total-value">
            {(totalDividendIncome + totalInterestIncome).toLocaleString()}원
          </span>
        </div>
      </div>
      <div className="fi-sum-box">
        <div className="fi-sum-text">
          <p>총 금융소득 추이</p>
          <span className="trend-change">
            지난달 대비 {differenceFromLastMonth >= 0 ? "+" : ""}
            {differenceFromLastMonth.toLocaleString()}원
          </span>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ style: commonFontStyle }} />
            <YAxis
              tickFormatter={formatKoreanCurrency}
              tick={{ style: xFontStyle }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={commonFontStyle} />
            <Bar dataKey="income" fill="#13BD7E" stackId="a" />
            <Bar
              dataKey="invest"
              fill="#EDEDEE"
              stackId="a"
              shape={<CustomBarShape />}
            />
            <Line type="monotone" dataKey="lastMonth" stroke="#FF7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyReport;
