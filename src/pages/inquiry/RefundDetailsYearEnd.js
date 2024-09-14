import React from "react";
import "../../assets/css/RefundDetail.css";
import { useNavigate } from "react-router-dom";
import useTaxStore from "../../store/taxStore";

const RefundDetailsYearEnd = () => {
  const navigate = useNavigate();
  const estimatedTaxAmount = useTaxStore((state) => state.estimatedTaxAmount);
  const taxableIncome = useTaxStore((state) => state.taxableIncome);
  const totalIncome = useTaxStore((state) => state.totalIncome);
  const taxAmount = useTaxStore((state) => state.taxAmount);
  const wageIncomeAmount = useTaxStore((state) => state.wageIncomeAmount);
  const totalTaxDeduction = useTaxStore((state) => state.totalTaxDeduction);
  const taxPaidValue = useTaxStore((state) => state.taxPaidValue);

  const ToBack = () => {
    navigate(-1);
  };

  const details = [
    { title: "근로소득금액", amount: wageIncomeAmount },
    { title: "과세표준", amount: taxableIncome },
    { title: "산출세액", amount: taxAmount },
    { title: "결합세액", amount: totalTaxDeduction },
  ];

  return (
    <div className="refund-container">
      <h2>예상세액 요약</h2>
      <div className="refund-summary">
        <div className="refund-summary-box">
          <h3>예상 환급세액</h3>
          <h2>{Math.abs(estimatedTaxAmount).toLocaleString()}원</h2>
        </div>
        <p>이미 낸 세금이 내야 할 세금보다 많아서 돌려주는 금액입니다.</p>
      </div>
      <div className="refund-details">
        <div className="refund-details-box">
          <h3>총 급여</h3>
          <h3>{Number(totalIncome).toLocaleString()}원</h3>
        </div>
        {details.map((item, index) => (
          <div key={index} className="item">
            <div className="item-title">{item.title}</div>
            <div className="item-amount">{item.amount.toLocaleString()}원</div>
          </div>
        ))}
        <hr style={{ border: "0.1px solid #B3B3B3", marginTop: "20px" }} />
        <div className="refund-details-box">
          <h3>기납부세액</h3>
        </div>

        <div className="item">
          <div className="item-title">소득세</div>
          <div className="item-amount">{taxPaidValue.toLocaleString()}원</div>
        </div>
        <div className="item">
          <div className="item-title">지방소득세</div>
          <div className="item-amount">
            {Math.floor(taxPaidValue * 0.1).toLocaleString()}원
          </div>
        </div>
        <div className="item">
          <div className="item-title">농어촌 특별세</div>
          <div className="item-amount">0원</div>
        </div>

        <hr style={{ border: "0.1px solid #B3B3B3", marginTop: "20px" }} />
        <div className="refund-details-box">
          <h3>차감납부(환급) 세액</h3>
          <h3>{estimatedTaxAmount.toLocaleString()}원</h3>
        </div>
        <div className="item">
          <div className="item-title">소득세</div>
          <div className="item-amount">
            {estimatedTaxAmount.toLocaleString()}원
          </div>
        </div>
        <div className="item">
          <div className="item-title">지방소득세</div>
          <div className="item-amount">
            {Math.floor(estimatedTaxAmount * 0.1).toLocaleString()}원
          </div>
        </div>
        <div className="item">
          <div className="item-title">농어촌 특별세</div>
          <div className="item-amount">0원</div>
        </div>
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
