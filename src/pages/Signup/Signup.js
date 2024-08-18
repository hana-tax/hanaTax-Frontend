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

  const [customDomain, setCustomDomain] = useState(false);
  const [, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "domainSelect") {
      if (value === "직접입력") {
        setCustomDomain(true);
        setFormData({ ...formData, domain: "" });
      } else {
        setCustomDomain(false);
        setFormData({ ...formData, domain: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      animate="in"
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
          {customDomain ? (
            <input
              type="text"
              name="domain"
              placeholder="도메인 직접 입력"
              value={formData.domain}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px" }}
            />
          ) : (
            <select
              name="domainSelect"
              onChange={handleChange}
              value={formData.domain}
            >
              <option value="naver.com">naver.com</option>
              <option value="google.com">google.com</option>
              <option value="직접입력">직접입력</option>
            </select>
          )}
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
