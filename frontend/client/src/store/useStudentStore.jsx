import { create } from "zustand";
import { api } from "../lib/utils";

export const useStudentStore = create((set) => ({
  students: [],

  getAllStudents: async () => {
    try {
      const res = await api.get("/students");
      console.log(res.data);
    } catch (error) {
      console.error("Error in getAllStudents students:", error);
    }
  },
}));
