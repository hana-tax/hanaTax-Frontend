import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/하나은행로고.svg";
// import LeftImage from "../../assets/images/left-image.png"; // 이미지 경로를 맞춰주세요
import "../../assets/css/Header.css";

function Header() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);
  const ToAllofYearEnd = () => {
    navigate("/allofYearEnd");
  };

  const ToInquiryYearEnd = () => {
    navigate("/inquiryYearEnd");
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = window.scrollY;
      setActiveDropdown(null); // 스크롤 시 드롭다운 메뉴 닫기
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${isHeaderVisible ? "visible" : "hidden"} ${
        activeDropdown ? "dropdown-active" : ""
      }`}
    >
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <nav className="nav" ref={dropdownRef}>
        <ul className="nav-list">
          <li
            className={`nav-item ${
              activeDropdown === "inquiry" ? "dropdown-active" : ""
            }`}
            onClick={() => toggleDropdown("inquiry")}
          >
            <span>연말정산</span>
            {activeDropdown === "inquiry" && (
              <div className="dropdown-menu">
                <div className="dropdown-container">
                  <div className="dropdown-left">
                    {/* <img
                      src={LeftImage}
                      alt="Left Content"
                      className="left-image"
                    /> */}
                    <button
                      className="inquiry-button"
                      onClick={ToInquiryYearEnd}
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
            )}
          </li>
          <li
            className={`nav-item ${
              activeDropdown === "income" ? "dropdown-active" : ""
            }`}
            onClick={() => toggleDropdown("income")}
          >
            <span>금융소득</span>
            {activeDropdown === "income" && (
              <div className="dropdown-menu">
                <div className="dropdown-container">
                  <div className="dropdown-left">
                    {/* <img
                      src={LeftImage}
                      alt="Left Content"
                      className="left-image"
                    /> */}
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
            )}
          </li>
          <li
            className={`nav-item ${
              activeDropdown === "product" ? "dropdown-active" : ""
            }`}
            onClick={() => toggleDropdown("product")}
          >
            <span>절세상품</span>
            {activeDropdown === "product" && (
              <div className="dropdown-menu">
                <div className="dropdown-container">
                  <div className="dropdown-left">
                    {/* <img
                      src={LeftImage}
                      alt="Left Content"
                      className="left-image"
                    /> */}
                    <button className="inquiry-button">한눈에 조회하기</button>
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
                        <li className="dropdown-item">연말정산의 모든 것</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
