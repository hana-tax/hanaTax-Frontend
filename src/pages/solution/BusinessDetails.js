import React, { useState, useEffect } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/briefcase.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import useTaxStore from "../../store/taxStore";
import useYearEndStore from "../../store/yearEndStore";

const BusinessDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
  const taxAmount = useTaxStore((state) => state.taxAmount);
  const setBusinessDeduction = useYearEndStore(
    (state) => state.setBusinessDeduction
  );

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // 중소기업 소득세 감면 계산 (min(taxAmount * 90%, 200만원))
  const reducedTax = isChecked ? Math.min(taxAmount * 0.9, 2000000) : null;

  useEffect(() => {
    setBusinessDeduction(reducedTax || 0);
  }, [reducedTax, setBusinessDeduction]);

  return (
    <div className="card-container">
      <div
        className="card-header"
        onClick={toggleDetails}
        style={{ margin: "6px" }}
      >
        <UserIcon />
        <span>중소기업 감면 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" style={{ marginRight: "-5px" }} />
        ) : (
          <ArrowDown className="toggle-arrow" style={{ marginRight: "-5px" }} />
        )}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="deduction-body">
          <p>
            중소기업 소득세 감면 신청 시, <br />
            {reducedTax !== null
              ? `약 ${reducedTax.toLocaleString()}원 돌려받을 수 있어요!`
              : "감면 금액을 확인하려면 선택하세요."}
          </p>
          <div className="business-body">
            <span>
              중소기업에 재직 중이고, <br />
              재직 기간이 5년 미만이신가요?
            </span>
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
