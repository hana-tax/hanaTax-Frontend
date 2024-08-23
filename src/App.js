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
          <Route path="/productlist/product" element={<ProductDetails />} />
          <Route path="/isa/product" element={<IsaProductDetails />} />
          <Route path="/pension/product" element={<PensionProductDetails />} />
          <Route path="/isa/product/investPoint1" element={<InvestPoint1 />} />
          <Route path="/isa/product/investPoint2" element={<InvestPoint2 />} />
          <Route path="/isa/product/investPoint3" element={<InvestPoint3 />} />
          <Route path="/isa/product/join" element={<IsaJoin />} />
          <Route path="/isa/product/join2" element={<IsaJoin2 />} />
          <Route path="/isa/product/join3" element={<IsaJoin3 />} />
          <Route path="/isa/product/join4" element={<IsaJoin4 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
