import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-custom-alert";
import useStore from "../../../store/useStore";

const KakaoRedirectPage = () => {
  const { login } = useStore((state) => ({
    login: state.login,
  }));
  const location = useLocation();
  const navigate = useNavigate();

  const handleOAuthKakao = async (code) => {
    try {
      // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
      const response = await axios.get(
        `http://localhost:8080/oauth/login/kakao?code=${code}`
      );
      if (response.status === 200) {
        const data = response.data; // 이름 가져오기
        console.log(data);
        toast.success(`${data}님, 반가워요!`);
        login({ name: data });
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2초 후에 페이지 이동
      }
      //console.log(data);
    } catch (error) {
      console.log(error);
      navigate("/fail");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      // alert("CODE = " + code);
      console.log(code);
      handleOAuthKakao(code);
    }
  }, [location]);

  return (
    <div>
      <div>Processing...</div>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default KakaoRedirectPage;
