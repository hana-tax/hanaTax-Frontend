import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/Product.css";
import useAuthStore from "../../../store/useStore";
import productStore from "../../../store/productStore";
import Modal from "react-modal";
import { ReactComponent as Check } from "../../../assets/svg/check-circle.svg";
import { ReactComponent as Mouse } from "../../../assets/svg/mouse.svg";
import Inputter from "../Inputter"; // 키패드 컴포넌트

function JoinProduct2() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const user = useAuthStore((state) => state.user);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { productId, minInterestRate, maxInterestRate } = productStore();
  const [showKeypad, setShowKeypad] = useState(false); // 키패드 표시 여부
  const [isReadOnly, setIsReadOnly] = useState(false); // readOnly 상태 관리

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

  const handlePeriodClick = (value) => {
    setPeriod(value);
  };

  const handleAmountClick = (value) => {
    const numValue = parseInt(value.replace("만", ""), 10) * 10000; // 만 단위를 숫자로 변환
    setAmount((prevAmount) => prevAmount + numValue);
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

  const handlePasswordChange = (e) => {
    if (!isReadOnly) {
      setPassword(e.target.value); // 키보드 입력 처리
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNextButtonClick = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const interestRate = period <= 12 ? minInterestRate : maxInterestRate; // 가입 기간에 따른 금리 설정
      console.log(interestRate);
      const createDate = new Date().toISOString().split("T")[0];
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + parseInt(period, 10));
      const formattedExpirationDate = expirationDate
        .toISOString()
        .split("T")[0];

      console.log(createDate);
      console.log(formattedExpirationDate);
      console.log(password);
      console.log(amount);
      console.log(productId);
      console.log(user.id);

      const response = await axios.post(
        "http://localhost:8080/api/product/deposit/signup",
        {
          depositAccountDTO: {
            accountPasswd: password,
            accountStatus: 6, // 6: 계좌 정상
            balance: amount,
            createDate: createDate,
            expirationDate: formattedExpirationDate,
            depositId: productId,
            id: user.id,
            accountType: 3, // 3: 예적금 계좌
          },
          joinHistoryDTO: {
            accountType: 3, // 3: 예적금 계좌
            joinAccount: amount,
            joinDate: createDate, // 현재 날짜 및 시간
            expirationDate: expirationDate,
            interest: interestRate,
            interestMethod: 0,
            joinStatus: 14, // 14: 상품 가입 상태 정상
            id: user.id,
          },
        }
      );
      setIsApplicationModalOpen(true);
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Failed to sign up for the product", error);
    }
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const isNextButtonEnabled = period && amount > 0 && selectedAccount;

  const toggleKeypad = () => {
    setShowKeypad((prev) => !prev); // 키패드 토글
    setIsReadOnly((prev) => !prev); // readOnly 상태 토글
  };

  const handleKeypadInput = (value) => {
    setPassword((prev) => {
      // 기존의 비밀번호 상태에 새로 입력된 숫자를 추가
      if (prev.length < 4) {
        const newPassword = prev + value; // 새 비밀번호 생성
        if (newPassword.length === 4) {
          setShowKeypad(false); // 4자리 입력 시 키패드를 자동으로 닫음
          setIsReadOnly(false); // readOnly 상태 해제
        }
        console.log(prev);
        console.log(value);
        console.log(newPassword);
        return newPassword; // 새로운 비밀번호 반환
      }
      return prev; // 4자리가 이미 입력된 경우 이전 상태 반환
    });
  };

  return (
    <div className="signup-product-container">
      <div className="progress-steps">
        <button className="step">1</button>
        <button className="step active">2. 정보입력</button>
        <button className="step">3</button>
      </div>
      <div className="form-group">
        <h2>가입기간</h2>
        <div className="input-group">
          <input
            type="text"
            id="period"
            placeholder="1~36개월, 월단위"
            className="input-field"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          <span>개월</span>
        </div>
        <div className="button-group">
          <button
            className="option-button"
            onClick={() => handlePeriodClick("6")}
          >
            6개월
          </button>
          <button
            className="option-button"
            onClick={() => handlePeriodClick("12")}
          >
            12개월
          </button>
          <button
            className="option-button"
            onClick={() => handlePeriodClick("24")}
          >
            24개월
          </button>
          <button
            className="option-button"
            onClick={() => handlePeriodClick("36")}
          >
            36개월
          </button>
        </div>
      </div>
      <div className="form-group">
        <h2>가입금액</h2>
        <div className="input-group">
          <input
            type="text"
            id="amount"
            placeholder="최소 10만원 이상, 원단위"
            className="input-field"
            value={`${amount.toLocaleString()}`}
            readOnly
          />
          <span>원</span>
        </div>
        <div className="button-group">
          <button
            className="option-button"
            onClick={() => handleAmountClick("100만")}
          >
            100만
          </button>
          <button
            className="option-button"
            onClick={() => handleAmountClick("50만")}
          >
            50만
          </button>
          <button
            className="option-button"
            onClick={() => handleAmountClick("30만")}
          >
            30만
          </button>
          <button
            className="option-button"
            onClick={() => handleAmountClick("10만")}
          >
            10만
          </button>
        </div>
      </div>
      <div className="form-group">
        <h2>출금계좌번호</h2>
        <div className="input-select-group">
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
          <div className="balance-info">
            출금가능금액{" "}
            <span className="balance-amount">{balance.toLocaleString()}원</span>
          </div>
        </div>
      </div>
      <h2>신규 계좌 비밀번호</h2>
      <div className="withdrawal-keypad">
        <div className="withdrawal-info">
          <div className="widthdrawal-input-text">
            비밀번호 입력
            <input
              type="password"
              className="join-info-custom-input"
              style={{ width: "80px", marginLeft: "30px" }}
              value={password}
              onChange={handlePasswordChange}
              onClick={toggleKeypad} // 키패드 토글
              readOnly={isReadOnly} // 키패드 활성화 시 readOnly
              placeholder="4자리 입력"
            />
            <Mouse style={{ marginLeft: "15px" }} onClick={toggleKeypad} />
          </div>
          비밀번호 확인
          <input
            type="password"
            className="join-info-custom-input"
            style={{ width: "80px", marginLeft: "30px" }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="4자리 입력"
          />
        </div>
        {showKeypad && (
          <div className="keypad-container">
            <Inputter
              onPasswordChange={handleKeypadInput} // 키패드 입력 처리
              closeKeypad={toggleKeypad} // 키패드 닫기
            />
          </div>
        )}
      </div>
      <div className="action-buttons">
        <button className="prev-button" onClick={() => navigate(-1)}>
          이전
        </button>
        <button
          className={`next-button ${!isNextButtonEnabled ? "disabled" : ""}`}
          onClick={handleNextButtonClick}
        >
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

export default JoinProduct2;
