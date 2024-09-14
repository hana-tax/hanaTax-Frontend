import create from "zustand";

const useCardStore = create((set) => ({
  creditCards: [], // 신용카드 목록
  debitCards: [], // 체크카드 목록
  directCards: [], //직불카드 목록
  prepaidCards: [], //선불카드 목록

  // 신용카드 추가
  addCreditCard: (card) =>
    set((state) => ({
      creditCards: [...state.creditCards, card],
    })),

  // 체크카드 추가
  addDebitCard: (card) =>
    set((state) => ({
      debitCards: [...state.debitCards, card],
    })),

  addDirectCard: (card) =>
    set((state) => ({
      directCards: [...state.directCards, card],
    })),

  addPrePaidCard: (card) =>
    set((state) => ({
      prepaidCards: [...state.prepaidCards, card],
    })),
}));

export default useCardStore;
