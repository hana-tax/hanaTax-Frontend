import React, { useState } from "react";
import "../../assets/css/Solution.css"; // 스타일 파일 임포트
import { ReactComponent as UserIcon } from "../../assets/svg/연말정산/user.svg"; // 사용자 아이콘
import { ReactComponent as ArrowUp } from "../../assets/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg";
import { ReactComponent as Info } from "../../assets/svg/Info.svg";
import { ReactComponent as Warning } from "../../assets/svg/warning.svg";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-custom-alert";

const PersonDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState([
    { name: "배우자", count: 0, isChecked: false },
    { name: "8세 미만의 자녀", count: 0 },
    { name: "8세 이상 20세 이하의 자녀", count: 0 },
    { name: "60세 이상 70세 미만의 부모님", count: 0 },
    { name: "70세 이상의 부모님", count: 0 },
    { name: "20세 이상 60세 이하의 형제자매", count: 0 },
  ]);

  const [addDeduction, setDeduction] = useState([
    { name: "부녀자", isChecked: false },
    { name: "한부모", isChecked: false },
    { name: "장애인", count: 0 }, // 장애인 항목에 카운트 추가
  ]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleIncrement = (index, isAddDeduction = false) => {
    const targetArray = isAddDeduction ? [...addDeduction] : [...options];
    targetArray[index].count += 1;

    if (isAddDeduction) {
      setDeduction(targetArray);
    } else {
      setOptions(targetArray);
    }
  };

  const handleDecrement = (index, isAddDeduction = false) => {
    const targetArray = isAddDeduction ? [...addDeduction] : [...options];
    if (targetArray[index].count > 0) {
      targetArray[index].count -= 1;
    }

    if (isAddDeduction) {
      setDeduction(targetArray);
    } else {
      setOptions(targetArray);
    }
  };

  const handleToggle = (index, isAddDeduction = false) => {
    if (isAddDeduction) {
      const newAddDeduction = [...addDeduction];

      if (index === 0) {
        if (newAddDeduction[index].isChecked) {
          newAddDeduction[index].isChecked = false;
        } else {
          newAddDeduction[index].isChecked = true;
          if (newAddDeduction[1].isChecked) {
            toast.warning("한부모 공제만 적용됩니다.");
          }
        }
        setDeduction(newAddDeduction);
      } else if (index === 1) {
        if (newAddDeduction[index].isChecked) {
          newAddDeduction[index].isChecked = false;
        } else {
          newAddDeduction[index].isChecked = true;
          if (newAddDeduction[0].isChecked) {
            toast.warning("한부모 공제만 적용됩니다.");
          }
        }
        setDeduction(newAddDeduction);
      } else {
        newAddDeduction[index].isChecked = !newAddDeduction[index].isChecked;
        setDeduction(newAddDeduction);
      }
    } else {
      const newOptions = [...options];

      if (
        index === 0 &&
        !newOptions[index].isChecked &&
        addDeduction[1].isChecked
      ) {
        toast.error("배우자공제와 한부모공제는 중복적용 할 수 없습니다.");
        return;
      }

      newOptions[index].isChecked = !newOptions[index].isChecked;

      if (newOptions[index].name === "배우자") {
        if (newOptions[index].isChecked) {
          newOptions[index].count = 1;
          setIsModalOpen(true);
        } else {
          newOptions[index].count = 0;
        }
      }

      setOptions(newOptions);
    }
  };

  const calculateTotalDeduction = () => {
    let total = 0;

    // 배우자 공제
    if (options[0].isChecked) total += 1500000;

    // 8세 이상 20세 이하 자녀 공제
    if (options[2].count > 0) {
      total += 150000; // 기본 공제
      if (options[2].count > 2) {
        total += 150000; // 4명 이상 추가
        total += (options[2].count - 2) * 300000;
      }
      total += options[2].count * 1500000; // 각 자녀에 대해 150만원 추가
    }

    // 8세 미만 자녀 공제
    total += options[1].count * 1500000;

    // 60세 이상 70세 미만 부모님 공제
    total += options[3].count * 1500000;

    // 70세 이상의 부모님 공제
    total += options[4].count * 1500000 + options[4].count * 1000000;

    // 20세 이상 60세 미만 부모님 공제
    total += options[5].count * 1500000;

    if (addDeduction[1].isChecked) {
      total += 1000000;
    } else if (addDeduction[0].isChecked) {
      total += 500000;
    }

    total += addDeduction[2].count * 2000000;

    return total;
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
      <div className={`card-animation-container ${isOpen ? "open" : ""}`}>
        <div className="card-body">
          <div className="person-body">
            <p style={{ fontSize: "17px" }}>
              <div className="person-body-text">
                올해 부양가족 정보를 확인해주세요.{" "}
                <Info style={{ marginLeft: "5px" }} />
              </div>
            </p>

            <div className="basic-deduction-box">
              <span>기본공제</span>
              {options.map((option, index) => (
                <div key={index} className="option-item">
                  <span>{option.name}</span>
                  {option.name === "배우자" ? (
                    <div>
                      <input
                        type="checkbox"
                        id={`toggle-${index}`} // 고유한 id 설정
                        checked={option.isChecked}
                        onChange={() => handleToggle(index)}
                        hidden
                      />
                      <label
                        htmlFor={`toggle-${index}`}
                        className="toggleSwitch"
                      >
                        <span className="toggleButton"></span>
                      </label>
                    </div>
                  ) : (
                    <div className="person-count-option">
                      <button onClick={() => handleDecrement(index)}>-</button>
                      <span>{option.count}</span>
                      <button onClick={() => handleIncrement(index)}>+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="basic-deduction-box">
              <span>추가공제</span>
              {addDeduction.map((option, index) => (
                <div key={index} className="option-item">
                  <span>{option.name}</span>
                  {option.name === "장애인" ? (
                    <div className="person-count-option">
                      <button onClick={() => handleDecrement(index, true)}>
                        -
                      </button>
                      <span>{option.count}</span>
                      <button onClick={() => handleIncrement(index, true)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="checkbox"
                        id={`add-toggle-${index}`} // 고유한 id 설정
                        checked={option.isChecked}
                        onChange={() => handleToggle(index, true)}
                        hidden
                      />
                      <label
                        htmlFor={`add-toggle-${index}`}
                        className="toggleSwitch"
                      >
                        <span className="toggleButton"></span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="total-deduction">
              <span style={{ marginLeft: "10px" }}>
                총 공제액: {calculateTotalDeduction().toLocaleString()} 원
              </span>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="신청 완료 모달"
            className="modal"
            overlayClassName="overlay-modal"
          >
            <div>
              <div className="modal-confirm-text" style={{ color: "#000" }}>
                <Warning className="warning-icon" />
                <span>배우자 공제 안내</span>
              </div>
              <p className="modal-family-text">
                연간 소득금액 합계액 100만원 이하(근로소득만 있는 경우에는
                총급여 500만원 이하) 인 배우자에 대해만 공제대상입니다.{" "}
              </p>
              <button className="modal-confirm-btn" onClick={closeModal}>
                확인
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default PersonDetails;
