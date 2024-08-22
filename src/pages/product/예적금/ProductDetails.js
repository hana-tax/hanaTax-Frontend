import React, { useState } from "react";
import "../../../assets/css/Product.css"; // 스타일 파일
import { ReactComponent as PigIcon } from "../../../assets/svg/연말정산/piggy-bank.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/arrow-right-white.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as Interest } from "../../../assets/svg/금리.svg";
import { ReactComponent as Product } from "../../../assets/svg/상품안내.svg";
import { ReactComponent as Agree } from "../../../assets/svg/약관동의.svg";
import { ReactComponent as Notice } from "../../../assets/svg/유의사항.svg";

const ProductDetails = () => {
  // 각 항목의 펼침 상태를 관리하는 상태
  const [openSections, setOpenSections] = useState({
    savings: false,
    goalSetting: false,
    accountManagement: false,
    tips: false,
  });

  // 항목 클릭 핸들러
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  return (
    <div className="product-details-container">
      <div className="product-details-name-container">
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
          <ArrowRight className="btn-details-arrow-right" />
        </button>
        <div className="icon-box">
          <PigIcon
            style={{ width: "200px", height: "150px", marginTop: "-100px" }}
          />
        </div>
      </div>
      <div className="product-info-container">
        <h1>365 예금</h1>
        <div className="underline" style={{ backgroundColor: "#000" }}></div>
        {[
          { id: "savings", label: "상품안내", svg: Product },
          { id: "goalSetting", label: "금리정보", svg: Interest },
          { id: "accountManagement", label: "유의사항", svg: Notice },
          { id: "tips", label: "약관 및 상품설명서", svg: Agree },
        ].map((item) => (
          <div key={item.id} className="item">
            <button
              className="item-header"
              onClick={() => toggleSection(item.id)}
            >
              <div className="product-svg-text">
                <item.svg style={{ width: "25px", marginRight: "50px" }} />
                {item.label}
              </div>
              <ArrowDown
                className={openSections[item.id] ? "rotate-icon" : ""}
              />
            </button>
            {openSections[item.id] && (
              <div className="item-content">
                <p>여기에 {item.label}에 대한 세부 정보를 표시합니다.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
