import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/InquiryResult.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/연말정산/sun.svg";
import { ReactComponent as Info } from "../../../assets/svg/Info.svg";

const ResultYearEnd = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const targetAmount = 780000;

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

  const ToAllofYearEnd = () => {
    navigate("/allofYearEnd");
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

          <button className="description-button" onClick={ToAllofYearEnd}>
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
    </div>
  );
};

export default ResultYearEnd;
