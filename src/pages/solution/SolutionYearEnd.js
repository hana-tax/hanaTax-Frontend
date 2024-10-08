import React from "react";
import "../../assets/css/Solution.css";
import CardDetails from "./CardDetails";
import PersonDetails from "./PersonDetails";
import HouseDetails from "./HouseDetails";
import BusinessDetails from "./BusinessDetails";
import IrpDetails from "./IrpDetails";
import { useNavigate } from "react-router-dom";
import useTaxStore from "../../store/taxStore";
import useYearEndStore from "../../store/yearEndStore";

const SolutionYearEnd = () => {
  const navigate = useNavigate();
  const ToResult = () => {
    navigate("/yearend/solution/result");
  };

  const { houseLoanBalance, pensionSavingBalance } = useTaxStore(); // 필요한 값들 가져오기
  const {
    personDeduction,
    cardDeductionAmount,
    houseDeductionAmount,
    monthlyHouseDeductionAmount,
    businessDeduction,
    insuranceDeduction,
  } = useYearEndStore(); // 필요한 값들 가져오기
  const totalSavings =
    personDeduction +
    cardDeductionAmount +
    houseDeductionAmount +
    monthlyHouseDeductionAmount +
    businessDeduction +
    insuranceDeduction; // 총 절세 금액 계산

  return (
    <div className="solution-detail-container">
      <div className="summary">
        <h1>
          솔루션 이행시, <br></br>최대{" "}
          <span>{totalSavings.toLocaleString()}원 </span>
          아낄 수 있어요!
        </h1>
        <p>
          공제를 추가해보세요. <br></br>추가할때 마다 아낄 수 있는 돈이
          늘어나요.
        </p>
      </div>
      <CardDetails />
      <PersonDetails />
      <HouseDetails />
      <BusinessDetails />
      <IrpDetails />
      <button onClick={ToResult}>결과 확인하기</button>
    </div>
  );
};

export default SolutionYearEnd;
