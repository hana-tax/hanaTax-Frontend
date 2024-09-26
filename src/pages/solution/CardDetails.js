import React, { useState, useEffect } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as CardIcon } from "../../assets/svg/연말정산/credit-card.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import useCardStore from "../../store/cardStore";
import useTaxStore from "../../store/taxStore";
import useYearEndStore from "../../store/yearEndStore";

const CardDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const creditCards = useCardStore((state) => state.creditCards); // 신용카드 목록 가져오기
  const debitCards = useCardStore((state) => state.debitCards); // 체크카드 목록 가져오기
  const directCards = useCardStore((state) => state.directCards); // 직불카드 목록 가져오기
  const prepaidCards = useCardStore((state) => state.prepaidCards); // 선불카드 목록 가져오기
  const totalIncome = useTaxStore((state) => state.totalIncome); // 총 급여

  const setCardDeductionAmount = useYearEndStore(
    (state) => state.setCardDeductionAmount
  );

  const setTraditionalMarketDeduction = useYearEndStore(
    (state) => state.setTraditionalMarketDeduction
  );
  const setBusTrafficDeduction = useYearEndStore(
    (state) => state.setBusTrafficDeduction
  );
  const setCultureDeduction = useYearEndStore(
    (state) => state.setCultureDeduction
  );

  // 공제 계산 시 제외할 카테고리 (공제 계산 시 제외, 사용액에는 포함)
  const excludedCategoriesForDeduction = [50, 51, 59, 60, 61, 62];

  // 사용액에서 제외할 카테고리
  const excludedCategoriesForUsage = [52, 53, 54, 55, 56, 57];

  const totalCreditCardAmount = creditCards
    .filter(
      (card) => !excludedCategoriesForUsage.includes(Number(card.category))
    )
    .reduce((acc, card) => acc + card.amount, 0);

  //체크카드, 직불카드, 카드 사용액
  const totalDebitDirectPrepaidCardAmount = [
    ...debitCards.filter(
      (card) => !excludedCategoriesForUsage.includes(Number(card.category))
    ),
    ...directCards.filter(
      (card) => !excludedCategoriesForUsage.includes(Number(card.category))
    ),
    ...prepaidCards.filter(
      (card) => !excludedCategoriesForUsage.includes(Number(card.category))
    ),
  ].reduce((acc, card) => acc + card.amount, 0);

  // 공제 계산을 위한 필터링
  const filteredCreditCardsForDeduction = creditCards.filter(
    (card) =>
      !excludedCategoriesForUsage.includes(Number(card.category)) &&
      !excludedCategoriesForDeduction.includes(Number(card.category))
  );

  const filteredDebitDirectPrepaidCardsForDeduction = [
    ...debitCards.filter(
      (card) =>
        !excludedCategoriesForUsage.includes(Number(card.category)) &&
        !excludedCategoriesForDeduction.includes(Number(card.category))
    ),
    ...directCards.filter(
      (card) =>
        !excludedCategoriesForUsage.includes(Number(card.category)) &&
        !excludedCategoriesForDeduction.includes(Number(card.category))
    ),
    ...prepaidCards.filter(
      (card) =>
        !excludedCategoriesForUsage.includes(Number(card.category)) &&
        !excludedCategoriesForDeduction.includes(Number(card.category))
    ),
  ];

  const totalFilteredCreditCardAmount = filteredCreditCardsForDeduction.reduce(
    (acc, card) => acc + card.amount,
    0
  );

  const totalFilteredDebitDirectPrepaidCardAmount =
    filteredDebitDirectPrepaidCardsForDeduction.reduce(
      (acc, card) => acc + card.amount,
      0
    );

  // 전통시장, 대중교통, 문화비 사용액 필터링 및 합산
  const traditionalMarketAmount = [
    ...creditCards,
    ...debitCards,
    ...directCards,
    ...prepaidCards,
  ]
    .filter((card) => Number(card.category) === 52)
    .reduce((acc, card) => acc + card.amount, 0);

  const busTrafficAmount = [
    ...creditCards,
    ...debitCards,
    ...directCards,
    ...prepaidCards,
  ]
    .filter((card) => Number(card.category) === 53)
    .reduce((acc, card) => acc + card.amount, 0);

  const cultureAmount = [
    ...creditCards,
    ...debitCards,
    ...directCards,
    ...prepaidCards,
  ]
    .filter(
      (card) =>
        Number(card.category) === 54 ||
        Number(card.category) === 55 ||
        Number(card.category) === 56 ||
        Number(card.category) === 57
    )
    .reduce((acc, card) => acc + card.amount, 0);

  const creditCardSpendThreshold = totalIncome * 0.25; // 총 급여의 25%

  // 신용카드 사용액이 총 급여의 25%를 초과할 때만 공제 가능
  const creditDeductionAmount =
    totalFilteredCreditCardAmount > creditCardSpendThreshold
      ? (totalFilteredCreditCardAmount - creditCardSpendThreshold) * 0.15
      : 0;

  const debitDeductionAmount =
    totalFilteredCreditCardAmount > creditCardSpendThreshold
      ? totalFilteredDebitDirectPrepaidCardAmount * 0.3
      : 0;

  // 전통시장, 대중교통, 문화비 각각의 공제 계산
  const traditionalMarketDeduction =
    totalFilteredCreditCardAmount > creditCardSpendThreshold
      ? traditionalMarketAmount * 0.3
      : 0;
  const busTrafficDeduction =
    totalFilteredCreditCardAmount > creditCardSpendThreshold
      ? busTrafficAmount * 0.4
      : 0;
  const cultureDeduction =
    totalFilteredCreditCardAmount > creditCardSpendThreshold
      ? cultureAmount * 0.3
      : 0;

  // 특수 공제 항목 총합 계산 (최대 한도 적용)
  const totalSpecialDeduction = Math.floor(
    Math.min(
      traditionalMarketDeduction + busTrafficDeduction + cultureDeduction,
      totalIncome > 70000000 ? 2000000 : 3000000 // 특수 항목 공제 한도
    )
  );

  // 전체 공제액 계산 (최대 한도 적용)
  const totalDeduction = Math.floor(
    Math.min(
      creditDeductionAmount + debitDeductionAmount + totalSpecialDeduction,
      totalIncome > 70000000 ? 2500000 : 3000000 // 총 공제 한도
    )
  );

  useEffect(() => {
    setCardDeductionAmount(Math.floor(totalDeduction));
    setTraditionalMarketDeduction(traditionalMarketDeduction);
    setBusTrafficDeduction(busTrafficDeduction);
    setCultureDeduction(cultureDeduction);
  }, [
    totalDeduction,
    traditionalMarketDeduction,
    busTrafficDeduction,
    cultureDeduction,
    setCardDeductionAmount,
    setTraditionalMarketDeduction,
    setBusTrafficDeduction,
    setCultureDeduction,
  ]);

  const amountToSpendForDeduction =
    creditCardSpendThreshold > totalFilteredCreditCardAmount
      ? creditCardSpendThreshold - totalFilteredCreditCardAmount
      : 0;

  const maxCardDeductionLimit = totalIncome > 70000000 ? 4500000 : 6000000;

  const items = [
    {
      percentage: Math.min(
        (totalFilteredCreditCardAmount / 12500000) * 100,
        100
      ),
      description: "신용카드",
      color: "#90B6FF",
      amount: totalFilteredCreditCardAmount,
      unit: 1250,
    },
    {
      percentage: Math.min(
        (totalDebitDirectPrepaidCardAmount / 12500000) * 100,
        100
      ),
      description: "체크카드, 직불카드, 현금",
      color: "#FEA6FA",
      amount: totalDebitDirectPrepaidCardAmount,
      unit: 1250,
    },
    {
      percentage: Math.min((busTrafficAmount / 3000000) * 100, 100),
      description: "대중교통",
      color: "#E0C7FF",
      amount: busTrafficAmount,
      unit: 300,
    },
    {
      percentage: Math.min((traditionalMarketAmount / 3000000) * 100, 100),
      description: "전통시장",
      color: "#8D9CD0",
      amount: traditionalMarketAmount,
      unit: 300,
    },
    // 문화비 항목은 총 급여가 7천만원 이하일 때만 표시
    ...(totalIncome <= 70000000
      ? [
          {
            percentage: Math.min((cultureAmount / 3000000) * 100, 100),
            description: "도서･공연･영화･신문･박물관･미술관",
            color: "#FF9797",
            amount: cultureAmount,
            unit: 300,
          },
        ]
      : []),
    {
      percentage: Math.min((totalDeduction / maxCardDeductionLimit) * 100, 100),
      description: "카드 공제 금액",
      color: "#FFDC97",
      amount: totalDeduction,
      unit: maxCardDeductionLimit / 10000,
    },
  ];

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-container">
      <div
        className="card-header"
        onClick={toggleDetails}
        style={{ padding: "10px" }}
      >
        <CardIcon />
        <span>카드 공제 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="card-body">
          <div className="card-box">
            {totalCreditCardAmount > creditCardSpendThreshold ? (
              <p>
                카드 소득공제 가능 금액은 <br />
                {totalDeduction.toLocaleString()} 원 받을 수 있습니다.
              </p>
            ) : (
              <p>
                소비금액이 적어 <br />
                카드 소득공제를 받을 수 없어요.
              </p>
            )}
            <div className="text">
              <span>
                앞으로 신용카드로 추가{" "}
                {amountToSpendForDeduction.toLocaleString()}원
                <br />더 써야 공제를 받을 수 있어요.
              </span>
            </div>
            <div className="discount-details">
              {items.map((item, index) => (
                <div className="discount-item" key={index}>
                  <div className="progress-all-bar">
                    <div
                      className="progress-bar1"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div className="percentage">{item.percentage}%</div>
                    </div>
                    <div className="amount-unit">
                      <div
                        className="card-amount"
                        style={{
                          marginLeft: `${Math.max(0, item.percentage - 5)}%`,
                        }}
                      >
                        {item.amount.toLocaleString()}
                      </div>
                      <div className="unit">
                        {item.unit.toLocaleString()}(만원)
                      </div>
                    </div>
                  </div>
                  <div className="description-unit">
                    <div
                      className="description-color"
                      style={{
                        backgroundColor: item.color,
                        width: "14px",
                        height: "10px",
                        marginRight: "10px",
                      }}
                    ></div>
                    <div className="card-description">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
