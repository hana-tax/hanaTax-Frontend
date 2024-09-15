import create from "zustand";

const useYearEndStore = create((set) => ({
  cardDeductionAmount: 0,
  traditionalMarketDeduction: 0,
  busTrafficDeduction: 0,
  cultureDeduction: 0,
  personDeduction: 0,
  setPersonDeductionAmount: (amount) =>
    set(() => ({ personDeduction: amount })),
  setCardDeductionAmount: (amount) =>
    set(() => ({ cardDeductionAmount: amount })),
  setTraditionalMarketDeduction: (amount) =>
    set(() => ({ traditionalMarketDeduction: amount })),
  setBusTrafficDeduction: (amount) =>
    set(() => ({ busTrafficDeduction: amount })),
  setCultureDeduction: (amount) => set(() => ({ cultureDeduction: amount })),
  houseDeductionAmount: 0,
  setHouseDeductionAmount: (amount) =>
    set(() => ({ houseDeductionAmount: amount })),
  monthlyHouseDeductionAmount: 0,
  setMonthlyHouseDeductionAmount: (amount) =>
    set(() => ({ monthlyHouseDeductionAmount: amount })),
  businessDeduction: 0,
  setBusinessDeduction: (amount) => set(() => ({ businessDeduction: amount })),

  insuranceDeduction: 0,
  setInsuranceDeduction: (amount) =>
    set(() => ({ insuranceDeduction: amount })),
}));

export default useYearEndStore;
