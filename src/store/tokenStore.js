import create from "zustand";

const tokenStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  clearToken: () => set({ token: null }),
}));

export default tokenStore;
