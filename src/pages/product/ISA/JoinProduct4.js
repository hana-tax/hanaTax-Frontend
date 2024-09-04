import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../assets/css/Product.css";
import axios from "axios";
import Modal from "react-modal";
import useAuthStore from "../../../store/useStore";
import { ReactComponent as Check } from "../../../assets/svg/check-circle.svg";

function JoinProduct4() {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const user = useAuthStore((state) => state.user);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
  const [newInputPassword, setNewInputPassword] = useState(""); // 입력된 비밀번호
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const selectedPortfolio = location.state?.selectedPortfolio;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/account/depositList",
          {
            id: user.id,
          }
        );
        setAccounts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    if (user) {
      fetchAccounts();
    }
  }, [user]);

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value); // 입력된 비밀번호를 업데이트
  };
  const handleNewPasswordChange = (e) => {
    setNewInputPassword(e.target.value); // 입력된 비밀번호를 업데이트
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // 입력된 값에서 쉼표 제거
    if (!isNaN(value)) {
      setAmount(Number(value)); // 숫자로 변환하여 상태 업데이트
    }
  };
  const handleAccountChange = (e) => {
    const accountNo = e.target.value;
    setSelectedAccount(accountNo);

    // 선택한 계좌의 잔액을 업데이트
    const selected = accounts.find(
      (account) => account.depositAccountId === accountNo
    );
    if (selected) {
      setBalance(selected.balance);
    }
  };

  const handleNextButtonClick = async () => {
    const createDate = new Date().toISOString().split("T")[0];
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + parseInt(period, 10));
    const formattedExpirationDate = expirationDate.toISOString().split("T")[0];
    console.log(inputPassword);
    console.log(amount);
    console.log(createDate);
    console.log(formattedExpirationDate);
    console.log(selectedPortfolio.portfolioId);
    console.log(user.id);
    const postData = {
      isaAccountDto: {
        accountPasswd: inputPassword,
        accountStatus: 6, //6 계좌 정상
        balance: amount,
        createDate: createDate,
        expirationDate: formattedExpirationDate,
        portfolioId: selectedPortfolio ? selectedPortfolio.portfolioId : 0,
        sum: amount,
        id: user.id,
        accountType: 4, // isa 계좌
      },
      joinHistoryDTO: {
        accountType: 4, // isa 계좌
        joinAccount: amount,
        joinDate: createDate,
        expirationDate: formattedExpirationDate,
        interest: 0, // null 값
        interestMethod: 0, // null 값
        joinStatus: 14, // 가입 상태: 정상
        id: user.id,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/isa/signup",
        postData
      );
      console.log("Signup successful:", response.data);
      openApplicationModal();
    } catch (error) {
      console.error("Failed to sign up for the product", error);
    }
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
            <div
              className="join-info-divider"
              style={{ height: "160px" }}
            ></div>
            <div className="join-info-desc-box">
              <div className="join-info-desc">
                {" "}
                {selectedPortfolio
                  ? selectedPortfolio.portfolioName
                  : "포트폴리오가 선택되지 않았습니다."}
              </div>
              <div className="join-info-desc" style={{ color: "red" }}>
                100,000,000원
              </div>
              <div className="join-info-desc">20,000,000원 이내</div>
              <div className="join-info-desc">
                <input
                  type="text"
                  placeholder="최소 100,000원"
                  className="join-info-custom-input"
                  style={{ marginRight: "5px" }}
                  id="amount"
                  value={`${amount.toLocaleString()}`}
                  onChange={handleAmountChange}
                />{" "}
                원
              </div>
            </div>
          </div>
          <h2>출금정보</h2>
          <div className="withdrawal-info">
            <div className="widthdrawal-input-text">
              <select
                className="select-field"
                onChange={handleAccountChange}
                value={selectedAccount}
              >
                <option value="">계좌 선택</option>
                {accounts.map((account) => (
                  <option
                    key={account.depositAccountId}
                    value={account.depositAccountId}
                  >
                    {account.depositAccountId}
                  </option>
                ))}
              </select>
              <div>
                출금가능금액{" "}
                <span
                  className="balance-amount"
                  style={{ color: "#2965FF", fontWeight: "bold" }}
                >
                  {balance.toLocaleString()}
                </span>
                원
              </div>
            </div>
            <input
              type="password"
              placeholder="비밀번호 입력"
              className="join-info-custom-input"
              style={{ width: "80px", textAlign: "center" }}
              onChange={handlePasswordChange}
            />
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
              </div>
            )}
          </div>
          <h2>계약기간 정보</h2>
          <div className="withdrawal-info">
            <div className="widthdrawal-input-text">
              <input
                type="text"
                placeholder="36개월~960개월, 월단위"
                className="join-info-custom-input"
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
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
                onChange={handleNewPasswordChange}
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
        <button className="next-button" onClick={handleNextButtonClick}>
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
