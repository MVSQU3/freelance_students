import { StudentProfile, User, Skill } from "../config/sequelize.js";

export const profile = async (req, res) => {
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
          attributes: ["email"],
        },
      ],
    });

    if (!student) {
      return res.json({ message: "Aucun profile trouver" });
    }
    res.json({
      message: `Profile`,
      student,
    });
  } catch (error) {
    console.log("Erreur in controller me: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

export const updateProfile = async (req, res) => {
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
  try {
    if (!firstName.trim() || !lastName.trim() || !school.trim()) {
      return res.json({
        message: "Le nom, le prénom et l’école sont obligatoire",
      });
    }

    const [profile] = await StudentProfile.update(
      { ...req.body },
      { where: { userId: req.user.id } }
    );

    res.json({ message: "Profile mise à jour", profile });
  } catch (error) {
    console.log("Erreur in controller register: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error: ", Error: error.message });
  }
};

// Ajouter une compétence à un étudiant
export const addSkill = async (req, res) => {
  try {
    const myId = req.user.id;
    const { studentId = myId, skillName } = req.body;
    // Vérifier que le profil étudiant existe
    const student = await StudentProfile.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Profil étudiant introuvable" });
    }

    // Vérifier si la compétence existe déjà, sinon la créer
    let [skill] = await Skill.findOrCreate({
      where: { name: skillName.trim() },
    });

    // Associer la compétence à l’étudiant
    await student.addSkill(skill);

    return res.status(201).json({
      message: "Compétence ajoutée avec succès",
      skill: skill,
    });
  } catch (error) {
    console.error("Erreur addSkill:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur", Error: error.message });
  }
};

export const removeSkill = async (req, res) => {
  try {
    const myId = req.user.id;

    const { studentId = myId, skillName } = req.body;

    const student = await StudentProfile.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Profile étudiant introuvable" });
    }

    const skill = await Skill.findOne({
      where: { name: skillName.trim() },
    });

    if (!skill) {
      return res.status(404).json({ message: "Compétence introuvable" });
    }

    await student.removeSkill(skill);

    return res.status(200).json({
      message: "Compétence supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur removeSkill:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur", Error: error.message });
  }
};
