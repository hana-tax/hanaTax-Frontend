import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/Product.css";

function JoinProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    confirmation: false,
  });
  const [choice, setChoice] = useState(null);
  const [choiceCustomer, setChoiceCustomer] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecks((prevChecks) => {
      const newChecks = { ...prevChecks, [name]: checked };
      return newChecks;
    });
  };

  const handleRadioChange = (event) => {
    setChoice(event.target.value);
  };

  const handleCustomerRadioChange = (event) => {
    setChoiceCustomer(event.target.value);
  };

  useEffect(() => {
    // 모든 조건이 충족될 때만 버튼 활성화
    setAllChecked(
      choice !== null && choiceCustomer !== null && checks.confirmation
    );
  }, [choice, choiceCustomer, checks.confirmation]);

  return (
    <div className="signup-product-container">
      <h1>일임형 ISA 신규 가입</h1>
      <div className="progress-steps">
        <button className="step active">1.정보확인</button>
        <button className="step">2</button>
        <button className="step">3</button>
        <button className="step">4</button>
        <button className="step">5</button>
      </div>
      <div className="agreement-product-container">
        <span>대출 거래 관련 금융투자상품 가입 안내</span>
        <div className="join-product-notice-box">
          [금융소비자보호에 관한 법률]에 의거 대출 거래 전, 후 1개월 이내에는
          금융투자상품을 가입하실 수 없습니다.
        </div>
        <div className="join-product-checkbox">
          최근 <span>1개월 이내</span> 대출을 받으셨거나, 향후{" "}
          <span>1개월 이내</span> 대출을 받을 예정이신가요?
          <div className="checkbox-box">
            <label>
              <input
                type="radio"
                name="choice"
                value="yes"
                style={{ marginRight: "20px" }}
                onChange={handleRadioChange}
              />{" "}
              예
            </label>
            <label>
              <input
                type="radio"
                name="choice"
                value="no"
                style={{ marginRight: "20px" }}
                onChange={handleRadioChange}
              />{" "}
              아니요
            </label>
          </div>
        </div>
      </div>
      <div className="agreement-product-container">
        <span>금융소비자 구분</span>

        <div className="join-product-checkbox">
          상품가입 전 고객님이 <span>일반금융소비자</span>인지 &nbsp;{" "}
          <span>전문금융소비자</span>인지 확인하시고 체크해 주시기 바랍니다.
          <div className="checkbox-box">
            <label>
              <input
                type="radio"
                name="choiceCustomer"
                value="general"
                style={{ marginRight: "20px" }}
                onChange={handleCustomerRadioChange}
              />{" "}
              일반금융소비자
            </label>
            <label>
              <input
                type="radio"
                name="choiceCustomer"
                value="specific"
                style={{ marginRight: "20px" }}
                onChange={handleCustomerRadioChange}
              />{" "}
              전문금융소비자
            </label>
          </div>
        </div>
      </div>
      <div className="agreement-product-container">
        <span>하나 ISA(일임형) 교육자료</span>

        <div className="join-product-checkbox">
          개인종합자산관리계좌(ISA)는 정부가 개인의 종합적 자산관리를 통한
          재산형성을 지원하려는 목적으로 도입한 제도입니다. 하나의 계좌에 펀드,
          ELS, 예·적금 등 다양한 금융상품을 담을 수 있으며, 금융상품에서 발생한
          이자·배당소득에 대해서 200만원까지 비과세, 200만원을 초과하는 금액에
          대해서는 9.9%의 분리과세 혜택을 제공하게 됩니다.
        </div>
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
      <div className="action-buttons">
        <button className="prev-button" onClick={() => navigate(-1)}>
          이전
        </button>
        <button
          className={`next-button ${allChecked ? "" : "disabled"}`}
          onClick={() => allChecked && navigate("/isa/product/join2")}
          disabled={!allChecked}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default JoinProduct;
