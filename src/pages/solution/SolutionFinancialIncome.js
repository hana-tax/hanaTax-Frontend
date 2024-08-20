import React from "react";
import "../../assets/css/Solution.css";
import InterestDispersion from "./InterestDispersion";
import { useNavigate } from "react-router-dom";
import FamilyDispersion from "./FamilyDispersion";
import OtherIncomeDispersion from "./OtherIncomeDispersion";
import TaxFreeDispersion from "./TaxFreeDispersion";

const SolutionFinancialIncome = () => {
  const navigate = useNavigate();
  const ToHome = () => {
    navigate("/");
  };
  return (
    <div className="solution-detail-container">
      <div className="summary">
        <h1>
          솔루션 이행시, <br></br>최대 <span>1,917,150원 </span>
          아낄 수 있어요!
        </h1>
        <p>
          절세 전략을 살펴보세요. <br></br>이행할때 마다 아낄 수 있는 돈이
          늘어나요.
        </p>
      </div>
      <InterestDispersion />
      <FamilyDispersion />
      <TaxFreeDispersion />
      <OtherIncomeDispersion />

      <button onClick={ToHome}>메인으로</button>
    </div>
  );
};

export default SolutionFinancialIncome;
