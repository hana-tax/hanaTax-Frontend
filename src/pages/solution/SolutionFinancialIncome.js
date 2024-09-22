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
        <h1>절세가이드 전략을 살펴보세요.</h1>
        <p>
          절세 전략을 살펴보세요. <br></br>
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
