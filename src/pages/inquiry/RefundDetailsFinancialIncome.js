import React, { useState, useEffect } from "react";
import "../../assets/css/RefundDetail.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Alarm } from "../../assets/svg/금융소득/alarm.svg";
import { ReactComponent as Report } from "../../assets/svg/금융소득/report.svg";
import { ReactComponent as Warning } from "../../assets/svg/warning.svg";
import useFinancialIncomeStore from "../../store/financialIncomeStore";
import Modal from "react-modal";
import axios from "axios";
import useStore from "../../store/useStore";

Modal.setAppElement("#root");

const bankCodes = {
  134: "우리은행",
  146: "광주은행",
  102: "산업은행",
  103: "기업은행",
  104: "국민은행",
  105: "하나은행",
  107: "수협은행",
  110: "NH농협은행",
  126: "신한은행",
  137: "전북은행",
  189: "케이뱅크",
  192: "토스뱅크",
  111: "농협중앙회",
  145: "새마을금고중앙회",
};

const securitiesCodes = {
  280: "메리츠증권",
  238: "미래에셋증권",
  240: "삼성증권",
  289: "카카오페이증권",
  271: "토스증권",
  218: "KB증권",
  247: "NH투자증권",
  278: "신한투자증권",
  225: "IBK투자증권",
  264: "키움증권",
  243: "한국투자증권",
  270: "하나증권",
};

