import { create } from "zustand";
import { api } from "../lib/utils";

export const useStudentStore = create((set) => ({
  students: [],
  myProfile: null,
  isStudentLoading: false,

  getAllStudents: async () => {
    set({ isStudentLoading: true });
    try {
      const res = await api.get("/students");
      console.log(res.data);
    } catch (error) {
      console.error("Error in getAllStudents students:", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },

  getStudentById: async (id) => {
    set({ isStudentLoading: true });
    try {
      const res = await api.get(`/students/${id}`);
      console.log("log de res.data in PublicProfileStudent:", res.data);
    } catch (error) {
      console.error("Error in PublicProfileStudent", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },

  getMyProfile: async () => {
    set({ isStudentLoading: true });
    try {
      const res = await api.get("/students/me");
      console.log("log de res.data in MyProfile:", res.data);
      // stocke le profil et renvoie les données pour usage côté composant
      set({ myProfile: res.data.profile });
      return res.data.profile;
    } catch (error) {
      console.error("Error in MyProfile", error);
      return null;
    } finally {
      set({ isStudentLoading: false });
    }
  },

  UpdateMyProfile: async (data) => {
    set({ isStudentLoading: true });
    try {
      const res = await api.put("/students/update", data);
      // mettre à jour le profil localement
      set({ myProfile: res.data.profile });
      return res.data.profile;
    } catch (error) {
      console.error("Error in UpdateMyProfile", error);
      return null;
    } finally {
      set({ isStudentLoading: false });
    }
  },

  addSkill: async (skillName) => {
    set({ isStudentLoading: true });
    try {
      const res = await api.post("/students/skills/add", { name: skillName });
      console.log("log de res.data in addSkill:", res.data);
    } catch (error) {
      console.error("Error in addSkill", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },

  removeSkill: async (skillName) => {
    set({ isStudentLoading: true });
    try {
      const res = await api.post("/students/skills/remove", {
        name: skillName,
      });
      console.log("log de res.data in removeSkill:", res.data);
    } catch (error) {
      console.error("Error in removeSkill", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },
}));
