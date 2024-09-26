import React from "react";

function ChatbotHeader() {
  const headerStyle = {
    background:
      "linear-gradient(90deg, rgba(157, 92, 255, 1) 0%, rgba(92, 130, 255, 1) 100%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 22px",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    color: "#ffffff",
    cursor: "pointer",
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div style={headerStyle}>
      <i
        className="ri-arrow-left-s-line"
        style={iconStyle}
        onClick={handleBack}
      />
      <i className="ri-close-line" style={iconStyle} />
    </div>
  );
}

export default ChatbotHeader;
