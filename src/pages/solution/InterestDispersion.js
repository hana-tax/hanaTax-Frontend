import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Deduction1 } from "../../assets/svg/금융소득/deductionMoney.svg";
import InterestChart from "./InterestChart";
import useAuthStore from "../../store/useStore";

const InterestDispersion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [advice, setAdvice] = useState("");
  const user = useAuthStore((state) => state.user);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const evaluateDispersion = (data) => {
    const totalInterest = data.reduce((sum, item) => sum + item.이자, 0);
    const totalDividend = data.reduce((sum, item) => sum + item.배당, 0);
    const totalIncome = totalInterest + totalDividend; // 총 금융소득 계산

    const averageInterest = totalInterest / data.length;
    const averageDividend = totalDividend / data.length;

    let dispersionAdvice = "";

    // 전체 금융소득이 1500만원 이하인 경우
    if (totalIncome <= 15000000) {
      dispersionAdvice =
        "소득이 잘 분산되어 있습니다! 계속해서 이렇게 유지해 보세요.";
    } else {
      // 분산 기준 설정
      if (
        data.some((item) => item.이자 > averageInterest * 1.5) ||
        data.some((item) => item.배당 > averageDividend * 1.5)
      ) {
        dispersionAdvice =
          "이자 또는 배당소득이 특정 월에 몰려 있습니다.<br />소득을 더 고르게 분산해 보세요!";
      } else {
        dispersionAdvice =
          "소득이 잘 분산되어 있습니다! 계속해서 이렇게 유지해 보세요.";
      }
    }

    setAdvice(dispersionAdvice);
  };

  return (
    <div className="interest-dispersion-container">
      <div
        className="card-header"
        style={{ padding: "0px 10px 20px 10px" }}
        onClick={toggleDetails}
      >
        <Deduction1 />
        <span>이자 및 배당소득 분산하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}{" "}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="interest-dispersion-body">
          <div className="card-box">
            <p>한 해에 몰리지 않게 이자, 배당소득 분산하기!</p>
            <div className="text">
              <span>
                Tip. 채권 또는 정기예금은 발생시점을 선택하기 쉽지 않습니다.
                <span style={{ color: "#F0C557" }}>펀드</span>,{" "}
                <span style={{ color: "#F0C557" }}>주식</span>과 같이 만기가
                없는 상품의 경우 원할 때 처분할 수 있어 선택이 용이합니다!
              </span>
            </div>
            <InterestChart onDataLoad={evaluateDispersion} />
            <div className="advice-box">
              <span
                dangerouslySetInnerHTML={{
                  __html: `${user.name}님,<br/><br/> ${advice}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestDispersion;
