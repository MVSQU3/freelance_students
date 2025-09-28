import { create } from "zustand";
import { api } from "../lib/utils";

export const useStudentStore = create((set) => ({
  students: [],
  myProfile: {},
  skills: {},
  stats: {},
  myPublicProfile: {},
  isLoading: false,

  getAllStudents: async () => {
    set({ isStudentLoading: true });
    try {
      const res = await api.get("/students");
      set({ students: res.data.students });
      console.log("log de students in getAllStudents: ", res.data);
    } catch (error) {
      console.error("Error in getAllStudents students:", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },

  getStudentById: async (id) => {
    set({ isStudentLoading: true });
    try {
      const res = await api.get(`/students/profile/${id}`);
      set({ myPublicProfile: res.data.profile });
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
      const res = await api.get("/students/me/profile");
      console.log("log de res.data in MyProfile:", res.data);
      // stocke le profil et renvoie les données pour usage côté composant
      set({ myProfile: res.data.profile, stats: res.data.stats.candidatureStats });
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
      const res = await api.put("/students/update/profile", data);
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

  getMySkills: async () => {
    set({ isStudentLoading: true });
    try {
      const res = await api.get("/students/me/skills");
      console.log("log de res.data in getMySkills:", res.data);
      set({ skills: res.data.skills });
      return res.data.skills;
    } catch (error) {
      console.error("Error in getMySkills", error);
      return null;
    } finally {
      set({ isStudentLoading: false });
    }
  },

  addSkill: async (skillName) => {
    console.log(skillName);

    set({ isStudentLoading: true });
    try {
      // Envoi au backend
      const res = await api.post("/students/skills/add", { skillName });

      // res.data devrait contenir la compétence ajoutée (ex: { id: 123, name: "React" })
      const newSkill = res.data.skill;

      // Mettre à jour MySkills directement dans le store
      set((state) => ({
        skills: {
          ...state.skills,
          MySkills: [...(state.skills.MySkills || []), newSkill],
          CountMySkills: (state.skills.CountMySkills || 0) + 1,
        },
      }));
    } catch (error) {
      console.error("Error in addSkill", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },

  removeSkill: async (skillName) => {
    set({ isStudentLoading: true });
    try {
      console.log("log de skillName", skillName);

      // axios delete avec body
      const res = await api.delete("/students/skills/remove", {
        data: { skillName },
      });

      console.log("log de res.data in removeSkill:", res.data);
      const removedSkill = res.data.skill;

      // mise à jour du store en temps réel
      set((state) => ({
        skills: {
          ...state.skills,
          MySkills: state.skills.MySkills.filter(
            (s) => s.name !== removedSkill.name
          ),
          CountMySkills: (state.skills.CountMySkills || 1) - 1,
        },
      }));
    } catch (error) {
      console.error("Error in removeSkill", error);
    } finally {
      set({ isStudentLoading: false });
    }
  },
}));
