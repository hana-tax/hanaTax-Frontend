import React, { useState } from "react";
import "../../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-custom-alert";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("김하나님, 반가워요!");
    console.log("아이디:", username, "비밀번호:", password);

    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
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
