import React, { useState, useCallback } from "react";
import "../../assets/css/Product.css";
const PASSWORD_MAX_LENGTH = 8;

const shuffle = (nums) => {
  let num_length = nums.length;
  while (num_length) {
    let random_index = Math.floor(num_length-- * Math.random());
    let temp = nums[random_index];
    nums[random_index] = nums[num_length];
    nums[num_length] = temp;
  }
  return nums;
};

const Inputter = ({ onPasswordChange, closeKeypad }) => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");

  const handlePasswordChange = useCallback(
    (num) => {
      if (password.length === PASSWORD_MAX_LENGTH) {
        return;
      }
      const newPassword = password + num.toString();
      setPassword(newPassword);
      onPasswordChange(newPassword); // 부모 컴포넌트로 비밀번호 전달
    },
    [password, onPasswordChange]
  );

  const erasePasswordOne = useCallback(() => {
    const newPassword = password.slice(
      0,
      password.length === 0 ? 0 : password.length - 1
    );
    setPassword(newPassword);
    onPasswordChange(newPassword); // 부모 컴포넌트로 비밀번호 전달
  }, [password, onPasswordChange]);

  const erasePasswordAll = useCallback(() => {
    setPassword("");
    onPasswordChange(""); // 부모 컴포넌트로 비밀번호 전달
  }, [onPasswordChange]);

  const shuffleNums = useCallback(
    (num) => {
      let nums_random = Array.from({ length: 10 }, (v, k) => k);
      setNums(shuffle(nums_random));
      handlePasswordChange(num);
    },
    [handlePasswordChange]
  );

  const onClickSubmitButton = () => {
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!");
    } else {
      alert(password + "을 입력하셨습니다.");
      closeKeypad(); // 키패드 닫기
    }
  };

  return (
    <>
      <div className="inputter__flex">
        {nums.map((n) => (
          <button
            className="num-button__flex spread-effect fantasy-font__2_3rem"
            value={n}
            onClick={() => shuffleNums(n)} // 화살표 함수로 전달
            key={n} // 숫자 값을 고유한 key로 사용
          >
            {n}
          </button>
        ))}
        <button
          className="num-button__flex spread-effect fantasy-font__2_3rem"
          onClick={erasePasswordAll}
        >
          X
        </button>
        <button
          className="num-button__flex spread-effect fantasy-font__2_3rem"
          onClick={erasePasswordOne}
        >
          ←
        </button>
      </div>
      <div>
        <button
          type="submit"
          className="submit-button"
          onClick={onClickSubmitButton}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Inputter;
