import React, { useState, useEffect } from "react";
import "../../assets/css/MyPage.css";
import { ReactComponent as Char1 } from "../../assets/svg/하나얼굴_캐릭터.svg";
import { ReactComponent as ArrowRight } from "../../assets/svg/arrow-right-black.svg";
import useStore from "../../store/useStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../store/tokenStore";

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
  { name: "연금자산", 또래친구: 10, 송지원님: 5 },
  { name: "외화자산", 또래친구: 0, 송지원님: 0 },
  { name: "절세자산", 또래친구: 5, 송지원님: 2 },
];
const MyPage = () => {
  const [isAssetsVisible, setIsAssetsVisible] = useState(false);
  const { user, setUserInfo } = useStore();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [savingCount, setSavingCount] = useState(0);
  const [savingExpiringSoonCount, setSavingExpiringSoonCount] = useState(0);
  const [isaExpiringSoonCount, setIsaExpiringSoonCount] = useState(0);
  const [isaJoinAccount, setIsaJoinAccount] = useState(0);
  const [fundSum, setFundSum] = useState(0);
  const { token, setToken } = useTokenStore();
  const [isaCount, setIsaCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);
  const [insuranceCount, setInsuranceCount] = useState(0);
  const [fundCount, setFundCount] = useState(0);
  const [linkedAssets, setLinkedAssets] = useState("");
  const [ci, setCi] = useState("");
  const [enrollResponse, setEnrollResponse] = useState({});

  const handleToggle = () => {
    setIsAssetsVisible(!isAssetsVisible);
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const getInvestmentType = (profileCode) => {
    switch (profileCode) {
      case 18:
        return "안정형";
      case 19:
        return "안정추구형";
      case 20:
        return "위험중립형";
      case 21:
        return "적극투자형";
      case 22:
        return "공격투자형";
      default:
        return "";
    }
  };

  useEffect(() => {
    const userId = user.id;

    // 토큰 가져오기
    axios
      .post("http://localhost:8080/api/mydata/auth/get-token", { id: userId })
      .then((response) => {
        const newToken = response.data.accessToken; // 새로운 토큰
        setToken(newToken); // 토큰 저장
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setToken(null);
        } else {
          console.error("MyData token API 호출 오류:", error);
        }
      });

    axios
      .post("http://localhost:8080/api/user/getUserById", { id: userId })
      .then((response) => {
        setUserInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("getUserById API 호출 오류", error);
      });

    axios
      .post("http://localhost:8080/api/user/risk-profile", { id: userId })
      .then((response) => {
        const profileCode = response.data.profileName;
        setProfileName(getInvestmentType(profileCode)); // 성향 설정
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setProfileName("");
        } else {
          console.error("risk-profile API 호출 오류", error);
        }
      });

    axios
      .post("http://localhost:8080/api/join-history/total", { id: userId })
      .then((response) => {
        setTotalBalance(response.data.totalBalance || 0);
      })
      .catch((error) => {
        console.error("총 자산 API 호출 오류:", error);
      });

    // 예·적금 계좌 개수 가져오기
    axios
      .post("http://localhost:8080/api/join-history/saving", { id: userId })
      .then((response) => {
        setSavingCount(response.data.length || 0);

        const currentDate = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(currentDate.getMonth() + 1);

        const savingExpiringSoonCount = response.data.filter((item) => {
          const expirationDate = new Date(item.expirationDate);
          return (
            expirationDate >= currentDate && expirationDate <= oneMonthLater
          );
        }).length;
        setSavingExpiringSoonCount(savingExpiringSoonCount);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setSavingCount(0);
          setSavingExpiringSoonCount(0);
        } else {
          console.error("예적금 계좌 API 호출 오류:", error);
        }
      });

    // ISA 계좌 개수 가져오기
    axios
      .post("http://localhost:8080/api/join-history/isa", { id: userId })
      .then((response) => {
        setIsaCount(response.data.length || 0); // ISA 계좌 개수 저장

        console.log(response.data);
        setIsaJoinAccount(response.data[0].joinAccount);

        const currentDate = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(currentDate.getMonth() + 1);

        const isaExpiringSoonCount = response.data.filter((item) => {
          const expirationDate = new Date(item.expirationDate);
          return (
            expirationDate >= currentDate && expirationDate <= oneMonthLater
          );
        }).length;

        setIsaExpiringSoonCount(isaExpiringSoonCount);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setIsaCount(0); // ISA 계좌가 없을 때 0으로 설정
          setIsaExpiringSoonCount(0);
        } else {
          console.error("ISA 계좌 API 호출 오류:", error);
        }
      });

    // 펀드 계좌 개수 가져오기
    axios
      .post("http://localhost:8080/api/join-history/fund", { id: userId })
      .then((response) => {
        setFundCount(response.data.length || 0); // 펀드 계좌 개수 저장
        setFundSum(response.data[0].joinAccount);
        console.log("fund", response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setFundCount(0); // 펀드 계좌가 없을 때 0으로 설정
          setFundSum(0);
        } else {
          console.error("펀드 계좌 API 호출 오류:", error);
        }
      });

    // linked-assets 호출 후 enroll API 호출
    axios
      .post("http://localhost:8080/api/mydata/linked-assets", { id: userId })
      .then((response) => {
        const { linkedAssets, ci } = response.data;
        setLinkedAssets(linkedAssets);
        setCi(ci);
        console.log("Linked Assets:", linkedAssets);
        console.log("CI:", ci);
        const assetCodesArray = linkedAssets.split(",").map(Number);
        axios
          .post(
            "http://localhost:8080/api/mydata/enroll",
            {
              userId: userId,
              ci: ci,
              assetCodes: assetCodesArray,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
              },
            }
          )
          .then((enrollResponse) => {
            const enrollData = enrollResponse.data; // API 응답 데이터
            console.log("Enroll API Response:", enrollData);

            let totalBalanceWithEnroll = totalBalance;
            // API 응답 데이터를 기반으로 개수를 업데이트
            let newSavingCount = savingCount;
            let newIsaCount = isaCount;
            let newFundCount = fundCount;
            let loanCount = 0;
            let insuranceCount = 0;

            enrollData.forEach((item) => {
              if (item.loanCode) {
                loanCount += 1;
              }

              if (
                item.bankCode &&
                (item.accountType === 1 || item.accountType === 2)
              ) {
                newSavingCount += 1;
              }

              if (item.insuranceCode) {
                insuranceCount += 1;
              }

              if (item.balance) {
                totalBalanceWithEnroll += item.balance;
              }
            });

            // 상태 업데이트
            setSavingCount(newSavingCount);
            setIsaCount(newIsaCount);
            setFundCount(newFundCount);
            setInsuranceCount(insuranceCount);
            setLoanCount(insuranceCount);

            setTotalBalance(totalBalanceWithEnroll);
          })
          .catch((error) => {
            console.error("Enroll API 호출 오류:", error);
          });
      })
      .catch((error) => {
        console.error("linked-assets API 호출 오류:", error);
      });
  }, [
    setToken,
    setUserInfo,
    token,
    setTotalBalance,
    setSavingCount,
    setFundCount,
    setLoanCount,
    setIsaCount,
    setInsuranceCount,
  ]);

  return (
    <div className="myPage-container">
      <div className="profile-card">
        <div className="profile-image">
          <Char1 />
        </div>

        <div className="profile-info">
          <h2>{user.name} 님</h2>
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
            <span>{user.id}</span>
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
            <span>
              {profileName ? (
                profileName
              ) : (
                <button
                  className="invest-analysis-register-button"
                  onClick={() => navigate("/investAnalysis")}
                >
                  등록하기
                </button>
              )}
            </span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">휴대폰 번호</span>
            <span>{formatPhoneNumber(user.phoneNumber)}</span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">이메일 주소</span>
            <span>{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-row-subject">집 주소</span>
            <span>{user.address}</span>
          </div>
        </div>
      </div>

      <div className="asset-status">
        <div className="asset-header">
          <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
            자산현황
          </span>
          <div className="asset-tabs">
            <span className="active">예·적금 {savingCount}개</span>
            <span>ISA {isaCount}개</span>
            <span>대출 {loanCount}개</span>
            <span>펀드 {fundCount}개</span>
            <span>보험 {insuranceCount}개</span>
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
                {isAssetsVisible
                  ? `${totalBalance.toLocaleString()}원`
                  : "정보 숨김"}
              </span>
              {isAssetsVisible && <ArrowRight style={{ marginLeft: "5px" }} />}
            </div>
            {!token ? (
              <button
                className="connect-assets"
                onClick={() => navigate("/myData1")}
              >
                내 자산 연결하기 +
              </button>
            ) : (
              <button className="connect-success-assets">연결 완료</button>
            )}
          </div>
          <div className="expiry-info">
            <span style={{ fontFamily: "Pretendard-Bold", fontSize: "17px" }}>
              만기 도래
            </span>
            <div className="expiry-items">
              <div className="expiry-item">
                <span>예·적금</span>
                <span>{savingExpiringSoonCount}개</span>
              </div>
              <div className="expiry-item">
                <span>ISA</span>
                <span>{isaExpiringSoonCount}개</span>
              </div>
              <div className="expiry-item">
                <span>펀드</span>
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
                      {fundSum.toLocaleString()} 원
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
                    {fundCount > 0 ? (
                      <span>{fundSum.toLocaleString()}</span>
                    ) : (
                      <span
                        className="tax-status red"
                        style={{ color: "#FA0F0F", fontSize: "13px" }}
                      >
                        미가입
                      </span>
                    )}
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
                    1억원 (5년)
                  </span>
                </div>
                <div className="tax-asset-details">
                  <div className="tax-asset-limit">
                    <span style={{ fontWeight: "bold" }}>내가 가입한 한도</span>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {isaJoinAccount.toLocaleString()} 원
                    </span>
                  </div>
                  <div className="tax-asset-status1">
                    <span
                      className="tax-status-title"
                      style={{ fontSize: "13px" }}
                    >
                      ISA
                    </span>
                    {isaCount > 0 ? (
                      <span>{isaJoinAccount.toLocaleString()}</span>
                    ) : (
                      <span
                        className="tax-status red"
                        style={{ color: "#FA0F0F", fontSize: "13px" }}
                      >
                        미가입
                      </span>
                    )}
                  </div>
                  <div className="tax-asset-status1">
                    <span
                      className="tax-status-title"
                      style={{ fontSize: "13px" }}
                    >
                      내 연 잔여한도
                    </span>
                    {isaCount > 0 ? (
                      <span>
                        {" "}
                        {(18000000 - isaJoinAccount).toLocaleString()}
                      </span>
                    ) : (
                      <span
                        className="tax-status red"
                        style={{ color: "#FA0F0F", fontSize: "13px" }}
                      >
                        미가입
                      </span>
                    )}
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
              <p>{user.name} 님은 또래 친구들 대비</p>
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
