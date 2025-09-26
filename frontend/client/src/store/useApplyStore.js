import { create } from "zustand";
import { api } from "../lib/utils";

export const useApplyStore = create((set) => ({
  isLoading: false,
  apply: {},
  myApply: {},

  setApplying: async (stageId, data) => {
    console.log("log de data", data);
    set({ isLoading: true });
    try {
      const res = await api.post(`/apply/${stageId}/apply`, data);
      console.log("log de res.data in setApplying: ", res.data);
      // stocker la candidature si besoin
      //   if (res.data?.application) set({ apply: res.data.application });
      //   return res.data;
    } catch (error) {
      console.error("Erreur lors de la création de la candidature: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getMyApply: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/apply/me");
      console.log("log de res.data in getApply: ", res.data);
      set({ myApply: res.data.applications });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de vos candidatures: ",
        error
      );
    } finally {
      set({ isLoading: false });
    }
  },

  deleteApply: async (stageId) => {
    set({ isLoading: true });
    try {
      const res = await api.delete(`/apply/delete/${stageId}`);
      console.log("log de res.data in deleteApply: ", res.data);
      // Mettre à jour l'état myApply après la suppression
      set((state) => ({
        myApply: state.myApply.filter((apply) => apply.id !== stageId),
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression de la candidature: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateApplyStatus: async (applyId, status) => {
    set({ isLoading: true });
    try {
      const res = await api.put(`/apply/${applyId}/status`, { status });
      // <-- tu dois envoyer un objet { status: "..."} et pas juste une string
      console.log("log de res.data in updateApplyStatus: ", res.data);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de la candidature: ",
        error
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));
