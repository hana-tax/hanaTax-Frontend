import React, { useState, useEffect } from "react";
import "../../assets/css/Home.css";
import { ReactComponent as Char1 } from "../../assets/svg/연말정산/연말정산_배경.svg";
import { ReactComponent as Char2 } from "../../assets/svg/금융소득/금융소득_배경.svg";
import { ReactComponent as Char3 } from "../../assets/svg/절세상품/절세상품_배경.svg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="home-container">
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
              className={`main-box ${box.className}`} // 고유 클래스 이름 추가
              style={{ background: box.background }}
            >
              <div className="left-section">
                <h1>{box.title1}</h1>
                <h1>{box.title2}</h1>
                <button className="start-button">시작하기</button>
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
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
