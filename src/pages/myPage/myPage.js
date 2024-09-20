import React, { useState } from "react";
import "../../assets/css/MyPage.css";
import { ReactComponent as Char1 } from "../../assets/svg/하나얼굴_캐릭터.svg";
import { ReactComponent as ArrowRight } from "../../assets/svg/arrow-right-black.svg";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "안전자산", 또래친구: 100, 송지원님: 80 },
  { name: "투자자산", 또래친구: 50, 송지원님: 30 },
  { name: "연금저축", 또래친구: 10, 송지원님: 5 },
  { name: "의료자산", 또래친구: 20, 송지원님: 15 },
  { name: "절세자산", 또래친구: 5, 송지원님: 2 },
];
const MyPage = () => {
  const [isAssetsVisible, setIsAssetsVisible] = useState(false);

  const handleToggle = () => {
    setIsAssetsVisible(!isAssetsVisible);
  };

  return (
    <div className="myPage-container">
      <div className="profile-card">
        <div className="profile-image">
          <Char1 />
        </div>

        <div className="profile-info">
          <h2>송지원 님</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#EDEDEE",
                color: "#898989",
                border: "none",
                padding: "7px",
                borderRadius: "7px",
                fontFamily: "Pretendard-Regular",
                width: "100px",
                margin: "10px",
                textAlign: "center",
              }}
            >
              내 정보 수정
            </button>
          </div>
          <div className="info-row">
            <span className="info-row-subject">로그인 ID</span>
            <span>useruser</span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">최근 접속시간</span>
            <span>
              2024.09.19
              <br />
              (14:14:00)
            </span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">투자자 성향</span>
            <span>안정형</span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">휴대폰 번호</span>
            <span>010-1234-1234</span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">이메일 주소</span>
            <span>wdjnjs@naver.com</span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">집 주소</span>
            <span>서울시 강남구 푸르지오</span>
          </div>
        </div>
      </div>

      <div className="asset-status">
        <div className="asset-header">
          <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
            자산현황
          </span>
          <div className="asset-tabs">
            <span className="active">예·적금 2개</span>
            <span>ISA 1개</span>
            <span>대출 0개</span>
            <span>펀드 0개</span>
            <span>보험 0개</span>
          </div>
        </div>
        <div className="asset-body">
          <div className="total-asset">
            <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
              나의 총 자산
            </span>
            <div className="asset-toggle">
              자산보이기{" "}
              <div>
                <input
                  type="checkbox"
                  id="asset-toggle"
                  checked={isAssetsVisible}
                  onChange={handleToggle}
                  hidden
                />
                <label htmlFor="asset-toggle" className="switchContainer">
                  <span className="switchButton"></span>
                </label>
              </div>
            </div>
            <div className="asset-amount">
              <span style={{ fontSize: isAssetsVisible ? "22px" : "15px" }}>
                {isAssetsVisible ? "0원" : "정보 숨김"}
              </span>
              {isAssetsVisible && <ArrowRight style={{ marginLeft: "5px" }} />}
            </div>
            <button className="connect-assets">내 자산 연결하기 +</button>
          </div>
          <div className="expiry-info">
            <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
              만기 도래
            </span>
            <div className="expiry-items">
              <div className="expiry-item">
                <span>예·적금</span>
                <span>2개</span>
              </div>
              <div className="expiry-item">
                <span>ISA</span>
                <span>0개</span>
              </div>
              <div className="expiry-item">
                <span>예·적금</span>
                <span>2개</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-tax-asset">
          <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
            나의 절세자산 현황
          </span>
          <div className="my-tax-asset-box">
            <div className="tax-asset-items">
              <div className="tax-asset-item">
                <span className="tax-asset-title">퇴직연금(IRP)/연금저축</span>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "10%" }}>
                      <div className="progress-circle"></div>
                    </div>
                  </div>
                  <span className="progress-label" style={{ fontSize: "12px" }}>
                    1800(만원)
                  </span>
                </div>
                <div className="tax-asset-details">
                  <div className="tax-asset-limit">
                    <span style={{ fontWeight: "bold" }}>내가 가입한 한도</span>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      0 원
                    </span>
                  </div>
                  <div className="tax-asset-status1">
                    <span
                      className="tax-status-title"
                      style={{ fontSize: "13px" }}
                    >
                      퇴직연금
                    </span>
                    <span
                      className="tax-status red"
                      style={{ color: "#FA0F0F", fontSize: "13px" }}
                    >
                      미가입
                    </span>
                  </div>
                  <div className="tax-asset-status1">
                    <span
                      className="tax-status-title"
                      style={{ fontSize: "13px" }}
                    >
                      연금저축(펀드/신탁/보험)
                    </span>
                    <span
                      className="tax-status red"
                      style={{ color: "#FA0F0F", fontSize: "13px" }}
                    >
                      미가입
                    </span>
                  </div>
                </div>
              </div>
              <div className="tax-asset-item">
                <span className="tax-asset-title">ISA</span>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "10%" }}>
                      <div className="progress-circle"></div>
                    </div>
                  </div>
                  <span className="progress-label" style={{ fontSize: "12px" }}>
                    1억원
                  </span>
                </div>
                <div className="tax-asset-details">
                  <div className="tax-asset-limit">
                    <span style={{ fontWeight: "bold" }}>내가 가입한 한도</span>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      0 원
                    </span>
                  </div>
                  <div className="tax-asset-status1">
                    <span
                      className="tax-status-title"
                      style={{ fontSize: "13px" }}
                    >
                      ISA
                    </span>
                    <span
                      className="tax-status red"
                      style={{ color: "#FA0F0F", fontSize: "13px" }}
                    >
                      미가입
                    </span>
                  </div>
                </div>
              </div>
              <div className="tax-asset-item">
                <span className="tax-asset-title">저축성보험(월적립식)</span>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "10%" }}>
                      <div className="progress-circle"></div>
                    </div>
                  </div>
                  <span className="progress-label" style={{ fontSize: "12px" }}>
                    1800(만원)
                  </span>
                </div>
                <div className="tax-asset-details">
                  <div className="tax-asset-limit">
                    <span style={{ fontWeight: "bold" }}>내가 가입한 한도</span>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      0 원
                    </span>
                  </div>
                </div>
              </div>
              <div className="tax-asset-item">
                <span className="tax-asset-title">비과세종합저축</span>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "10%" }}>
                      <div className="progress-circle"></div>
                    </div>
                  </div>
                  <span className="progress-label" style={{ fontSize: "12px" }}>
                    5000(만원)
                  </span>
                </div>
                <div className="tax-asset-details">
                  <div className="tax-asset-limit">
                    <span style={{ fontWeight: "bold" }}>내가 가입한 한도</span>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      0 원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
          또래 자산 비교
        </span>
        <div className="peer-compare-box">
          <div className="peer-left-section">
            <div className="peer-summary">
              <p>송지원 님은 또래 친구들 대비</p>
              <p style={{ fontWeight: "bold", fontSize: "15px" }}>
                금융자산이 <span className="blue-highlight">180,640원</span>이
                적어요.
              </p>
            </div>

            <div className="peer-details">
              {/* 차트 추가 */}
              <div className="peer-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="또래친구" fill="#ffcc29" />
                    <Bar dataKey="송지원님" fill="#1a73e8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="peer-top-assets">
            <h3>또래 친구의 절세자산 TOP 3</h3>
            <ul className="top-asset-list">
              <li
                className="top-asset-item"
                style={{ backgroundColor: "#EDDFFF" }}
              >
                <span style={{ fontSize: "20px" }}>🥇&nbsp;</span> ISA(
                <span
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    color: "#A412BC",
                  }}
                >
                  54
                </span>{" "}
                %)
              </li>
              <li className="top-asset-item">
                <span style={{ fontSize: "20px" }}>🥈&nbsp;</span> IRP/연금저축(
                <span
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    color: "#A412BC",
                  }}
                >
                  28
                </span>{" "}
                %)
              </li>
              <li className="top-asset-item">
                <span style={{ fontSize: "20px" }}>🥉&nbsp;</span> 저축성보험(
                <span
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    color: "#A412BC",
                  }}
                >
                  18
                </span>{" "}
                %)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
