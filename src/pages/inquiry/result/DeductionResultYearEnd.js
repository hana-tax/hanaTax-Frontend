import React, { useState } from "react";
import "../../../assets/css/InquiryResult.css";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { useNavigate } from "react-router-dom";
import useTaxStore from "../../../store/taxStore";

const DeductionResultYearEnd = () => {
  const navigate = useNavigate();
  const totalIncome = useTaxStore((state) => state.totalIncome);
  const wageIncomeAmount = useTaxStore((state) => state.wageIncomeAmount);
  const [detailItems] = useState([
    { label: "근로소득 공제", amount: wageIncomeAmount.toLocaleString() },
    { label: "종합소득 공제", amount: "414,532.5" },
  ]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const ToHome = () => {
    navigate("/");
  };

  const ToBack = () => {
    navigate(-1);
  };

  return (
    <div className="deduction-result-container">
      <div className="total-refund">
        <h1>연말정산 결과확인</h1>
        <div className="refund-detail-item">
          <span>나의 총급여</span>
          <span>{Number(totalIncome).toLocaleString()}원</span>
        </div>
        <div onClick={toggleDetails} className="refund-detail-item">
          나의 공제내역{" "}
          {isOpen ? (
            <ArrowUp className="toggle-arrow" />
          ) : (
            <ArrowDown className="toggle-arrow" />
          )}{" "}
        </div>

        {isOpen && (
          <div className="details-container">
            {detailItems.map((item, index) => (
              <div className="refund-detail-item" key={index}>
                <span>{item.label}</span>
                <span>{item.amount}원</span>
              </div>
            ))}
            <div className="deduction-detail-container">
              <div className="deduction-detail-item">
                <span>카드 공제</span>
                <span>1,958,550원</span>
              </div>
              <div className="deduction-detail-item">
                <span>가족 공제</span>
                <span>0원</span>
              </div>
              <div className="deduction-detail-item">
                <span>전통시장, 도서, 문화</span>
                <span>319,000원</span>
              </div>
              <div className="deduction-detail-item">
                <span>4대 보험</span>
                <span>319,000원</span>
              </div>
              <div className="deduction-detail-item">
                <span>주택 공제</span>
                <span>0원</span>
              </div>
              <div className="deduction-detail-item">
                <span>기타 공제</span>
                <span>0원</span>
              </div>
            </div>
            <div className="refund-detail-item">
              <span>공제 후 세금</span>
              <span>2,540,128.05원</span>
            </div>
            <div className="refund-detail-item">
              <span>세금 공제</span>
              <span>1,773,300원</span>
            </div>
            <div className="deduction-detail-container">
              <div className="deduction-detail-item">
                <span>중소기업 감면</span>
                <span>0원</span>
              </div>
              <div className="deduction-detail-item">
                <span>월세 공제</span>
                <span>0원</span>
              </div>
              <div className="deduction-detail-item">
                <span>연금 공제</span>
                <span>111,300원</span>
              </div>
              <div className="deduction-detail-item">
                <span>보험료</span>
                <span>227,000원</span>
              </div>
              <div className="deduction-detail-item">
                <span>의료비</span>
                <span>298,000원</span>
              </div>
              <div className="deduction-detail-item">
                <span>교육비</span>
                <span>879,000원</span>
              </div>
              <div className="deduction-detail-item">
                <span>기타</span>
                <span>258,000원</span>
              </div>
            </div>
            <div className="refund-detail-item">
              <span>먼저 낸 세금</span>
              <span>6,000,000원</span>
            </div>
          </div>
        )}
        <div className="refund-detail-item">
          <span>돌려받는 돈</span>
          <span>5,233,171.95원</span>
        </div>
      </div>
      <div className="buttons">
        <button className="btn-close" onClick={ToBack}>
          닫기
        </button>
        <button className="btn-confirm" onClick={ToHome}>
          확인
        </button>
      </div>
    </div>
  );
};

export default DeductionResultYearEnd;
