import { Stage, User } from "../config/sequelize.js";
import { Op } from "sequelize";

export const createStage = async (req, res, next) => {
  try {
    // Seuls les users "company" peuvent créer un stage
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez pas publier de stages",
      });
    }

    const { title, description, location } = req.body;

    if (
      !title ||
      !title.trim() ||
      !description ||
      !description.trim() ||
      !location ||
      !location.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Titre, description et localisation sont obligatoires",
      });
    }

    // Vérifier que l'entreprise existe
    const company = await User.findByPk(req.user.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Entreprise introuvable",
      });
    }

    // Créer le stage
    const stage = await Stage.create({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      companyId: company.id,
    });

    return res.status(201).json({
      success: true,
      message: "Stage créé avec succès",
      stage,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStages = async (req, res, next) => {
  try {
    let { page, limit, sort = "desc", field = "updated" } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const offset = (page - 1) * limit;

    const { count, rows } = await Stage.findAndCountAll({
      limit,
      offset,
      order: [[field, sort !== "desc" ? (sort = "asc") : sort]],
      include: [
        {
          model: User,
          as: "company",
          attributes: ["id", "email", "role"],
        },
      ],
    });

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Aucun stage trouvé",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Liste des stages récupérée avec succès",
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      stages: rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getStageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const stage = await Stage.findByPk(id, {
      include: [
        {
          model: User,
          as: "company",
          attributes: ["id", "email", "role"],
        },
      ],
    });

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: "Stage introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stage récupéré avec succès",
      stage,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStage = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez pas modifier de stage",
      });
    }

    const { id } = req.params;
    const { title, description, location, isActive } = req.body;

    const stage = await Stage.findOne({
      where: { id, companyId: req.user.id },
    });

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: "Stage introuvable",
      });
    }

    // Mise à jour
    await stage.update({ title, description, location, isActive });

    return res.status(200).json({
      success: true,
      message: "Stage mis à jour avec succès",
      stage,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStage = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez pas supprimer de stage",
      });
    }

    const { id } = req.params;

    const stage = await Stage.findOne({
      where: { companyId: req.user.id, id },
    });

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: "Stage introuvable",
      });
    }

    await stage.destroy();

    return res.status(200).json({
      success: true,
      message: "Stage supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

export const searchStages = async (req, res) => {
  try {
    const { q, location, domain, sort, field } = req.query;

    const filters = {};

    // recherche texte (titre + description)
    if (q) {
      filters[Op.or] = [
        { title: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } },
      ];
    }

    // filtre par localisation
    if (location) {
      filters.location = { [Op.like]: `%${location}%` };
    }

    if (domain) {
      filters.domain = { [Op.like]: `%${domain}%` };
    }

    if (sort === "asc") {
      const stages = await Stage.findAll({
        where: filters,
        order: [[field, sort]],
      });
      res.json(stages);
    }

    if (sort === "desc") {
      const stages = await Stage.findAll({
        where: filters,
        order: [[field, sort]],
      });
      res.json(stages);
    }
  } catch (error) {
    console.log("Erreur in searchStages: ", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
