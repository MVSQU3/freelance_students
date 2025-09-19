import { create } from "zustand";
import { api } from "../lib/utils";

export const useStageStore = create((set) => ({
  stages: [],
  stage: null,
  isLoading: false,

  getAllStages: async (page) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/stages/?page=${page}`);
      set({ stages: res.data.stages });
      console.log("log de res.data in getAllStages:", res.data.stages);
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
      console.log("log de res.data in getStageById:", res.data.stage);
    } catch (error) {
      console.error("Error in getStageById:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  searchStages: async (q, location, domain, sort, field) => {
    try {
      const params = new URLSearchParams();

      if (q) params.append("q", q);
      if (location) params.append("location", location);
      if (domain) params.append("domain", domain);
      if (sort) params.append("sort", sort);
      if (field) params.append("field", field);

      const res = await api.get(`/stages/search?${params.toString()}`);
      console.log("log in searchStages:", res.data);
      set({ stages: res.data });
      return res.data;
    } catch (error) {
      console.error("Error in searchStages:", error);
    }
  },
}));
