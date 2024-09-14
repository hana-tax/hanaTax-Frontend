import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/piggy-bank.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as MoneyIcon } from "../../assets/svg/연말정산/money.svg";
import { useNavigate } from "react-router-dom";

const IrpDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const goToPensionSignUp = () => {
    navigate("/pension/product");
  };

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
              15% 세액공제 혜택을 받을 수 있어요!
            </span>
            <button className="button" onClick={goToPensionSignUp}>
              계좌 개설하기
            </button>
          </div>
          <div className="irp-limit-body">
            <span>
              IRP 세액공제 한도가 <br />
              7,680,000원 남았어요! <br />
              198,000원 공제받을 수 있어요.
            </span>
            <div className="limit-all-bar">
              <div className="limit-bar" style={{ width: "30%" }}></div>
              <div className="limit-circle" style={{ left: "28%" }}></div>
            </div>
            <div className="limit-text-unit">
              <div className="limit-text" style={{ left: "30%" }}>
                132
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
