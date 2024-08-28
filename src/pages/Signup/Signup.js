import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../assets/css/Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
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
    console.log("Form Data on Submit:", formData); // 추가된 로그
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/signup2", {
        state: {
          id: formData.id,
          password: formData.password,
          name: formData.name,
          email: fullEmail,
          phoneNumber: formData.phoneNumber,
        },
      });
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

  const checkId = async () => {
    const response = await fetch("http://localhost:8080/api/user/idcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: formData.id }),
    });
    console.log(response);

    const data = await response.json();
    console.log(data.exist);
    if (data.exist) {
      setMessage("아이디가 중복되었습니다.");
    } else {
      setMessage("사용 가능한 아이디입니다.");
    }
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
            name="id"
            placeholder="아이디 입력 (6~20자)"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={checkId}>
            중복 확인
          </button>
          {message && (
            <span
              style={{
                color:
                  message === "아이디가 중복되었습니다." ? "#FA1212" : "gray",
                fontSize: "13px",
                position: "relative",
                top: "-15px",
              }}
            >
              {message}
            </span>
          )}
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

        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
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
