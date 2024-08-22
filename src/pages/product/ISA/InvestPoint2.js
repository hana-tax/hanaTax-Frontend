import React from "react";
import "../../../assets/css/Product.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "파생결합증권", value: 40, fill: "#3DADEC" },
  { name: "혼합형 펀드", value: 25, fill: "#E3E3E3" },
  { name: "주식형 펀드", value: 25, fill: "#7891AF" },
  { name: "RP", value: 10, fill: "#757575" },
  { name: "", value: 5, fill: "#EDEDEE" },
];

const RADIAN = Math.PI / 180; // Convert angle to radian for calculations

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={15}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InvestPoint2 = () => {
  return (
    <div className="invest-point1-container">
      <h1>자유로운 상품교체</h1>
      <div className="details-section">
        <p>
          가입기간 중 자유롭게 상품교체 가능 (비과세/저율분리과세 혜택 유지)
        </p>
        <span style={{ color: "#7684ff", marginBottom: "15px" }}>ISA</span>
        <span style={{ color: "#757575" }}>
          시장상황에 따라 자유롭게 투자비중/상품 교체
        </span>

        <div className="tooltip-container">
          <div className="tooltip">
            상품간/사업자간
            <br /> 상품교체 허용
          </div>
          <div className="triangle" />
        </div>

        <div style={{ width: "100%", height: 300, marginLeft: "150px" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={140}
                label={renderLabel}
                labelLine={false}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InvestPoint2;
