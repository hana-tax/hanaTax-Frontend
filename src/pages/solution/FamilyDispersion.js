import React, { useState } from "react";
import "../../assets/css/Solution.css"; // 스타일 파일 임포트
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/user.svg"; // 사용자 아이콘
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Info } from "../../assets/svg/Info.svg";

const FamilyDispersion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState({
    spouse: false,
    child: false,
  });

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleRadioChange = (member) => {
    setSelectedFamilyMembers((prev) => ({
      ...prev,
      [member]: !prev[member],
    }));
  };

  const { spouse, child } = selectedFamilyMembers;

  return (
    <div className="card-container">
      <div className="card-header" onClick={toggleDetails}>
        <UserIcon />
        <span>가족 명의로 분산하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      {isOpen && (
        <div className="family-card-body">
          <div className="span-icon">
            <span>
              증여공제 활용 시,
              <Info className="info-icon" />
              <br /> 최대 10,300,000원 줄일 수 있어요!
            </span>
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
              <span>6,000만원</span>
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
                  <span>2,100만원</span>
                  {spouse && <span>2,100만원</span>}
                  {child && <span>200만원</span>}
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
                증여공제를 활용할 수 없어요. 😢
              </span>
            </div>
          )}
          <div className="family-body"></div>
        </div>
      )}
    </div>
  );
};

export default FamilyDispersion;
