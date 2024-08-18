import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/briefcase.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";

const BusinessDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-container">
      <div className="card-header" onClick={toggleDetails}>
        <UserIcon />
        <span>중소기업 감면 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      {isOpen && (
        <div className="deduction-body">
          <p>
            중소기업 소득세 감면 신청시, <br />약 2,000,000원 돌려받을 수
            있어요!
          </p>
          <div className="business-body">
            <span>
              중소기업에 재직 중이고, <br />
              재직 기간이 5년 미만이신가요?
            </span>
            <input type="checkbox" className="custom-checkbox" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetails;
