import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/하나은행로고.svg";
import "../../assets/css/Header.css";

function Header() {
  const navigate = useNavigate();
  const numberRef = useRef(null);

  const ToInquiryYearEnd = () => {
    navigate("/inquiryYearEnd");
  };

  const ToAllofYearEnd = () => {
    navigate("/allofYearEnd");
  };

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const number = "123000"; // 표시할 숫자 설정
    const type = "slide"; // 애니메이션 유형 설정

    RollingNum(el, number, type);

    function RollingNum(el, number, type) {
      const speed = 100;
      const delay = 300;
      const num = number.toString().split("");

      num.forEach((item, i) => {
        const classId = `num-idx-${i}-${item}`;
        const slideStyle =
          type === "slide" ? "transition: margin-top .3s ease-in-out;" : "";
        el.innerHTML += `<div class="num ${classId}" style="${slideStyle}" data-text="${item}">
                                    <div class="num-list">${
                                      Array.from(
                                        { length: 10 },
                                        (_, k) => k
                                      ).join(" ") +
                                      " " +
                                      item
                                    }</div>
                                </div>`;

        setTimeout(() => {
          numAnimate(`.${classId}`, item);
        }, delay * i);
      });

      function numAnimate(selector, targetNum) {
        const el = document.querySelector(selector);
        const numList = el.querySelector(".num-list");
        let n = 0;
        const numInterval = setInterval(() => {
          numList.style.marginTop = `-${n * 30}px`;
          if (n >= 10) {
            clearInterval(numInterval);
            const finalPosition =
              targetNum === "," ? 10 : parseInt(targetNum, 10);
            numList.style.marginTop = `-${finalPosition * 30}px`;
          }
          n++;
        }, speed);
      }
    }
  }, []);

  return (
    <header className="header visible">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <span>연말정산</span>
            <div className="dropdown-menu">
              <div className="dropdown-container">
                <div className="dropdown-left">
                  <span>
                    연말정산, 올해 얼마
                    <br /> 받을 수 있을까?
                  </span>
                  <div className="header-money-box">
                    <div className="header-money">
                      <span ref={numberRef} className="number">
                        0
                      </span>
                    </div>
                  </div>
                  <button
                    className="inquiry-button"
                    onClick={() => navigate("/inquiryYearEnd")}
                  >
                    한눈에 조회하기
                  </button>
                </div>
                <div className="dropdown-right">
                  <div className="dropdown-column">
                    <span className="menu-title">연말정산 공제</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">카드 공제 혜택</li>
                      <li className="dropdown-item">의료 공제 혜택</li>
                      <li className="dropdown-item">
                        월세 및 부대 비용 공제 혜택
                      </li>
                      <li className="dropdown-item">중소기업 공제 혜택</li>
                      <li className="dropdown-item">근로세액 및 IRP 혜택</li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">연말정산 상세 정보</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item" onClick={ToAllofYearEnd}>
                        연말정산의 모든 것
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* <li className="nav-item">
            <span>금융소득</span>
            <div className="dropdown-menu">
              <div className="dropdown-container">
                <div className="dropdown-left">
                  <button className="inquiry-button">
                    대상자 여부 조회하기
                  </button>
                </div>
                <div className="dropdown-right">
                  <div className="dropdown-column">
                    <span className="menu-title">금융소득 조회</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">나의 금융소득 조회</li>
                      <li className="dropdown-item">
                        금융소득 종합과세 대상자 알림 신청
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">금융소득 상식과 꿀팁</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">금융소득의 모든 것</li>
                      <li className="dropdown-item">
                        금융소득 종합과세 VS 분리과세
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">세테크 시작하기</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">나의 금융소득 분석</li>
                      <li className="dropdown-item">절세 솔루션 안내</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <span>절세상품</span>
            <div className="dropdown-menu">
              <div className="dropdown-container">
                <div className="dropdown-right">
                  <div className="dropdown-column">
                    <span className="menu-title">예적금</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">상품/가입</li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">ISA</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">ISA 상품/가입</li>
                      <li className="dropdown-item">ISA 조회/입금</li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">펀드</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">연금저축펀드 상품</li>
                      <li className="dropdown-item">연금펀드 통합 신규</li>
                      <li className="dropdown-item">연금펀드 입금</li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">절세 상식과 꿀팁</span>
                    <ul className="dropdown-submenu">
                      <li className="dropdown-item">ISA 계좌의 모든 것</li>
                      <li className="dropdown-item">연금저축의 모든 것</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
