import React, { useState } from "react";
import "../../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-custom-alert";
import useStore from "../../store/useStore";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, logout, setLastLoginTime } = useStore((state) => ({
    login: state.login,
    logout: state.logout,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    setLastLoginTime: state.setLastLoginTime,
  }));
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
        credentials: "include", // 쿠키를 포함하여 요청
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
      login({ id: username, name: userName });

      const currentTime = new Date().toLocaleString();
      setLastLoginTime(currentTime);

      setIsSubmitted(true);
      navigate("/");
    } catch (error) {
      toast.error("로그인 중 오류가 발생했습니다.");
      console.error("로그인 오류:", error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/logout", {
        method: "POST",
        credentials: "include", // 쿠키를 포함하여 요청
      });

      if (response.status === 200) {
        console.log(response);

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
        <a href="/" className="signup-link" onClick={handleSignup}>
          회원가입
        </a>
      </form>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default LoginForm;
