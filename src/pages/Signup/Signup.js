import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../assets/css/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    domain: "naver.com",
  });

  const [isDomainListActive, setDomainListActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEmail = `${formData.email}@${formData.domain}`;
    console.log(fullEmail);

    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/signup2");
    }, 300);
  };

  const handleDomainSelect = (domain) => {
    setFormData({ ...formData, domain });
    setDomainListActive(false);
  };

  const toggleDomainList = () => {
    setDomainListActive(!isDomainListActive);
  };

  const handleDirectInput = () => {
    // 도메인 입력란을 비워줌
    setFormData({ ...formData, domain: "" });
    setDomainListActive(false);
  };

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  };

  const pageTransition = {
    type: "tween",
    duration: 0.3,
  };

  return (
    <motion.div
      className="form-container"
      initial="initial"
      animate={isSubmitted ? "out" : "in"}
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>회원가입</h2>
        <p>가입을 통해 더 다양한 서비스를 만나보세요!</p>

        <div id="info__id">
          <input
            type="text"
            name="username"
            placeholder="아이디 입력 (6~20자)"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <button type="button">중복 확인</button>
        </div>

        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 재입력"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="email-input">
          <input
            type="text"
            name="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span>@</span>
          <div className="box domain" onClick={toggleDomainList}>
            <div className="domain__selected">{formData.domain}</div>
            <ul
              className={`domain__list ${isDomainListActive ? "active" : ""}`}
            >
              <li
                className="option"
                onClick={() => handleDomainSelect("naver.com")}
              >
                naver.com
              </li>
              <li
                className="option"
                onClick={() => handleDomainSelect("google.com")}
              >
                google.com
              </li>
              <li className="option" onClick={handleDirectInput}>
                직접 입력
              </li>
            </ul>
          </div>
        </div>

        <input
          type="text"
          name="phoneNumber"
          placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">다음</button>
      </form>
    </motion.div>
  );
};

export default Signup;
