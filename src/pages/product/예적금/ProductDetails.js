import React, { useState, useEffect } from "react";
import "../../../assets/css/Product.css"; // 스타일 파일
import { ReactComponent as CoinIcon } from "../../../assets/svg/coin.svg";
import { ReactComponent as AccountIcon } from "../../../assets/svg/절세상품/isa-account.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/arrow-right-white.svg";
import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as Interest } from "../../../assets/svg/금리.svg";
import { ReactComponent as Product } from "../../../assets/svg/상품안내.svg";
import { ReactComponent as Agree } from "../../../assets/svg/약관동의.svg";
import { ReactComponent as Notice } from "../../../assets/svg/유의사항.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/svg/download.svg";
import { ReactComponent as CheckButton } from "../../../assets/svg/check-button.svg";
import { ReactComponent as CheckedButton } from "../../../assets/svg/checked-button.svg";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../../store/useStore";
import { ToastContainer, toast } from "react-custom-alert";
import axios from "axios";
import Loading from "../Loading";
import { ReactComponent as ProtectProduct } from "../../../assets/svg/예금보호금융상품.svg";
import Modal from "react-modal";
import { ReactComponent as Warning } from "../../../assets/svg/warning.svg";

Modal.setAppElement("#root");

const ProductDetails = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { isLoggedIn } = useStore();
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 ID 가져오기
  console.log(id);
  const [interestRates, setInterestRates] = useState([]);
  const [product, setProduct] = useState(null); // 상품 정보를 저장할 상태
  const [openSections, setOpenSections] = useState({
    savings: true,
    goalSetting: false,
    accountManagement: false,
    tips: false,
  });
  const [isChecked, setIsChecked] = useState(false); // 체크 상태 관리

  const handleCheckButtonClick = () => {
    setIsChecked(!isChecked); // 체크 상태 토글
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    navigate("/deposit/product/join");
  };

  // 상품 정보를 가져오는 함수
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/deposit/${id}`
      );
      if (response.status === 200) {
        setProduct(response.data); // 상품 정보 상태에 저장
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("상품 정보를 불러오는 데 실패했습니다.");
    }
  };

  const fetchInterestRates = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/deposit/interest/${id}`
      );
      const data = await response.json();
      setInterestRates(data);
    } catch (error) {
      console.error("Error fetching interest rates:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchInterestRates(); // 컴포넌트가 마운트될 때 상품 정보 가져오기
  }, [id]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!product) {
    return <Loading />; // 데이터 로딩 중 표시
  }

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const base64ToBlob = (base64, type = "application/pdf") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const downloadFile = (event, fileType) => {
    event.preventDefault();

    const data = fileType === "terms" ? product.terms : product.description;
    const blob = base64ToBlob(data); // Base64 디코딩 후 Blob 생성
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const fileName =
      fileType === "terms"
        ? `${product.depositName}_약관.pdf`
        : `${product.depositName}_상품설명서.pdf`;

    link.href = url;
    link.setAttribute("download", fileName); // 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="product-details-container">
      <div className="product-details-name-container">
        <h1>
          {product.depositName} <br />
          {product.features}입니다.
        </h1>
        <div className="rate-box">
          <div className="rate-info">
            <span className="rate-title">금리(연)</span>
            <span className="rate-value">
              {product.minInterestRate} ~ {product.maxInterestRate} %
            </span>
          </div>
          <div className="divider"></div>
          <div className="rate-info">
            <span className="rate-title">가입기간</span>
            <span className="rate-value">
              {product.minPeriod !== null
                ? `${product.minPeriod} ~ ${product.maxPeriod} 개월`
                : `${product.maxPeriod} 개월`}
            </span>
          </div>
        </div>
        <button
          className="btn-details"
          onClick={() => {
            if (isLoggedIn) {
              openConfirmationModal();
            } else {
              toast.warning("로그인이 필요한 서비스입니다.");
              setTimeout(() => {
                navigate("/login");
              }, 2000); // 2초 후에 로그인 페이지로 이동
            }
          }}
        >
          가입하기
          <ArrowRight className="btn-details-arrow-right" />
        </button>
        <Modal
          isOpen={isConfirmationModalOpen}
          onRequestClose={closeConfirmationModal}
          contentLabel="가입 확인 모달"
          className="modal"
          overlayClassName="overlay-modal"
        >
          <div>
            <span
              style={{
                display: "flex",
                marginLeft: "25px",
                alignItems: "center",
              }}
            >
              <Warning className="warning-icon" />
              상품 가입 안내
            </span>
            <p
              className="modal-confirm-text"
              style={{ fontSize: "15px", marginTop: "10px" }}
            >
              {isChecked ? (
                <CheckedButton
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={handleCheckButtonClick}
                />
              ) : (
                <CheckButton
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={handleCheckButtonClick}
                />
              )}
              상품 가입 전 상품 주요 내용 및 설명 확인 등 위 자료들의 내용을
              충분히 이해하고 확인하였습니다.
            </p>
            <button
              className="modal-confirm-btn"
              onClick={closeConfirmationModal}
              style={{ backgroundColor: isChecked ? "#18CD8C" : "#E3E3E3" }}
            >
              확인
            </button>
          </div>
        </Modal>
        <div className="icon-box">
          {product.depositId === 1 ? (
            <AccountIcon
              style={{ width: "180px", height: "140px", marginTop: "-100px" }}
            />
          ) : product.depositId === 2 ? (
            <CoinIcon
              style={{ width: "180px", height: "140px", marginTop: "-100px" }}
            />
          ) : null}
        </div>
      </div>
      <div className="product-info-container">
        <h1>{product.depositName}</h1>
        <div className="underline" style={{ backgroundColor: "#000" }}></div>
        {[
          {
            id: "savings",
            label: "상품안내",
            svg: Product,
            content: product.description,
          },
          {
            id: "goalSetting",
            label: "금리정보",
            svg: Interest,
            content: (
              <>
                <h4>
                  기본 금리 (최종 업데이트: {new Date().toLocaleDateString()})
                </h4>
                <div className="interest-table-container-box">
                  <table className="interest-table-container">
                    <thead>
                      <tr>
                        <th>기간 (개월)</th>
                        <th>금리 (연율, 세전)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interestRates.map((rate) => (
                        <tr key={rate.interestId}>
                          <td>{rate.duration}개월 이상</td>
                          <td>{rate.interestRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ),
          },
          {
            id: "accountManagement",
            label: "유의사항",
            svg: Notice,
            content: product.notice.replace(/\\n/g, "<br />"),
          },
          {
            id: "tips",
            label: "약관 및 상품설명서",
            svg: Agree,
            content: (
              <>
                <div>
                  <div className="terms-description-container">
                    <div className="terms-box">
                      <div
                        className="terms-download-box"
                        style={{ marginRight: "10px" }}
                      >
                        약관{" "}
                        <DownloadIcon
                          onClick={(event) => downloadFile(event, "terms")}
                        />
                      </div>
                      <div className="terms-download-box">
                        상품설명서{" "}
                        <DownloadIcon
                          onClick={(event) =>
                            downloadFile(event, "description")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="deposit-protect-container">
                    <ProtectProduct style={{ marginRight: "20px" }} />이 예금은
                    예금자보호법에 따라 원금과 소정의 이자를 합하여 1인당
                    "5천만원까지"(본 상호저축은행의 여타 보호상품과
                    합산)보호됩니다.
                  </div>
                </div>
              </>
            ),
          },
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
                    <h4>상품특징</h4>
                    <p>{product.features}</p>
                    <h4>가입대상</h4>
                    <p>{product.target}</p>
                    <h4>가입금액</h4>
                    <p>{product.minJoinAmount.toLocaleString()}원 이상</p>
                    <h4>예적금 종류</h4>
                    <p>
                      {product.depositSort === 1
                        ? "정기예금"
                        : product.depositSort}
                    </p>
                    <h4>세제혜택</h4>
                    <p>{product.taxBenefits}</p>
                  </>
                ) : (
                  <p>
                    {item.id === "accountManagement" ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.content.replace(/\\n/g, "<br />"),
                        }}
                      />
                    ) : (
                      item.content
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <ToastContainer floatingTime={5000} />
    </div>
  );
};

export default ProductDetails;
