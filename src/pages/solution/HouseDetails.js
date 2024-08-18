import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../../assets/css/Solution.css";
import { ReactComponent as HouseIcon } from "../../assets/svg/연말정산/house.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";

const data = [
  { name: "주택청약공제금", value: 240, fill: "#8B94D7" },
  { name: "전세원리금공제금", value: 124, fill: "#E8AD42" },
  { name: "남은 금액", value: 36, fill: "#AAAAAA" },
];

const RADIAN = Math.PI / 180;
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

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: "12px" }}
    >
      {`${data[index].value}만원`}
    </text>
  );
};

const HouseDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoanChecked, setIsLoanChecked] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleLoanCheckboxChange = () => {
    setIsLoanChecked(!isLoanChecked);
  };

  return (
    <div className="deduction-container">
      <div
        className="card-header"
        onClick={toggleDetails}
        role="button"
        tabIndex="0"
      >
        <HouseIcon />
        <span>월세 및 주택 대출 상환공제 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      {isOpen && (
        <div className="deduction-body">
          <p>
            전세 대출 공제 시, <br />약 2,757,600원 돌려 받을 수 있어요!
          </p>
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
                <span className="legend-text">{entry.name}</span>
              </div>
            ))}
          </div>
          <div className="deduction-switch">
            <label>
              <input type="checkbox" className="custom-checkbox" />
              무주택 세대 해택 여부
            </label>
            <label>
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={handleLoanCheckboxChange}
              />
              월세 및 전세 대출 보유 여부
            </label>
            {isLoanChecked && (
              <div className="select-radio">
                <input type="radio" name="rentType" /> 월세
                <input
                  type="radio"
                  name="rentType"
                  style={{ marginLeft: "20px" }}
                />{" "}
                전세
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
