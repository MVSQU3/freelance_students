import { api } from "../lib/utils";
import { create } from "zustand";

export const useUploadStore = create((set) => ({
  uploadProgress: 0,
  lastUploadError: null,

  uploadCv: async (cv) => {
    set({ uploadProgress: 0, lastUploadError: null });

    const formData = new FormData();
    formData.append("cv", cv);
    try {
      const res = await api.post("/upload/cv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ProgressEvent) => {
          const percent = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total
          );
          set({ uploadProgress: percent });
        },
      });
      console.log("res.data in uploadCv:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error uploading CV:", error);
      throw error;
    }
  },

  uploadPp: async (pp) => {
    set({ uploadProgress: 0, lastUploadError: null });

    const formData = new FormData();
    formData.append("pp", pp);
    try {
      const res = await api.post("/upload/pp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ProgressEvent) => {
          const percent = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total
          );
          set({ uploadProgress: percent });
        },
      });
      console.log("res.data in uploadCv:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error uploading CV:", error);
      throw error;
    }
  },
}));
