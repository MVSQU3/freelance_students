import bcrypt from "bcrypt";
import { User, StudentProfile, CompanyProfile } from "../config/sequelize.js";
import { generateToken } from "../config/util.js";

export const register = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    // Validation des champs
    if (!email?.trim() || !password?.trim() || !role?.trim()) {
      const error = new Error("Tous les champs sont requis");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error(
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      error.statusCode = 400;
      throw error;
    }

    if (role !== "student" && role !== "company") {
      const error = new Error("Le rôle doit être 'student' ou 'company'");
      error.statusCode = 400;
      throw error;
    }

    // Vérifier si email existe déjà
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      const error = new Error("Un compte avec cet email existe déjà");
      error.statusCode = 409;
      throw error;
    }

    // Hash & création
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, role });

    generateToken(user.id, res);

    return res.status(201).json({
      success: true,
      message: "Inscription réussie",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error); // on délègue au middleware d'erreurs
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Validation des champs
    if (!email?.trim() || !password?.trim()) {
      const error = new Error("Tous les champs sont requis");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("Mot de passe trop court");
      error.statusCode = 400;
      throw error;
    }

    // Recherche utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("Email incorrect");
      error.statusCode = 401;
      throw error;
    }

    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error("Mot de passe incorrect");
      error.statusCode = 401;
      throw error;
    }

    // Génération du token
    generateToken(user.id, res);

    return res.status(200).json({
      success: true,
      message: "Connexion réussie",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error); // délégation au middleware
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    return res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    next(error);
  }
};

export const check = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ where: { id: req.user.id } });

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    let profileData = {};

    if (req.user.role === "student") {
      const Profile = await StudentProfile.findOne({
        where: { userId: req.user.id },
      });

      if (!Profile) {
        return res.status(404).json({
          success: false,
          message: "Profil étudiant introuvable",
        });
      }

      profileData = {
        email: userInfo.email,
        role: userInfo.role,
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
        cvUrl: Profile.cvUrl,
      };
    }

    if (req.user.role === "company") {
      const Profile = await CompanyProfile.findOne({
        where: { userId: req.user.id },
      });

      if (!Profile) {
        return res.status(404).json({
          success: false,
          message: "Profil entreprise introuvable",
        });
      }

      profileData = {
        email: userInfo.email,
        role: userInfo.role,
        companyName: Profile.companyName,
        sector: Profile.sector,
        location: Profile.location,
        website: Profile.website,
        description: Profile.description,
      };
    }

    return res.status(200).json({
      success: true,
      message: "Informations de l'utilisateur",
      profile: profileData,
    });
  } catch (error) {
    next(error);
  }
};
