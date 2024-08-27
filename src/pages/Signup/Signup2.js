import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../assets/css/Signup.css";
import { ToastContainer, toast } from "react-custom-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";

const Signup2 = () => {
  const navigate = useNavigate();
  const open = useDaumPostcodePopup();

  const [formData, setFormData] = useState({
    zipcode: "",
    address: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    residentNumberFront: "",
    residentNumberBack: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (
        updatedData.birthYear &&
        updatedData.birthMonth &&
        updatedData.birthDay
      ) {
        const year = updatedData.birthYear.slice(-2); // 마지막 2자리
        const month = String(updatedData.birthMonth).padStart(2, "0"); // 2자리로 변환
        const day = String(updatedData.birthDay).padStart(2, "0"); // 2자리로 변환
        updatedData.residentNumberFront = `${year}${month}${day}`;
      }

      return updatedData;
    });
  };

  const handleResidentNumberBackChange = (e) => {
    const value = e.target.value;
    const maskedValue =
      value.length > 0 ? value[0] + "*".repeat(value.length - 1) : "";
    setFormData((prevData) => ({
      ...prevData,
      residentNumberBack: maskedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidBirthDate = (year, month, day) => {
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === Number(month) - 1 &&
        date.getDate() === Number(day)
      );
    };

    if (
      !isValidBirthDate(
        formData.birthYear,
        formData.birthMonth,
        formData.birthDay
      )
    ) {
      toast.error("올바른 생년월일을 입력해주세요.");
      return;
    }

    const residentNumber = `${
      formData.residentNumberFront
    }-${formData.residentNumberBack.replace(/\*/g, "")}`;

    const dataToSubmit = {
      id: formData.id,
      password: formData.password,
      name: formData.name,
      residentNumber: residentNumber,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      zipCode: formData.zipcode,
      address: formData.address,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signup",
        dataToSubmit
      );
      if (response.data.success) {
        toast.success("회원가입이 완료되었습니다.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      toast.error("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const handleAddressSearch = () => {
    open({
      onComplete: (data) => {
        setFormData((prevData) => ({
          ...prevData,
          zipcode: data.zonecode,
          address: data.address,
        }));
      },
    });
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
            name="zipcode"
            placeholder="우편번호"
            value={formData.zipcode}
            onChange={handleChange}
            required
            readOnly
          />
          <button type="button" onClick={handleAddressSearch}>
            검색하기
          </button>
        </div>

        <input
          type="text"
          name="address"
          placeholder="주소"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="birthdate">
          <input
            type="number"
            name="birthYear"
            placeholder="년도"
            value={formData.birthYear}
            onChange={handleChange}
            maxLength={4}
            required
          />
          <input
            type="number"
            name="birthMonth"
            placeholder="월"
            value={formData.birthMonth}
            onChange={handleChange}
            maxLength={2}
            required
          />
          <input
            type="number"
            name="birthDay"
            placeholder="일"
            value={formData.birthDay}
            onChange={handleChange}
            maxLength={2}
            required
          />
        </div>

        <div className="resident-number">
          <input
            type="text"
            name="residentNumberFront"
            placeholder="주민등록번호 앞자리"
            value={formData.residentNumberFront}
            onChange={handleChange}
            maxLength={6}
            required
          />
          <span>-</span>
          <input
            type="text"
            name="residentNumberBack"
            placeholder="주민등록번호 뒷자리"
            value={formData.residentNumberBack}
            onChange={handleResidentNumberBackChange}
            maxLength={7}
            required
          />
        </div>

        <button type="submit">가입하기</button>
      </form>
      <ToastContainer floatingTime={5000} />
    </motion.div>
  );
};

export default Signup2;
