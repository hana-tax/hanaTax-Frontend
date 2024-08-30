import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-custom-alert";
import "../../assets/css/Home.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char1 } from "../../assets/svg/연말정산/연말정산_배경.svg";
import { ReactComponent as Char2 } from "../../assets/svg/금융소득/금융소득_배경.svg";
import { ReactComponent as Char3 } from "../../assets/svg/절세상품/절세상품_배경.svg";
import { ReactComponent as Menu1 } from "../../assets/svg/account-inquiry.svg";
import { ReactComponent as Menu2 } from "../../assets/svg/transfer.svg";
import { ReactComponent as Menu3 } from "../../assets/svg/yearend-inquiry.svg";
import { ReactComponent as Menu4 } from "../../assets/svg/transfer-details.svg";
import { ReactComponent as Menu5 } from "../../assets/svg/my-fi.svg";
import { ReactComponent as Menu6 } from "../../assets/svg/account-make.svg";
import useStore from "../../store/useStore";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const { isLoggedIn } = useStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  const boxes = [
    {
      title1: "13월의 강도에서 ",
      title2: "13월의 월급으로",
      background: "linear-gradient(to bottom, #F4F4F4, #EAFAF3)", // 그라데이션 적용
      SvgComponent: Char1,
      className: "box1",
    },
    {
      title1: "금융소득 과세 대상자 확인하고",
      title2: "절세 솔루션까지",
      background: "#CBF8E7", // 단색 배경
      SvgComponent: Char2,
      className: "box2",
    },
    {
      title1: "내게 맞는 절세상품",
      title2: "비교하고 가입하기",
      background: "#EAE8FF", // 단색 배경
      SvgComponent: Char3,
      className: "box3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === boxes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 전환

    return () => clearInterval(interval);
  }, [boxes.length]);

  const handleStartClick = () => {
    if (!isLoggedIn) {
      toast.warning("로그인이 필요한 서비스입니다."); // 경고 메시지를 표시
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } else {
      navigate("/inquiryYearEnd");
    }
  };

  return (
    <div className="homepage-container">
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {boxes.map((box, index) => {
          const SvgComponent = box.SvgComponent;
          return (
            <div
              key={index}
              className={`main-box ${box.className}`}
              style={{ background: box.background }}
            >
              <div className="left-section">
                <h1>{box.title1}</h1>
                <h1>{box.title2}</h1>
                <button className="start-button" onClick={handleStartClick}>
                  시작하기
                </button>
              </div>
              <SvgComponent className="char" />
            </div>
          );
        })}
      </div>
      <div className="navigation-dots">
        {boxes.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
      <div className="side-menu">
        <div className="menu-item">
          <Menu1 className="menu-icon" />
          <span className="menu-text">전체계좌조회</span>
        </div>
        <div className="menu-item">
          <Menu2 className="menu-icon" />
          <span className="menu-text">이체</span>
        </div>
        <div className="menu-item">
          <Menu3 className="menu-icon" />
          <span className="menu-text">연말정산조회</span>
        </div>
        <div className="menu-item">
          <Menu4 className="menu-icon" />
          <span className="menu-text">거래내역조회</span>
        </div>
        <div className="menu-item">
          <Menu5 className="menu-icon" />
          <span className="menu-text">금융소득분석</span>
        </div>
        <div className="menu-item">
          <Menu6 className="menu-icon" />
          <span className="menu-text">계좌개설</span>
        </div>
      </div>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default Home;
