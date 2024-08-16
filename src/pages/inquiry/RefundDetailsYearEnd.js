import React from "react";
import "../../assets/css/RefundDetail.css";
import { useNavigate } from "react-router-dom";

const RefundDetailsYearEnd = () => {
  const navigate = useNavigate();
  const ToBack = () => {
    navigate(-1);
  };
  const details = [
    { title: "지방대학 아카데미", amount: 700000 },
    { title: "CU편의점 00점", amount: 80000 },
  ];

  return (
    <div className="refund-container">
      <h2>예상 환급내역</h2>
      <div className="refund-summary">
        <h3>예상 환급액</h3>
        <h2>780,000원</h2>
        <p>이번 세금이 납부한 내역을 고려하여 환급액을 산출하고 있습니다.</p>
      </div>
      <div className="refund-details">
        <h3>이번 달 세금</h3>
        <h4>780,000원</h4>
        {details.map((item, index) => (
          <div key={index} className="item">
            <div className="item-title">{item.title}</div>
            <div className="item-amount">{item.amount.toLocaleString()}원</div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="btn-close" onClick={ToBack}>
          닫기
        </button>
        <button className="btn-confirm" onClick={ToBack}>
          확인
        </button>
      </div>
    </div>
  );
};

export default RefundDetailsYearEnd;
