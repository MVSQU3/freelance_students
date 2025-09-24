import { create } from "zustand";
import { api } from "../lib/utils";

export const useCompanyStore = create((set) => ({
  myProfile: {},
  isCompanyLoading: false,

  getMyProfile: async () => {
    set({ isCompanyLoading: true });
    try {
      const res = await api.get("/company/me/profile");
      console.log("log de res.data dans getMyProfile: ", res.data);
      set({ myProfile: res.data.profile });
      return res.data.profile;
    } catch (error) {
      console.error("Error in getMyProfile:", error);
    } finally {
      set({ isCompanyLoading: false });
    }
  },

  getCompanyById: async (id) => {
    set({ isCompanyLoading: true });
    try {
      const res = await api.get(`/company/public/profile/${id}`);
      console.log("log de res.data in getCompanyById:", res.data);
      set({ myProfile: res.data });
    } catch (error) {
      console.error("Error in getCompanyById:", error);
    } finally {
      set({ isCompanyLoading: false });
    }
  },

  updateMyProfile: async (data) => {
    set({ isCompanyLoading: true });
    try {
      const res = await api.put("/company/update/profile", data);
      set({ myProfile: res.data.profile });
      console.log("log de res.data dans updateMyProfile: ", res.data);
    } catch (error) {
      console.error("Error in updateMyProfile:", error);
    } finally {
      set({ isCompanyLoading: false });
    }
  },
}));
