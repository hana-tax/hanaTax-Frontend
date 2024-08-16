import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Inquiry.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../assets/svg/연말정산/earth.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import Loading from "./Loading";

const questions = [
  {
    question: "연말정산이란 무엇인가요?",
    answer:
      "1년간의 총근로소득에 대한 납부세액을 확정하는 것으로 근로자가 한해 동안 납부한 근로소득세를 정산하는 절차입니다. ",
  },
  {
    question: "어떻게 환급액을 조회하나요?",
    answer: "환급액 조회는 국세청 홈택스에서 가능합니다.",
  },
  {
    question: "연말정산 준비물은 무엇인가요?",
    answer: "소득금액증명서, 의료비 지출증명서 등이 필요합니다.",
  },
  {
    question: "세금 환급은 언제 이루어지나요?",
    answer: "세금 환급은 보통 3월 중순에 이루어집니다.",
  },
];

const InquiryYearEnd = () => {
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  const handleInquiryClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/inquiryYearEnd/result");
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
            연말정산 미리미리
            <br />
            준비하세요
          </h1>
          <button className="inquiry-button" onClick={handleInquiryClick}>
            환급액 조회하기
          </button>
          <button className="description-button" onClick={ToAllofYearEnd}>
            연말정산이란?
          </button>
        </div>
        <div className="right-container">
          <Char />
        </div>
      </div>

      <div className="faq-container">
        <h2>연말정산 관련 자주 묻는 질문</h2>
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

export default InquiryYearEnd;
