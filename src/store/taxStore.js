import create from "zustand";

const useTaxStore = create((set) => ({
  totalIncome: 0, //총 급여액
  taxableIncome: 0, //과세표준
  taxAmount: 0, //산출세액
  wageIncomeDeduction: 0, //근로소득공제액
  totalTaxDeduction: 0, //총 세금공제액
  finalizedTaxAmount: 0, //총 결정세액
  estimatedTaxAmount: 0, //차감징수납부(환급) 예상세액
  taxPaidValue: 0,

  setTaxData: (data) => set(() => ({ ...data })),
}));

export default useTaxStore;
