import React from "react";
import "../../assets/css/Allof.css"; // 스타일 시트 경로
import { ReactComponent as Char } from "../../assets/svg/금융소득/allofIncome.svg";

const FinancialIncomeSection = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLinkClick = (event, sectionId) => {
    event.preventDefault(); // 기본 링크 동작 방지
    scrollToSection(sectionId);
  };

  return (
    <div className="yearend-section">
      <h2>"금융소득이 뭐예요?" 금융소득 쉽게 이해하기</h2>

      <div className="yearend-content" style={{ backgroundColor: "#FFEE53" }}>
        <Char className="allofChar" style={{ marginLeft: "20px" }} />
      </div>
      <div className="content">
        <h3>금융소득이란?</h3>
        <p>
          이자소득과 배당소득을 합쳐 금융소득이라고 불러요. <br></br>
          <br />
        </p>
        <p>
          · 이자소득: 말 그대로 이자로 얻는 소득이에요. 증권의 이자나 은행
          예적금의 이자로 받은 금액에 대해 세금을 내야 하죠. <br />
          <br />· 배당소득: 배당은 주식이나 출자금을 가지고 있는 사람에게
          지분율에 따라 기업의 이윤을 분배하는 거예요. 배당소득은 배당을 통해
          얻게 된 소득을 말하죠.
        </p>
        <p>
          소득세법에 따르면
          이자소득·배당소득·사업소득·근로소득·연금소득·기타소득은 종합과세
          대상이에요. 종합과세란 1년 동안 번 소득을 모두 더해서 세금을 내는
          거예요.
        </p>
        <p>
          6가지 소득 중에도 경우에 따라서는 원천징수로 분리과세할 수 있어요.
          <br />
          대표적으로{" "}
          <span style={{ backgroundColor: "rgba(75, 203, 156, 0.29)" }}>
            금융소득(이자·배당소득)이 2,000만 원 이하일 때는 15.4%(지방소득세
            포함)로 원천징수만 해요.
          </span>
        </p>
        <p>
          뒤집어 얘기하면 금융소득이 2,000만 원을 초과하면 종합소득세를 자진
          신고해야 한다는 뜻이에요.
        </p>
        <div className="toc-container" style={{ height: "110px" }}>
          <h3>목차</h3>
          <p>
            <a href="#" onClick={(e) => handleLinkClick(e, "section1")}>
              분리과세 vs 종합과세
            </a>
          </p>
        </div>
        <h3 id="section1">분리과세 vs 종합과세</h3>

        <p>
          · 종합과세: 소득을 모두 종합해서 세금을 내는 거예요. 이렇게 내는
          세금을 종합소득세라고 불러요. 합친 소득에 따라 누진세가 다르게 붙기
          때문에 소득이 높으면 높을수록 세율이 높 아져요.<br></br>
        </p>
        <p>
          · 분리과세: 종합과세로 합산하지 않고 특정 세율로 원천징수해서 내는
          세금을 말해요.
        </p>
        <p>
          ※금융 소득 종합과세 계산 산출식
          <br />
          <br /> 금융 소득 종합과세 계산 산출식은 다음과 같으며, 둘 중 큰 금액을
          적용합니다.
          <br /> 1. (종합소득과세표준 - 2천만 원) x 세율 + 2천만 원 x 14% <br />
          2. (종합소득과세표준 – 금융 소득 금액) x 세율 + 금융 소득 x 14%
          <br></br>
        </p>
      </div>
    </div>
  );
};

export default FinancialIncomeSection;
