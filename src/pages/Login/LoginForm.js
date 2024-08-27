import React, { useState } from "react";
import "../../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-custom-alert";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();
      const userName = data.name; // 이름 가져오기
      toast.success(`${userName}님, 반가워요!`); // 이름으로 메시지 표시

      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error("로그인 중 오류가 발생했습니다.");
      console.error("로그인 오류:", error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className={`login-form-container ${isSubmitted ? "fade-out" : ""}`}>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>로그인</h2>
        <div className="input-button">
          <div className="input-container">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </div>
        <a href="#" className="signup-link" onClick={handleSignup}>
          회원가입
        </a>
      </form>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default LoginForm;
