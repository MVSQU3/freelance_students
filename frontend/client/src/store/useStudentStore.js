import { create } from "zustand";
import { api } from "../lib/utils";

export const useStudentStore = create((set) => ({
  students: [],
  idGetAllStudents: false,
  isProfileStudentLoading: false,

  getAllStudents: async () => {
    set({ idGetAllStudents: true });
    try {
      const res = await api.get("/students");
      console.log(res.data);
    } catch (error) {
      console.error("Error in getAllStudents students:", error);
    } finally {
      set({ idGetAllStudents: false });
    }
  },

  getProfileStudent: async (id) => {
    set({ isProfileStudentLoading: true });
    try {
      const res = await api.get(`/students/${id}`);
      console.log("log de res.data in getProfileStudent:", res.data);
    } catch (error) {
      console.error("Error in getProfileStudent", error);
    } finally {
      set({ isProfileStudentLoading: false });
    }
  },

  getDashboardStudent: async () => {
    try {
      const res = await api.get("/auth/me");
      console.log("log de res.data in getDashboardStudent:", res.data);
    } catch (error) {
      console.error("Error in getDashboardStudent: ", error);
    }
  },
}));
