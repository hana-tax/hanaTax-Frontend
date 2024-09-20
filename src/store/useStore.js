import create from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setUserInfo: (userInfo) =>
    set((state) => ({ user: { ...state.user, ...userInfo } })),
}));

export default useStore;
