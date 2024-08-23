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
        <button className="step">5</button>
      </div>
      <div className="agreement-product-section">
        <p>금융상품의 중요사항 및 필수 확인사항</p>
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
              금융소비자보호법상 중요사항
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
              가입요건 및 세제혜택 등
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term4"
                checked={checks.term4}
                onChange={handleCheckboxChange}
              />{" "}
              <span style={{ color: "#099A96", fontWeight: "bold" }}>
                [필수]
              </span>{" "}
              출금 및 해지
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term5"
                checked={checks.term5}
                onChange={handleCheckboxChange}
              />{" "}
              <span style={{ color: "#099A96", fontWeight: "bold" }}>
                [필수]
              </span>{" "}
              금융소비자 권리
            </label>
          </li>
        </ul>
      </div>
      <div className="agreement-product-section">
        <p>약관, 상품설명서 및 계약권유문서 확인</p>
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
              약관
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
              상품설명서
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="term4"
                checked={checks.term4}
                onChange={handleCheckboxChange}
              />{" "}
              <span style={{ color: "#099A96", fontWeight: "bold" }}>
                [필수]
              </span>{" "}
              계약권유문서
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
              대해 정확하게 이해하였음.
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
              본인은 약관, 상품설명서 및 계약권유문서를 전자문서에 의하여
              제공받음을 동의하고 제공받은 내용을 충분히 이해하며 본 상품에
              가입함을 확인합니다.
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
              본인은 상품설명서를 통해 예금자보호 여부를 이해하고
              확인하였습니다.
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
              본 상품은 일반 예금상품과 달리{" "}
              <span style={{ textDecoration: "underline" }}>
                원금의 일부 또는 전부 손실이 발생
              </span>
              할 수 있으며, 투자로 인한 손실은 투자자 본인에게 귀속된다는 사실을
              확인하였습니다.
            </label>
          </li>
        </ul>
      </div>
      <div className="agreement-product-section">
        <p>불법·탈법 차명거래 금지 설명 확인</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="term"
              checked={checks.term}
              onChange={handleCheckboxChange}
            />{" "}
            불법·탈법 차명거래 금지 설명 확인
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
              [금융실명거래 및 비밀보장에 관한 법률] 제 3조에 따라 누구든지
              불법재산의 은닉, 자금세탁행위, 공중협박자금조달행위 및 강제 집행의
              면탈, 그 밖의 탈법 행위를 목적으로 타인의 실명으로 금융거래를
              하여서는 아니 되며, 이를 위반 시 5년 이하의 징역 또는 5천만원
              이하의 벌금에 처해질 수 있습니다.
            </label>
          </li>
        </ul>
        <div className="join-product-isa-description">
          • 개인종합자산관리계좌(ISA)는 조세특례제한법 제 91조의 18에 따라 19세
          이상 거주자(근로소득이 있는 경우 15세 이상)가 가입 가능하며, 직전
          3년중 1회 이상 금융소득종합과세 대상인 경우 가입이 불가 합니다. 또한
          총 급여액 혹은 종합소득금액에 따라 비과세 한도금액이 달리 적용됩니다.
        </div>
        <div className="agreement-product-footer">
          <label>
            <input
              type="checkbox"
              name="confirmation"
              checked={checks.confirmation}
              onChange={handleCheckboxChange}
            />{" "}
            본인은 위 예금상품의 약관 및 상품설명서를 제공받고 예금상품의 중요한
            사항을 충분히 이해하며 본 상품에 가입함을 확인합니다.
          </label>
        </div>
      </div>
      <div className="action-buttons">
        <button className="prev-button" onClick={() => navigate(-1)}>
          이전
        </button>
        <button
          className={`next-button ${allChecked ? "" : "disabled"}`}
          onClick={() => allChecked && navigate("/isa/product/join3")}
          disabled={!allChecked}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default JoinProduct2;
