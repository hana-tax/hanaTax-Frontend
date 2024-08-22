import React from "react";
import "../../../assets/css/Product.css";

const InvestPoint1 = () => {
  return (
    <div className="invest-point1-container">
      <h1>일반 투자보다 유리한 세제혜택</h1>
      <div className="details-section">
        <p>2단계를 진행하는 ISA의 제세이점을 상징합니다.</p>
        <div className="isa-options">
          <label>
            <input type="radio" name="isa-option" value="손실없는 공상품(-)" />
            손실없는 공상품(-)
          </label>
          <label>
            <input type="radio" name="isa-option" value="이익발생 공상품(+)" />
            이익발생 공상품(+)
          </label>
          <label>
            <input type="radio" name="isa-option" value="손실손익 공제" />
            손실손익 공제
          </label>
        </div>
      </div>
    </div>
  );
};

export default InvestPoint1;
