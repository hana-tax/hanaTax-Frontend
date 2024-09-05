import React, { useState } from "react";
import "../../../assets/css/Invest.css";
import { ReactComponent as FaceIcon } from "../../../assets/svg/하나얼굴_캐릭터.svg";
import { ReactComponent as Icon } from "../../../assets/svg/하나_캐릭터.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/arrow-left.svg";

const InvestAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 8;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const questions = [
    {
      questionText: "금융투자상품의 취득 및 처분목적은 무엇입니까?",
      options: ["생활자금", "주택자금", "노후자금", "여유자금"],
    },
    {
      questionText:
        "현재 투자하는 자금에 대하여 기대수익 및 손실위험에 대한 태도는 무엇입니까?",
      options: [
        "기대수익이 높다면 위험이 높아도 상관하지 않음",
        "투자원금에서 20%~100% 손실을 감내할 수 있음",
        "투자원금에서 20%미만까지는 손실을 감내할 수 있음",
        "투자원금에서 10%미만까지는 손실을 감내할 수 있음",
        "무슨 일이 있어도 투자 원금은 보전되어야 함",
      ],
    },
    {
      questionText: "현재 투자하는 자금의 투자 예정기간은 얼마나 되십니까?",
      options: [
        "3년 이상",
        "2년 이상~3년 미만",
        "1년 이상~2년 미만",
        "6개월 이상~1년 미만",
        "6개월 미만",
        "투자상품 특정만기일까지 보유 (ELF, ELT, 목표전환형 등)",
      ],
    },
    {
      questionText: "총자산대비 투자상품의 비중은 얼마나 되십니까?",
      options: ["5% 이하", "10% 이하", "15% 이하", "20% 이하", "20% 초과"],
    },
    {
      questionText: "고객님의 수입원을 가장 잘 나타내는 것은 어느 것입니까?",
      options: [
        "현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상",
        "현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상",
        "현재 일정한 수입이 없거나, 연금 등이 주 수입원임",
      ],
    },
    {
      questionText:
        "고객님의 투자경험과 가장 가까운 것은 어느 것입니까? (중복선택 가능)",
      options: [
        "은행 예적금, 국채, 지방채, 보증채, MMF, CMA 등",
        "채권형펀드, 원금보장형 ELS, 금융채, 신용도가 높은 회사채 등",
        "혼합형펀드, 원금의 일부만 보장되는 ELS, 신용도 중간 등급의 회사채 등",
        "시장수익률 수준의 수익을 추구하는 주식형펀드, 원금이 보장되지 않는 ELS, 신용도가 낮은 회사채, 주식 등",
        "시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품펀드, ELW, 선물옵션, 주식 신용 거래 등",
      ],
    },
    {
      questionText:
        "고객님께서는 금융상품 투자에 대한 본인의 지식 수준이 어느 정도라고 생각하십니까?",
      options: [
        "파생상품을 포함한 대부분의 금융투자상품의 구조 및 위험을 이해하고 있음",
        "널리 알려진 금융투자상품(주식, 채권 및 펀드 등)의 구조 및 위험을 깊이 있게 이해하고 있음",
        "금융상품 중 예적금에 대해서만 이해하고 있음",
      ],
    },
    {
      questionText:
        "파생상품, 파생결합증권 또는 파생투자상품(ELF, DLF, ELT)에 투자한 경험이 있으십니까?",
      options: ["투자경험 있음", "투자경험 없음"],
    },
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <div>
      <div className="invest-analysis-header">
        <div className="invest-analysis-text">
          <span>당신의 투자 성향은?</span>
          <span
            style={{
              fontSize: "26px",
              color: "#000",
              fontFamily: "Pretendard-Bold",
            }}
          >
            투자 성향 테스트
          </span>
        </div>
        <Icon />
      </div>
      <div className="invest-analysis">
        <div className="progress">
          <span style={{ color: "#099A96", fontWeight: "bold" }}>
            {currentQuestion}
          </span>
          <span style={{ fontWeight: "bold" }}>/{totalQuestions}</span>
          <FaceIcon style={{ marginLeft: "5px" }} />
          <div className="invest-analysis-progress-bar"></div>
        </div>
        <div className="question-container">
          <h2>{currentQuestionData.questionText}</h2>
          <form>
            {currentQuestionData.options.map((option, index) => (
              <label
                key={index}
                className={`option ${
                  selectedOption === option ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </form>
        </div>

        <div className="footer">
          <div className="previous-button">
            <ArrowLeft
              onClick={() =>
                setCurrentQuestion(
                  currentQuestion > 1 ? currentQuestion - 1 : 1
                )
              }
            />
            <span style={{ color: "#858585" }}>이전으로</span>
          </div>
        </div>
        <button
          onClick={() =>
            setCurrentQuestion(
              currentQuestion < totalQuestions
                ? currentQuestion + 1
                : totalQuestions
            )
          }
          className="invest-analysis-btn"
          style={{
            backgroundColor: selectedOption ? "#099A96" : "#d1d1d1",
            color: selectedOption ? "#fff" : "#000",
          }}
        >
          {totalQuestions - currentQuestion} 문항 남았습니다
        </button>
      </div>
    </div>
  );
};
export default InvestAnalysis;