const RefundDetailsYearEnd = () => {
  const navigate = useNavigate();
  const financialIncomeId = useFinancialIncomeStore(
    (state) => state.financialIncomeId
  );
  const user = useStore((state) => state.user);
  const [incomeDetails, setIncomeDetails] = useState(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false); // 이메일 체크 상태
  const [smsChecked, setSmsChecked] = useState(false); // 문자 체크 상태

  useEffect(() => {
    // API 호출
    const fetchIncomeDetails = async () => {
      try {
        const response = await axios.post("/api/income/incomeList", {
          financialIncomeId: financialIncomeId, // 가져온 financialIncomeId 사용
        });
        setIncomeDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    // financialIncomeId가 유효할 때만 API 호출
    if (financialIncomeId) {
      fetchIncomeDetails();
    }
  }, [financialIncomeId]);

  const ToBack = () => {
    navigate(-1);
  };

  const openAlertModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const handleApplicationSubmit = async () => {
    const alertMethods = [];
    if (emailChecked) alertMethods.push(1); // 이메일 체크 시 추가
    if (smsChecked) alertMethods.push(2); // 문자 체크 시 추가

    try {
      await axios.post(`/api/user/${user.id}/alert`, {
        alertMethods: alertMethods,
      });
      setIsApplicationModalOpen(false);
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error("알림 신청 오류:", error);
      alert("알림 신청에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  // 이자소득과 배당소득을 계산
  const calculateTotalIncome = (type) => {
    if (!incomeDetails || !Array.isArray(incomeDetails)) return 0;

    return incomeDetails.reduce((total, detail) => {
      if (type === "interest" && detail.incomeType === 34) {
        return total + detail.incomeAccount; // 이자소득 합계
      } else if (type === "dividend" && detail.incomeType === 35) {
        return total + detail.incomeAccount; // 배당소득 합계
      }
      return total;
    }, 0);
  };

  const totalInterestIncome = calculateTotalIncome("interest");
  const totalDividendIncome = calculateTotalIncome("dividend");
  const totalCombinedIncome = totalInterestIncome + totalDividendIncome; // 이자소득과 배당소득의 합계

  // 세금 계산
  const calculateTax = (income) => {
    const incomeTax = Math.floor(income * 0.14); // 소득세 14% 절삭
    const localTax = Math.floor(incomeTax * 0.014); // 지방세 1.4% 절삭
    return { incomeTax, localTax };
  };

  const { incomeTax: interestTax, localTax: interestLocalTax } =
    calculateTax(totalInterestIncome);
  const { incomeTax: dividendTax, localTax: dividendLocalTax } =
    calculateTax(totalDividendIncome);
  const totalTax = interestTax + dividendTax; // 총 세금
  const totalLocalTax = interestLocalTax + dividendLocalTax; // 총 지방세

  return (
    <div className="all-box-container">
      <div
        className="fi-report-all-box"
        onClick={() => navigate("/financialIncome/myReport")}
        style={{
          cursor: "pointer",
          position: "sticky",
          top: "140px",
          left: "900px",
        }}
      >
        <div className="fi-report-box">
          <div className="fi-report-text" style={{}}>
            <span>금융소득 리포트</span>
            <p>세테크 관리의 시작</p>
          </div>
          <Report />
        </div>
      </div>
      <div className="refund-container">
        <h2>금융소득 및 원천징수세액 합계</h2>
        {incomeDetails ? (
          <div className="fi-total-box">
            <div className="fi-total-box-detail">
              <span></span>
              <span>소득금액(세전금액)</span>
              <span>소득세</span>
              <span>지방세</span>
            </div>
            <div className="fi-total-box-detail">
              <span>종합과세이자소득</span>
              <span>
                {totalInterestIncome > 0
                  ? totalInterestIncome.toLocaleString()
                  : "0"}
                원
              </span>
              <span>
                {interestTax > 0 ? interestTax.toLocaleString() : "0"}원
              </span>
              <span>
                {interestLocalTax > 0 ? interestLocalTax.toLocaleString() : "0"}
                원
              </span>
            </div>
            <div className="fi-total-box-detail">
              <span>종합과세배당소득</span>
              <span>
                {totalDividendIncome > 0
                  ? totalDividendIncome.toLocaleString()
                  : "0"}
                원
              </span>
              <span>
                {dividendTax > 0 ? dividendTax.toLocaleString() : "0"}원
              </span>
              <span>
                {dividendLocalTax > 0 ? dividendLocalTax.toLocaleString() : "0"}
                원
              </span>
            </div>
            <div className="fi-total-box-detail">
              <span>Gross-up 배당소득</span>
              <span>{incomeDetails.grossUpIncome || 0}원</span>
              <span>{incomeDetails.grossUpTax || 0}원</span>
              <span>{incomeDetails.localGrossUpTax || 0}원</span>
            </div>
            <div className="fi-total-box-detail">
              <span>합계</span>
              <span>
                {totalCombinedIncome > 0
                  ? totalCombinedIncome.toLocaleString()
                  : "0"}
                원
              </span>
              <span>{totalTax > 0 ? totalTax.toLocaleString() : "0"}원</span>
              <span>
                {totalLocalTax > 0 ? totalLocalTax.toLocaleString() : "0"}원
              </span>
            </div>
          </div>
        ) : (
          <p>로딩 중...</p>
        )}
        <h3>상세사항</h3>
        <div className="fi-total-box">
          <div className="fi-total-box-detail">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>원천징수세액</span>
          </div>
          <div className="fi-total-box-detail">
            <span>소득종류(이자/배당)</span>
            <span>계좌번호</span>
            <span>은행/증권</span>
            <span>소득금액</span>
            <span>소득세</span>
            <span>지방세</span>
          </div>
          {incomeDetails &&
          Array.isArray(incomeDetails) &&
          incomeDetails.length > 0 ? (
            incomeDetails.map((detail, index) => (
              <div
                className="fi-total-box-detail"
                key={index}
                style={{ fontSize: "13px" }}
              >
                <span>{detail.incomeType === 34 ? "이자" : "배당"}</span>
                <span>{detail.accountNumber}</span>
                <span>
                  {detail.institutionName in bankCodes
                    ? bankCodes[detail.institutionName]
                    : securitiesCodes[detail.institutionName]}
                </span>
                <span>{Number(detail.incomeAccount).toLocaleString()}원</span>
                <span>{Number(detail.incomeTax).toLocaleString()}원</span>
                <span>{Number(detail.localTax).toLocaleString()}원</span>
              </div>
            ))
          ) : (
            <p>상세정보가 없습니다.</p>
          )}
        </div>

        <div className="report-alarm-buttons">
          <div className="buttons-alert-push">
            <div className="alert-push-btn-box">
              <button className="alert-push-btn" onClick={openAlertModal}>
                {" "}
                <Alarm className="alarm-icon" />
                알림 신청하기
              </button>
            </div>
            <div className="buttons">
              <button className="btn-close" onClick={ToBack}>
                닫기
              </button>
              <button className="btn-confirm" onClick={ToBack}>
                확인
              </button>
            </div>
          </div>
          <Modal
            isOpen={isApplicationModalOpen}
            onRequestClose={closeApplicationModal}
            contentLabel="알림 신청 모달"
            className="modal"
            overlayClassName="overlay-modal"
          >
            <span>종합과세 대상자 알림 신청하기</span>
            <p>
              금융소득이 2000만원을 초과 시, <br />
              알림을 전송해드릴게요!
            </p>
            <div className="modal-text-box">
              <div className="modal-text">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  style={{ marginRight: "10px" }}
                  checked={emailChecked}
                  onChange={() => setEmailChecked(!emailChecked)}
                ></input>
                이메일
              </div>
              <div className="modal-text">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  style={{ marginRight: "10px" }}
                  checked={smsChecked}
                  onChange={() => setSmsChecked(!smsChecked)}
                ></input>
                문자(SMS)
              </div>
            </div>
            <div className="btns">
              <button className="button-close" onClick={closeApplicationModal}>
                닫기
              </button>
              <button
                className="button-confirm"
                onClick={handleApplicationSubmit}
              >
                신청하기
              </button>
            </div>
          </Modal>
          <Modal
            isOpen={isConfirmationModalOpen}
            onRequestClose={closeConfirmationModal}
            contentLabel="신청 완료 모달"
            className="modal"
            overlayClassName="overlay-modal"
          >
            <div>
              <span style={{ display: "flex", marginLeft: "25px" }}>
                신청되었습니다.
              </span>
              <p className="modal-confirm-text">
                <Warning className="warning-icon" />
                회원 정보에 담긴 핸드폰 번호와 이메일을 다시 한번 확인
                부탁드립니다.
              </p>
              <button
                className="modal-confirm-btn"
                onClick={closeConfirmationModal}
              >
                확인
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RefundDetailsYearEnd;
