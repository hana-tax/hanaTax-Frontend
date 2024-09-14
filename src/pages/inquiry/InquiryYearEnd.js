import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Inquiry.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../assets/svg/연말정산/earth.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Info } from "../../assets/svg/Info.svg";
import Loading from "./Loading";
import Modal from "react-modal";
import useTaxStore from "../../store/taxStore";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalIncome, setTotalIncome] = useState("");
  const [deduction, setDeduction] = useState(0);
  const [taxPaid, setTaxPaid] = useState("");

  const calculateDeduction = (income) => {
    if (income <= 5000000) {
      return income * 0.7;
    } else if (income <= 15000000) {
      return 3500000 + (income - 5000000) * 0.4;
    } else if (income <= 45000000) {
      return 7500000 + (income - 15000000) * 0.15;
    } else if (income <= 100000000) {
      return 12000000 + (income - 45000000) * 0.05;
    } else if (income <= 362500000) {
      return 14750000 + (income - 100000000) * 0.02;
    } else {
      return 20000000;
    }
  };

  //인적 공제 본인: 150만원
  //과세표준 계산
  const calculateTaxableIncome = (income, deduction) => {
    return Math.max(0, income - deduction - 1500000);
  };

  //산출세액 계산
  const calculateTax = (taxableIncome) => {
    if (taxableIncome <= 14000000) {
      return taxableIncome * 0.06;
    } else if (taxableIncome <= 50000000) {
      return 840000 + (taxableIncome - 14000000) * 0.15;
    } else if (taxableIncome <= 88000000) {
      return 6240000 + (taxableIncome - 50000000) * 0.24;
    } else if (taxableIncome <= 150000000) {
      return 15360000 + (taxableIncome - 88000000) * 0.35;
    } else if (taxableIncome <= 300000000) {
      return 37060000 + (taxableIncome - 150000000) * 0.38;
    } else if (taxableIncome <= 500000000) {
      return 94060000 + (taxableIncome - 300000000) * 0.4;
    } else if (taxableIncome <= 1000000000) {
      return 174060000 + (taxableIncome - 500000000) * 0.42;
    } else {
      return 384060000 + (taxableIncome - 1000000000) * 0.45;
    }
  };

  const closeModal = () => {
    setLoading(true);
    const incomeValue = parseFloat(totalIncome.replace(/,/g, ""));
    const calculatedDeduction = calculateDeduction(incomeValue);
    const taxableIncome = calculateTaxableIncome(
      incomeValue,
      calculatedDeduction
    );
    const taxAmount = calculateTax(taxableIncome);

    console.log(`과세표준: ${taxableIncome.toLocaleString()} 원`);
    console.log(`산출세액: ${taxAmount.toLocaleString()} 원`);

    // 근로소득공제액 계산
    const wageIncomeDeduction = calculateWageIncomeDeduction(
      incomeValue,
      taxAmount
    );
    console.log(`근로소득공제액: ${wageIncomeDeduction.toLocaleString()} 원`);

    const totalTaxDeduction = wageIncomeDeduction + 130000;
    console.log(`총 세금공제액: ${totalTaxDeduction.toLocaleString()} 원`);

    const finalizedTaxAmount = taxAmount - totalTaxDeduction;
    console.log(`총 결정세액: ${finalizedTaxAmount.toLocaleString()} 원`);

    // 기납부 소득세액 계산
    const taxPaidValue = parseFloat(taxPaid.replace(/,/g, "")) || 0;
    const estimatedTaxAmount = finalizedTaxAmount - taxPaidValue;
    console.log(`예상세액: ${estimatedTaxAmount.toLocaleString()} 원`);

    useTaxStore.getState().setTaxData({
      totalIncome,
      taxableIncome,
      taxAmount,
      wageIncomeDeduction,
      totalTaxDeduction,
      estimatedTaxAmount,
      taxPaidValue,
      wageIncomeAmount: incomeValue - calculatedDeduction,
    });

    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/inquiryYearEnd/result");
    }, 2000);
  };

  // 근로소득공제액 계산 함수
  const calculateWageIncomeDeduction = (earnings, calculatedTax) => {
    let taxDeduction;

    // 근로소득세액공제 계산
    if (calculatedTax <= 1300000) {
      taxDeduction = calculatedTax * 0.55;
    } else {
      taxDeduction = 715000 + (calculatedTax - 1300000) * 0.3;
    }

    // 세액공제 한도 계산
    let deductionLimit;

    if (earnings <= 33000000) {
      deductionLimit = 740000;
    } else if (earnings <= 70000000) {
      deductionLimit = Math.max(740000 - (earnings - 33000000) * 0.008, 660000);
    } else if (earnings <= 120000000) {
      deductionLimit = Math.max(660000 - (earnings - 70000000) / 2, 500000);
    } else {
      deductionLimit = Math.max(500000 - (earnings - 120000000) / 2, 200000);
    }
    return Math.min(taxDeduction, deductionLimit);
  };

  const handleIncomeChange = (e) => {
    const incomeStr = e.target.value.replace(/,/g, ""); // 콤마 제거
    setTotalIncome(e.target.value);
    const income = parseFloat(incomeStr);
    if (!isNaN(income)) {
      const calculatedDeduction = calculateDeduction(income);
      setDeduction(calculatedDeduction);
    } else {
      setDeduction(0);
    }
  };

  const formatIncome = (income) => {
    return income ? income.toLocaleString() : "";
  };

  const navigate = useNavigate();

  const handleInquiryClick = () => {
    setIsModalOpen(true);
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="총 급여 입력 모달"
        className="modal"
        overlayClassName="overlay-modal"
      >
        <div>
          <div className="info-span">
            <span style={{ display: "flex", marginRight: "10px" }}>
              올해 총 급여액을 입력해주세요
            </span>
            <Info className="info-hover" />
          </div>
          <div class="income-sum-input-container">
            <div class="income-sum-input-box">
              <label>총 급여</label>
              <input
                type="text"
                className="income-sum-input"
                value={formatIncome(totalIncome)}
                onChange={handleIncomeChange}
              />
            </div>
            <div class="income-sum-calculate">
              <div class="income-sum-input-box">
                <label>근로소득공제</label>
                <span style={{ fontSize: "14px", fontWeight: "normal" }}>
                  {deduction.toLocaleString()} 원
                </span>
              </div>
              <div class="income-sum-input-box">
                <label>근로소득금액</label>
                <span style={{ fontSize: "14px", fontWeight: "normal" }}>
                  {(
                    (totalIncome
                      ? parseFloat(totalIncome.replace(/,/g, ""))
                      : 0) - deduction
                  ).toLocaleString()}{" "}
                  원
                </span>
              </div>
            </div>
            <div class="income-sum-input-box">
              <label>소득세 기납부세액</label>
              <input
                type="text"
                className="income-sum-input"
                value={taxPaid}
                onChange={(e) => setTaxPaid(e.target.value)}
              />
            </div>
          </div>

          <button className="modal-confirm-btn" onClick={closeModal}>
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default InquiryYearEnd;
