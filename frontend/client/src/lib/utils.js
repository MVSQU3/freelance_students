import { jwtDecode } from "jwt-decode";

export const getUserToken = () => {
  try {
    const token = localStorage.getItem("JWT");
    if (!token) {
      return null;
    }
    const decode = jwtDecode(token);
    return decode;
  } catch (error) {
    console.log("Erreur impossible de recupere le token", error);
  }
};
