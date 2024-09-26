import create from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setUserInfo: (userInfo) =>
    set((state) => ({ user: { ...state.user, ...userInfo } })),
  lastLoginTime: "", // 최근 접속 시간 추가
  setLastLoginTime: (time) => set({ lastLoginTime: time }),
}));

export default useStore;
