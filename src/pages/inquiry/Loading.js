// Loading.js
import React, { useEffect, useState } from "react";
import "../../assets/css/Loading.css";

const Loading = () => {
  const [percentage, setPercentage] = useState(0);
  const numberOfWaves = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="waves-container">
        {Array.from({ length: numberOfWaves }).map((_, index) => (
          <div key={index} className={`wave wave-${index + 1}`}></div>
        ))}
      </div>
      <div className="overlay">
        <p>{percentage}%</p>
      </div>
      <div className="loading-text">
        <p>
          조회 중입니다.<br></br>잠시만 기다려주세요..
        </p>
      </div>
    </div>
  );
};

export default Loading;
