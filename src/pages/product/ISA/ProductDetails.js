import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/Product.css";
import "react-custom-alert/dist/index.css";
import { ReactComponent as Char } from "../../../assets/svg/절세상품/pig-coin.svg";
import { ReactComponent as Isa1 } from "../../../assets/svg/절세상품/isa1.svg";
import { ReactComponent as Isa2 } from "../../../assets/svg/절세상품/isa2.svg";
import { ReactComponent as Isa3 } from "../../../assets/svg/절세상품/isa3.svg";
import { ReactComponent as Interest } from "../../../assets/svg/금리.svg";
import { ReactComponent as Product } from "../../../assets/svg/상품안내.svg";
import { ReactComponent as Agree } from "../../../assets/svg/약관동의.svg";
import { ReactComponent as Notice } from "../../../assets/svg/유의사항.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as Info } from "../../../assets/svg/Info.svg";
import { motion } from "framer-motion";

import useStore from "../../../store/useStore";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-custom-alert";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const investmentPoints = [
  {
    title: "일반 투자보다 유리한 세제혜택",
    description: "2단계 세제혜택 <br/> 손익통산&비과세 + 분리과세",
    icon: Isa1,
    path: "/isa/product/investPoint1",
  },
  {
    title: "자유로운 상품교체",
    description: "세제혜택 유지하며 <br/>자유로운 상품교체",
    icon: Isa2,
    path: "/isa/product/investPoint2",
  },
  {
    title: "기존보다 개선된 가입요건",
    description: "폭 넓은 가입자격 및 <br/>한도, 편입상품 등",
    icon: Isa3,
    path: "/isa/product/investPoint3",
  },
];

