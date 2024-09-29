import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/하나은행로고.svg";
import "../../assets/css/Header.css";
import { ReactComponent as Person } from "../../assets/svg/금융소득/금융소득_사람.svg";
import useStore from "../../store/useStore";
import tokenStore from "../../store/tokenStore";
import { ReactComponent as Login } from "../../assets/svg/login_user.svg";
import { ToastContainer, toast } from "react-custom-alert";

function Header() {
  const { isLoggedIn, user, logout } = useStore();
  const { token } = tokenStore((state) => ({ token: state.token }));
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ToAllofYearEnd = () => {
    navigate("/allofyearend");
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/logout`,
        {
          method: "POST",
          credentials: "include", // 쿠키를 포함하여 요청
        }
      );

      if (response.status === 200) {
        toast.success("로그아웃 되었습니다.");
        logout();

        setTimeout(() => {
          navigate("/");
        }, 2000); // 2초 후에 페이지 이동
      }
    } catch (error) {
      toast.error("로그아웃 중 오류가 발생했습니다.");
      console.error("로그아웃 오류:", error);
    }
  };
  const state = useStore.getState();

  useEffect(() => {
    new RollingNum(".header-money", "?????", "slide"); // 초기 값은 ?????로 설정
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
                    <div className="header-money"></div>
                  </div>
                  <button
                    className="inquiry-button"
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.warning("로그인이 필요한 서비스입니다.");
                        setTimeout(() => {
                          navigate("/login");
                        }, 2000); // 2초 후에 로그인 페이지로 이동
                      } else {
                        if (!token) {
                          navigate("/myData1");
                        } else {
                          navigate("/inquiryYearEnd");
                        }
                      }
                    }}
                  >
                    한눈에 조회하기
                  </button>
                </div>
                <div className="dropdown-right">
                  <div className="dropdown-column">
                    <span className="menu-title">연말정산 공제</span>
                    <ul className="dropdown-submenu">
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/inquiryYearEnd")}
                      >
                        환급액 조회
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/inquiryYearEnd")}
                      >
                        연말정산 공제 혜택
                      </li>
                      {/* <li className="dropdown-item">
                        월세 및 부대 비용 공제 혜택
                      </li>
                      <li className="dropdown-item">중소기업 공제 혜택</li>
                      <li className="dropdown-item">근로세액 및 IRP 혜택</li> */}
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

          <li className="nav-item">
            <span>금융소득</span>
            <div className="dropdown-menu">
              <div className="dropdown-container">
                <div className="dropdown-left">
                  <span>
                    나는 금융소득 종합과세
                    <br /> 대상자일까?
                  </span>
                  <Person />

                  <button
                    className="inquiry-button"
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.warning("로그인이 필요한 서비스입니다.");
                        setTimeout(() => {
                          navigate("/login");
                        }, 2000); // 2초 후에 로그인 페이지로 이동
                      } else {
                        if (!token) {
                          navigate("/myData1");
                        } else {
                          navigate("/inquiryFinancialIncome");
                        }
                      }
                    }}
                  >
                    대상자 여부 조회하기
                  </button>
                </div>
                <div className="dropdown-right">
                  <div className="dropdown-column">
                    <span className="menu-title">금융소득 조회</span>
                    <ul className="dropdown-submenu">
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/inquiryFinancialIncome")}
                      >
                        나의 금융소득 조회
                      </li>

                      <li
                        className="dropdown-item"
                        onClick={() =>
                          navigate("/financialIncome/refundDetails")
                        }
                      >
                        금융소득 종합과세 대상자 알림 신청
                      </li>
                    </ul>
                  </div>

                  <div className="dropdown-column">
                    <span className="menu-title">세테크 시작하기</span>
                    <ul className="dropdown-submenu">
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/financialIncome/myReport")}
                      >
                        나의 금융소득 분석
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/financialIncome/solution")}
                      >
                        절세 솔루션 안내
                      </li>
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
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/productlist")}
                      >
                        상품/가입
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">ISA</span>
                    <ul className="dropdown-submenu">
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/isa/product")}
                      >
                        ISA 상품/가입
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-column">
                    <span className="menu-title">펀드</span>
                    <ul className="dropdown-submenu">
                      <li
                        className="dropdown-item"
                        onClick={() => navigate("/pension/product")}
                      >
                        연금저축펀드 상품
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="login-user-mycontainer">
          {isLoggedIn && (
            <div
              className="login-user-box"
              onClick={() => setDropdownVisible(!dropdownVisible)}
              style={{ cursor: "pointer" }}
            >
              <Login />
              <span style={{ marginLeft: "5px", textDecoration: "underline" }}>
                {user.name} 님
              </span>
              <div
                className="dropdown-mymenu"
                style={{ display: dropdownVisible ? "block" : "none" }}
              >
                <div className="profile-box">
                  <Login />
                  <span
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                      fontSize: "14px",
                    }}
                  >
                    {user.name}님 안녕하세요
                  </span>
                  <div
                    className="my-profile-update-box"
                    onClick={() => {
                      navigate("/myPage");
                    }}
                  >
                    마이페이지
                  </div>
                  <div className="my-profile-underline"></div>
                </div>
                <ul className="dropdown-mymenu-ul">
                  <li
                    className="dropdown-mymenu-item"
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate("/profile");
                    }}
                  >
                    설정
                  </li>
                  <li className="dropdown-mymenu-item" onClick={handleLogout}>
                    로그아웃
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function RollingNum(className, number, type) {
  const speed = 100;
  const delay = 300;
  const el = document.querySelector(className);

  // 애니메이션 반복을 위한 함수
  const animateNumbers = () => {
    const num = number.split("");
    el.innerHTML = ""; // 초기화

    num.forEach((item, i) => {
      const classId = `num-idx-${i}-${item === "?" ? "question" : item}`; // ?를 처리
      const slideStyle = "transition: margin .3s";

      el.innerHTML += `<span class="num ${classId}" data-text="${item}">
              <span class="num-list" style="${
                type === "slide" ? slideStyle : ""
              }">0 1 2 3 4 5 6 7 8 9 ${item === "?" ? "&#63;" : ""}</span>
          </span>`;

      setTimeout(() => {
        numAnimate(`.${classId}`);
      }, delay * i);
    });

    el.innerHTML += `<span class="won-unit">₩</span>`;
  };

  const numAnimate = (unit) => {
    const el = document.querySelector(className).querySelector(unit);
    const numList = el.querySelector(".num-list");
    const dataText = el.getAttribute("data-text");
    let pos = dataText === "?" ? 10 : dataText; // ?에 대한 처리를 추가
    let n = 0;

    const numInterval = setInterval(() => {
      numList.style.marginTop = `-${n * 30}px`;
      if (n >= 10) {
        clearInterval(numInterval);
        numList.style.marginTop = `-${pos * 30}px`; // 현재 숫자 위치로 설정
      }
      n++;
    }, speed);
  };

  // 처음 애니메이션 실행
  animateNumbers();

  // 3초 후에 애니메이션 반복
  setInterval(() => {
    animateNumbers();
  }, 3000 + delay * number.length); // 3초 + 애니메이션에 필요한 시간
}

export default Header;
