import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as CardIcon } from "../../assets/svg/연말정산/credit-card.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";

const CardDetails = () => {
  const [items] = useState([
    {
      percentage: 12,
      description: "신용카드",
      color: "#90B6FF",
      amount: 521,
      unit: 5000,
    },
    {
      percentage: 7,
      description: "체크카드, 현금",
      color: "#FEA6FA",
      amount: 357,
      unit: 5000,
    },
    {
      percentage: 0,
      description: "카드 공제 금액",
      color: "#FFDC97",
      amount: 0,
      unit: 300,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-container">
      <div
        className="card-header"
        onClick={toggleDetails}
        style={{ padding: "10px" }}
      >
        <CardIcon />
        <span>카드 공제 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}{" "}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="card-body">
          <div className="card-box">
            <p>
              소비금액이 적어 <br />
              카드 소득공제를 받을 수 없어요.
            </p>
            <div className="text">
              <span>
                앞으로 지출은 1250만원까지 신용카드, <br />그 이상은 체크카드를
                써보아요!
              </span>
            </div>
            <div className="discount-details">
              {items.map((item, index) => (
                <div className="discount-item" key={index}>
                  <div className="progress-all-bar">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <div className="percentage">{item.percentage}%</div>
                    </div>
                    <div className="amount-unit">
                      <div
                        className="amount"
                        style={{
                          marginLeft: `${Math.max(0, item.percentage - 5)}%`,
                        }}
                      >
                        {item.amount.toLocaleString()}
                      </div>
                      <div className="unit">
                        {item.unit.toLocaleString()}(만원)
                      </div>
                    </div>
                  </div>
                  <div className="description-unit">
                    <div
                      className="description-color"
                      style={{
                        backgroundColor: item.color,
                        width: "14px",
                        height: "10px",
                        marginRight: "10px",
                      }}
                    ></div>
                    <div className="card-description">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
