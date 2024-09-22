import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as UserIcon } from "../../assets/svg/금융소득/deduction3.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";

const OtherIncomeDispersion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-container">
      <div
        className="card-header"
        style={{ padding: "10px" }}
        onClick={toggleDetails}
      >
        <UserIcon className="dispersion3-icon" />
        <span>타 소득으로 분산 투자하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      {isOpen && (
        <div className="deduction-body">
          <p>연금소득세로 분산하자!</p>
          <div className="other-income-dispersion-body">
            <span>
              연금상품에 불입하면{" "}
              <span
                style={{
                  color: "#18CD8C",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                13.2%
              </span>
              의 세액공제를 받을 수 있을 뿐만 아니라 발생하는 수익도 추후
              연금수령시점으로 과세가 이연돼요. 그리고 추후에 연금으로 수령할
              때도 이자나 배당소득이 아닌{" "}
              <span style={{ fontWeight: "bold" }}>연금소득</span>으로 분산되고
              월 100만원 이내로 수령하도록 한다면{" "}
              <span
                style={{
                  color: "#18CD8C",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                3.3%~5.5%
              </span>
              의 낮은 세율로 분리과세 되어 유리합니다!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherIncomeDispersion;
