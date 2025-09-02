import { api } from "../lib/utils";
import { create } from "zustand";

export const useUploadStore = create((set) => ({
  uploadProgress: 0,
  lastUploadError: null,
  
  uploadFile: async (file) => {
    set({ uploadProgress: 0, lastUploadError: null });

    const formData = new FormData();
    formData.append("file", file);
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
}));
