import { StudentProfile, User, Skill } from "../config/sequelize.js";

export const profile = async (req, res, next) => {
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
          model: User,
          as: "user",
          attributes: ["email", "role"],
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
      profile: student,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProfile = async (req, res, next) => {
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

    if (!firstName || !lastName || !school) {
      return res.status(400).json({
        success: false,
        message: "Le nom, le prénom et l’école sont obligatoires",
      });
    }

    const [updated] = await StudentProfile.update(
      {
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


// Ajouter une compétence à un étudiant
export const addSkill = async (req, res, next) => {
  try {
    const myId = req.user.id;
    const { studentId = myId, skillName } = req.body;

    if (!skillName || !skillName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la compétence est obligatoire",
      });
    }

    // Vérifier que le profil étudiant existe
    const student = await StudentProfile.findByPk(studentId);
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
    const myId = req.user.id;
    const { studentId = myId, skillName } = req.body;

    if (!skillName || !skillName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le nom de la compétence est obligatoire",
      });
    }

    // Vérifier que le profil étudiant existe
    const student = await StudentProfile.findByPk(studentId);
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
