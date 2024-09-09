import React, { useState, useEffect } from "react";
import "../../assets/css/MyData.css"; // CSS 파일 임포트
import { ReactComponent as Icon1 } from "../../assets/svg/mydata1.svg";
import { ReactComponent as Icon2 } from "../../assets/svg/mydata2.svg";
import { ReactComponent as Icon3 } from "../../assets/svg/mydata3.svg";
import { ReactComponent as Icon4 } from "../../assets/svg/mydata4.svg";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading"; // Loading 컴포넌트 임포트
import axios from "axios";
import tokenStore from "../../store/tokenStore";

function MyData1() {
  const [isLoading, setIsLoading] = useState(true);
  const [residentNo1, setResidentNo1] = useState("");
  const [residentNo2, setResidentNo2] = useState("");
  const [authCode, setAuthCode] = useState("");
  const { token, setToken, clearToken } = tokenStore();

  const navigate = useNavigate();
  const goTo2 = () => {
    navigate("/myData2");
  };

  useEffect(() => {
    // 2초 후에 로딩 화면을 숨기고 MyData1 화면을 보여줌
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // 타이머 정리
  }, []);

  const hashResidentNumber = (residentNumber) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(residentNumber);

    return crypto.subtle.digest("SHA-256", data).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    const userCi = `${residentNo1}${residentNo2}`; // 주민등록번호 합치기
    console.log(userCi);
    try {
      const hashedUserCi = await hashResidentNumber(userCi);
      const response = await axios.get(
        `http://localhost:8080/api/mydata/auth/authorize`,
        {
          params: { userCi: hashedUserCi }, // 쿼리 파라미터로 주민등록번호 전달
        }
      );
      // console.log(hashedUserCi);
      console.log(response.data);
      setAuthCode(response.data); // authCode 상태 업데이트
      console.log(response.data);
      await fetchTokens(response.data); // 토큰 요청 함수 호출
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  const fetchTokens = async (authCode) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/mydata/auth/token`,
        null,
        { params: { authCode } }
      );

      console.log(authCode);
      const { accessToken, refreshToken } = response.data;
      setToken({ accessToken, refreshToken });

      goTo2(); // 요청 성공 후 다음 페이지로 이동
    } catch (error) {
      console.error("토큰 요청 오류:", error);
    }
  };

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트를 보여줌
  }

  const handleInputChange1 = (e) => {
    setResidentNo1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setResidentNo2(e.target.value);
  };

  return (
    <div className="mydata-container">
      <div className="mydata-text">
        <h1>마이데이터 가입</h1>
        <span>내 계좌 대출 증권 포인트 보기</span>
      </div>
      <div className="icon-row">
        <div className="icon active">
          <div className="circle-container">
            <div className="big-circle">
              <div className="small-circle">
                <Icon1 />
              </div>
            </div>
          </div>
          <p>본인인증</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon2 style={{ marginLeft: "7px" }} />
                </div>
              </div>
            </div>
          </div>
          <p>약관동의</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon3 />
                </div>
              </div>
            </div>
          </div>
          <p>연결자산 선택</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon4 />
                </div>
              </div>
            </div>
          </div>
          <p>가입완료</p>
        </div>
      </div>
      <div className="form-container">
        <h2>정보입력</h2>
        <form className="form">
          <label className="form-label">
            <h3>이름</h3>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              style={{ marginLeft: "150px" }}
              className="input-text"
            />
          </label>
          <label className="form-label">
            <h3>주민등록번호</h3>
            <div
              className="resident-number-label"
              style={{ marginLeft: "80px" }}
            >
              <input
                type="text"
                placeholder="주민등록번호 앞 6자리"
                className="input-text"
                value={residentNo1}
                onChange={handleInputChange1}
              />
              -
              <input
                type="text"
                placeholder="주민등록번호 뒤 7자리"
                className="input-text"
                style={{ backgroundColor: "#B3B3B3" }}
                value={residentNo2}
                onChange={handleInputChange2}
              />
            </div>
          </label>
          <label className="form-label">
            <h3>휴대폰번호</h3>
            <input
              type="text"
              placeholder="번호를 입력하세요"
              style={{ marginLeft: "100px" }}
              className="input-text"
            />
          </label>
          <button type="submit" className="myDataButton" onClick={handleSubmit}>
            확인
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyData1;
