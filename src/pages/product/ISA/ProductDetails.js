import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Product.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/절세상품/pig-coin.svg";
import { ReactComponent as Isa1 } from "../../../assets/svg/절세상품/isa1.svg";
import { ReactComponent as Isa2 } from "../../../assets/svg/절세상품/isa2.svg";
import { ReactComponent as Isa3 } from "../../../assets/svg/절세상품/isa3.svg";
import { ReactComponent as Interest } from "../../../assets/svg/금리.svg";
import { ReactComponent as Product } from "../../../assets/svg/상품안내.svg";
import { ReactComponent as Agree } from "../../../assets/svg/약관동의.svg";
import { ReactComponent as Notice } from "../../../assets/svg/유의사항.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import useStore from "../../../store/useStore";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-custom-alert";

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
  const { isLoggedIn } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/investAnalysis");
  };

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
          <button
            className="isa-inquiry-button"
            onClick={() => {
              if (isLoggedIn) {
                setIsModalOpen(true);
                //navigate("/isa/product/join");
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
      <div className="product-info-container">
        <h1>ISA</h1>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="투자성향 분석 안내 모달"
        className="modal"
        overlayClassName="overlay-modal"
        style={{ width: "300px" }}
      >
        <div className="invest-info-modal">
          <p>
            금융소비자보호법에 따라 손님의{" "}
            <span style={{ color: "#18CD8C", fontSize: "17px" }}>
              투자성향분석이 꼭 필요하며, 분석 결과에 적합한 상품만 조회 및
              가입이 가능합니다.
            </span>
          </p>
          <span style={{ color: "#757575", fontSize: "16px" }}>
            지금 성향분석을 하시겠습니까?
          </span>
        </div>

        <div className="btns" style={{ marginTop: "20px" }}>
          <button
            className="modal-confirm-btn"
            style={{ padding: "10px 80px" }}
            onClick={closeModal}
          >
            확인(투자자 정보 제공)
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
