import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Product.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/절세상품/pig-coin.svg";
import { ReactComponent as Isa1 } from "../../../assets/svg/절세상품/isa1.svg";
import { ReactComponent as Isa2 } from "../../../assets/svg/절세상품/isa2.svg";
import { ReactComponent as Isa3 } from "../../../assets/svg/절세상품/isa3.svg";

const investmentPoints = [
  {
    title: "일반 투자보다 유리한 세제혜택",
    description: "2단계 세제혜택 <br/> 손익통산&비과세 + 분리과세",
    icon: Isa1,
    path: "/isa/product/investPoint1",
  },
  {
    title: "자유로운 상품교체",
    description: "세제혜택 유지하며 <br/>자유로운 상품교체",
    icon: Isa2,
    path: "/isa/product/investPoint2",
  },
  {
    title: "기존보다 개선된 가입요건",
    description: "폭 넓은 가입자격 및 <br/>한도, 편입상품 등",
    icon: Isa3,
    path: "/isa/product/investPoint3",
  },
];

const ProductDetails = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="box">
        <div className="isa-left-container">
          <h1>
            ISA 상품안내 <br /> 투자와 절세를 한번에!
          </h1>
          <button className="isa-inquiry-button">시작하기</button>
        </div>
        <div className="isa-right-container">
          <Char style={{ marginLeft: "40px", marginTop: "50px" }} />
        </div>
      </div>
      <div className="isa-product-container">
        <div className="isa-product-section">
          <h2>3가지 투자 포인트</h2>
          <div className="investment-points">
            {investmentPoints.map((point, index) => (
              <div
                key={index}
                className="investment-card"
                onClick={() => handleCardClick(point.path)}
              >
                <div className="investment-icon">
                  <point.icon className="invest-icon-svg" />
                </div>
                <div className="investment-info">
                  <h3>{point.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: point.description }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