const ProductDetails = () => {
  const [amount, setAmount] = useState("100만원");
  const [duration, setDuration] = useState("3년");
  const [riskLevel, setRiskLevel] = useState("중위험");
  const [type, setType] = useState("밸런스형");

  const { isLoggedIn } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvestSimulationModalOpen, setIsInvestSimulationModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const openInvestSimulationModal = () => {
    const monthlyInvestment = parseInt(amount.replace("만원", "")) * 10000;
    const years = duration === "6개월" ? 0.5 : duration === "1년" ? 1 : 3;

    // 위험도와 타입에 따른 수익률 설정
    const riskAndReturnRates = {
      최저위험: { default: [0.0144, 0.0283, 0.063] },
      저위험: {
        밸런스형: [0.0306, 0.0384, 0.0551],
        포커스형: [0.0308, 0.041, 0.0587],
      },
      중위험: {
        밸런스형: [0.0598, 0.041, 0.0931],
        포커스형: [0.0527, 0.0805, 0.0931],
      },
      고위험: {
        밸런스형: [0.067, 0.0982, null],
        포커스형: [0.0745, 0.1355, null],
      },
      최고위험: { 밸런스형: [0.0679, null, null] },
    };

    let returnRate = 0;
    if (riskLevel === "최저위험") {
      returnRate =
        riskAndReturnRates["최저위험"]["default"][
          years === 0.5 ? 0 : years === 1 ? 1 : 2
        ];
    } else {
      returnRate =
        riskAndReturnRates[riskLevel][type][
          years === 0.5 ? 0 : years === 1 ? 1 : 2
        ];
    }

    const totalInvestment = monthlyInvestment * 12 * years;
    const totalReturn = totalInvestment * (1 + returnRate);

    // 세제혜택 3년 선택 시만 적용
    const taxExemption = years === 3 ? 2000000 : 0;

    // 세액 계산 (일임형 ISA)
    const taxableAmountISA = totalReturn - totalInvestment - taxExemption;
    const netTaxRate = 0.099; // 세후 수익금 세율 (9.9%)
    const taxAmountISA =
      taxableAmountISA > 0 ? Math.floor(taxableAmountISA * netTaxRate) : 0;

    // 세후 수익금 계산 (일임형 ISA)
    const netReturnISA = totalReturn - totalInvestment - taxAmountISA;

    // 일반과세의 세후 수익금 계산
    const taxRate = 0.154; // 일반과세 세율 (15.4%)
    const taxableAmountGeneral = totalReturn - totalInvestment;
    const taxAmountGeneral =
      taxableAmountGeneral > 0 ? Math.floor(taxableAmountGeneral * taxRate) : 0;

    // 세후 수익금 계산 (일반과세)
    const netReturnGeneral = totalReturn - totalInvestment - taxAmountGeneral;

    // 적금 수익금 계산 (연 2.75% 금리 기준)
    const savingsRate = 0.0275; // 연 2.75% 금리
    const totalSavingsReturn = totalInvestment * (1 + savingsRate * years);

    const investmentResults = [
      {
        label: "투자원금",
        amount: totalInvestment.toLocaleString(),
        color: "#CFE8ED",
      },
      {
        label: "일임형 ISA 계좌에 투자했다면",
        amount: totalReturn.toLocaleString(),
        color: "#007A7D",
      },
      {
        label: "적금에 투자했다면 <br/>(연 2.7% 금리 기준)",
        amount: totalSavingsReturn.toLocaleString(),
        color: "#64C19C",
      },
    ];

    // 투자 데이터 설정
    setInvestmentData(investmentResults);

    // 차트 데이터 설정
    setChartData({
      labels: ["일임형 ISA", "일반과세"],
      datasets: [
        {
          label: "수익금",
          data: [netReturnISA, netReturnGeneral],
          backgroundColor: ["#53D6BE", "#D9D9D9"],
        },
      ],
    });

    setIsInvestSimulationModalOpen(true);
  };

  const [investmentData, setInvestmentData] = useState([]);
  const [chartData, setChartData] = useState({});

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/investAnalysis", { state: { accountType: "ISA" } });
  };

  const closeInvestSimulationModal = () => {
    setIsInvestSimulationModalOpen(false);
  };

  // 각 항목의 펼침 상태를 관리하는 상태
  const [openSections, setOpenSections] = useState({
    savings: true,
    goalSetting: false,
    accountManagement: false,
    tips: false,
  });

  // 항목 클릭 핸들러
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false, // Hide y-axis values
        },
        grid: {
          display: true, // Display grid lines
        },
      },
      x: {
        grid: {
          display: false, // Hide x-axis grid
          lineWidth: 0.5,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="home-container">
      <div className="box">
        <div className="isa-left-container">
          <h1>
            ISA 상품안내 <br /> 투자와 절세를 한번에!
          </h1>
          <button
            className="isa-inquiry-button"
            onClick={() => {
              if (isLoggedIn) {
                setIsModalOpen(true);
                //navigate("/isa/product/join");
              } else {
                toast.warning("로그인이 필요한 서비스입니다.");
                setTimeout(() => {
                  navigate("/login");
                }, 2000); // 2초 후에 로그인 페이지로 이동
              }
            }}
          >
            가입하기
          </button>
        </div>
        <div className="isa-right-container">
          <Char style={{ marginLeft: "40px", marginTop: "50px" }} />
        </div>
      </div>

      <div className="isa-product-container">
        <div className="isa-product-section">
          <h2>3가지 투자 포인트</h2>
          <div className="investment-points">
            {investmentPoints.map((point, index) => (
              <div
                key={index}
                className="investment-card"
                onClick={() => handleCardClick(point.path)}
              >
                <div className="investment-icon">
                  <point.icon className="invest-icon-svg" />
                </div>
                <div className="investment-info">
                  <h3>{point.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: point.description }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="investment-form">
        <div className="investment-inputs">
          <div className="investment-title">
            매월{" "}
            <select
              className="dropdown"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            >
              <option value="50만원">50만원</option>
              <option value="100만원">100만원</option>
              <option value="200만원">200만원</option>
            </select>{" "}
            씩{" "}
            <select
              className="dropdown"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="6개월">6개월</option>
              <option value="1년">1년</option>
              <option value="3년">3년</option>
            </select>{" "}
            전에 투자
          </div>
          <div className="risk-section">
            <span className="section-label">위험도</span>
            <div className="risk-options">
              {["최저위험", "저위험", "중위험", "고위험", "최고위험"].map(
                (risk) => (
                  <button
                    key={risk}
                    className={`risk-btn ${riskLevel === risk ? "active" : ""}`}
                    onClick={() => setRiskLevel(risk)}
                  >
                    {risk}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="type-section">
            <span className="section-label">
              종류
              <Info className="info-isa" />
            </span>
            <div className="type-options">
              {["밸런스형", "포커스형"].map((t) => (
                <button
                  key={t}
                  className={`type-btn ${type === t ? "active" : ""}`}
                  onClick={() => setType(t)}
                  disabled={riskLevel === "최저위험"} // 최저위험 선택 시 비활성화
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button className="submit-btn" onClick={openInvestSimulationModal}>
            투자 시뮬레이션 확인
          </button>
          <Modal
            isOpen={isInvestSimulationModalOpen}
            onRequestClose={closeInvestSimulationModal}
            contentLabel="투자 시뮬레이션 모달"
            className="invest-simulation-modal"
            overlayClassName="overlay-modal"
            style={{ width: "500px", maxHeight: "80vh", overflowY: "auto" }}
          >
            <div className="invest-simulation-box">
              <h2>투자 시뮬레이션 결과</h2>
              <div className="invest-simulation-result-box">
                <div className="dashed-line"></div>
                {investmentData.map((item, index) => {
                  const maxAmount = Math.max(
                    ...investmentData.map((data) =>
                      parseInt(data.amount.replace(/,/g, ""))
                    )
                  );
                  const barWidth =
                    (parseInt(item.amount.replace(/,/g, "")) / maxAmount) * 100;

                  return (
                    <div key={index} className="simulation-row">
                      <div className="label-section">
                        <span
                          className={`label ${index === 0 ? "highlight" : ""}`}
                          dangerouslySetInnerHTML={{ __html: item.label }}
                        />
                        <span
                          className={`amount ${index === 0 ? "highlight" : ""}`}
                        >
                          {item.amount} 원
                        </span>
                        {item.percentage && (
                          <span
                            className="percentage"
                            style={{ color: "#FF1010" }}
                          >
                            {item.percentage}
                          </span>
                        )}
                      </div>

                      <div className="bar-section">
                        <div className="invest-circle"></div>
                        <div
                          className="bar"
                          style={{
                            backgroundColor: item.color || "#53D6BE",
                            width: `${barWidth}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                <div className="tax-info">(세전기준)</div>
              </div>
              <br /> <br />
              <h2>세후 수익금 (절세효과)</h2>
              <div className="tax-effect-box">
                <div className="chart-container">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="instructions">
                <p>
                  이용안내
                  <br />
                </p>
                <span>
                  • 위 수익률은 수수료가 차감된 공시수익률로, 매월 말일에 동일
                  금액 투자를 가정하여 계산되었습니다. <br />
                  <br />
                  • 세후 수익금은 일임형 ISA 3년 이상 보유 시 예상 수익금에서
                  비과세한도(200만원) 차감 후 계산되었습니다.
                  <br />
                  <br />• ISA 과세: 비과세 한도 200만원(일반형)/400만원(서민형,
                  농어민형), 한도 초과 수익금의 경우 9.9% 분리과세 적용
                  (지방소득세 포함)
                  <br />
                  <br />• 정기적금 과세: 15.4% 원청징수 후 종합과세 적용
                </span>
              </div>
            </div>

            <div className="btns" style={{ marginTop: "20px" }}>
              <button
                className="modal-confirm-btn"
                style={{ padding: "10px 80px" }}
                onClick={closeInvestSimulationModal}
              >
                확인
              </button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="product-info-container">
        <h1>ISA</h1>
        <div className="underline" style={{ backgroundColor: "#000" }}></div>
        {[
          { id: "savings", label: "상품안내", svg: Product },
          { id: "goalSetting", label: "상품유형 비교", svg: Interest },
          {
            id: "accountManagement",
            label: "유의사항",
            svg: Notice,
            content:
              "• 이 개인종합자산관리계좌(ISA)는 예금자보호법에 따라 예금보호 대상으로 운용되는 금융상품에 한하여 1인당 “5천만원까지”(운용되는 금융상품 판매회사별 보호상품 합산) 보호됩니다. <br/><br/> • 개인종합자산관리계좌(ISA)에 편입된 운용상품 중 금융투자상품은 원금의 전부 또는 일부 손실이 발생할 수 있습니다.<br/><br/> • 계약전 충분한 설명을 들은 후 신중하게 투자결정을 하여야 하며, 투자로 인한 손실 발생시 그 책임은 투자자 본인에게 있습니다.<br/><br/> • 투자자의 투자성향에 따라 가입이 제한되는 계약유형이 있을 수 있습니다.<br/><br/> • 농어민 중 농어민형 소득기준을 초과하는 경우 일반형 기준으로 적용됩니다.<br/><br/> • 투자자의 이해를 돕기위해 제공된 모든 과거운용 성과자료 또는 모의운용 성과자료가 미래성과를 보장하지 않습니다.<br/><br/> • 레버리지 ETF, 인버스 ETF 등과 같은 파생상품 ETF는 복리효과 등에 따라 추구하는 투자목표(기초지수 수익률의 2배 등)를 달성하지 못 할 수 있고 변동성이 큰 시장상황에서는 단기에 큰 손실이 발생할 수 있습니다.<br/><br/> • 파생결합증권을 편입하는 상품의 경우 개인종합자산관리계좌(ISA)의 만기와 파생결합증권의 만기가 일치하지 않을 수 있으며 이 때 중도상환 시 손실이 발생할 수 있습니다.<br/><br/> • 원래 비과세 되는 손익(집합투자증권 국내주식 매매평가 차익 등)은 비과세·분리과세 및 손익통산 대상에서 제외됩니다.<br/><br/> • 부득이한 사유(특별해지) 또는 3년 경과 후 해지 시 세제혜택을 받을 수 있습니다.<br/><br/> • 만기시 실현된 이익에 대해서만 정산하여 손익통산 및 세제혜택이 부여됩니다. (계약만기와 금융상품의 만기가 불일치 할 경우 환매·매각되지 않은 금융상품에 대해서는 세제혜택 적용 제외)<br/><br/> • 계약서 및 모델포트폴리오 설명서 등 관련 서류에는 개인종합자산관리계좌(ISA)의 계약체결과 해지, 투자대상, 운용방법 및 수수료 등에 관한 중요한 내용들이 담겨 있습니다. 반드시 숙지하신 후 계약여부를 결정하시기 바랍니다.",
          },
          { id: "tips", label: "약관 및 상품설명서", svg: Agree },
        ].map((item) => (
          <div key={item.id} className="item">
            <button
              className="item-header"
              onClick={() => toggleSection(item.id)}
            >
              <div className="product-svg-text">
                <item.svg style={{ width: "25px", marginRight: "50px" }} />
                {item.label}
              </div>
              <ArrowDown
                className={openSections[item.id] ? "rotate-icon" : ""}
              />
            </button>
            {openSections[item.id] && (
              <div className="item-content">
                {item.id === "savings" ? (
                  <>
                    <h4>가입자격</h4>
                    <p>
                      • 만 19세 이상인 거주자
                      <br /> • 만 15세 이상~19세 미만인 자로 직전 과세기간에
                      근로소득이 있는 거주자 <br />※ 단, 직전 3개 과세기간 중
                      1회 이상 금융소득종합과세 대상자는 제외 <br />※ 전
                      금융기관 1인 1계좌, 만 19세 이상은 소득이 없어도 가입 가능
                    </p>
                    <h4>가입기간</h4>
                    <p>3년 이상</p>
                    <h4>납입한도</h4>
                    <p>
                      연간 2천만원, 총 1억원(재형저축 또는 소득공제장기펀드
                      가입자는 잔여 한도금액만큼 차감)
                    </p>
                    <h4>투자대상자산</h4>
                    <p>
                      예·적금, RP, 집합투자증권(ETF 포함), 파생결합증권 및
                      파생결합사채 등
                    </p>
                    <h4>세제혜택</h4>
                    <p>
                      • 비과세한도 : 계좌 내 금융상품에서 발생한 이익에서 손실을
                      차감한 순소득에 대해 200만원 또는 400만원 비과세 (가입유형
                      : 일반형 200만원, 서민형과 농어민형 400만원 비과세)
                      <br /> • 분리과세 : 비과세한도 초과 순소득은 9.9% 분리과세
                      (지방소득세 포함)
                      <br /> • 세액공제 : ISA계좌 3년 경과 후 해지대금의 일부
                      또는 전부를 60일 이내에 연금계좌(연금저축, IRP)로 납입시
                      납입액의 10%(최대 300만원 한도)를 세액 공제
                    </p>
                    <h4>중도해지</h4>
                    <p>
                      일반과세 적용 <br />
                      단, 부득이한 사유(특별해지) 또는 3년 경과 후 해지 시
                      세제혜택 적용
                    </p>
                    <h4>중도인출</h4>
                    <p>
                      일반과세 적용 <br />
                      단, 부득이한 사유(특별해지) 또는 3년 경과 후 해지 시
                      세제혜택 적용
                    </p>
                  </>
                ) : item.id === "goalSetting" ? (
                  <>
                    <h4>일임형</h4>
                    <p>
                      은행이 투자자로부터 투자를 일임받아 운용상품 선정·교체
                      <br />
                      투자자의 투자성향에 적합한 모델포트폴리오를 제시
                      (모델포트폴리오의 운용자산은 대부분 펀드임) <br />
                      투자자는 제시된 모델포트폴리오 중 선택 가입 (온라인·영업점
                      가입)
                    </p>
                    <h4>신탁형</h4>
                    <p>
                      투자자가 운용할 개별 금융투자상품들을 직접 선택하여
                      운용지시
                    </p>
                  </>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: item.content }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer floatingTime={5000} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="투자성향 분석 안내 모달"
        className="modal"
        overlayClassName="overlay-modal"
        style={{ width: "300px" }}
      >
        <div className="invest-info-modal">
          <p>
            금융소비자보호법에 따라 손님의{" "}
            <span style={{ color: "#18CD8C", fontSize: "17px" }}>
              투자성향분석이 꼭 필요하며, 분석 결과에 적합한 상품만 조회 및
              가입이 가능합니다.
            </span>
          </p>
          <span style={{ color: "#757575", fontSize: "16px" }}>
            지금 성향분석을 하시겠습니까?
          </span>
        </div>

        <div className="btns" style={{ marginTop: "20px" }}>
          <button
            className="modal-confirm-btn"
            style={{ padding: "10px 80px" }}
            onClick={closeModal}
          >
            확인(투자자 정보 제공)
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
