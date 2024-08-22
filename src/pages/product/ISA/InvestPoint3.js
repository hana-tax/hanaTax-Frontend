import React from "react";
import "../../../assets/css/Product.css";

const InvestPoint3 = () => {
  return (
    <div className="invest-point1-container">
      <h1>기존보다 개선된 가입요건</h1>
      <div className="details-section">
        <p>기존 제도보다 투자자에게 유리하게 개선</p>
        <span style={{ color: "#757575" }}>
          (가입자격, 납입한도, 편입상품, 상품교체, 세제혜택 등)
        </span>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th className="isa-table-highlight">ISA</th>
                <th>재형저축</th>
                <th>소득공제장기펀드</th>
                <th>(구)세금우대종합저축</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>가입자격</td>
                <td>
                  • 만 19세 이상 가입자 (소득 무관) <br />• 만 15~18세 직전년도
                  기준 근로소득자 <br />
                  (직전 3개년 기준 1회 이상 금융소득종합과세대상자 제외)
                </td>
                <td>
                  • 총급여 5천만원 이하 거주자 <br /> • 종합소득 3천 5백만원
                  이하 거주자
                </td>
                <td>총급여 5천만원 이하 거주자</td>
                <td>만 20세 이상 거주자</td>
              </tr>
              <tr>
                <td>납입한도</td>
                <td>연 2,000만원</td>
                <td>
                  분기 300만원 <br />
                  (연 1,200만원)
                </td>
                <td>연 600만원</td>
                <td>총 1,000만원</td>
              </tr>
              <tr>
                <td>편입상품</td>
                <td>RP, 펀드, 파생결합증권, 예/적금, ETF/ETN, 상장주식</td>
                <td>예금, 펀드, 보험</td>
                <td>펀드</td>
                <td>
                  최초 5년 ~ 최장 10년 <br /> (5년 이후 해지시 세금 추징 없음)
                </td>
              </tr>
              <tr>
                <td>상품간 교체</td>
                <td>가능</td>
                <td>불가능</td>
                <td>불가능</td>
                <td>불가능</td>
              </tr>
              <tr>
                <td>손익통산</td>
                <td>가능</td>
                <td>불가능</td>
                <td>불가능</td>
                <td>불가능</td>
              </tr>
              <tr>
                <td>세제혜택</td>
                <td>
                  {" "}
                  • 순이익 200만원 비과세 <br />
                  (저소득층 400만원 비과세) <br /> • 초과분은 9% 분리과세 <br />{" "}
                  (지방소득세 포함 9.9% 분리과세)
                </td>
                <td>비과세</td>
                <td>납입액 40% 소득공제</td>
                <td>9% 분리과세</td>
              </tr>
              <tr>
                <td>기타</td>
                <td>의무가입기간 3년 (계약기간 연장, 재가입 허용)</td>
                <td>의무가입기간 7년 (저소득층, 청년 3년)</td>
                <td>의무가입기간 5년</td>
                <td>2014년 일몰</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestPoint3;
