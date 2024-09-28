import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";
import axios from "axios";
import Modal from "react-modal";
import { ReactComponent as Check } from "../../../assets/svg/check-circle.svg";
import useAuthStore from "../../../store/useStore";

function JoinProduct3() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [amount, setAmount] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const availableAmount = 120189; // 출금가능금액
  const [errorMessage, setErrorMessage] = useState("");
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
  const [balance, setBalance] = useState(0);
  const [period, setPeriod] = useState(""); // 적립 기간을 관리하는 상태
  const [pensionAge, setPensionAge] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedPensionCycle, setSelectedPensionCycle] = useState("");

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
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
    setInputPassword(e.target.value); // 입력된 비밀번호를 업데이트
  };
  const handleCycleChange = (e) => {
    setSelectedPensionCycle(e.target.value);
  };

  // 적립 기간을 업데이트하는 핸들러
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handlePensionAgeChange = (e) => {
    setPensionAge(e.target.value);
  };

  // 납입 금액을 업데이트하는 핸들러
  const handleAmountChange = (e) => {
    const inputValue = e.target.value.replace(/,/g, ""); // 천 단위 콤마 제거
    setAmount(Number(inputValue)); // 숫자로 변환하여 상태 업데이트
  };

  const handleAmountClick = (value) => {
    const numValue = parseInt(value.replace("만", ""), 10) * 10000; // 만 단위를 숫자로 변환
    setAmount((prevAmount) => prevAmount + numValue);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.post("/api/account/depositList", {
          id: user.id,
        });
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

  const handleNextButtonClick = async () => {
    const createDate = new Date().toISOString().split("T")[0];
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + parseInt(period, 10));
    const formattedExpirationDate = expirationDate.toISOString().split("T")[0];
    console.log(inputPassword);
    console.log(amount);
    console.log(createDate);
    console.log(formattedExpirationDate);
    console.log(user.id);
    const postData = {
      pensionAccountDto: {
        accountPasswd: inputPassword,
        accountStatus: 6, //6 계좌 정상
        balance: amount,
        createDate: createDate,
        expirationDate: formattedExpirationDate,
        period: period, //적립기간
        paymentLimit: amount, //연간납입한도
        connectAccountId: selectedAccount, //연결계좌번호(string)
        sum: amount, //연간납입한도
        id: user.id,
        accountType: 5, // 연금저축펀드 계좌
        pensionAge: pensionAge,
        pensionCycle: selectedPensionCycle,
      },
      joinHistoryDTO: {
        accountType: 5, // 연금저축펀드 계좌
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
        "/api/product/pension/signup",
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
                  value={period} // 상태와 연결
                  onChange={handlePeriodChange} // 적립 기간 변경 시 호출
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
                  value={amount ? amount.toLocaleString() : ""} // 상태와 연결, 천 단위 콤마 추가
                  placeholder="최소 100만원 이상, 원단위"
                  onChange={handleAmountChange} // 납입 금액 변경 시 호출
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
                  <button
                    className="money-select"
                    onClick={() => handleAmountClick("1000만")}
                  >
                    1000만
                  </button>
                  <button
                    className="money-select"
                    onClick={() => handleAmountClick("500만")}
                  >
                    500만
                  </button>
                  <button
                    className="money-select"
                    onClick={() => handleAmountClick("100만")}
                  >
                    100만
                  </button>
                  <button
                    className="money-select"
                    onClick={() => handleAmountClick("10만")}
                  >
                    10만
                  </button>
                </div>
              </div>
              <div className="join-info-desc">
                <div className="join-info-text-password">
                  <div className="join-info-account">
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
          <h2>희망연금약정</h2>
          <span style={{ color: "#757575", fontSize: "15px" }}>
            실제 연금 개시 신청 시 적립만료일 이후 영업점에 내점하여 별도 개시
            신청이 필요함.
          </span>
          <div className="withdrawal-info">
            <div className="widthdrawal-input-text">
              연금개시연령
              <input
                type="text"
                className="join-info-custom-input"
                onChange={handlePensionAgeChange}
                value={pensionAge}
                style={{
                  width: "80px",
                  marginLeft: "30px",
                  marginRight: "5px",
                }}
              />{" "}
              세
            </div>
            연금지급주기
            <select
              className="select-field"
              onChange={handleCycleChange}
              value={selectedPensionCycle}
              style={{ marginLeft: "30px" }}
            >
              <option value="">연금주기 선택</option>
              <option value="1">1개월 지급</option>
              <option value="3">3개월 지급</option>
              <option value="6">6개월 지급</option>
              <option value="12">12개월 지급</option>
            </select>
          </div>
          <span style={{ color: "#D05789", fontSize: "15px" }}>
            ※ 연금지급개시 가능일자는 2020년 7월 6월부터이며, 만 55세 이후
            입니다. <br />
            <br />※ 연금수령개시 신청은 만 55세 및 적립기간 5년을 모두 충족한
            이후부터 가능하며, 실제 연금을 수령하고자 하는 경우 당행에
            연금수령개시신청서를 작성 후 제출하셔야 합니다.
          </span>
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

export default JoinProduct3;
