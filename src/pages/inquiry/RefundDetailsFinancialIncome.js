import React, { useState } from "react";
import "../../assets/css/RefundDetail.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Alarm } from "../../assets/svg/금융소득/alarm.svg";
import { ReactComponent as Report } from "../../assets/svg/금융소득/report.svg";
import { ReactComponent as Warning } from "../../assets/svg/warning.svg";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RefundDetailsYearEnd = () => {
  const navigate = useNavigate();
  const ToBack = () => {
    navigate(-1);
  };
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const openAlertModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const handleApplicationSubmit = () => {
    setIsApplicationModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="refund-container">
      <h2>금융소득 및 원천징수세액 합계</h2>
      <div className="fi-total-box">
        <div className="fi-total-box-detail">
          <span></span>
          <span>소득금액(세전금액)</span>
          <span>소득세</span>
          <span>지방세</span>
        </div>
        <div className="fi-total-box-detail">
          <span>종합과세이자소득</span>
          <span>744원</span>
          <span>80원</span>
          <span>0원</span>
        </div>
        <div className="fi-total-box-detail">
          <span>종합과세배당소득</span>
          <span>0원</span>
          <span>0원</span>
          <span>0원</span>
        </div>
        <div className="fi-total-box-detail">
          <span>Gross-up 배당소득</span>
          <span>744원</span>
          <span>0원</span>
          <span>0원</span>
        </div>
        <div className="fi-total-box-detail">
          <span>합계</span>
          <span>744원</span>
          <span>80원</span>
          <span>0원</span>
        </div>
      </div>
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
        <div className="fi-total-box-detail" style={{ fontSize: "13px" }}>
          <span>이자</span>
          <span>12345679-01-1234567</span>
          <span>국민은행</span>
          <span>744원</span>
          <span>80원</span>
          <span>0원</span>
        </div>
      </div>
      <div className="report-alarm-buttons">
        <div
          className="fi-report-all-box"
          onClick={() => navigate("/financialIncome/myReport")}
          style={{ cursor: "pointer" }}
        >
          <div className="fi-report-box">
            <div className="fi-report-text">
              <span>금융소득 리포트</span>
              <p>세테크 관리의 시작</p>
            </div>
            <Report />
          </div>
        </div>
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
              ></input>
              이메일
            </div>
            <div className="modal-text">
              <input
                type="checkbox"
                className="custom-checkbox"
                style={{ marginRight: "10px" }}
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
  );
};

export default RefundDetailsYearEnd;
