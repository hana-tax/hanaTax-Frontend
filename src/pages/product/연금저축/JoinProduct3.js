import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";
import Modal from "react-modal";
import { ReactComponent as Check } from "../../../assets/svg/check-circle.svg";

function JoinProduct3() {
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
        <button className="step active">3. 가입확인</button>
        <button className="step">4.</button>
      </div>
      <div className="agreement-product-section">
        <div className="join-product-container">
          <h2>가입정보</h2>
          <div className="join-info-container">
            <div className="join-info-name-box">
              <div className="join-info-name">상품명</div>
              <div className="join-info-name">적립기간</div>
              <div className="join-info-name">연간납입한도</div>
              <div className="join-info-name">연결계좌번호</div>
            </div>
            <div className="join-info-divider"></div>
            <div className="join-info-desc-box">
              <div className="join-info-desc">하나 연금저축펀드계좌</div>
              <div className="join-info-desc">
                {" "}
                <input
                  type="text"
                  placeholder="최소 60개월 이상"
                  className="join-info-custom-input"
                  style={{
                    width: "250px",
                    marginRight: "10px",
                    border: "none",
                    backgroundColor: "#FFFCFC",
                    borderBottom: "0.5px solid #ccc",
                    fontSize: "15px",
                  }}
                />
                개월
              </div>
              <div className="join-info-desc">
                {" "}
                <input
                  type="text"
                  placeholder="최소 100만원 이상, 원단위"
                  className="join-info-custom-input"
                  style={{
                    width: "250px",
                    marginRight: "10px",
                    border: "none",
                    backgroundColor: "#FFFCFC",
                    borderBottom: "0.5px solid #ccc",
                    fontSize: "15px",
                  }}
                />
                <span style={{ marginRight: "20px" }}>원</span>
                <div className="money-select-box">
                  <button className="money-select">1000만</button>
                  <button className="money-select">500만</button>
                  <button className="money-select">100만</button>
                  <button className="money-select">10만</button>
                </div>
              </div>
              <div className="join-info-desc">
                <div className="join-info-text-password">
                  <input
                    type="text"
                    placeholder="0000000-00-000000"
                    className="join-info-custom-input"
                    style={{ marginBottom: "10px" }}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className="join-info-custom-input"
                    style={{ width: "80px", textAlign: "center" }}
                  />
                </div>
              </div>
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

export default JoinProduct3;
