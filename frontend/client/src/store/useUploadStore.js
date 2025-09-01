import { create } from "zustand";
import { api } from "../lib/utils";

export const useUploadStore = create((set) => ({
  uploadProgress: 0,
  isUploading: false,
  uploadedFileUrl: null,
  error: null,

  uploadFile: async (cv) => {
    try {
      set({ isUploading: true, uploadProgress: 0, error: null });

      const formData = new FormData();
      formData.append("cv", cv);

      // Appel à ton backend (exemple: /api/upload)
      const res = await api.post("/upload/cv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          set({ uploadProgress: progress });
        },
      });

      set({
        uploadedFileUrl: res.data.fileUrl, // ton backend doit renvoyer l’URL
        isUploading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Erreur upload",
        isUploading: false,
      });
      console.error("Upload error:", err);
    }
  },

  reset: () =>
    set({
      uploadProgress: 0,
      isUploading: false,
      uploadedFileUrl: null,
      error: null,
    }),
}));
