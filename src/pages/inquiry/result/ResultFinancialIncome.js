import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/InquiryResult.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/연말정산/sun.svg";
import { ReactComponent as Info } from "../../../assets/svg/Info.svg";
import deduction1 from "../../../assets/svg/금융소득/deductionMoney.svg";
import deduction2 from "../../../assets/svg/금융소득/deduction2.svg";
import deduction3 from "../../../assets/svg/금융소득/deduction3.svg";
import useStore from "../../../store/useStore";
import useFinancialIncomeStore from "../../../store/financialIncomeStore";
import axios from "axios";

const ResultFinancialIncome = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setFinancialIncomeId = useFinancialIncomeStore(
    (state) => state.setFinancialIncomeId
  );
  const [isOverTax, setIsOverTax] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchTaxStatus = async () => {
        try {
          const response = await axios.post("/api/income/isOverTax", {
            id: user.id,
          });
          const { isOverTax, financialIncomeId } = response.data;

          console.log(isOverTax);
          setIsOverTax(isOverTax === "Y" ? "종합과세" : "분리과세");

          setFinancialIncomeId(financialIncomeId);
        } catch (error) {
          console.error("API 호출 오류:", error);
        }
      };

      fetchTaxStatus();
    }
  }, [user, navigate, setFinancialIncomeId]);

  const ToSolutionYearEnd = () => {
    navigate("/financialIncome/solution");
  };

  const ToRefundDetails = () => {
    navigate("/financialIncome/refundDetails");
  };

  return (
    <div className="home-container">
      <div className="box">
        <div className="left">
          <h1>
            {user.name} 님은<br></br>
            금융소득 <span>{isOverTax}</span> <br /> 대상자입니다.
          </h1>

          <button className="description-button" onClick={ToRefundDetails}>
            자세히 보기{" "}
          </button>
        </div>
        <div className="right">
          <Char />
        </div>
      </div>

      <div className="description">
        <div className="description-text">위 금액은 예상납부금입니다.</div>
        <Info />
      </div>

      <div className="solution-container">
        <div className="solutions-section">
          <h2>똑똑한 절세 방법을 알려드릴게요!</h2>
          <div className="slider">
            <div className="slide-track">
              <div className="slide">
                <img src={deduction1} alt="money" />
              </div>
              <div className="slide">
                <img src={deduction2} alt="present" />
              </div>
              <div className="slide">
                <img src={deduction3} alt="money-bank" />
              </div>
              <div className="slide">
                <img src={deduction1} alt="money" />
              </div>
              <div className="slide">
                <img src={deduction2} alt="present" />
              </div>
              <div className="slide">
                <img src={deduction3} alt="money-bank" />
              </div>
              <div className="slide">
                <img src={deduction1} alt="money" />
              </div>
              <div className="slide">
                <img src={deduction2} alt="present" />
              </div>
              <div className="slide">
                <img src={deduction3} alt="money-bank" />
              </div>
            </div>
          </div>
          <button className="solution-button" onClick={ToSolutionYearEnd}>
            솔루션 보러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultFinancialIncome;
