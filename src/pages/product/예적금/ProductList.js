import React, { useState } from "react";
import "../../../assets/css/Product.css";
import { ReactComponent as ArrowRight } from "../../../assets/svg/arrow-right.svg";
import { ReactComponent as Pig } from "../../../assets/svg/연말정산/piggy-bank.svg";
import { ReactComponent as Coin } from "../../../assets/svg/coin.svg";
import { ReactComponent as Account } from "../../../assets/svg/절세상품/isa-account.svg";
import { ReactComponent as Money } from "../../../assets/svg/금융소득/money-hand.svg";
const products = {
  savings: [
    {
      name: "3·6·9 정기예금",
      rate: "3.00",
      duration: "12",
      type: "예금",
      icon: Pig,
    },
    {
      name: "고단위 플러스(금리연동형)",
      rate: "2.60",
      duration: "12",
      type: "예금",
      icon: Coin,
    },
    {
      name: "고단위 플러스(금리확정형)",
      rate: "2.80",
      duration: "60",
      type: "예금",
      icon: Coin,
    },
  ],
  deposits: [
    {
      name: "펫사랑 적금",
      rate: "2.80",
      duration: "12",
      type: "적금",
      icon: Account,
    },
    {
      name: "급여하나 월복리 적금",
      rate: "5.65",
      duration: "12",
      type: "적금",
      icon: Money,
    },
  ],
};

const ProductList = () => {
  const [selectedType, setSelectedType] = useState("savings"); // 기본 선택은 '예금'
  return (
    <div className="product-list-container">
      <div className="product-tab-container">
        <button
          className={`tab ${selectedType === "savings" ? "active" : ""}`}
          onClick={() => setSelectedType("savings")}
        >
          예금
        </button>
        <button
          className={`tab ${selectedType === "deposits" ? "active" : ""}`}
          onClick={() => setSelectedType("deposits")}
        >
          적금
        </button>
      </div>
      <div className="product-list-box">
        {products[selectedType].map((product) => (
          <div
            className="product-card"
            key={product.name}
            style={{ backgroundColor: product.bgColor }}
          >
            <div className="type-indicator">{product.type}</div>
            <div className="product-card-header">
              {product.name}
              <ArrowRight className="product-arrow-right-icon" />
            </div>
            <div className="product-rate-info-box">
              <span>금리(연)</span>
              <div className="card-rate">{product.rate}</div>
            </div>
            <div className="product-rate-info-box">
              <span>가입기간</span>
              <div className="card-info">{product.duration}</div>
              <div className="product-icon">
                <product.icon style={{ width: "150px", height: "100px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
