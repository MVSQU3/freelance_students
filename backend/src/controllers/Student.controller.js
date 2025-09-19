import { Op } from "sequelize";
import { StudentProfile, Student, Skill } from "../config/sequelize.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await StudentProfile.findAll({
      where: {
        [Op.and]: [{ availability: "disponible" }],
      },
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Student,
          as: "student",
          attributes: ["email", "role"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Liste des profils étudiants récupérée avec succès",
      students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await StudentProfile.findOne({
      where: { id },
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Student,
          as: "student",
          attributes: ["email"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Aucun profil trouvé",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profil étudiant récupéré avec succès",
      profile: {
        firstName: student.firstName,
        lastName: student.lastName,
        school: student.school,
        level: student.level,
        fieldOfStudy: student.fieldOfStudy,
        location: student.location,
        availability: student.availability,
        bio: student.bio,
        photoUrl: student.photoUrl,
        skills: student.skills,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ success: false, message: "Accès réservé aux étudiants" });
    }

    console.log(req.user);

    // Load basic user info
    const userInfo = await Student.findOne({
      where: { id: req.user.id },
      attributes: ["id", "email", "role"],
    });
    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur introuvable" });
    }

    // Load student profile with skills
    const profile = await StudentProfile.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profil étudiant introuvable" });
    }

    const profileData = {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
      firstName: profile.firstName,
      lastName: profile.lastName,
      school: profile.school,
      level: profile.level,
      fieldOfStudy: profile.fieldOfStudy,
      location: profile.location,
      availability: profile.availability,
      visibility: profile.visibility,
      bio: profile.bio,
      photoUrl: profile.photoUrl,
      cvUrl: profile.cvUrl,
      skills: profile.skills,
    };

    return res.status(200).json({
      success: true,
      message: "Profil étudiant récupéré",
      profile: profileData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      school,
      level,
      fieldOfStudy,
      location,
      availability,
      visibility,
      bio,
      photoUrl,
      cvUrl,
    } = req.body;

    const [updated] = await StudentProfile.update(
      {
        firstName,
        lastName,
        school,
        level,
        fieldOfStudy,
        location,
        availability,
        bio,
        photoUrl,
        cvUrl,
      },
      { where: { userId: req.user.id } }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Profil non trouvé ou aucune modification apportée",
      });
    }

    // Récupérer le profil mis à jour
    const profile = await StudentProfile.findOne({
      where: { userId: req.user.id },
    });

    return res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const addSkill = async (req, res, next) => {
  try {
    const { skillName } = req.body;

    if (!skillName || !skillName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la compétence est obligatoire",
      });
    }

    // Vérifier que le profil étudiant existe
    const student = await StudentProfile.findOne({
      where: { userId: req.user.id },
    });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Profil étudiant introuvable",
      });
    }

    // Vérifier si la compétence existe déjà, sinon la créer
    let [skill] = await Skill.findOrCreate({
      where: { name: skillName.trim() },
    });

    // Vérifier si la compétence est déjà associée à l'étudiant
    const hasSkill = await student.hasSkill(skill);
    if (hasSkill) {
      return res.status(400).json({
        success: false,
        message: "Cette compétence est déjà ajoutée au profil",
      });
    }

    // Associer la compétence à l’étudiant
    await student.addSkill(skill);

    return res.status(201).json({
      success: true,
      message: "Compétence ajoutée avec succès",
      skill,
    });
  } catch (error) {
    next(error);
  }
};

export const removeSkill = async (req, res, next) => {
  try {
    const { skillName } = req.body;

    if (!skillName || !skillName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la compétence est obligatoire",
      });
    }

    // Vérifier que le profil étudiant existe
    const student = await StudentProfile.findByPk(req.user.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Profil étudiant introuvable",
      });
    }

    // Vérifier que la compétence existe
    const skill = await Skill.findOne({ where: { name: skillName.trim() } });
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Compétence introuvable",
      });
    }

    // Vérifier si la compétence est bien associée à l’étudiant
    const hasSkill = await student.hasSkill(skill);
    if (!hasSkill) {
      return res.status(400).json({
        success: false,
        message: "Cette compétence n’est pas associée au profil",
      });
    }

    // Supprimer l’association
    await student.removeSkill(skill);

    return res.status(200).json({
      success: true,
      message: "Compétence supprimée avec succès",
    });
  } catch (error) {
    next(error);
  }
};
