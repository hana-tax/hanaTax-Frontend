import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";
import Modal from "react-modal";
import { ReactComponent as DownloadIcon } from "../../../assets/svg/download.svg";

function JoinProduct3() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allChecked, setAllChecked] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
    if (selectedPortfolio) {
      const portfolio = portfolios.find(
        (p) => p.portfolioId === parseInt(selectedPortfolio)
      );
      navigate("/isa/product/join4", {
        state: { selectedPortfolio: portfolio },
      });
    }
  };
  const [checks, setChecks] = useState({
    term: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
    confirmation: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecks((prevChecks) => {
      const newChecks = { ...prevChecks, [name]: checked };

      if (name === "term" && checked) {
        newChecks.term2 = true;
        newChecks.term3 = true;
        newChecks.term4 = true;
        newChecks.term5 = true;
      } else if (name === "term" && !checked) {
        newChecks.term2 = false;
        newChecks.term3 = false;
        newChecks.term4 = false;
        newChecks.term5 = false;
      }

      return newChecks;
    });
  };

  useEffect(() => {
    setAllChecked(
      checks.confirmation &&
        checks.term2 &&
        checks.term3 &&
        checks.term4 &&
        checks.term5
    );
  }, [checks]);

  useEffect(() => {
    // 포트폴리오 리스트를 가져오는 API 호출
    const fetchPortfolios = async () => {
      try {
        const response = await fetch("/api/product/isa/portfolioList");
        const data = await response.json();
        setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    fetchPortfolios();
  }, []);

  const handleRadioChange = (event) => {
    setSelectedPortfolio(event.target.value);
  };

  const handleApplicationSubmit = () => {
    // 신청 처리 로직 추가
    closeApplicationModal();
  };

  const base64ToBlob = (base64, type = "application/pdf") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  // 파일 다운로드 함수
  const downloadFile = (event, portfolio) => {
    event.preventDefault();

    const data = portfolio.description; // DB에서 가져온 포트폴리오 설명서 Blob 데이터
    const blob = base64ToBlob(data); // Base64 디코딩 후 Blob 생성
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const fileName = `${portfolio.portfolioName}_설명서.pdf`; // 파일 이름 설정

    link.href = url;
    link.setAttribute("download", fileName); // 파일 다운로드
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="signup-product-container">
      <div className="progress-steps">
        <button className="step">1</button>
        <button className="step">2</button>
        <button className="step active">3. 정보제공</button>
        <button className="step">4</button>
        <button className="step">5</button>
      </div>
      <div className="agreement-product-section">
        <div className="join-product-isa-description">
          • 농어민 유형으로 가입을 원하시는 고객의 경우 온라인 상 자격확인이
          불가하므로 가까운 영업점으로 방문해 주시기 바랍니다.
          <br /> • 전전년도 소득확인증명서(ISA 가입용)로 가입하는 경우에도
          국세청은 전년도 소득을 기준으로 사후확인하여 요건을 갖추지 아니한 경우
          계좌 해지 또는 일반형으로 전환될 수 있습니다. 반드시 전년도 소득금액을
          확인하시기 바랍니다.
        </div>

        <div className="join-product-sub-heading-box">
          <div className="join-product-sub-heading">고객구분</div>
          <div className="choice-checkbox-box">
            <label>
              <input
                type="radio"
                name="choice"
                value="yes"
                style={{ marginRight: "20px" }}
              />{" "}
              근로소득자(사업자등록번호가 없는 사업소득자 포함)
            </label>
            <label>
              <input
                type="radio"
                name="choice"
                value="no"
                style={{ marginRight: "20px" }}
              />{" "}
              사업소득자
            </label>
            <label>
              <input
                type="radio"
                name="choice"
                value="no"
                style={{ marginRight: "20px" }}
              />{" "}
              소득확인 불가
            </label>
          </div>
        </div>
        <div className="join-product-sub-heading-box">
          <div className="join-product-sub-heading">소득구분</div>
          <div className="choice-checkbox-box">
            <label>
              <input
                type="radio"
                name="choice"
                value="yes"
                style={{ marginRight: "20px" }}
              />{" "}
              총 급여액 5,000만원 이하 (서민형)
            </label>
            <label>
              <input
                type="radio"
                name="choice"
                value="no"
                style={{ marginRight: "20px" }}
              />{" "}
              총 금여액 5,000만원 초과 (일반형)
            </label>
          </div>
        </div>
        <div className="join-product-sub-heading-box">
          <div className="join-product-sub-heading">
            가입자격확인서류
            <br />
            정보입력
          </div>
          <div style={{ margin: "10px" }}>
            <input className="join-product-input" type="text" />
            <input className="join-product-input" type="text" />
            <input className="join-product-input" type="text" />
            <input className="join-product-input" type="text" />
          </div>
        </div>
        <div className="agreement-product-footer">
          <label style={{ color: "#000", fontSize: "15px" }}>
            <input
              type="checkbox"
              name="confirmation"
              checked={checks.confirmation}
              onChange={handleCheckboxChange}
            />{" "}
            본인은 은행이 발급번호, 생년월일 및 연락처정보를 수집 이용하여
            가입확인서류를 출력하고 가입적격여부확인, 은행에 등록된
            휴대전화번호로 계약내용 이해여부 확인을 연락 및 본 상품 신규에 대한
            결과를 통지함에 동의합니다.
          </label>
        </div>
        <div className="join-product-sub-heading-box">
          <div className="join-product-sub-heading">
            모델 포트폴리오
            <br />
            선택
          </div>
          <div className="choice-checkbox-box">
            {portfolios.map((portfolio) => (
              <label key={portfolio.portfolioId}>
                <input
                  type="radio"
                  name="portfolio"
                  value={portfolio.portfolioId}
                  style={{ marginRight: "20px" }}
                  onChange={handleRadioChange}
                  onClick={openApplicationModal} // 모달 열기
                />{" "}
                {portfolio.portfolioName}
              </label>
            ))}
            <Modal
              isOpen={isApplicationModalOpen}
              onRequestClose={closeApplicationModal}
              contentLabel="포트폴리오 확인 모달"
              className="modal"
              overlayClassName="overlay-modal"
              style={{ width: "320px" }}
            >
              <span>
                선택하신 모델포트폴리오로
                <br />
                ISA(일임형)에 가입하시겠습니까?
              </span>
              {selectedPortfolio && (
                <div className="modal-portfolio-box">
                  {portfolios
                    .filter(
                      (portfolio) =>
                        portfolio.portfolioId === parseInt(selectedPortfolio)
                    )
                    .map((portfolio) => (
                      <div
                        key={portfolio.portfolioId}
                        className="modal-portfolio"
                      >
                        <div className="modal-portfolio-name-text">
                          <div className="modal-portfolio-name">
                            모델 포트폴리오명
                          </div>
                          <div className="modal-portfolio-text">
                            {portfolio.portfolioName}
                          </div>
                        </div>

                        <div className="modal-portfolio-name-text">
                          <div className="modal-portfolio-name">
                            최저신규가능금액
                          </div>
                          <div className="modal-portfolio-text">
                            {portfolio.minAccount.toLocaleString()}원 이상
                          </div>
                        </div>

                        <div className="modal-portfolio-name-text">
                          <div className="modal-portfolio-name">
                            후취 수수료
                          </div>
                          <div className="modal-portfolio-text">
                            {portfolio.commission}%
                          </div>
                        </div>
                        <div className="modal-portfolio-name-text">
                          <div className="modal-portfolio-name">
                            포트폴리오 설명서
                          </div>
                          <div className="modal-portfolio-text">
                            <DownloadIcon
                              onClick={(event) =>
                                downloadFile(event, portfolio)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <div className="btns">
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
                  가입하기
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <button className="prev-button" onClick={() => navigate(-1)}>
          이전
        </button>
        <button
          className={`next-button ${allChecked ? "" : "disabled"}`}
          onClick={() => allChecked && navigate("/isa/product/join4")}
          disabled={!allChecked}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default JoinProduct3;
