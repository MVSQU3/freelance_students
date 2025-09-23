import { create } from "zustand";
import { api } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser: {},
  isCheckingAuth: true,
  isRegisterLoading: false,
  isLoginLoading: false,
  checkAuth: async () => {
    try {
      const res = await api.post("/auth/check");
      set({ authUser: res.data.user });
      console.log("log de res.data in checkAuth", res.data);
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking authentication:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isRegisterLoading: true });
    try {
      const res = await api.post("/auth/register", data);
      set({ authUser: res.data.user });
      console.log("log de res.data in register:", res.data.user);
      return res.data.user;
    } catch (error) {
      console.error("Error during registration:", error);
      return null;
    } finally {
      set({ isRegisterLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoginLoading: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data.user });
      console.log("log de res.data in login:", res.data.user);
      return res.data.user;
    } catch (error) {
      console.error("Error in login:", error);
      return null;
    } finally {
      set({ isLoginLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },
}));
