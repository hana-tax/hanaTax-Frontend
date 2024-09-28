import React, { useState, useEffect } from "react";
import "../../../assets/css/InquiryResult.css";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { useNavigate } from "react-router-dom";
import useTaxStore from "../../../store/taxStore";
import useAuthStore from "../../../store/useStore";
import useYearEndStore from "../../../store/yearEndStore";
import axios from "axios";

const DeductionResultYearEnd = () => {
  const navigate = useNavigate();
  const totalIncome = useTaxStore((state) => state.totalIncome);
  const wageIncomeAmount = useTaxStore((state) => state.wageIncomeAmount);
  const taxPaidValue = useTaxStore((state) => state.taxPaidValue);
  const cardDeductionAmount = useYearEndStore(
    (state) => state.cardDeductionAmount
  );
  const traditionalMarketDeduction = useYearEndStore(
    (state) => state.traditionalMarketDeduction
  );
  const busTrafficDeduction = useYearEndStore(
    (state) => state.busTrafficDeduction
  );
  const cultureDeduction = useYearEndStore((state) => state.cultureDeduction);
  const wageIncomeDeduction = useTaxStore((state) => state.wageIncomeDeduction);
  const personDeduction = useYearEndStore((state) => state.personDeduction);
  const houseDeductionAmount = useYearEndStore(
    (state) => state.houseDeductionAmount
  );
  const user = useAuthStore((state) => state.user);
  const monthlyHouseDeductionAmount = useYearEndStore(
    (state) => state.monthlyHouseDeductionAmount
  );
  const businessDeduction = useYearEndStore((state) => state.businessDeduction);
  const insuranceDeduction = useYearEndStore(
    (state) => state.insuranceDeduction
  );

  const estimatedTaxAmount = useTaxStore((state) => state.estimatedTaxAmount);

  const [joinAccount, setJoinAccount] = useState(0);

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
  const taxableIncome = useTaxStore((state) => state.taxableIncome); //과세표준

  const taxAmount = useTaxStore((state) => state.taxAmount); //산출세액

  const [isOpen, setIsOpen] = useState(true);

  const insuranceHouseMontly =
    Number(insuranceDeduction) +
    Number(houseDeductionAmount) +
    Number(monthlyHouseDeductionAmount);

  const standardTaxDeduction = insuranceHouseMontly >= 130000 ? 0 : 130000;

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const ToHome = () => {
    navigate("/");
  };

  const ToBack = () => {
    navigate(-1);
  };

  const userId = user.id;
  useEffect(() => {
    const fetchJoinHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/join-history/fund",
          {
            id: userId, // 사용자 ID를 바인딩
          }
        );
        const totalJoinAccount = response.data.reduce(
          (acc, item) => acc + item.joinAccount,
          0
        );
        setJoinAccount(totalJoinAccount);
      } catch (error) {
        console.error("Error fetching join history:", error);
      }
    };

    fetchJoinHistory();
  }, []);

  const pensionDeductionLimit =
    joinAccount > 9000000
      ? 0
      : joinAccount > 6000000
      ? 600000
      : Math.min(joinAccount, 600000);

  const totalTaxDeduction =
    Number(businessDeduction) +
    Number(monthlyHouseDeductionAmount) +
    // 111300 + // 연금 공제
    Number(standardTaxDeduction) +
    Number(wageIncomeDeduction) +
    Number(insuranceDeduction) +
    Number(pensionDeductionLimit);
  // 879000 + // 교육비
  // 258000; // 기타

  const totalDeductions =
    Number(cardDeductionAmount) +
    Number(personDeduction) +
    Number(traditionalMarketDeduction) +
    Number(busTrafficDeduction) +
    Number(cultureDeduction) +
    Number(houseDeductionAmount); //4대보험, 기타공제 빠짐

  const [detailItems] = useState([
    { label: "근로소득 공제", amount: wageIncomeAmount.toLocaleString() },
    { label: "종합소득 공제", amount: totalDeductions.toLocaleString() },
  ]);

  return (
    <div className="deduction-result-container">
      <div className="total-refund">
        <h1>연말정산 결과확인</h1>
        <div className="refund-detail-item">
          <span>나의 총급여</span>
          <span>{Number(totalIncome).toLocaleString()}원</span>
        </div>
        <div onClick={toggleDetails} className="refund-detail-item">
          나의 공제내역{" "}
          {isOpen ? (
            <ArrowUp className="toggle-arrow" />
          ) : (
            <ArrowDown className="toggle-arrow" />
          )}{" "}
        </div>

        {isOpen && (
          <div className="details-container">
            {detailItems.map((item, index) => (
              <div className="refund-detail-item" key={index}>
                <span>{item.label}</span>
                <span>{item.amount}원</span>
              </div>
            ))}
            <div className="deduction-detail-container">
              <div className="deduction-detail-item">
                <span>카드 공제</span>
                <span>{Number(cardDeductionAmount).toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>가족 공제</span>
                <span>{Number(personDeduction).toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>전통시장</span>
                <span>
                  {Number(traditionalMarketDeduction).toLocaleString()}원
                </span>
              </div>
              <div className="deduction-detail-item">
                <span>대중교통</span>
                <span>{Number(busTrafficDeduction).toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>도서･공연･영화･신문･박물관･미술관</span>
                <span>{Number(cultureDeduction).toLocaleString()}원</span>
              </div>
              {/* <div className="deduction-detail-item">
                <span>4대 보험</span>
                <span>319,000원</span>
              </div> */}
              <div className="deduction-detail-item">
                <span>주택 공제</span>
                <span>{Number(houseDeductionAmount).toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>기타 공제</span>
                <span>0원</span>
              </div>
            </div>
            <div className="refund-detail-item">
              <span>종합소득 과세표준</span>
              <span>
                {(taxableIncome - totalDeductions).toLocaleString()}원
              </span>
            </div>
            <div className="refund-detail-item">
              <span>산출세액</span>
              <span>
                {calculateTax(taxableIncome - totalDeductions).toLocaleString()}
                원
              </span>
            </div>
            <div className="refund-detail-item">
              <span>세금 공제</span>
              <span>{totalTaxDeduction.toLocaleString()}원</span>
            </div>
            <div className="deduction-detail-container">
              <div className="deduction-detail-item">
                <span>근로소득</span>
                <span>{Number(wageIncomeDeduction).toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>중소기업 감면</span>
                <span>{Number(businessDeduction).toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>월세 공제</span>
                <span>
                  {Number(monthlyHouseDeductionAmount).toLocaleString()}원
                </span>
              </div>
              <div className="deduction-detail-item">
                <span>연금 공제</span>
                <span>{pensionDeductionLimit.toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>보험료</span>
                <span>{Number(insuranceDeduction).toLocaleString()}원</span>
              </div>
              {/* 
              <div className="deduction-detail-item">
                <span>교육비</span>
                <span>879,000원</span>
              </div> */}

              <div className="deduction-detail-item">
                <span>표준세액공제</span>
                <span>{standardTaxDeduction.toLocaleString()}원</span>
              </div>
              <div className="deduction-detail-item">
                <span>기타</span>
                <span>0원</span>
              </div>
            </div>
            <div className="refund-detail-item">
              <span>먼저 낸 세금</span>
              <span>{Number(taxPaidValue).toLocaleString()}원</span>
            </div>
          </div>
        )}
        <div className="refund-detail-item">
          {calculateTax(taxableIncome - totalDeductions) -
            totalDeductions -
            totalTaxDeduction -
            taxPaidValue >
          0 ? (
            <span>추가 납부해야 할 세금</span>
          ) : (
            <span>환급받는 금액</span>
          )}
          <span>
            {calculateTax(taxableIncome - totalDeductions) -
              totalDeductions -
              totalTaxDeduction -
              taxPaidValue <
            0
              ? Math.abs(
                  calculateTax(taxableIncome - totalDeductions) -
                    totalDeductions -
                    totalTaxDeduction -
                    taxPaidValue
                ).toLocaleString()
              : (
                  calculateTax(taxableIncome - totalDeductions) -
                  totalDeductions -
                  totalTaxDeduction -
                  taxPaidValue
                ).toLocaleString()}{" "}
            원
          </span>
        </div>

        <div className="solutionBefore">
          <span style={{ marginRight: "15px" }}>솔루션 전 비교 </span>

          <div className="solutionAfter">
            {estimatedTaxAmount -
              (calculateTax(taxableIncome - totalDeductions) -
                totalDeductions -
                totalTaxDeduction -
                taxPaidValue) >
            0 ? (
              <span style={{ color: "red" }}> ▲ </span>
            ) : (
              <span style={{ color: "blue" }}> ▼ </span>
            )}
            <span>
              {Math.abs(
                estimatedTaxAmount -
                  (calculateTax(taxableIncome - totalDeductions) -
                    totalDeductions -
                    totalTaxDeduction -
                    taxPaidValue)
              ).toLocaleString()}{" "}
              원
            </span>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="btn-close" onClick={ToBack}>
          닫기
        </button>
        <button className="btn-confirm" onClick={ToHome}>
          확인
        </button>
      </div>
    </div>
  );
};

export default DeductionResultYearEnd;
