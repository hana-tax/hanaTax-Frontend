import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Product.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as PensionIcon } from "../../../assets/svg/절세상품/pension-background.svg";

import { ReactComponent as Interest } from "../../../assets/svg/금리.svg";
import { ReactComponent as Product } from "../../../assets/svg/상품안내.svg";
import { ReactComponent as Agree } from "../../../assets/svg/약관동의.svg";
import { ReactComponent as Notice } from "../../../assets/svg/유의사항.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import useStore from "../../../store/useStore";
import { ToastContainer, toast } from "react-custom-alert";

const ProductDetails = () => {
  const { isLoggedIn } = useStore();
  const navigate = useNavigate();
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
    <div className="home-container">
      <div className="pension-box">
        <h1>
          다양한 펀드와 ETF를 하나의 계좌에서
          <br />
          자유롭게 운영하는 <span style={{ color: "#18CD8C" }}>연금저축</span>
        </h1>
        <PensionIcon style={{ marginLeft: "30px" }} />
        <button
          className="pension-button"
          onClick={() => {
            if (isLoggedIn) {
              navigate("/investAnalysis", {
                state: { accountType: "pension" },
              });
            } else {
              toast.warning("로그인이 필요한 서비스입니다.");
              setTimeout(() => {
                navigate("/login");
              }, 2000); // 2초 후에 로그인 페이지로 이동
            }
          }}
        >
          가입하기
        </button>
      </div>

      <div className="product-info-container">
        <h1>연금저축펀드</h1>
        <div className="underline" style={{ backgroundColor: "#000" }}></div>
        {[
          { id: "savings", label: "상품안내", svg: Product },
          { id: "goalSetting", label: "상품유형 비교", svg: Interest },
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
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default ProductDetails;
