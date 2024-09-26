import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/myAccount.css";
import useStore from "../../store/useStore";

const MyAccount = () => {
  const { user } = useStore();
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const userId = user.id;

  // Fetch account data
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Fetch savings accounts
        const accountResponse = await axios.post(
          "http://localhost:8080/api/join-history/saving",
          { id: userId }
        );

        // Fetch ISA accounts
        const isaResponse = await axios.post(
          "http://localhost:8080/api/join-history/isa",
          { id: userId }
        );

        // Fetch Fund accounts
        const fundResponse = await axios.post(
          "http://localhost:8080/api/join-history/fund",
          { id: userId }
        );

        // Combine all accounts into one list
        const allAccounts = [
          ...accountResponse.data,
          ...isaResponse.data,
          ...fundResponse.data,
        ];

        // Update state
        setAccountList(allAccounts);
        setSelectedAccount(allAccounts[0]); // Default to the first account
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAccountData();
  }, [userId]);

  const handleAccountClick = (account) => {
    setSelectedAccount(account);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="account-container">
      <div className="account-header">
        <h2>계좌정보관리</h2>
        <span>{today}</span>
      </div>
      <div className="account-summary">
        <div className="account-notice-total-asset">
          <div className="account-notice">
            <span>
              계좌입출금내역{" "}
              <span
                style={{ color: "#ff5b5b", fontFamily: "Pretendard-SemiBold" }}
              >
                {accountList.length}건
              </span>
            </span>
          </div>
          <div className="total-asset-account">
            <span
              className="total-title"
              style={{ fontFamily: "Pretendard-SemiBold" }}
            >
              총 계좌잔액
            </span>
            {selectedAccount && (
              <>
                <div className="total-amount-box">
                  <span className="total-amount">
                    ₩{" "}
                    <span
                      style={{
                        textAlign: "right",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {selectedAccount.joinAccount.toLocaleString()}원
                    </span>
                  </span>
                  <hr
                    style={{
                      border: "1px solid #d9d9d9",
                      margin: "0px 0px 20px 0px",
                    }}
                  />
                </div>
                <div className="balance-details">
                  <span className="deposit-amount">금일 총 입금액</span>
                  <span className="withdrawal-amount">금일 총 출금액</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Unified Account List */}
        <div className="account-list">
          {accountList.map((account, index) => (
            <div
              className={`account-item ${
                selectedAccount?.subscribeId === account.subscribeId
                  ? "selected"
                  : ""
              }`}
              key={account.subscribeId}
              onClick={() => handleAccountClick(account)}
            >
              <div className="account-type">
                <span>{account.accountNumber}</span>
                <span>
                  {account.accountType === 1
                    ? "예금"
                    : account.accountType === 2
                    ? "적금"
                    : account.accountType === 3
                    ? "예적금"
                    : account.accountType === 4
                    ? "ISA"
                    : account.accountType === 5
                    ? "연금저축펀드"
                    : "펀드 적금"}
                </span>
              </div>
              <span className="last-transaction">
                최근거래: {new Date(account.joinDate).toLocaleDateString()}
              </span>
              <span className="account-balance">
                {account.joinAccount > 0
                  ? account.joinAccount.toLocaleString() + "원"
                  : "→"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
