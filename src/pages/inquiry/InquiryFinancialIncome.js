import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Inquiry.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../assets/svg/금융소득/money-hand.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import Loading from "./Loading";

const questions = [
  {
    question: "금융소득이란 무엇인가요?",
    answer:
      "금융소득은 이자소득과 배당소득을 포함하는 소득으로, 금융기관에서 발생하는 수익을 의미합니다.",
  },
  {
    question: "금융소득 종합과세란 무엇인가요?",
    answer:
      "금융소득 종합과세는 연간 금융소득이 2000만원을 초과할 경우, 다른 소득과 합산하여 세금을 부과하는 제도입니다.",
  },
  {
    question: "종합과세 대상이 되기 위한 조건은 무엇인가요?",
    answer:
      "연간 금융소득이 2000만원을 초과하거나, 다른 소득과 합산하여 종합소득세 신고를 해야 합니다.",
  },
  {
    question: "금융소득이 2000만원 이하일 경우 어떻게 되나요?",
    answer:
      "금융소득이 2000만원 이하일 경우, 분리과세를 선택할 수 있으며, 소득세가 보다 낮은 비율로 부과됩니다.",
  },
  {
    question: "금융소득 종합과세를 신고하려면 어떻게 하나요?",
    answer:
      "국세청 홈택스를 통해 종합소득세 신고를 진행할 수 있으며, 필요한 서류를 준비해야 합니다.",
  },
];

const InquiryFinancialIncome = () => {
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  const handleInquiryClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/inquiryFinancialIncome/result");
    }, 2000);
  };

  const ToAllofYearEnd = () => {
    navigate("/allofYearEnd");
  };

  const toggleAnswer = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-container">
      <div className="box">
        <div className="left-container">
          <h1>
            잠자는 내 금융소득
            <br />
            확인하세요
          </h1>
          <button className="inquiry-button" onClick={handleInquiryClick}>
            대상자 여부 확인하기
          </button>
          <button className="description-button" onClick={ToAllofYearEnd}>
            금융소득이란?
          </button>
        </div>
        <div className="right-container-without-animation">
          <Char />
        </div>
      </div>

      <div className="faq-container">
        <h2>금융소득 관련 자주 묻는 질문</h2>
        <div className="faq-list">
          {questions.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleAnswer(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {item.question}
                {selectedQuestion === index ? <ArrowUp /> : <ArrowDown />}
              </div>
              {selectedQuestion === index && (
                <div className="faq-answer-box">
                  <div className="faq-answer">{item.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InquiryFinancialIncome;
