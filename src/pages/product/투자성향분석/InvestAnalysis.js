import React, { useState } from "react";
import "../../../assets/css/Invest.css";
import axios from "axios";
import { ReactComponent as FaceIcon } from "../../../assets/svg/하나얼굴_캐릭터.svg";
import { ReactComponent as Icon } from "../../../assets/svg/하나_캐릭터.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/arrow-left.svg";
import useAuthStore from "../../../store/useStore";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";

const InvestAnalysis = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const user = useAuthStore((state) => state.user);
  const [selectedOptions, setSelectedOptions] = useState([]); // 6번 문항
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [scores, setScores] = useState([]); // 각 문항별 점수 저장
  const [finalScore, setFinalScore] = useState(0);
  const totalQuestions = 8;
  const progressIncrement = 100 / totalQuestions;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allSelectedOptions, setAllSelectedOptions] = useState([]);

  const location = useLocation(); // state로 전달된 값 받기
  const accountType = location.state?.accountType || "";

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const scoreMapping = {
    생활자금: 2,
    주택자금: 4,
    노후자금: 6,
    여유자금: 8,
    "기대수익이 높다면 위험이 높아도 상관하지 않음": 10,
    "투자원금에서 20%~100% 손실을 감내할 수 있음": 8,
    "투자원금에서 20%미만까지는 손실을 감내할 수 있음": 6,
    "투자원금에서 10%미만까지는 손실을 감내할 수 있음": 4,
    "무슨 일이 있어도 투자 원금은 보전되어야 함": 2,
    "3년 이상": 10,
    "2년 이상~3년 미만": 8,
    "1년 이상~2년 미만": 6,
    "6개월 이상~1년 미만": 4,
    "6개월 미만": 2,
    "투자상품 특정만기일까지 보유": 4,
    "5% 이하": 2,
    "10% 이하": 4,
    "15% 이하": 6,
    "20% 이하": 8,
    "20% 초과": 10,
    "현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상": 8,
    "현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상": 4,
    "현재 일정한 수입이 없거나, 연금 등이 주 수입원임": 2,
    "은행 예적금, 국채, 지방채 등": 2,
    "채권형펀드, 원금보장형 ELS 등": 4,
    "혼합형펀드, 원금의 일부만 보장되는 ELS 등": 6,
    "시장수익률 수준의 수익을 추구하는 주식형펀드 등": 8,
    "시장수익률 이상의 수익을 추구하는 주식형펀드 등": 10,
    "파생상품을 포함한 대부분의 금융투자상품의 구조 및 위험을 이해하고 있음": 10,
    "널리 알려진 금융투자상품의 구조 및 위험을 깊이 있게 이해하고 있음": 8,
    "금융상품 중 예적금에 대해서만 이해하고 있음": 4,
    "투자경험 있음": 10,
    "투자경험 없음": 2,
  };

  const handleNextQuestion = () => {
    let currentScore = 0;

    // 6번 문항의 경우 다중 선택이므로, 선택된 항목의 점수를 모두 더함
    if (currentQuestion === 6) {
      selectedOptions.forEach((option) => {
        currentScore += scoreMapping[option] || 0;
      });
      setAllSelectedOptions([
        ...allSelectedOptions,
        selectedOptions.join(", "),
      ]); // 다중 선택 항목 저장
    } else {
      currentScore = scoreMapping[selectedOption] || 0;
      setAllSelectedOptions([...allSelectedOptions, selectedOption]); // 단일 선택 항목 저장
    }

    setScores((prevScores) => [...prevScores, currentScore]); // 각 질문의 점수 저장
    setFinalScore((prevFinalScore) => prevFinalScore + currentScore);
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
      setProgressWidth((prev) => prev + progressIncrement);
      setSelectedOption(""); // 다음 질문으로 넘어갈 때 선택 초기화
      setSelectedOptions([]); // 6번 문항 체크박스 초기화
    } else {
      setIsModalOpen(true); // 마지막 문항 후 모달 열기
    }
  };

  const determineInvestmentType = async () => {
    console.log("finalScore" + finalScore);
    let profileName = 18; // 기본값
    if (finalScore <= 42) {
      profileName = 18; // 안정형
    } else if (finalScore <= 54) {
      profileName = 19; // 안정추구형
    } else if (finalScore <= 67) {
      profileName = 20; // 위험중립형
    } else if (finalScore <= 80) {
      profileName = 21; // 적극투자형
    } else {
      profileName = 22; // 공격투자형
    }

    const profileDate = new Date().toISOString().split("T")[0]; // 오늘 날짜

    // API로 데이터 전송
    const postData = {
      profileName: profileName,
      profileDate: profileDate,
      profileScore: finalScore,
      id: user.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/investAnalysis/insert",
        postData
      );
      console.log("API Response:", response.data);
      setIsModalOpen(false);
      if (accountType === "ISA") {
        navigate("/isa/product/join");
      } else if (accountType === "pension") {
        navigate("/pension/product/join");
      } else {
        navigate("/"); // 기본 경로
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      setProgressWidth((prev) => prev - progressIncrement);
      setAllSelectedOptions(allSelectedOptions.slice(0, -1)); // 이전 질문으로 돌아갈 때 선택 항목 삭제
      setScores(scores.slice(0, -1)); // 이전 점수 삭제
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((option) => option !== value)
        : [...prevSelectedOptions, value]
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <div className="invest-progress">
          <div className="progress-info">
            <span style={{ color: "#099A96", fontWeight: "bold" }}>
              {currentQuestion}
            </span>
            <span style={{ fontWeight: "bold" }}>/{totalQuestions}</span>
          </div>

          <div className="invest-analysis-progress-bar">
            {" "}
            <div
              className="invest-analysis-progress-little-bar"
              style={{ width: `${progressWidth}%` }}
            ></div>
            <FaceIcon
              className="face-icon"
              style={{
                left: `${progressWidth}%`,
                transform: `translateX(-50%)`,
              }}
            />
          </div>
        </div>
        <div className="question-container">
          <h2>{currentQuestionData.questionText}</h2>
          <form>
            {currentQuestion === 6 // 6번 문항은 체크박스
              ? currentQuestionData.options.map((option, index) => (
                  <label
                    key={index}
                    className={`option ${
                      selectedOptions.includes(option) ? "selected" : "" // 선택된 체크박스에 클래스 적용
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={handleCheckboxChange}
                    />
                    {option}
                  </label>
                ))
              : currentQuestionData.options.map((option, index) => (
                  <label
                    key={index}
                    className={`option ${
                      selectedOption === option ? "selected" : "" // 선택된 라디오 버튼에 클래스 적용
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
          <div className="previous-button" onClick={handlePreviousQuestion}>
            <ArrowLeft />
            <span style={{ color: "#858585" }}>이전으로</span>
          </div>
        </div>
        <button
          onClick={handleNextQuestion}
          className="invest-analysis-btn"
          style={{
            backgroundColor: selectedOption ? "#099A96" : "#d1d1d1",
          }}
        >
          {totalQuestions - currentQuestion} 문항 남았습니다
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="최종 투자성향 및 점수"
        className="invest-analysis-modal"
        overlayClassName="overlay-modal"
        style={{ width: "300px" }}
      >
        <h2 style={{ fontFamily: "Pretendard-Bold" }}>
          {user.name} 님은{" "}
          <span
            style={{
              color:
                finalScore <= 42
                  ? "#5CA568" // 안정형
                  : finalScore <= 54
                  ? "#2399DC" // 안정추구형
                  : finalScore <= 67
                  ? "#F8C359" // 위험중립형
                  : finalScore <= 80
                  ? "#F8964E" // 적극투자형
                  : "#F01808", // 공격투자형
            }}
          >
            {finalScore <= 42
              ? "안정형"
              : finalScore <= 54
              ? "안정추구형"
              : finalScore <= 67
              ? "위험중립형"
              : finalScore <= 80
              ? "적극투자형"
              : "공격투자형"}{" "}
          </span>
          입니다
        </h2>

        <div className="result-info">
          <p>
            {finalScore <= 42
              ? "이 성향은 작은 원금 손실도 감내하기 어려운 경우예요. 예금, 적금 수준의 수익을 기대해요."
              : finalScore <= 54
              ? "이 성향은 원금 손실을 최소화하고 낮지만 안정적인 투자 수익을 기대해요. 예금, 적금보다 높은 수익을 낼 수 있다면 일부를 변동성이 있는 금융상품에 투자할 의향이 있어요."
              : finalScore <= 67
              ? "이 성향은 원금 손실 위험 대비 적정한 투자 수익을 기대해요. 예금, 적금보다 높고 대표적인 주가 지수 수준의 수익이 있다면 해당 수익금의 변동을 감내할 의향이 있어요."
              : finalScore <= 80
              ? "이 성향은 높은 투자 수익에 따른 투자 위험이 있음을 충분히 인식해요. 예금, 적금보다 높은 수익을 낼 수 있다면, 손실 위험을 감수해요."
              : "이 성향은 높은 투자 수익을 위해 손실 위험을 적극적으로 수용해요. 투자 자금의 대부분을 위험 자산에 투자할 의향이 있어요."}
          </p>
        </div>

        <div className="result-content">
          <p>
            <span className="result-label">투자목표</span>{" "}
            <span className="result-value">{allSelectedOptions[0]}</span>
          </p>
          <p>
            <span className="result-label">위험 감내 정도</span>{" "}
            <span className="result-value">{allSelectedOptions[1]}</span>
          </p>
          <p>
            <span className="result-label">투자 예정 기간</span>{" "}
            <span className="result-value">{allSelectedOptions[2]}</span>
          </p>
          <p>
            <span className="result-label">상품 투자 비중</span>{" "}
            <span className="result-value">{allSelectedOptions[3]}</span>
          </p>
          <p>
            <span className="result-label">수입원</span>{" "}
            <span className="result-value">{allSelectedOptions[4]}</span>
          </p>
          <p>
            <span className="result-label">투자 경험</span>{" "}
            <span className="result-value">{allSelectedOptions[5]}</span>
          </p>
          <p>
            <span className="result-label">금융 이해도</span>{" "}
            <span className="result-value">{allSelectedOptions[6]}</span>
          </p>
          <p>
            <span className="result-label">파생상품 투자 경험</span>{" "}
            <span className="result-value">{allSelectedOptions[7]}</span>
          </p>
        </div>

        <div className="modal-buttons">
          <button
            className="invest-analysis-btn"
            onClick={() => {
              // 성향 재분석 버튼을 누르면 테스트를 초기화
              setCurrentQuestion(1);
              setFinalScore(0);
              setProgressWidth(0);
              setSelectedOption("");
              setSelectedOptions([]);
              setAllSelectedOptions([]);
              setIsModalOpen(false); // 모달 닫기
            }}
            style={{
              color: "#18CD8C",
              backgroundColor: "rgba(173, 244, 219, 0.46)",
            }}
          >
            성향 재분석
          </button>
          <button
            className="invest-analysis-btn"
            onClick={determineInvestmentType}
            style={{ backgroundColor: "#18CD8C" }}
          >
            등록하기
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default InvestAnalysis;
