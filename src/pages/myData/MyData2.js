import React, { useState } from "react";
import "../../assets/css/MyData.css"; // CSS 파일 임포트
import { ReactComponent as Icon1 } from "../../assets/svg/mydata1.svg";
import { ReactComponent as Icon2 } from "../../assets/svg/mydata2.svg";
import { ReactComponent as Icon3 } from "../../assets/svg/mydata3.svg";
import { ReactComponent as Icon4 } from "../../assets/svg/mydata4.svg";
import { useNavigate } from "react-router-dom";

function MyData2() {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [term2Checked, setTerm2Checked] = useState(false);
  const [term3Checked, setTerm3Checked] = useState(false);
  const [term4Checked, setTerm4Checked] = useState(false);

  // 전체 동의 체크박스 변경 시
  const handleAllCheck = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setTerm2Checked(newCheckedState);
    setTerm3Checked(newCheckedState);
    setTerm4Checked(newCheckedState);
  };

  // 개별 체크박스 변경 시
  const handleIndividualCheck = (setCheckFunc, currentCheckState) => {
    setCheckFunc(!currentCheckState);

    // 개별 항목이 모두 체크된 경우 전체 동의도 체크
    if (!currentCheckState && term2Checked && term3Checked && term4Checked) {
      setAllChecked(true);
    } else if (currentCheckState && allChecked) {
      // 하나라도 해제되면 전체 동의 체크 해제
      setAllChecked(false);
    }
  };

  const goTo2 = () => {
    navigate("/myData3");
  };

  return (
    <div className="mydata-container">
      <div className="mydata-text">
        <h1>마이데이터 가입</h1>
        <span>내 계좌 대출 증권 포인트 보기</span>
      </div>
      <div className="icon-row">
        <div className="icon">
          <div className="circle-container">
            <div className="big-circle">
              <div className="small-circle">
                <Icon1 />
              </div>
            </div>
          </div>
          <p>본인인증</p>
        </div>
        <div className="icon active">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon2 style={{ marginLeft: "7px" }} />
                </div>
              </div>
            </div>
          </div>
          <p>약관동의</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon3 />
                </div>
              </div>
            </div>
          </div>
          <p>연결자산 선택</p>
        </div>
        <div className="icon">
          <div className="icon-circle">
            <div className="circle-container">
              <div className="big-circle">
                <div className="small-circle">
                  <Icon4 />
                </div>
              </div>
            </div>
          </div>
          <p>가입완료</p>
        </div>
      </div>
      <div className="mydata2-container">
        <h2>
          자산을 연결하려면 <br />
          아래 내용에 동의해 주세요
        </h2>
        <div className="agreement-product-section">
          <div className="agreement-product-header">
            <label>
              <input
                type="checkbox"
                name="allCheck"
                checked={allChecked}
                onChange={handleAllCheck}
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
                  checked={term2Checked}
                  onChange={() =>
                    handleIndividualCheck(setTerm2Checked, term2Checked)
                  }
                />{" "}
                <span style={{ color: "#099A96", fontWeight: "bold" }}>
                  [필수]
                </span>{" "}
                개인(신용)정보 수집이용 동의
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="term3"
                  checked={term3Checked}
                  onChange={() =>
                    handleIndividualCheck(setTerm3Checked, term3Checked)
                  }
                />{" "}
                <span style={{ color: "#099A96", fontWeight: "bold" }}>
                  [필수]
                </span>{" "}
                개인(신용)정보 제공 동의
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="term4"
                  checked={term4Checked}
                  onChange={() =>
                    handleIndividualCheck(setTerm4Checked, term4Checked)
                  }
                />{" "}
                <span style={{ color: "#099A96", fontWeight: "bold" }}>
                  [필수]
                </span>{" "}
                통합인증 제공 동의
              </label>
            </li>
          </ul>
        </div>
        <div className="asset-button-box">
          <button className="mydata-asset-button" onClick={goTo2}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyData2;
