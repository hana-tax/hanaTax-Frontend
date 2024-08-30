import React from "react";
import "../../assets/css/Footer.css"; // 스타일을 위한 CSS 파일을 임포트합니다.

const Footer = () => {
  const goTopBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="top">
          <nav className="menu">
            <a href="/hmpg/csct/secuCenr/ptctPlcy/procsPlcy/ctnt.do">
              <strong>개인정보처리방침</strong>
            </a>
            <a href="/hmpg/csct/secuCenr/ptctPlcy/crifPrusPbnf.do">
              <strong>신용정보활용체제</strong>
            </a>
            <a href="/hmpg/csct/secuCenr/ptctPlcy/csfiHandPlcy.do">
              고객정보취급방침
            </a>
            <a href="/hmpg/csct/pbnf/useMnul.do">상품공시실</a>
            <a href="/hmpg/prdGdnc/prdGuide/mndpGuide/prdRgsbk.do">
              보호금융상품등록부
            </a>
            <a href="/hmpg/csct/cstCnsl/cstSond/cvpl.do">전자민원접수</a>
          </nav>
        </div>

        <div>
          <div className="copyright">
            <h2 className="logo">
              <img src="/hmpg/images/res/layout/foot/logo.png" alt="하나택스" />
            </h2>
            <p className="lg">
              고객센터 2002-1110
              <span className="xs-block">평일 09~18시 (은행 휴무일 제외)</span>
            </p>
            <p>
              <span className="xs-block">사업자번호 : 616-81-00615</span>
              <span className="xs-block">서울특별시 중구 을지로 66</span>
            </p>
            <p>Copyright ⓒ 2022 HANA FINANCIAL GROUP. All rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
