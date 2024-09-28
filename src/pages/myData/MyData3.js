import React, { useState } from "react";
import "../../assets/css/MyData.css"; // CSS 파일 임포트
import { ReactComponent as Icon1 } from "../../assets/svg/mydata1.svg";
import { ReactComponent as Icon2 } from "../../assets/svg/mydata2.svg";
import { ReactComponent as Icon3 } from "../../assets/svg/mydata3.svg";
import { ReactComponent as Icon4 } from "../../assets/svg/mydata4.svg";
import { ReactComponent as Question } from "../../assets/svg/question.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Hana } from "../../assets/svg/bankLogo/hana.svg";
import { ReactComponent as Shinhan } from "../../assets/svg/bankLogo/shinhan.svg";
import { ReactComponent as Nh } from "../../assets/svg/bankLogo/nh.svg";
import { ReactComponent as Woori } from "../../assets/svg/bankLogo/woori.svg";
import { ReactComponent as Kb } from "../../assets/svg/bankLogo/kb.svg";
import { ReactComponent as Kakao } from "../../assets/svg/bankLogo/kakao.svg";
import { ReactComponent as Samsung } from "../../assets/svg/bankLogo/samsung.svg";
import { ReactComponent as Hyundai } from "../../assets/svg/bankLogo/hyundai.svg";
import { ReactComponent as Ibk } from "../../assets/svg/bankLogo/ibk.svg";
import { ReactComponent as Kbank } from "../../assets/svg/bankLogo/kbank.svg";
import { ReactComponent as BC } from "../../assets/svg/bankLogo/bc.svg";
import { ReactComponent as SH } from "../../assets/svg/bankLogo/suhyup.svg";
import { ReactComponent as JB } from "../../assets/svg/bankLogo/jb.svg";
import { ReactComponent as Kdb } from "../../assets/svg/bankLogo/kdb.svg";
import { ReactComponent as MG } from "../../assets/svg/bankLogo/mg.svg";
import { ReactComponent as Toss } from "../../assets/svg/bankLogo/toss.svg";
import { ReactComponent as Naver } from "../../assets/svg/bankLogo/naver.svg";
import { ReactComponent as Lotte } from "../../assets/svg/bankLogo/lotte.svg";
// import { ReactComponent as DB } from "../../assets/svg/bankLogo/DB.svg";
import { ReactComponent as Meritz } from "../../assets/svg/bankLogo/meritz.svg";
import { ReactComponent as Mirae } from "../../assets/svg/bankLogo/mirae_asset.svg";
import { ReactComponent as Kium } from "../../assets/svg/bankLogo/kium.svg";
import { ReactComponent as Hantu } from "../../assets/svg/bankLogo/hanTu.svg";
import { ReactComponent as Nps } from "../../assets/svg/bankLogo/nps.svg";
import { ReactComponent as Hwell } from "../../assets/svg/bankLogo/hwell.svg";
import { ReactComponent as Warning } from "../../assets/svg/warning.svg";
import Modal from "react-modal";
import axios from "axios";
import tokenStore from "../../store/tokenStore";
import useTaxStore from "../../store/taxStore";
import useCardStore from "../../store/cardStore";
import useStore from "../../store/useStore";
import useYearEndStore from "../../store/yearEndStore";

Modal.setAppElement("#root");

