import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-custom-alert";
import "../../assets/css/Home.css";
import "react-custom-alert/dist/index.css";
import { motion } from "framer-motion";
import { ReactComponent as Char1 } from "../../assets/svg/연말정산/연말정산_배경.svg";
import { ReactComponent as Char2 } from "../../assets/svg/금융소득/금융소득_배경.svg";
import { ReactComponent as Char3 } from "../../assets/svg/절세상품/절세상품_배경.svg";
import useStore from "../../store/useStore";
import { ReactComponent as Right } from "../../assets/svg/arrow-right.svg";
import { ReactComponent as Account } from "../../assets/svg/account.svg";
import { ReactComponent as Inquiry } from "../../assets/svg/inquiry.svg";
import { ReactComponent as Card } from "../../assets/svg/card.svg";
import { ReactComponent as PieChart } from "../../assets/svg/piechart.svg";
import { ReactComponent as Calculator } from "../../assets/svg/calculator.svg";
import { ReactComponent as Piechart } from "../../assets/svg/piechart.svg";
import { ReactComponent as InquiryYearEnd } from "../../assets/svg/inquiryYearEnd.svg";
import { ReactComponent as Phone } from "../../assets/svg/phone-hand.svg";
import { ReactComponent as Triangle } from "../../assets/svg/triangle-exclude.svg";
import { ReactComponent as Circle } from "../../assets/svg/circle-exclude.svg";
import tokenStore from "../../store/tokenStore";
import { BeatLoader } from "react-spinners"; // 로딩 애니메이션
import { ReactComponent as Char } from "../../assets/svg/hana-char.svg";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const navigate = useNavigate();
  const { token } = tokenStore((state) => ({ token: state.token }));

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
      toast.warning("로그인이 필요한 서비스입니다.");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2초 후에 로그인 페이지로 이동
    } else {
      if (!token) {
        setIsLoading(true); // 로딩 시작
        setTimeout(() => {
          navigate("/myData1");
          setIsLoading(false);
        }, 2000);
      } else {
        navigate("/inquiryYearEnd");
      }
    }
  };

  const handleServiceClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <Char />
            <h3>마이데이터와 함께하는 즐거움</h3>
            <BeatLoader color="#10B9BE" />
          </div>
        </div>
      )}

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
      </div>

      <div className="second-container">
        <p>이런 서비스 어때요?</p>
        <div className="service-container">
          <div className="service">
            <span>연말정산, 언제 어디서나!</span>
            <div classeName="text-right-arrow">
              <p>
                연말정산 공제혜택 <Right style={{ marginLeft: "5px" }} />
              </p>
            </div>
          </div>
          <div className="service">
            <span>과세 대상, 간편하게 확인!</span>
            <div classeName="text-right-arrow">
              <p>
                종합과세대상자 확인 <Right style={{ marginLeft: "5px" }} />
              </p>
            </div>
          </div>
          <div className="service">
            <span>세금 계산, 한 번에 해결!</span>
            <div classeName="text-right-arrow">
              <p>
                금융 계산기 <Right style={{ marginLeft: "5px" }} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="three-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          className="three-container-text"
        >
          <span>바로바로서비스</span>
          <p>
            금융에 필요한 <br />
            서비스를 만나보세요
          </p>
        </motion.div>
        <div className="baro-container">
          {[
            {
              component: <Account />,
              label: "전체계좌조회",
              path: "/myAccount",
            },
            { component: <Inquiry />, label: "또래자산비교", path: "/myPage" },
            {
              component: <PieChart />,
              label: "금융소득 분석",
              path: "/financialIncome/myReport",
            },
            { component: <Calculator />, label: "금융계산" },
            {
              component: <InquiryYearEnd />,
              label: "연말정산조회",
              path: "/inquiryYearEnd",
            },
            { component: <Card />, label: "계좌개설", path: "/productlist" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.1, // 호버 애니메이션 속도 조정
                  ease: "easeInOut", // 호버 애니메이션의 이징
                },
              }}
              className="baro-box"
              onClick={() => handleServiceClick(item.path)}
            >
              <div className="baro-circle">{item.component}</div>
              {item.label}
            </motion.div>
          ))}
        </div>
        <Phone className="hand-phone" />
        <Triangle className="triangle-exclude" />
        <Circle className="circle-exclude" />
      </div>

      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default Home;
