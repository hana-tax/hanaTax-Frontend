import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/InquiryResult.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/연말정산/sun.svg";
import { ReactComponent as Info } from "../../../assets/svg/Info.svg";
import creditCardIcon from "../../../assets/svg/연말정산/credit-card.svg";
import userIcon from "../../../assets/svg/연말정산/user.svg";
import houseIcon from "../../../assets/svg/연말정산/house.svg";
import briefcaseIcon from "../../../assets/svg/연말정산/briefcase.svg";
import piggyBankIcon from "../../../assets/svg/연말정산/piggy-bank.svg";

const ResultYearEnd = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const targetAmount = 780000;
  const ToSolutionYearEnd = () => {
    navigate("/yearend/solution");
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
            <div className="price">{amount.toLocaleString()} 원</div>받을 수
            있어요!
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
          <h2>
            13월의 월급을 <span className="highlight">더 많이</span> 받을 수
            있는 <br></br>방법을 알려드릴게요!
          </h2>
          <div className="slider">
            <div className="slide-track">
              <div className="slide">
                <img src={creditCardIcon} alt="Credit Card" />
              </div>
              <div className="slide">
                <img src={userIcon} alt="User" />
              </div>
              <div className="slide">
                <img src={houseIcon} alt="House" />
              </div>
              <div className="slide">
                <img src={briefcaseIcon} alt="Briefcase" />
              </div>
              <div className="slide">
                <img src={piggyBankIcon} alt="Piggy Bank" />
              </div>
              <div className="slide">
                <img src={creditCardIcon} alt="Credit Card" />
              </div>
              <div className="slide">
                <img src={userIcon} alt="User" />
              </div>
              <div className="slide">
                <img src={houseIcon} alt="House" />
              </div>
              <div className="slide">
                <img src={briefcaseIcon} alt="Briefcase" />
              </div>
              <div className="slide">
                <img src={piggyBankIcon} alt="Piggy Bank" />
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

export default ResultYearEnd;
