import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Loading.css"; // CSS 파일 임포트
import { ReactComponent as Char } from "../../assets/svg/hana-char.svg";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/myData1");
    }, 10000); // 2초 후에 MyData1로 이동

    return () => clearTimeout(timer); // 타이머 정리
  }, [navigate]);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Char />
        <h3>잠시만 기다려주세요...</h3>
        <BeatLoader color="#10B9BE" />
      </div>
    </div>
  );
};

export default Loading;