function MyData3() {
  const [activeTab, setActiveTab] = useState("은행");
  const { token, setToken, clearToken } = tokenStore();
  const setHouseBalance = useTaxStore((state) => state.setHouseBalance);
  const setHouseLoanBalance = useTaxStore((state) => state.setHouseLoanBalance);
  const addPensionSavingBalance = useTaxStore(
    (state) => state.addPensionSavingBalance
  );
  const addCreditCard = useCardStore((state) => state.addCreditCard);
  const addDebitCard = useCardStore((state) => state.addDebitCard);
  const addDirectCard = useCardStore((state) => state.addDirectCard);
  const addPrePaidCard = useCardStore((state) => state.addPrePaidCard);
  const user = useStore((state) => state.user);
  const setInsuranceDeduction = useYearEndStore(
    (state) => state.setInsuranceDeduction
  );
  const [selectedCards, setSelectedCards] = useState({
    카드: [],
    은행: [],
    페이: [],
    증권: [],
    보험: [],
    기타금융: [],
    공공기관: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const tabs = ["은행", "카드", "페이", "증권", "보험", "기타금융", "공공기관"];
  const cards = {
    카드: [
      "하나카드",
      "신한카드",
      "NH농협카드",
      "KB국민카드",
      "우리카드",
      "삼성카드",
      "현대카드",
      "BC카드",
    ],
    은행: [
      "하나은행",
      "신한은행",
      "NH농협은행",
      "KB국민은행",
      "우리은행",
      "농협중앙회",
      "기업은행",
      "케이뱅크",
      "새마을금고중앙회",
      "토스뱅크",
      "산업은행",
      "전북은행",
      "제주은행",
      "수협은행",
    ],
    페이: ["카카오페이", "토스", "네이버페이"],
    증권: [
      "하나증권",
      "NH투자증권",
      "미래에셋증권",
      "KB증권",
      "한국투자증권",
      "키움증권",
      "신한투자증권",
      "토스증권",
      "메리츠증권",
      "삼성증권",
      "카카오페이증권",
      "IBK투자증권",
    ],
    보험: [
      "하나손해보험",
      "하나생명",
      "삼성화재",
      "현대해상",
      "KB손해보험",
      "미래에셋생명",
      "농협생명보험",
      "KB라이프생명보험",
      "신한라이프생명보험",
      "MG손해보험",
      "신한EZ손해보험",
      "IBK연금보험",
      "메리츠화재",
      "롯데손해보험",
      "삼성생명",
    ],
    기타금융: [
      "하나캐피탈",
      "KB캐피탈",
      "신한캐피탈",
      "IBK캐피탈",
      "NH농협캐피탈",
      "롯데캐피탈",
    ],
    공공기관: ["국민건강보험공단", "국민연금공단"],
  };

  // 자산 매핑 함수
  const getAssetCode = (assetName) => {
    const cardMapping = {
      // 은행 코드
      우리은행: 134,
      광주은행: 146,
      산업은행: 102,
      기업은행: 103,
      국민은행: 104,
      하나은행: 105,
      수협은행: 107,
      NH농협은행: 110,
      신한은행: 126,
      전북은행: 137,
      케이뱅크: 189,
      토스뱅크: 192,
      농협중앙회: 111,
      새마을금고중앙회: 145,

      // 증권 코드
      메리츠증권: 280,
      미래에셋증권: 238,
      삼성증권: 240,
      카카오페이증권: 289,
      토스증권: 271,
      KB증권: 218,
      NH투자증권: 247,
      신한투자증권: 278,
      IBK투자증권: 225,
      키움증권: 264,
      한국투자증권: 243,
      하나증권: 270,

      // 보험 코드
      메리츠화재: 101,
      롯데손해보험: 193,
      농협손해보험: 171,
      신한라이프생명보험: 211,
      KB라이프생명보험: 219,
      IBK연금보험: 291,
      하나생명: 263,
      삼성생명: 202,
      하나손해보험: 152,
      삼성화재: 108,
      미래에셋생명: 233,
      KB손해보험: 235,
      현대해상: 241,
      MG손해보험: 249,
      신한EZ손해보험: 255,

      // 공공기관 코드
      국민건강보험공단: 400,
      국민연금공단: 401,

      // 카드 코드
      BC카드: 131,
      삼성카드: 151,
      KB국민카드: 121,
      NH농협카드: 191,
      현대카드: 161,
      하나카드: 122,
      신한카드: 106,
      우리카드: 117,

      // 기타 금융 코드
      NH농협캐피탈: 306,
      KB캐피탈: 308,
      롯데캐피탈: 303,
      하나캐피탈: 310,
      신한캐피탈: 304,
      IBK캐피탈: 305,
    };

    return cardMapping[assetName]; // 매핑된 코드 반환
  };

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigate("/");
  };
  const navigate = useNavigate();

  const toggleCardSelection = (tab, card) => {
    setSelectedCards((prev) => {
      const isSelected = prev[tab].includes(card);
      const newSelection = isSelected
        ? prev[tab].filter((c) => c !== card)
        : [...prev[tab], card];

      return { ...prev, [tab]: newSelection };
    });
  };

  const selectAllCards = () => {
    setSelectedCards((prev) => ({
      ...prev,
      [activeTab]: cards[activeTab],
    }));
  };

  const countSelectedCards = (tab) => {
    return selectedCards[tab] ? selectedCards[tab].length : 0;
  };

  const filteredCards = cards[activeTab].filter((card) =>
    card.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = async () => {
    try {
      // 모든 카테고리에서 선택된 자산을 하나의 배열로 병합
      const assetCodes = Object.keys(selectedCards)
        .flatMap((tab) => selectedCards[tab].map((card) => getAssetCode(card))) // 각 카테고리에서 선택한 자산을 매핑하여 코드로 변환
        .filter(Boolean); // 유효한 코드만 필터링

      console.log(token);
      console.log(token.accessToken);

      // POST 요청 보내기
      const response = await axios.post(
        "/api/mydata/enroll",
        {
          userId: user.id, // user.id로 수정할것
          assetCodes: assetCodes, // 선택한 자산 코드들
        },
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`, // Bearer 토큰
          },
        }
      );

      const accounts = response.data; // 서버에서 반환한 계좌 정보들
      console.log(accounts); // accounts 전체를 출력하여 배열 구조 확인
      let insuranceAmount = 0;

      accounts.forEach((account) => {
        console.log(
          `계좌 타입: ${account.accountType}, 잔액: ${account.balance}`
        );
        if (account.accountType === 23) {
          setHouseBalance(account.balance); // balance 값을 taxStore에 저장
          console.log("저장된 balance:", account.balance);
        }
        if (account.loanType === 24) {
          setHouseLoanBalance(account.interest);

          console.log("저장된 balance: ", account.interest);
        }

        if (account.accountType === 5) {
          addPensionSavingBalance(account.balance); //연금저축계좌 연 납입금
        }

        if ([30, 31, 32, 33].includes(account.insuranceType)) {
          insuranceAmount += account.insuranceAmount; // 보험 총합 계산
          console.log(insuranceAmount);
        }

        if (account.cardType === 26) {
          // 신용카드일 경우 추가
          addCreditCard(account);
        } else if (account.cardType === 27) {
          // 체크카드일 경우 추가
          addDebitCard(account);
        } else if (account.cardType === 28) {
          //직불카드
          addDirectCard(account);
        } else if (account.cardType === 29) {
          //선불카드
          addPrePaidCard(account);
        }
      });

      const insuranceDeduction = Math.min(insuranceAmount, 1000000) * 0.12;
      setInsuranceDeduction(insuranceDeduction);
      console.log(insuranceDeduction);
      console.log(user.id);
      console.log(assetCodes);
      console.log("연결 요청 성공:", response.data);
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error("연결 요청 오류:", error);
    }
  };

  return (
    <div className="mydata-container">
      <div className="mydata-text">
        <h1>마이데이터 가입</h1>
        <span>내 계좌 대출 증권 포인트 보기</span>
      </div>
      <div className="icon-row">
        <div className="icon">
          <div className="circle-container">
            <div className="big-circle">
              <div className="small-circle">
                <Icon1 />
              </div>
            </div>
          </div>
          <p>본인인증</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon2 style={{ marginLeft: "7px" }} />
                </div>
              </div>
            </div>
          </div>
          <p>약관동의</p>
        </div>
        <div className="icon active">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon3 />
                </div>
              </div>
            </div>
          </div>
          <p>연결자산 선택</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon4 />
                </div>
              </div>
            </div>
          </div>
          <p>가입완료</p>
        </div>
      </div>
      <div className="asset-selection-container">
        <div className="asset-selection-header">
          <h2>연결자산 선택</h2>
          <div className="asset-type-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`asset-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}{" "}
                {countSelectedCards(tab) > 0 && `(${countSelectedCards(tab)})`}
              </button>
            ))}
          </div>
        </div>
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Question className="search-icon" />
            <input
              type="text"
              placeholder="연결하고 싶은 기관을 검색하세요"
              className="search-input"
              value={searchTerm} // 검색어 상태 반영
              onChange={(e) => setSearchTerm(e.target.value)} // 검색어 변경 시 상태 업데이트
            />
          </div>
        </div>
        <div className="all-select-box" onClick={selectAllCards}>
          전체선택
        </div>
        <div className="card-list">
          {filteredCards.map((card) => (
            <button
              key={card}
              className={`card-button ${
                selectedCards[activeTab].includes(card) ? "selected" : ""
              }`}
              onClick={() => toggleCardSelection(activeTab, card)}
            >
              {card.includes("하나") && <Hana />}
              {card.includes("신한") && <Shinhan />}
              {card.includes("우리") && <Woori />}
              {card.includes("KB") && <Kb />}
              {(card.includes("농협") || card.includes("NH")) && <Nh />}
              {card.includes("카카오") && (
                <Kakao style={{ width: "50px", height: "40px" }} />
              )}
              {card.includes("삼성") && <Samsung />}
              {card.includes("현대") && <Hyundai />}
              {(card.includes("기업") || card.includes("IBK")) && <Ibk />}
              {card.includes("제주") && <Shinhan />}
              {card.includes("케이") && <Kbank />}
              {card.includes("BC") && <BC />}
              {card.includes("수협") && <SH />}
              {card.includes("전북") && <JB />}
              {card.includes("산업") && <Kdb />}
              {(card.includes("새마을") || card.includes("MG")) && <MG />}
              {card.includes("토스") && <Toss />}
              {card.includes("롯데") && <Lotte />}
              {card.includes("네이버") && <Naver />}
              {/* {card.includes("DB") && <DB />} */}
              {card.includes("한국투자") && <Hantu />}
              {card.includes("미래에셋") && <Mirae />}
              {card.includes("메리츠") && <Meritz />}
              {card.includes("키움") && <Kium />}
              {card.includes("국민건강보험공단") && <Hwell />}
              {card.includes("국민연금공단") && <Nps />}
              <p>{card}</p>
            </button>
          ))}
        </div>
        <div className="asset-button-box">
          <button className="mydata-asset-button" onClick={handleEnroll}>
            한번에 연결하기
          </button>
        </div>
        <Modal
          isOpen={isConfirmationModalOpen}
          onRequestClose={closeConfirmationModal}
          contentLabel="신청 완료 모달"
          className="modal"
          overlayClassName="overlay-modal"
        >
          <div>
            <span style={{ display: "flex", marginLeft: "25px" }}>
              가입되었습니다.
            </span>
            <p className="modal-confirm-text">
              <Warning className="warning-icon" />
              마이데이터 자산정보는 동의된 기관정보를 기준으로 보여집니다.
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
}

export default MyData3;
