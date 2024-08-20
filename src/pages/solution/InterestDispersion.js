import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Deduction1 } from "../../assets/svg/금융소득/deductionMoney.svg";
import InterestChart from "./InterestChart";

const InterestDispersion = () => {
  const [items] = useState([
    {
      percentage: 12,
      description: "신용카드",
      color: "#90B6FF",
      amount: 521,
      unit: 5000,
    },
    {
      percentage: 7,
      description: "체크카드, 현금",
      color: "#FEA6FA",
      amount: 357,
      unit: 5000,
    },
    {
      percentage: 0,
      description: "카드 공제 금액",
      color: "#FFDC97",
      amount: 0,
      unit: 300,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="interest-dispersion-container">
      <div className="card-header" onClick={toggleDetails}>
        <Deduction1 />
        <span>이자 및 배당소득 분산하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}{" "}
      </div>
      {isOpen && (
        <div className="interest-dispersion-body">
          <div className="card-box">
            <p>한 해에 몰리지 않게 이자, 배당소득 분산하기!</p>
            <div className="text">
              <span>
                Tip.채권 또는 정기예금은 발생시점을 선택하기 쉽지 않습니다.
                <span style={{ color: "#F0C557" }}>펀드</span>,{" "}
                <span style={{ color: "#F0C557" }}>주식</span>과 같이 만기가
                없는 상품의 경우 원할 때 처분할 수 있어 선택이 용이합니다!
              </span>
            </div>
            <InterestChart />
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestDispersion;
