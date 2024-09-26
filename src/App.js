import "./App.css";
import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login/Login";
import LoginForm from "./pages/Login/LoginForm";
import Signup from "./pages/Signup/Signup";
import Signup2 from "./pages/Signup/Signup2";
import AllofYearEnd from "./pages/Allof/allofYearEnd";
import AllofFinancialIncome from "./pages/Allof/allofFinancialIncome";
import InquiryYearEnd from "./pages/inquiry/InquiryYearEnd";
import ResultYearEnd from "./pages/inquiry/result/ResultYearEnd";
import RefundDetailsYearEnd from "./pages/inquiry/RefundDetailsYearEnd";
import RefundDetailsFinancialIncome from "./pages/inquiry/RefundDetailsFinancialIncome";
import SolutionYearEnd from "./pages/solution/SolutionYearEnd";
import DeductionResultYearEnd from "./pages/inquiry/result/DeductionResultYearEnd";
import InquiryFinancialIncome from "./pages/inquiry/InquiryFinancialIncome";
import ResultFinancialIncome from "./pages/inquiry/result/ResultFinancialIncome";
import SolutionFinancialIncome from "./pages/solution/SolutionFinancialIncome";
import MyReport from "./pages/Report/MyReport";
import ProductList from "./pages/product/예적금/ProductList";
import ProductDetails from "./pages/product/예적금/ProductDetails";
import IsaProductDetails from "./pages/product/ISA/ProductDetails";
import InvestPoint1 from "./pages/product/ISA/InvestPoint1";
import InvestPoint2 from "./pages/product/ISA/InvestPoint2";
import InvestPoint3 from "./pages/product/ISA/InvestPoint3";
import PensionProductDetails from "./pages/product/연금저축/ProductDetails";
import IsaJoin from "./pages/product/ISA/JoinProduct";
import IsaJoin2 from "./pages/product/ISA/JoinProduct2";
import IsaJoin3 from "./pages/product/ISA/JoinProduct3";
import IsaJoin4 from "./pages/product/ISA/JoinProduct4";
import DepositJoin from "./pages/product/예적금/JoinProduct";
import DepositJoin2 from "./pages/product/예적금/JoinProduct2";
import PensionJoin from "./pages/product/연금저축/JoinProduct";
import PensionJoin2 from "./pages/product/연금저축/JoinProduct2";
import PensionJoin3 from "./pages/product/연금저축/JoinProduct3";
import KakaoRedirectPage from "./pages/Login/kakao/KakaoRedirectPage";
import NaverRedirectPage from "./pages/Login/naver/NaverRedirectPage";
import MyData1 from "./pages/myData/MyData1";
import MyData2 from "./pages/myData/MyData2";
import MyData3 from "./pages/myData/MyData3";
import MyPage from "./pages/myPage/myPage";
import InvestAnalysis from "./pages/product/투자성향분석/InvestAnalysis";
import MyAccount from "./pages/myPage/myAccount";

