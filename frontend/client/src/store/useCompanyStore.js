import { create } from "zustand";
import { api } from "../lib/utils";

export const useCompanyStore = create((set) => ({
  company: null,
  isLoadingCompanyProfile: false,
  
  getCompanyProfile: async (id) => {
    set({ isLoadingCompanyProfile: true });
    try {
      const res = await api.get(`/company/${id}`);
      console.log("log de res.data in getCompanyProfile:", res.data);
      set({ company: res.data });
    } catch (error) {
      console.error("Error in getCompanyProfile:", error);
    } finally {
      set({ isLoadingCompanyProfile: false });
    }
  },
}));
