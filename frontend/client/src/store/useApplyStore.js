import { create } from "zustand";
import { api } from "../lib/utils";

export const useApplyStore = create((set) => ({
  isApplying: false,
  apply: null,
  myAppy: null,

  setApply: async (stageId, data) => {
    console.log("log de data", data);
    set({ isApplying: true });
    try {
      const res = await api.post(`/apply/${stageId}/apply`, data);
      console.log("log de res.data in setApplying: ", res.data);
      // stocker la candidature si besoin
      //   if (res.data?.application) set({ apply: res.data.application });
      //   return res.data;
    } catch (error) {
      console.error("Erreur lors de la création de la candidature: ", error);
    } finally {
      set({ isApplying: false });
    }
  },

  getApply: async () => {
    set({ isApplying: true });
    try {
      const res = await api.get("/apply/me");
      console.log("log de res.data in getApply: ", res.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de vos candidatures: ",
        error
      );
    } finally {
      set({ isApplying: false });
    }
  },
}));
