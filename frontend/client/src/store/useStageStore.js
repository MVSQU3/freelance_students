import { create } from "zustand";
import { api } from "../lib/utils";

export const useStageStore = create((set) => ({
  stages: [],
  stage: null,
  isLoading: false,

  getAllStages: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/stages");
      set({ stages: res.data.stages });
      console.log("log de res.data in getAllStages:", res.data);
    } catch (error) {
      console.error("Error in getAllStages:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getStageById: async (stageId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/stages/${stageId}`);
      set({ stage: res.data.stage });
      console.log("log de res.data in getStageById:", res.data);
    } catch (error) {
      console.error("Error in getStageById:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
