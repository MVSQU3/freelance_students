import bcrypt from "bcrypt";
import {
  StudentProfile,
  CompanyProfile,
  Student,
  Company,
  User,
} from "../config/sequelize.js";
import { generateToken } from "../config/util.js";
import { sendMail } from "../config/mailer.js";

export const register = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    // Vérifier le rôle
    if (!["student", "company"].includes(role)) {
      const error = new Error("Rôle invalide");
      error.statusCode = 400;
      throw error;
    }

    // Vérifier si l'email existe déjà
    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      const error = new Error("Un compte avec cet email existe déjà");
      error.statusCode = 409;
      throw error;
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(password, 10);

    // Créer l'utilisateur et le profil
    let newUser;
    if (role === "student") {
      newUser = await User.create({ email, password: hash, role });
      await StudentProfile.create({ userId: newUser.id });
    } else if (role === "company") {
      newUser = await User.create({ email, password: hash, role });
      await CompanyProfile.create({ userId: newUser.id });
    }

    // Générer le token
    generateToken(newUser.id, newUser.role, res);

    // Envoyer l'email de bienvenue
    // await sendMail({
    //   to: email,
    //   subject: "Bienvenue 🎉",
    //   html: `
    //     <h2>Bienvenue sur Freelance Students</h2>
    //     <p>Merci pour ton inscription !</p>
    //     <p>Nous sommes heureux de t’accueillir 🚀</p>
    //   `,
    // });

    // Répondre au client
    return res.status(201).json({
      success: true,
      message: "Inscription réussie",
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Recherche utilisateur
    let user;
    const student = await Student.findOne({ where: { email } });
    const company = await Company.findOne({ where: { email } });
    if (!student && !company) {
      const error = new Error("Email incorrect");
      error.statusCode = 401;
      throw error;
    }

    user = student || company;
    console.log("log de user:", user);
    // Vérification du mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error("Mot de passe incorrect");
      error.statusCode = 401;
      throw error;
    }

    // Génération du token
    generateToken(user.id, user.role, res);

    return res.status(200).json({
      success: true,
      message: "Connexion réussie",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
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
    let userInfo;

    if (req.user.role === "student") {
      userInfo = await Student.findOne({ where: { id: req.user.id } });
    } else if (req.user.role === "company") {
      userInfo = await Company.findOne({ where: { id: req.user.id } });
    }

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
        id: userInfo.id,
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
