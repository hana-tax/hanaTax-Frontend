import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/InquiryResult.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/연말정산/sun.svg";
import { ReactComponent as Info } from "../../../assets/svg/Info.svg";
import deduction1 from "../../../assets/svg/금융소득/deductionMoney.svg";
import deduction2 from "../../../assets/svg/금융소득/deduction2.svg";
import deduction3 from "../../../assets/svg/금융소득/deduction3.svg";

const ResultFinancialIncome = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const targetAmount = 780000;
  const ToSolutionYearEnd = () => {
    navigate("/financialIncome/solution");
  };

  useEffect(() => {
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = targetAmount / steps;

    let currentAmount = 0;
    const interval = setInterval(() => {
      currentAmount += increment;
      if (currentAmount >= targetAmount) {
        clearInterval(interval);
        currentAmount = targetAmount;
      }
      setAmount(Math.floor(currentAmount));
    }, stepTime);

    return () => clearInterval(interval);
  }, [targetAmount]);

  const ToRefundDetails = () => {
    navigate("/yearend/refundDetails");
  };

  return (
    <div className="home-container">
      <div className="box">
        <div className="left">
          <h1>
            김하나 님은<br></br>
            금융소득 <span>분리과세</span> <br /> 대상자입니다.
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
