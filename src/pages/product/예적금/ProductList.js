import React, { useState, useEffect } from "react";
import "../../../assets/css/Product.css";
import { ReactComponent as ArrowRight } from "../../../assets/svg/arrow-right.svg";
import { ReactComponent as Pig } from "../../../assets/svg/연말정산/piggy-bank.svg";
import { ReactComponent as Coin } from "../../../assets/svg/coin.svg";
import { ReactComponent as Account } from "../../../assets/svg/절세상품/isa-account.svg";
import { ReactComponent as Money } from "../../../assets/svg/금융소득/money-hand.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({ savings: [], deposits: [] });
  const [selectedType, setSelectedType] = useState("savings"); // 기본 선택은 '예금'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product/deposit/list");
        if (response.status === 200) {
          const depositProducts = response.data.map((product) => ({
            id: product.depositId,
            name: product.depositName,
            rate: `${product.minInterestRate}~${product.maxInterestRate}`,
            duration:
              product.minPeriod !== null
                ? `${product.minPeriod}~${product.maxPeriod}`
                : `${product.maxPeriod}`,
            type: product.depositType === 1 ? "예금" : "적금",
            icon: product.depositType === 1 ? Account : Coin,
          }));

          // 예금과 적금을 분리하여 상태에 저장
          const savings = depositProducts.filter(
            (product) => product.type === "예금"
          );
          const deposits = depositProducts.filter(
            (product) => product.type === "적금"
          );

          setProducts({ savings, deposits });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const ToProductDetail = (id) => {
    navigate(`/productlist/product/${id}`);
  };

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
        {(selectedType === "savings"
          ? products.savings
          : products.deposits
        ).map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => ToProductDetail(product.id)}
          >
            <div className="type-indicator">{product.type}</div>
            <div className="product-card-header">
              {product.name}
              <ArrowRight className="product-arrow-right-icon" />
            </div>
            <div className="product-rate-info-box">
              <span>금리(연)</span>
              <div className="card-rate">
                {product.rate}
                <span style={{ fontSize: "0.7em", color: "#000" }}>%</span>
              </div>
            </div>
            <div className="product-rate-info-box">
              <span>가입기간</span>
              <div className="card-info">
                {product.duration}
                <span style={{ fontSize: "0.7em", color: "#000" }}>개월</span>
              </div>
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
