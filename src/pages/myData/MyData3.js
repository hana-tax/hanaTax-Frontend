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

Modal.setAppElement("#root");

function MyData3() {
  const [activeTab, setActiveTab] = useState("카드");
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
  const tabs = ["카드", "은행", "페이", "증권", "보험", "기타금융", "공공기관"];
  const cards = {
    카드: [
      "하나카드",
      "신한카드",
      "NH농협카드",
      "KB국민카드",
      "우리카드",
      "삼성카드",
      "카카오뱅크",
      "현대카드",
      "기업은행",
      "제주은행",
      "케이뱅크",
      "BC카드",
      "수협은행",
      "전북은행",
      "산업은행",
      "새마을금고중앙회",
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
      "KB저축은행",
      "수협중앙회",
    ],
    페이: ["카카오페이", "토스", "네이버페이", "롯데멤버스"],
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
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleApplicationSubmit = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };
  const navigate = useNavigate();
  const goTo2 = () => {
    navigate("/myData2");
  };
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
          <button
            className="mydata-asset-button"
            onClick={handleApplicationSubmit}
          >
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
