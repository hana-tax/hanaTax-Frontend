import React, { useState } from "react";
import "../../assets/css/Solution.css";
import { ReactComponent as UserIcon } from "../../assets/svg/금융소득/deduction2.svg";
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Pin } from "../../assets/svg/pin.svg";
import { ReactComponent as Star } from "../../assets/svg/star.svg";

const TaxFreeDispersion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card-container">
      <div
        className="card-header"
        style={{ padding: "10px 10px 10px 17px" }}
        onClick={toggleDetails}
      >
        <UserIcon />
        <span>비과세 상품 활용하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      {isOpen && (
        <div className="deduction-body">
          <div className="tax-free-dispersion-body">
            <div className="num-p-box">
              <div className="dispersion-num-box">
                <div className="dispersion-num">1</div>
              </div>
              <p>비과세종합저축</p>
            </div>
            <span style={{ fontWeight: "normal" }}>
              비과세종합저축은 이자에 대한 세금이 없어요.
              <br /> 1인당 5,000만 원의 저축 원금까지 비과세 혜택이 적용되어요.
            </span>
            <div className="details">
              <Pin className="pin-detail" />
              <div className="detail-heading-box">
                <span className="detail-heading">
                  • 가입대상: 만 65세 이상 고령자, 장애인, 기초생활수급자,
                  국가/독립유공자 등
                </span>
                <span className="detail-heading">• 납입한도: 5,000만 원</span>
              </div>
            </div>
          </div>
          <div className="tax-free-dispersion-body">
            <div className="num-p-box">
              <div className="dispersion-num-box">
                <div className="dispersion-num">2</div>
              </div>
              <p>개인종합자산관리계좌 (ISA)</p>
            </div>
            <span style={{ fontWeight: "normal" }}>
              ISA는 개인종합자산관리계좌로, 이 계좌로 예적금, 펀드, 국내 상장
              주식, ETF 등에 투자할 수 있어요. ISA 계좌로 투자를 해 발생한 이익
              중, 200만 원까지는 비과세 혜택이 적용되어요.
              <br />
              <br />
              그런데 200만 원을 초과하는 수익에 대해서는 9.9%의 세율이
              적용되어요.
            </span>
            <div className="details">
              <Pin className="pin-detail" />
              <div className="detail-heading-box">
                <span className="detail-heading">
                  • 가입대상: 15세 이상 거주 (금융소득종합과세자제외)
                </span>
                <span className="detail-heading">
                  • 납입한도: 1억 원(연 2천만 원)
                </span>
              </div>
            </div>
            <div className="account-make-btn-box">
              <button className="account-make-btn">계좌 개설하기</button>
            </div>
          </div>
          <div className="tax-free-dispersion-body">
            <div className="num-p-box">
              <div className="dispersion-num-box">
                <div className="dispersion-num">3</div>
              </div>
              <p>연금저축</p>
            </div>
            <span style={{ fontWeight: "normal" }}>
              연금저축은 노후 대비를 위한 저축성 상품이에요. 연금을 수령할 때
              이자소득세 15.4%가 과세되지 않아요. 연 납입액의 최대 600만 원까지
              세액공제를 해주고, 소득에 따라 13.2~16.5%로 달라져요.
            </span>
            <div className="details">
              <Pin className="pin-detail" />
              <div className="detail-heading-box">
                <span className="detail-heading">• 가입대상: 누구나</span>
                <span className="detail-heading">• 납입한도: 연 1,800만원</span>
                <span className="detail-heading">• 연금수령: 만 55세부터</span>
              </div>
            </div>
            <div className="account-make-btn-box">
              <button className="account-make-btn">계좌 개설하기</button>
            </div>
          </div>
          <div className="tax-free-dispersion-body">
            <div className="num-p-box">
              <div className="dispersion-num-box">
                <div className="dispersion-num">4</div>
              </div>
              <p>연금보험</p>
            </div>
            <span style={{ fontWeight: "normal" }}>
              연금보험 역시 연금을 수령할 때 이자소득세 15.4%를 내지 않아도
              돼요. 연금을 수령할 때도 연금저축과 달리 세금을 내지 않아요. 그
              대신 연금보험은 별도의 세액공제 혜택이 없어요.
            </span>
            <div className="details">
              <Pin className="pin-detail" />
              <div className="detail-heading-box">
                <span className="detail-heading">• 가입대상: 누구나</span>
                <span className="detail-heading">• 납입한도: 없음</span>
                <span className="detail-heading">• 연금수령: 만 45세부터</span>
              </div>
            </div>
            <div className="details">
              <Star className="star-detail" />
              <div className="detail-heading-box">
                <span className="detail-heading">
                  • 연금저축 VS 연금보험 간단 요약
                  <br />
                  연말정산을 준비한다면 ➡️ 연금저축
                  <br />
                  연금 수령 시 비과세를 원한다면 ➡️ 연금보험
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxFreeDispersion;
