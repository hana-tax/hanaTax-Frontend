import React from "react";

function ChatMessage({ message, bot }) {
  const chatMessageStyle = {
    maxWidth: "85%",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    borderRadius: bot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
    fontSize: "13px",
    lineHeight: "1.3rem",
    wordBreak: "keep-all",
    backgroundColor: bot ? "#f2f2f2" : "#5c82ff",
    color: bot ? "#3d4f6e" : "#ffffff",
    padding: bot ? "0.5rem 1.0rem" : "0.6rem 1.0rem",
    fontWeight: bot ? "500" : "400",
  };

  return <div style={chatMessageStyle}>{message}</div>;
}

export default ChatMessage;
