import "./App.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import LoginForm from "./pages/Login/LoginForm";
import Signup from "./pages/Signup/Signup";
import Signup2 from "./pages/Signup/Signup2";
import AllofYearEnd from "./pages/Allof/allofYearEnd";
import InquiryYearEnd from "./pages/inquiry/InquiryYearEnd";
import ResultYearEnd from "./pages/inquiry/result/ResultYearEnd";
import RefundDetailsYearEnd from "./pages/inquiry/RefundDetailsYearEnd";
import SolutionYearEnd from "./pages/solution/SolutionYearEnd";
import DeductionResultYearEnd from "./pages/inquiry/result/DeductionResultYearEnd";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/allofYearEnd" element={<AllofYearEnd />} />
          <Route path="/inquiryYearEnd" element={<InquiryYearEnd />} />
          <Route path="/inquiryYearEnd/result" element={<ResultYearEnd />} />
          <Route
            path="/yearend/refundDetails"
            element={<RefundDetailsYearEnd />}
          />
          <Route path="/yearend/solution" element={<SolutionYearEnd />} />
          <Route
            path="/yearend/solution/result"
            element={<DeductionResultYearEnd />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
