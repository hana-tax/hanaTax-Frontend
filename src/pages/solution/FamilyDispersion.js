import React, { useState, useEffect } from "react";
import "../../assets/css/Solution.css"; // 스타일 파일 임포트
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/user.svg"; // 사용자 아이콘
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Info } from "../../assets/svg/Info.svg";
import axios from "axios"; // axios 임포트
import useAuthStore from "../../store/useStore";

const FamilyDispersion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState({
    spouse: false,
    child: false,
  });
  const user = useAuthStore((state) => state.user);
  const [showTooltip, setShowTooltip] = useState(false);
  const [financialIncome, setFinancialIncome] = useState(0); // 금융소득 상태 추가

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleTooltipMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleRadioChange = (member) => {
    setSelectedFamilyMembers((prev) => ({
      ...prev,
      [member]: !prev[member],
    }));
  };
  const userId = user.id;

  // API 호출하여 금융소득 가져오기
  useEffect(() => {
    const fetchFinancialIncome = async () => {
      try {
        const response = await axios.post("/api/income/isOverTax", {
          id: userId,
        });
        setFinancialIncome(response.data.sum); // sum 값을 상태에 저장
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchFinancialIncome();
  }, []);

  const { spouse, child } = selectedFamilyMembers;

  return (
    <div className="card-container">
      <div
        className="card-header"
        style={{ padding: "0px 10px 0px 0px" }}
        onClick={toggleDetails}
      >
        <UserIcon />
        <span>가족 명의로 분산하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="family-card-body">
          <div className="span-icon">
            <span>
              사전증여 활용 시,
              <Info
                className="info-icon"
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
              />
              {showTooltip && (
                <div className="tooltip-family-box">
                  배우자는 6억원, 성인 자녀나 손자에게는 5,000만원(미성년자
                  2,000만원)까지 증여세가 없습니다.
                </div>
              )}
              <br /> 금융소득을 분산할 수 있어요!
            </span>
            <p>
              (예시 사례) 금융자산이 10억원(투자수익률 6% 가정) <br /> -각각
              배우자와 자녀에게 증여공제 한도 내로 각각 6억원, 5000만원
              증여한다면?
            </p>
          </div>
          <div className="family-radio">
            <label>
              <input
                type="checkbox"
                checked={spouse}
                onChange={() => handleRadioChange("spouse")}
              />
              배우자
            </label>
            <label>
              <input
                type="checkbox"
                checked={child}
                onChange={() => handleRadioChange("child")}
              />
              자녀
            </label>
          </div>
          <div className="total-income">
            <div className="total-income-item">
              <span>금융소득</span>
              <span>6000만원</span>{" "}
            </div>
            <div className="total-income-item">
              <span>세부담합계</span>
              <span>1,980만원</span>
            </div>
          </div>
          {spouse || child ? (
            <>
              <div className="after-gift">
                <span>증여 후</span>
                <ArrowDown />
              </div>
              <div className="total-income">
                <div className="total-income-item">
                  <span></span>
                  <span>본인</span>
                  {spouse && <span>배우자</span>}
                  {child && <span>자녀</span>}
                </div>
                <div className="total-income-item">
                  <span>금융소득</span>
                  <span>2100만원</span>
                  {spouse && <span>3,600만원</span>}
                  {child && <span>300만원</span>}
                </div>
                <div className="total-income-item">
                  <span>세부담합계</span>
                  <span>950만원</span>
                </div>
                <div className="deduction-total-text">1,030만원 절세</div>
              </div>
            </>
          ) : (
            <div className="total-income" style={{ marginTop: "30px" }}>
              <span>
                배우자, 자녀가 없으면 <br />
                사전증여를 활용할 수 없어요. 😢
              </span>
            </div>
          )}
          <div className="family-body"></div>
        </div>
      </div>
    </div>
  );
};

export default FamilyDispersion;
