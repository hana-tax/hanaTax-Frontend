import React, { useState } from "react";
import "../../assets/css/Solution.css"; // 스타일 파일 임포트
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/user.svg"; // 사용자 아이콘
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";

const PersonDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([
    { name: "배우자", count: 0 },
    { name: "8시 미만의 자녀", count: 0 },
    { name: "8시 이상 20세 이하의 자녀", count: 0 },
    { name: "60세 이상 70세 미만의 부모님", count: 0 },
    { name: "70세 이상의 부모님", count: 0 },
  ]);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleIncrement = (index) => {
    const newOptions = [...options];
    newOptions[index].count += 1;
    setOptions(newOptions);
  };

  const handleDecrement = (index) => {
    const newOptions = [...options];
    if (newOptions[index].count > 0) {
      newOptions[index].count -= 1;
    }
    setOptions(newOptions);
  };

  return (
    <div className="card-container">
      <div className="card-header" onClick={toggleDetails}>
        <UserIcon />
        <span>인적 공제 추가하기</span>
        {isOpen ? (
          <ArrowUp className="toggle-arrow" />
        ) : (
          <ArrowDown className="toggle-arrow" />
        )}
      </div>
      {isOpen && (
        <div className="card-body">
          <div className="person-body">
            {options.map((option, index) => (
              <div key={index} className="option-item">
                <span>{option.name}</span>
                <div className="person-count-option">
                  <button onClick={() => handleDecrement(index)}>-</button>
                  <span>{option.count}</span>
                  <button onClick={() => handleIncrement(index)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonDetails;
