import create from "zustand";

const productStore = create((set) => ({
  productId: null,
  minInterestRate: null,
  maxInterestRate: null,
  setProductDetails: (id, minRate, maxRate) =>
    set(() => ({
      productId: id,
      minInterestRate: minRate,
      maxInterestRate: maxRate,
    })),
}));

export default productStore;
