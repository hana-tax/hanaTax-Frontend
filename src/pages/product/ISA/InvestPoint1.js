import React from "react";
import "../../../assets/css/Product.css";
import { ReactComponent as PlusCircle } from "../../../assets/svg/plus-circle.svg";
import { ReactComponent as EqualCircle } from "../../../assets/svg/equal-circle.svg";

const InvestPoint1 = () => {
  return (
    <div className="invest-point1-container">
      <h1>일반 투자보다 유리한 세제혜택</h1>
      <div className="details-section">
        <p>2단계로 진행되는 ISA의 과세기준 산정 방식</p>
        <span
          style={{
            color: "#7684ff",
            marginBottom: "15px",
            fontFamily: "Pretendard-SemiBold",
          }}
        >
          1단계 : 계좌내 손익 통산
        </span>
        <span style={{ color: "#757575" }}>
          상품별 손익을 구분하는 일반투자와 달리 계좌내 모든 이익과 손실을
          합산합니다.
        </span>
        <div className="invest-point1-box">
          <span
            style={{ color: "#000", textAlign: "center", marginBottom: "20px" }}
          >
            ISA 계좌
          </span>
          <div
            className="invest-point1-formula"
            style={{ justifyContent: "center" }}
          >
            <div className="minus-product">손실발생 금융상품(-)</div>
            <PlusCircle className="circle-icon" />
            <div className="plus-product">이익발생 금융상품(+)</div>
            <EqualCircle className="circle-icon" />
            <div className="real-income-product">순소득 금액 과세</div>
          </div>
        </div>
      </div>
      <div className="details-section">
        <span
          style={{
            color: "#7684ff",
            marginBottom: "15px",
            fontFamily: "Pretendard-SemiBold",
          }}
        >
          2단계 : 비과세 + 분리과세
        </span>
        <span style={{ color: "#757575" }}>
          순이익 200만원까지 비과세, 초과분은 9.9% 분리과세(지방소득세 포함)로
          탁월한 절세효과가 가능합니다.
        </span>
        <div className="invest-point1-box">
          <div className="invest-point1-formula">
            <div className="invest-point1-formula-box">
              <div className="non-tax-product">비과세</div>
              <div className="tax-description" style={{ marginLeft: "53px" }}>
                순소득 200만원까지
              </div>
            </div>
            <div className="invest-point1-formula-box">
              <div className="low-tax-product">저율분리과세(9.9%)</div>
              <div className="tax-description">초과분</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPoint1;
