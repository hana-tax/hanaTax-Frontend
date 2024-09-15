import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/piggy-bank.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as MoneyIcon } from "../../assets/svg/연말정산/money.svg";
import { useNavigate } from "react-router-dom";
import useTaxStore from "../../store/taxStore";

const IrpDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalIncome = useTaxStore((state) => state.totalIncome); // 총 급여
  const pensionSavingBalance = useTaxStore(
    (state) => state.pensionSavingBalance
  );
  const navigate = useNavigate();

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const goToPensionSignUp = () => {
    navigate("/pension/product");
  };

  const totalLimit = 9000000;
  const remainingLimit = totalLimit - pensionSavingBalance;

  const deductionRate = totalIncome <= 55000000 ? 0.15 : 0.12;

  const deductionAmount = Math.floor(pensionSavingBalance * deductionRate);

  return (
    <div className="card-container">
      <div
        className="card-header"
        onClick={toggleDetails}
        style={{ margin: "-6px" }}
      >
        <UserIcon />
        <span>연금저축 및 IRP 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" style={{ marginRight: "5px" }} />
        ) : (
          <ArrowDown className="toggle-arrow" style={{ marginRight: "5px" }} />
        )}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="irp-body">
          <p>
            소비 패턴 분석 결과, <br />
            매달 약 357,000원이 자고 있어요. <br />
            저축도 하고 세액공제도 받는 건 어때요?
          </p>
          <div className="irp-account-body">
            <MoneyIcon />
            <span>
              연금저축 계좌를 개설하면 <br />
              {deductionRate * 100}% 세액공제 혜택을 받을 수 있어요!
            </span>
            <button className="button" onClick={goToPensionSignUp}>
              계좌 개설하기
            </button>
          </div>
          <div className="irp-limit-body">
            <span>
              IRP 세액공제 한도가 <br />
              {remainingLimit.toLocaleString()}원 남았어요! <br />
              {deductionAmount.toLocaleString()}원 공제받을 수 있어요.
            </span>
            <div className="limit-all-bar">
              <div
                className="limit-bar"
                style={{
                  width: `${(pensionSavingBalance / totalLimit) * 100}%`,
                }}
              ></div>
              <div
                className="limit-circle"
                style={{
                  left: `${(pensionSavingBalance / totalLimit) * 100 - 2}%`,
                }}
              ></div>
            </div>
            <div className="limit-text-unit">
              <div
                className="limit-text"
                style={{
                  left: `${(pensionSavingBalance / totalLimit) * 100}%`,
                }}
              >
                {Math.floor(pensionSavingBalance / 10000).toLocaleString()}
              </div>
              <div className="unit">900(만원)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrpDetails;
