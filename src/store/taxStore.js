import create from "zustand";

const useTaxStore = create((set) => ({
  totalIncome: 0, //총 급여액
  taxableIncome: 0, //과세표준
  taxAmount: 0, //산출세액
  wageIncomeDeduction: 0, //근로소득공제액
  totalTaxDeduction: 0, //총 세금공제액
  finalizedTaxAmount: 0, //총 결정세액
  estimatedTaxAmount: 0, //차감징수납부(환급) 예상세액
  taxPaidValue: 0, //기납부 세액
  wageIncomeAmount: 0, //근로소득금액

  finalTaxDifference: 0, // 새로운 상태 추가
  setFinalTaxDifference: (value) => set({ finalTaxDifference: value }),

  houseBalance: 0, // 주택청약예금 연납입금
  setHouseBalance: (newBalance) => set({ houseBalance: newBalance }),

  houseLoanBalance: 0, // 전세자금대출 연납입금
  setHouseLoanBalance: (newBalance) => set({ houseLoanBalance: newBalance }),

  pensionSavingBalance: 0, //연금저축계좌 연납입금
  addPensionSavingBalance: (newBalance) =>
    set({ pensionSavingBalance: newBalance }),

  setTaxData: (data) => set(() => ({ ...data })),
}));

export default useTaxStore;
