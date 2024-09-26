import React from "react";
import "../../assets/css/Chatbot.css"; // 스타일 파일 불러오기
import { ReactComponent as Chatbot } from "../../assets/svg/chatbot_char.svg";

const IntroScreen = ({ onNext }) => {
  return (
    <div className="chatbot-intro-container">
      <div className="chatbot-intro-inner-container">
        <div className="chatbot-intro-content">
          <Chatbot />
          <h2 className="chatbot-intro-heading">톡스에게 질문하세요!</h2>
          <p className="chatbot-intro-text">
            이젠 세금 질문도 채팅으로!
            <br /> 톡스 AI가 바로 알려드려요.
          </p>
        </div>
        <button className="chatbot-next-button" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