import Chatbot from "react-chatbot-kit";
import config from "./pages/bot/config";
import ActionProvider from "./pages/bot/ActionProvider";
import MessageParser from "./pages/bot/MessageParser";
import "react-chatbot-kit/build/main.css";
import "./assets/css/Chatbot.css";
import "remixicon/fonts/remixicon.css";
import { ReactComponent as Talks } from "./assets/svg/talks.svg";
function App() {
  const [showChat, setShowChat] = useState(false);

  const handleNext = () => {
    setShowChat(true);
  };

  const handleCloseChatbot = () => {
    setShowChat(false); // Close the chatbot
  };

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route
            path="/oauth/redirected/kakao"
            element={<KakaoRedirectPage />}
          />
          <Route
            path="/oauth/redirected/naver"
            element={<NaverRedirectPage />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/allofYearEnd" element={<AllofYearEnd />} />
          <Route
            path="/allofFinancialIncome"
            element={<AllofFinancialIncome />}
          />

          <Route path="/inquiryYearEnd" element={<InquiryYearEnd />} />
          <Route
            path="/inquiryFinancialIncome"
            element={<InquiryFinancialIncome />}
          />
          <Route path="/inquiryYearEnd/result" element={<ResultYearEnd />} />
          <Route
            path="/inquiryFinancialIncome/result"
            element={<ResultFinancialIncome />}
          />
          <Route
            path="/yearend/refundDetails"
            element={<RefundDetailsYearEnd />}
          />
          <Route
            path="/financialIncome/refundDetails"
            element={<RefundDetailsFinancialIncome />}
          />
          <Route path="/yearend/solution" element={<SolutionYearEnd />} />
          <Route
            path="/financialIncome/solution"
            element={<SolutionFinancialIncome />}
          />
          <Route
            path="/yearend/solution/result"
            element={<DeductionResultYearEnd />}
          />
          <Route path="/financialIncome/myReport" element={<MyReport />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/productlist/product/:id" element={<ProductDetails />} />
          <Route path="/isa/product" element={<IsaProductDetails />} />
          <Route path="/pension/product" element={<PensionProductDetails />} />
          <Route path="/isa/product/investPoint1" element={<InvestPoint1 />} />
          <Route path="/isa/product/investPoint2" element={<InvestPoint2 />} />
          <Route path="/isa/product/investPoint3" element={<InvestPoint3 />} />
          <Route path="/isa/product/join" element={<IsaJoin />} />
          <Route path="/isa/product/join2" element={<IsaJoin2 />} />
          <Route path="/isa/product/join3" element={<IsaJoin3 />} />
          <Route path="/isa/product/join4" element={<IsaJoin4 />} />
          <Route path="/investAnalysis" element={<InvestAnalysis />} />
          <Route path="/pension/product/join" element={<PensionJoin />} />
          <Route path="/pension/product/join2" element={<PensionJoin2 />} />
          <Route path="/pension/product/join3" element={<PensionJoin3 />} />
          <Route path="/deposit/product/join" element={<DepositJoin />} />
          <Route path="/deposit/product/join2" element={<DepositJoin2 />} />
          <Route path="/myData1" element={<MyData1 />} />
          <Route path="/myData2" element={<MyData2 />} />
          <Route path="/myData3" element={<MyData3 />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/myAccount" element={<MyAccount />} />
        </Routes>
        <div className="App">
          {!showChat && (
            <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: "55px",
                  left: "-75px",
                  background:
                    "linear-gradient(90deg, rgba(157, 92, 255, 1) 0%, rgba(92, 130, 255, 1) 100%)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  whiteSpace: "nowrap",
                }}
              >
                톡스에게 질문하세요!
                <div
                  style={{
                    position: "absolute",
                    bottom: "-7px",
                    right: "20px",
                    width: "0",
                    height: "0",
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "8px solid #697bff",
                  }}
                ></div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "#ececec",
                  width: "40px",
                  height: "40px",
                  marginRight: "22px",
                }}
                onClick={handleNext}
              >
                <Talks
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
          )}

          {showChat && (
            <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(157, 92, 255, 1) 0%, rgba(92, 130, 255, 1) 100%)",
                    color: "white",
                    borderRadius: "20px",
                    padding: "10px 25px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    width: "200px",
                    opacity: 0,
                    transform: "translateX(100%)",
                    animation: "slideIn 0.3s forwards",
                  }}
                >
                  <i className="ri-close-line" onClick={handleCloseChatbot} />
                  <span style={{ marginLeft: "15px" }}>
                    무엇을 도와드릴까요?
                  </span>
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: "#ececec",
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    right: "25px",
                  }}
                  onClick={handleNext}
                >
                  <Talks
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <style jsx="true">{`
            @keyframes slideIn {
              0% {
                transform: translateX(100%); /* Start off-screen to the right */
                opacity: 0;
              }
              100% {
                transform: translateX(0); /* End at the original position */
                opacity: 1;
              }
            }
          `}</style>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
