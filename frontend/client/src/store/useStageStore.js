import { create } from "zustand";
import { api } from "../lib/utils";

export const useStageStore = create((set) => ({
  stages: [],
  stage: {},
  lastUploadStages: [],
  isLoading: false,

  getAllStages: async (page) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/stages/?page=${page}`);
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
      console.log("log de res.data in getStageById:", res.data.stage);
      set({ stage: res.data.stage });
      return res.data.stage;
    } catch (error) {
      console.error("Error in getStageById:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getMyStages: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/stages/my-stage");
      set({
        stages: res.data.stages,
        lastUploadStages: res.data.lastUploadedStages,
      });
      console.log("log de res.data in getMyStages: ", res.data);
    } catch (error) {
      console.error("Error in getMyStages:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getMyStageDetails: async (id) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/stages/my-stage/details/${id}`);
      set({ stage: res.data.stages });
      console.log("log de res.data in getMyStagesDetails: ", res.data);
    } catch (error) {
      console.error("Error in getMyStagesDetails:", error);
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

  lastUploadedStages: async () => {
    try {
      const res = await api.get("/stages/last-uploaded");
      set({ stages: res.data });
      console.log("log de res.data in lastUploadedStages:", res.data);

      return res.data;
    } catch (error) {
      console.error("Error in lastUploadedStages:", error);
    }
  },

  updateStage: async (id, data) => {
    set({ isLoading: true });
    try {
      const res = await api.put(`/stages/${id}`, data);
      set({ stage: res.data.stage, isLoading: false });
      console.log("log de res.data in updateStage", res.data);
    } catch (error) {
      console.error("Error in lastUploadedStages:", error);
    }
  },

  deleteStage: async (stageId) => {
    set({ isLoading: true });
    try {
      const res = await api.delete(`/stages/${stageId}`);
      console.log("res.data.success", res.data.success);
      return res.data.success;
    } catch (error) {
      console.error("Error in deleteStage:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
