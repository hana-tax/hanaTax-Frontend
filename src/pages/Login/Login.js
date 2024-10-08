import React from "react";
import "../../assets/css/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleDefaultLogin = () => {
    navigate("/loginForm");
  };
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth/kakao";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth/naver";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>
          SNS로 3초만에
          <br />
          간편하게 로그인
        </h2>
        <button className="kakao-login" onClick={handleKakaoLogin}>
          카카오톡으로 로그인
        </button>
        <button className="naver-login" onClick={handleNaverLogin}>
          네이버로 로그인
        </button>
        <button className="default-login" onClick={handleDefaultLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
