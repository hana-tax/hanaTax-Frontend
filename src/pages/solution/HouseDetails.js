import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../../assets/css/Solution.css";
import { ReactComponent as HouseIcon } from "../../assets/svg/연말정산/house.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Info } from "../../assets/svg/Info.svg";
import useTaxStore from "../../store/taxStore";
import useYearEndStore from "../../store/yearEndStore";
import { ToastContainer, toast } from "react-custom-alert";

const HouseDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoanChecked, setIsLoanChecked] = useState(false);
  const [isNoHouseChecked, setIsNoHouseChecked] = useState(false);
  const [isHouseSizeChecked, setIsHouseSizeChecked] = useState(false);
  const [yearlyRent, setYearlyRent] = useState(""); // 연 월세 지급액 상태 추가
  const houseBalance = useTaxStore((state) => state.houseBalance);
  const houseLoanBalance = useTaxStore((state) => state.houseLoanBalance);
  const totalIncome = useTaxStore((state) => state.totalIncome);
  const deductionLimit = 4000000;
  const deductionRate = 0.4;
  const [showTooltip, setShowTooltip] = useState(false);
  const setHouseDeductionAmount = useYearEndStore(
    (state) => state.setHouseDeductionAmount
  );
  const setMonthlyHouseDeductionAmount = useYearEndStore(
    (state) => state.setMonthlyHouseDeductionAmount
  );

  // 무주택 세대 여부에 따라 공제금 계산
  const housingSavingsDeduction = isNoHouseChecked
    ? Math.min(houseBalance * deductionRate, deductionLimit)
    : 0;

  // 무주택 세대 여부 + 국민주택 규모 여부에 따라 전세 원리금 공제금 계산
  const loanRepaymentDeduction =
    isNoHouseChecked && isHouseSizeChecked
      ? Math.min(houseLoanBalance * deductionRate, deductionLimit)
      : 0;

  // 총 공제금 계산 (주택청약 공제금 + 전세 원리금 공제금)
  const totalDeduction = Math.min(
    housingSavingsDeduction + loanRepaymentDeduction,
    deductionLimit
  );

  // 남은 금액 계산 (총 공제금이 400만 원을 넘지 않도록 제한)
  const remainingAmount = deductionLimit - totalDeduction;

  // 파이 차트에 들어갈 데이터 설정
  const data = [
    {
      name: "주택청약공제금",
      value: housingSavingsDeduction,
      fill: "#8B94D7",
    },
    {
      name: "전세원리금공제금",
      value: loanRepaymentDeduction,
      fill: "#E8AD42",
    },
    {
      name: "남은 금액",
      value: remainingAmount,
      fill: "#AAAAAA",
    },
  ];

  // 월세 공제 계산 (총 급여에 따라 17% 또는 15%) – 주택 공제가 없을 때만 가능
  const rentDeductionRate =
    totalIncome <= 55000000 ? 0.17 : totalIncome <= 70000000 ? 0.15 : 0;
  const rentDeduction = Math.min(
    parseFloat(yearlyRent || 0) * rentDeductionRate,
    7500000
  );

  useEffect(() => {
    setHouseDeductionAmount(totalDeduction);
    setMonthlyHouseDeductionAmount(rentDeduction);
  }, [
    totalDeduction,
    rentDeduction,
    setHouseDeductionAmount,
    setMonthlyHouseDeductionAmount,
  ]);

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
        {`${(data[index].value / 10000).toLocaleString()}만원`}
      </text>
    );
  };

  const isEligibleForDeduction = totalIncome <= 70000000;

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleLoanCheckboxChange = () => {
    if (isNoHouseChecked && isHouseSizeChecked) {
      toast.error("주택 공제를 받으면 월세 공제를 받을 수 없습니다.");
      return;
    }
    setIsLoanChecked(!isLoanChecked);
  };

  const handleNoHouseCheckboxChange = () => {
    setIsNoHouseChecked(!isNoHouseChecked);
  };

  const handleHouseSizeCheckboxChange = () => {
    setIsHouseSizeChecked(!isHouseSizeChecked);
  };

  const handleTooltipMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleYearlyRentChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 입력받도록 설정
    setYearlyRent(value);
  };

  return (
    <div className="deduction-container">
      <div
        className="card-header"
        onClick={toggleDetails}
        role="button"
        tabIndex="0"
        style={{ margin: "-15px" }}
      >
        <HouseIcon style={{ marginTop: "14px", marginLeft: "5px" }} />
        <span style={{ marginLeft: "-10px" }}>월세 및 주택 공제 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" style={{ marginRight: "16px" }} />
        ) : (
          <ArrowDown className="toggle-arrow" style={{ marginRight: "16px" }} />
        )}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="deduction-body">
          {isEligibleForDeduction && isNoHouseChecked ? (
            <p>
              공제 시, <br />약 {totalDeduction.toLocaleString()} 원을 돌려받을
              수 있어요!
            </p>
          ) : (
            <p>
              {isNoHouseChecked ? (
                "총 급여가 7천만원을 초과하여 공제를 받을 수 없어요."
              ) : (
                <span>
                  무주택 세대 혜택 여부에 체크하면
                  <br /> 공제를 받을 수 있어요.
                </span>
              )}
            </p>
          )}
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
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={handleNoHouseCheckboxChange}
                checked={isNoHouseChecked}
              />
              무주택 세대 혜택 여부
            </label>
            <label>
              <div className="checkbox-info">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={handleHouseSizeCheckboxChange}
                  checked={isHouseSizeChecked}
                  disabled={!isNoHouseChecked}
                />
                국민주택규모 주택 거주 여부{" "}
                <Info
                  style={{ width: "20px", marginLeft: "5px" }}
                  onMouseEnter={handleTooltipMouseEnter}
                  onMouseLeave={handleTooltipMouseLeave}
                />{" "}
                {showTooltip && (
                  <div className="tooltip-box">
                    1세대당 85㎡ (수도권 제외 지역은 100㎡) 이하인 주택
                  </div>
                )}
              </div>
            </label>
            <label>
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={handleLoanCheckboxChange}
                checked={isLoanChecked}
              />
              월세 거주 여부
            </label>
            {isLoanChecked && totalDeduction === 0 && (
              <div className="select-year-house">
                <div className="select-year-house-box">
                  연 월세 지급액{" "}
                  <input
                    type="text"
                    className="input-year-house"
                    value={yearlyRent}
                    onChange={handleYearlyRentChange}
                    placeholder="금액 입력 (숫자만)"
                  />
                </div>
                {yearlyRent && (
                  <p style={{ textAlign: "center" }}>
                    월세 공제액: {rentDeduction.toLocaleString()}원
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default HouseDetails;
