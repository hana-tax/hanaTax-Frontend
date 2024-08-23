import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";

function JoinProduct2() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allChecked, setAllChecked] = useState(false);
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

  return (
    <div className="signup-product-container">
      <div className="progress-steps">
        <button className="step">1</button>
        <button className="step active">2.약관동의</button>
        <button className="step">3</button>
        <button className="step">4</button>
      </div>
      <div className="agreement-product-section">
        <p>금융상품 중요 확인사항</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="term"
              checked={checks.term}
              onChange={handleCheckboxChange}
            />{" "}
            전체동의
          </label>
        </div>
        <ul className="agreement-product-list">
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              <span style={{ color: "#099A96", fontWeight: "bold" }}>
                [필수]
              </span>{" "}
              금융상품 중요 확인사항
            </label>
          </li>
        </ul>
      </div>
      <div className="agreement-product-section">
        <p>투자설명서 및 필수서류 확인</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="term"
              checked={checks.term}
              onChange={handleCheckboxChange}
            />{" "}
            전체동의
          </label>
        </div>
        <ul className="agreement-product-list">
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              <span style={{ color: "#099A96", fontWeight: "bold" }}>
                [필수]
              </span>{" "}
              연금저축계좌설정약관
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term3"
                checked={checks.term3}
                onChange={handleCheckboxChange}
              />{" "}
              <span style={{ color: "#099A96", fontWeight: "bold" }}>
                [필수]
              </span>{" "}
              연금저축계좌핵심설명서
            </label>
          </li>
        </ul>
      </div>
      <div className="agreement-product-section">
        <p>투자자 확인사항</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="term"
              checked={checks.term}
              onChange={handleCheckboxChange}
            />{" "}
            전체동의
          </label>
        </div>
        <ul className="agreement-product-list">
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              펀드는 운용실적에 따라 수익이 변동되는 상품으로 원금이 보장되지
              않으며, 투자 겨로가에 따른 이익과 손실은 모두 투자자에게 귀속됨
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              간이투자설명서 및 약관을 제공받았으며 아래 내용을 충분히 이해하고
              가입함
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              펀드는 예금자보호법에 따라 보호되지 않음
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              펀드의 명칭, 종류, 투자목적, 투자대상, 투자전략, 핵심
              투자위험(신용위험, 시장위험, 환위험 등), 계약의 해제, 해지에 관한
              사항 등에 대하여 확인하고 이해함
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              파생상품에 투자하는 펀드인 경우 최대손실 예상금액 및 조기상환조건
              등에 대하여 확인하고 이해함
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              투자자가 부담하는 총보수 및 수수료에 대하여 확인하고 이해함
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              펀드의 환매절차(방법), 기준가격적용, 환매대금 지급일, 환매수수료
              및 부과기간, 환매연기, 환매제한 등 환매에 관한 사항에 대해
              확인하고 이해함
            </label>
          </li>
        </ul>
      </div>

      <div className="agreement-product-section">
        <p>비예금상품 설명서</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="term"
              checked={checks.term}
              onChange={handleCheckboxChange}
            />{" "}
            비예금상품 설명서 확인
          </label>
        </div>
        <ul className="agreement-product-list">
          <li>
            <label>
              <input
                type="checkbox"
                name="term2"
                checked={checks.term2}
                onChange={handleCheckboxChange}
              />{" "}
              [비예금상품 설명서]를 통해 원금손실 가능성 및 최대손실가능 금액에
              대해 정확하게 이해하였음
            </label>
          </li>
        </ul>
      </div>
      <div className="action-buttons">
        <button className="prev-button" onClick={() => navigate(-1)}>
          이전
        </button>
        <button
          className={`next-button ${allChecked ? "" : "disabled"}`}
          onClick={() => allChecked && navigate("/pension/product/join3")}
          disabled={!allChecked}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default JoinProduct2;
