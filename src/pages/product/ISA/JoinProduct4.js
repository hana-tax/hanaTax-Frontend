import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";
import Modal from "react-modal";
import { ReactComponent as Check } from "../../../assets/svg/check-circle.svg";

function JoinProduct4() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allChecked, setAllChecked] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const availableAmount = 120189; // 출금가능금액

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  return (
    <div className="signup-product-container">
      <div className="progress-steps">
        <button className="step">1</button>
        <button className="step">2</button>
        <button className="step">3</button>
        <button className="step active">4. 가입확인</button>
        <button className="step">5</button>
      </div>
      <div className="agreement-product-section">
        <div className="join-product-container">
          <h2>가입정보</h2>
          <div className="join-info-container">
            <div className="join-info-name-box">
              <div className="join-info-name">모델 포트폴리오명</div>
              <div className="join-info-name">납입가능 총 한도</div>
              <div className="join-info-name">연도별 납입한도</div>
              <div className="join-info-name">신규금액</div>
            </div>
            <div className="join-info-divider"></div>
            <div className="join-info-desc-box">
              <div className="join-info-desc">하나 일임형 ISA 최저위험</div>
              <div className="join-info-desc">100,000,000원</div>
              <div className="join-info-desc">20,000,000원 이내</div>
              <div className="join-info-desc">
                <input
                  type="text"
                  placeholder="최소 10,000원"
                  className="join-info-custom-input"
                />{" "}
                원
              </div>
            </div>
          </div>
          <h2>출금정보</h2>
          <div className="withdrawal-info">
            <div className="widthdrawal-input-text">
              <input
                type="text"
                placeholder="0000000-00-000000"
                className="join-info-custom-input"
                style={{ marginRight: "40px" }}
              />
              <div>
                출금가능금액{" "}
                <span style={{ color: "#2965FF", fontWeight: "bold" }}>
                  {availableAmount.toLocaleString()}
                </span>
                원
              </div>
            </div>
            <input
              type="password"
              placeholder="비밀번호 입력"
              className="join-info-custom-input"
              style={{ width: "80px", textAlign: "center" }}
            />
          </div>
          <h2>계약기간 정보</h2>
          <div className="withdrawal-info">
            <div className="widthdrawal-input-text">
              <input
                type="text"
                placeholder="36개월~960개월, 월단위"
                className="join-info-custom-input"
                style={{
                  width: "340px",
                  marginRight: "10px",
                  border: "none",
                  backgroundColor: "#FFFCFC",
                  borderBottom: "0.5px solid #ccc",
                  fontSize: "15px",
                }}
              />
              개월
            </div>
            <div style={{ margin: "0 auto" }}>
              <span className="contract-desc">
                • 가입 후 36개월 경과시 언제든지 중도해지 하더라도 비과세 혜택을
                받을 수 있습니다. <br />
              </span>
              <span className="contract-desc">
                • 계약만기시 자동해약으로 인한 손실이 발생할 수 있으니
                계약기간을 충분히 지정하여 주시기 바랍니다.
              </span>
            </div>
          </div>
          <h2>신규 계좌 비밀번호</h2>
          <div className="withdrawal-info">
            <div className="widthdrawal-input-text">
              비밀번호 입력
              <input
                type="password"
                className="join-info-custom-input"
                style={{ width: "80px", marginLeft: "30px" }}
              />
            </div>
            비밀번호 확인
            <input
              type="password"
              className="join-info-custom-input"
              style={{ width: "80px", marginLeft: "30px" }}
            />
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="prev-button" onClick={() => navigate(-1)}>
          이전
        </button>
        <button className="next-button" onClick={openApplicationModal}>
          다음
        </button>
      </div>
      <Modal
        isOpen={isApplicationModalOpen}
        onRequestClose={closeApplicationModal}
        contentLabel="계좌 개설 완료 모달"
        className="modal"
        overlayClassName="overlay-modal"
        style={{ width: "300px" }}
      >
        <div className="checkbox-text">
          <Check />
          <span style={{ marginTop: "15px" }}>
            <span style={{ color: "#18CD8C" }}>계좌개설</span>이 완료되었습니다!
          </span>
        </div>

        <div className="btns" style={{ marginTop: "20px" }}>
          <button
            className="button-close"
            onClick={closeApplicationModal}
            style={{ padding: "12px 50px" }}
          >
            닫기
          </button>
          <button
            className="button-confirm"
            onClick={closeApplicationModal}
            style={{ padding: "5px 40px" }}
          >
            신청 확인
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default JoinProduct4;
