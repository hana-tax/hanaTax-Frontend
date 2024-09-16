import create from "zustand";

const useFinancialIncomeStore = create((set) => ({
  financialIncomeId: null,
  setFinancialIncomeId: (id) => set({ financialIncomeId: id }),
}));

export default useFinancialIncomeStore;
