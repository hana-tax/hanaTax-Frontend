import React from "react";
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

const data = [
  { name: "종합과세배당소득", value: 32, fill: "#0BB6EC" },
  { name: "종합과세이자소득", value: 68, fill: "#0FC9BA" },
  { name: "Gross-up배당소득", value: 12, fill: "#D9D9D9" },
];

const monthData = [
  { name: "1월", income: 50000000, invest: 45000000 },
  { name: "2월", income: 70000000, invest: 67000000 },
  { name: "3월", income: 90000000, invest: 86000000 },
  { name: "4월", income: 85000000, invest: 80000000 },
  { name: "5월", income: 88000000, invest: 85000000 },
  { name: "6월", income: 95000000, invest: 93000000 },
  { name: "7월", income: 87000000, invest: 85000000 },
  { name: "8월", income: 91000000, invest: 88000000 },
  { name: "9월", income: 100000000, invest: 95000000 },
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
  return (
    <div className="my-report-container">
      <div className="my-fi-box">
        <span>나의 금융소득</span>
        <br />
        233,000원
      </div>
      <p>요약</p>
      <div className="select-year">
        <select
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
          <span className="income-value">158,440원</span>
          <ArrowRight className="arrow-right-icon" />
        </div>
        <div className="income-row">
          <span className="income-label">배당소득</span>
          <span className="income-value">74,560원</span>
          <ArrowRight className="arrow-right-icon" />
        </div>
        <hr />
        <div className="total-row" style={{ marginTop: "30px" }}>
          <span className="total-label">합계</span>
          <span className="total-value">74,560원</span>
        </div>
      </div>
      <div className="fi-sum-box">
        <div className="fi-sum-text">
          <p>총 금융소득 추이</p>
          <span className="trend-change">지난달 대비 +3,000원</span>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={monthData}
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
