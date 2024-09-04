import React, { useState, useCallback } from "react";
import "../../assets/css/Product.css";

const PASSWORD_MAX_LENGTH = 4;

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

const Inputter = ({ onPasswordSubmit, closeKeypad }) => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");

  const handlePasswordChange = useCallback(
    (num) => {
      if (password.length === PASSWORD_MAX_LENGTH) return;
      const newPassword = password + num.toString();
      setPassword(newPassword);
    },
    [password]
  );

  const erasePasswordOne = useCallback(() => {
    const newPassword = password.slice(0, password.length - 1);
    setPassword(newPassword);
  }, [password]);

  const erasePasswordAll = useCallback(() => {
    setPassword("");
  }, []);

  const shuffleNums = useCallback(
    (num) => {
      let nums_random = Array.from({ length: 10 }, (v, k) => k);
      setNums(shuffle(nums_random));
      handlePasswordChange(num);
    },
    [handlePasswordChange]
  );

  const onClickSubmitButton = () => {
    if (password.length === PASSWORD_MAX_LENGTH) {
      onPasswordSubmit(password); // Submit 버튼 클릭 시, 부모로 비밀번호 전달
      closeKeypad(); // 키패드 닫기
    } else {
      alert("비밀번호는 4자리여야 합니다.");
    }
  };

  return (
    <>
      <div className="inputter__flex">
        {nums.map((n) => (
          <button
            className="num-button__flex spread-effect fantasy-font__2_3rem"
            value={n}
            onClick={() => shuffleNums(n)}
            key={n}
          >
            {n}
          </button>
        ))}
        <button
          className="num-button__flex spread-effect"
          onClick={erasePasswordAll}
        >
          X
        </button>
        <button
          className="num-button__flex spread-effect"
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
