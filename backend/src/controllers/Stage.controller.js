import { Stage, User } from "../config/sequelize.js";

export const createStage = async (req, res) => {
  try {
    if (req.user.role === "student") {
      return res.json({ message: "Vous ne pouvez pas publiez de stages" });
    }

    const { title, description, location, companyId } = req.body;

    // Vérifier que l'entreprise existe
    const company = await User.findByPk(req.user.id);
    console.log(company.id);

    if (!company) {
      return res.status(404).json({ message: "Entreprise introuvable" });
    }

    const stage = await Stage.create({
      title,
      description,
      location,
      companyId: company.id,
    });
    return res.status(201).json(stage);
  } catch (error) {
    console.error("Erreur createStage:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAllStages = async (req, res) => {
  try {
    const stages = await Stage.findAll({
      include: [{ model: User, as: "company" }],
    });
    if (!stages.length) {
      return res.status(404).json({ message: "Aucune offre trouver" });
    }

    return res.status(200).json(stages);
  } catch (error) {
    console.error("Erreur getAllStages:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getStageById = async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await Stage.findByPk(id, {
      include: [{ model: User, as: "company" }],
    });
    if (!stage) {
      return res.status(404).json({ message: "Stage introuvable" });
    }
    return res.status(200).json(stage);
  } catch (error) {
    console.error("Erreur getStageById:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateStage = async (req, res) => {
  try {
    if (req.user.role === "student") {
      return res.json({ message: "Vous ne pouvez pas modifier de stage" });
    }
    const { id } = req.params;
    const { title, description, location, isActive } = req.body;

    const stage = await Stage.findOne({
      where: { id: id, companyId: req.user.id },
    });
    if (!stage) return res.status(404).json({ message: "Stage introuvable" });

    await stage.update({ title, description, location, isActive });
    return res.status(200).json(stage);
  } catch (error) {
    console.error("Erreur updateStage:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteStage = async (req, res) => {
  try {
    if (req.user.role === "student") {
      return res.json({ message: "Vous ne pouvez pas modifier de stage" });
    }
    const { id } = req.params;
    const stage = await Stage.findOne({
      where: { companyId: req.user.id, id },
    });
    if (!stage) return res.status(404).json({ message: "Stage introuvable" });

    await stage.destroy();
    return res.status(200).json({ message: "Stage supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteStage:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};