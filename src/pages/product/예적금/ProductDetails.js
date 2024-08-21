import React from "react";
import "../../../assets/css/Product.css"; // 스타일 파일
import { ReactComponent as PigIcon } from "../../../assets/svg/연말정산/piggy-bank.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/arrow-right.svg";

const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <h1>
        3개월마다, 기쁜 날마다 <br />
        언제든지 필요할 때 찾을 수 있고 찾을 땐 언제나 높은 금리의 즐거움까지{" "}
        <br />
        누릴 수 있는 정기 예금입니다.
      </h1>
      <div className="rate-box">
        <div className="rate-info">
          <span className="rate-title">금리(연)</span>
          <span className="rate-value">3.00 %</span>
        </div>
        <div className="divider"></div>
        <div className="rate-info">
          <span className="rate-title">가입기간</span>
          <span className="rate-value">12 개월</span>
        </div>
      </div>
      <button className="btn-details">
        가입하기
        <ArrowRight />
      </button>
      <div className="icon-box">
        <PigIcon style={{ width: "200px", height: "150px" }} />
      </div>
    </div>
  );
};

export default ProductDetails;
