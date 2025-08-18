import bcrypt from "bcrypt";
import { User, StudentProfile, CompanyProfile } from "../config/sequelize.js";
import { generateToken } from "../config/util.js";

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email.trim() || !password.trim() || !role.trim()) {
      return res.json({ message: "Tous les champs sont require" });
    }
    if (password.length < 6) {
      return res.json({
        message: "Le mot de pass doit être de 6 caractères minimum",
      });
    }
    if (role !== "student" && role !== "company") {
      return res.json({
        message: "Le rôle ne peut être différents de student ou company",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, role });

    generateToken(user.id, res);

    // user.role === "student"
    //   ? await StudentProfile.create({ userId: user.id })
    //   : null;
    // user.role === "company"
    //   ? await CompanyProfile.create({ userId: user.id })
    //   : null;

    return res.status(200).json({
      message: "Inscription réussite",
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.log("Erreur in controller register: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim()) {
      return res.json({ message: "Tous les champs sont require" });
    }
    if (password.length < 6) {
      return res.json({
        message: "Mot de passe trop court",
      });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.json({ message: "Email incorrect" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Mot de passe incorrect" });
    }

    generateToken(user.id, res);

    res.json({ message: `Connecté` });
  } catch (error) {
    console.log("Erreur in controller login: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: 0 });
    res.status(200).json({ message: "Déconnexion réussite" });
  } catch (error) {
    console.log("Erreur in controller logout: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

export const check = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("Erreur in controller me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

export const me = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const userInfo = await User.findOne({ where: { id: req.user.id } });
      const Profile = await StudentProfile.findOne({
        where: { userId: req.user.id },
      });
      res.json({
        message: "Information sur L'utilisateur",
        profile: {
          email: userInfo.email,
          role: userInfo.role,
          password: userInfo.password,
          firstName: Profile.firstName,
          lastName: Profile.lastName,
          school: Profile.school,
          level: Profile.level,
          fieldOfStudy: Profile.fieldOfStudy,
          location: Profile.location,
          availability: Profile.availability,
          visibility: Profile.visibility,
          bio: Profile.bio,
          photoUrl: Profile.photoUrl,
          cvUr: Profile.cvUrl,
        },
      });
    }
    if (req.user.role === "company") {
      const userInfo = await User.findOne({ where: { id: req.user.id } });
      const Profile = await CompanyProfile.findOne({
        where: { userId: req.user.id },
      });
      res.json({
        message: "Information sur L'utilisateur",
        profile: {
          email: userInfo.email,
          role: userInfo.role,
          password: userInfo.password,
          companyName: Profile.companyName,
          sector: Profile.sector,
          location: Profile.location,
          website: Profile.website,
          description: Profile.description,
        },
      });
    }
  } catch (error) {
    console.log("Erreur in controller me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};
