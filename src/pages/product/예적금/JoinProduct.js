import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";

function JoinProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checks, setChecks] = useState({
    term: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
    term6: false,
    term7: false,
    term8: false,
    term9: false,
    term10: false,
    confirmation: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setChecks((prevChecks) => ({
      ...prevChecks,
      [name]: checked,
    }));
  };

  const handleAllAgreeChange = (terms) => {
    const allChecked = terms.every((term) => checks[term]);
    const newChecks = { ...checks };

    // 각 섹션의 체크박스 상태를 전체 동의에 맞게 설정
    terms.forEach((term) => {
      newChecks[term] = !allChecked;
    });

    setChecks(newChecks);
  };

  const allChecked =
    checks.term2 &&
    checks.term3 &&
    checks.term4 &&
    checks.term5 &&
    checks.term6 &&
    checks.term7 &&
    checks.term8 &&
    checks.term9 &&
    checks.term10 &&
    checks.confirmation;

  return (
    <div className="signup-product-container">
      <div className="progress-steps">
        <button className="step active">1.약관동의</button>
        <button className="step">2</button>
        <button className="step">3</button>
      </div>
      <div className="agreement-product-section">
        <p>금융상품의 중요사항 및 필수 확인사항</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="term"
              checked={
                checks.term2 && checks.term3 && checks.term4 && checks.term5
              }
              onChange={() =>
                handleAllAgreeChange(["term2", "term3", "term4", "term5"])
              }
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
              checked={checks.term6 && checks.term7 && checks.term8}
              onChange={() => handleAllAgreeChange(["term6", "term7", "term8"])}
            />{" "}
            전체동의
          </label>
        </div>
        <ul className="agreement-product-list">
          <li>
            <label>
              <input
                type="checkbox"
                name="term6"
                checked={checks.term6}
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
                name="term7"
                checked={checks.term7}
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
                name="term8"
                checked={checks.term8}
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
        <p>불법·탈법 차명거래 금지 설명 확인</p>
        <div className="agreement-product-header">
          <label>
            <input
              type="checkbox"
              name="confirmation"
              checked={checks.confirmation && checks.term9}
              onChange={() => handleAllAgreeChange(["confirmation", "term9"])}
            />{" "}
            불법·탈법 차명거래 금지 설명 확인
          </label>
        </div>
        <ul className="agreement-product-list">
          <li>
            <label>
              <input
                type="checkbox"
                name="term9"
                checked={checks.term9}
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
          • 중소기업 대표자이거나, 신용등급이 7~10등급인 경우, 은행법상 구속행위
          여부 판정에 따라 신규일 이후 1개월 이내 본인명의 대출 및 관련
          중소기업의 대출거래가 제한 될 수 있습니다. <br /> • 이 예금은
          예금자보호법에 따라 원금과 소정의 이자를 합하여 1인당 "5천만원까지"(본
          은행의 여타 보호상품과 합산) 보호됩니다. <br />• 본 상품을
          인터넷뱅킹(또는 모바일 뱅킹)을 통하여 중도해지 하는 경우 ARS인증(또는
          해외체류자인증) 및 콜센터를 통한 본인확인 절차를 거친 후 해지가
          가능합니다.
        </div>
        <div className="agreement-product-footer">
          <label>
            <input
              type="checkbox"
              name="confirmation"
              checked={checks.term10}
              onChange={() => handleAllAgreeChange(["term10"])}
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
          className="next-button"
          style={{
            backgroundColor: allChecked ? "#18CD8C" : "#F2F4F6",
            color: allChecked ? "#FFFFFF" : "#000000",
          }}
          onClick={() => allChecked && navigate("/deposit/product/join2")}
          disabled={!allChecked}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default JoinProduct;
