import {
  User,
  Stage,
  Skill,
  CompanyProfile,
  Application,
  StudentProfile,
} from "../config/sequelize.js";
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

    const { title, description, location, domain, duree } = req.body;
    const { skills } = req.body;
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
      domain: domain.trim(),
      duree: duree,
      companyId: req.user.id,
    });

    // Transformer skills en tableau d’objets
    const skillsData = skills.map((s) => ({ name: s }));

    // Créer les skills (ou ignorer si déjà existants)
    await Skill.bulkCreate(skillsData, {
      ignoreDuplicates: true,
    });

    // Récupérer tous les skills correspondants (y compris ceux qui existaient déjà)
    const allSkills = await Skill.findAll({
      where: { name: skills },
    });

    // Associer les skills au stage
    await stage.addSkills(allSkills);

    return res.status(201).json({
      success: true,
      message: "Stage créé avec succès",
      stage,
      skillsData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStages = async (req, res, next) => {
  try {
    let { page, limit, sort = "desc", field = "updated" } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 6;

    const offset = (page - 1) * limit;

    const { count, rows } = await Stage.findAndCountAll({
      limit,
      offset,
      order: [[field, sort !== "desc" ? (sort = "asc") : sort]],
      include: [
        {
          model: CompanyProfile,
          as: "company",
          attributes: ["id", "companyName", "location"],
          include: [
            {
              model: User,
              as: "company",
              attributes: ["id", "email", "role"],
            },
          ],
        },
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
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
          model: CompanyProfile,
          as: "company",
          attributes: [
            "id",
            "companyName",
            "sector",
            "location",
            "website",
            "userId",
          ],
          include: [
            {
              model: User,
              as: "company",
              attributes: ["id", "email", "role"],
            },
          ],
        },
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
        },
        {
          model: Application,
          as: "applications",
          attributes: ["id"],
          include: [
            {
              model: StudentProfile,
              as: "student",
              attributes: [
                "firstName",
                "lastName",
                "school",
                "level",
                "fieldOfStudy",
                "location",
                "availability",
                "bio",
                "photoUrl",
                "cvUrl",
              ],
            },
          ],
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

export const getMyStages = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "vous ne pouvez pas possédé de stages",
      });
    }
    const stages = await Stage.findAll({
      where: { companyId: req.user.id },
      include: [
        {
          model: Application,
          as: "applications",
          attributes: ["id"],
        },
        {
          model: CompanyProfile,
          as: "company",
          attributes: ["companyName"],
        },
      ],
    });

    const lastUploadedStages = await Stage.findAll({
      where: { companyId: req.user.id },
      limit: 3,
      order: [["created", "DESC"]],
      include: [
        {
          model: Application,
          as: "applications",
          attributes: ["id"],
        },
      ],
    });

    return res.json({ stages, lastUploadedStages });
  } catch (error) {
    next(error);
  }
};

export const getMyStageDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "vous ne pouvez pas possédé de stages",
      });
    }
    const stages = await Stage.findOne({
      where: { companyId: req.user.id, id },
      include: [
        {
          model: Application,
          as: "applications",
          attributes: { exclude: ["updated"] },
          include: [
            {
              model: StudentProfile,
              as: "student",
              include: [
                {
                  model: Skill,
                  as: "skills",
                },
                {
                  model: User,
                  as: "student",
                  attributes: ["email"],
                },
              ],
            },
          ],
        },
        {
          model: CompanyProfile,
          as: "company",
          attributes: ["companyName"],
        },
      ],
    });

    if (!stages) {
      return res.status(404).json({
        success: false,
        message: "Aucune stages trouvé",
      });
    }

    return res.json({ stages });
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
    const { title, description, location, isActive, duree, domain, skills } =
      req.body;

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
    await stage.update({
      title,
      description,
      location,
      isActive,
      duree,
      domain,
    });

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
        message: "Stage introuvable ou action non autorisé",
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

export const searchStages = async (req, res, next) => {
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
        include: [
          {
            model: CompanyProfile,
            as: "company",
            attributes: ["id", "companyName", "location"],
            include: [
              {
                model: User,
                as: "company",
                attributes: ["id", "email", "role"],
              },
            ],
          },
          {
            model: Skill,
            as: "skills",
            attributes: ["id", "name"],
          },
        ],
      });
      return res.status(200).json(stages);
    }

    if (sort === "desc") {
      const stages = await Stage.findAll({
        where: filters,
        order: [[field, sort]],
        include: [
          {
            model: CompanyProfile,
            as: "company",
            attributes: ["id", "companyName", "location"],
            include: [
              {
                model: User,
                as: "company",
                attributes: ["id", "email", "role"],
              },
            ],
          },
          {
            model: Skill,
            as: "skills",
            attributes: ["id", "name"],
          },
        ],
      });
      return res.status(200).json(stages);
    }

    const stages = await Stage.findAll({
      where: filters,
      include: [
        {
          model: CompanyProfile,
          as: "company",
          attributes: ["id", "companyName", "location"],
          include: [
            {
              model: User,
              as: "company",
              attributes: ["id", "email", "role"],
            },
          ],
        },
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
        },
      ],
    });
    return res.status(200).json(stages);
  } catch (error) {
    console.error("Erreur in searchStages: ", error);
    next(error);
  }
};

export const lastUploadedStages = async (req, res, next) => {
  try {
    const stages = await Stage.findAll({
      limit: 6,
      order: [["created", "DESC"]],
      include: [
        {
          model: CompanyProfile,
          as: "company",
          attributes: ["id", "companyName", "location"],
        },
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json(stages);
  } catch (error) {
    next(error);
  }
};

export const StageDashboard = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "vous ne pouvez pas possédé de stages",
      });
    }

    const totalApplications = await Application.count({
      include: [
        {
          model: Stage,
          as: "stage",
          where: { companyId: req.user.id },
        },
      ],
    });

    const totalApplicationsPending = await Application.count({
      where: { status: "pending" },
      include: [
        { model: Stage, as: "stage", where: { companyId: req.user.id } },
      ],
    });
    const totalApplicationsAccepted = await Application.count({
      where: { status: "accepted" },
      include: [
        { model: Stage, as: "stage", where: { companyId: req.user.id } },
      ],
    });
    const totalApplicationsRejected = await Application.count({
      where: { status: "rejected" },
      include: [
        { model: Stage, as: "stage", where: { companyId: req.user.id } },
      ],
    });

    const totalStages = await Stage.count({
      where: { companyId: req.user.id },
    });

    const totalStageActifs = await Stage.count({
      where: { companyId: req.user.id, isActive: true },
    });
    const totalStageInactifs = await Stage.count({
      where: { companyId: req.user.id, isActive: false },
    });

    totalStageActifs, totalStageInactifs;

    const lastUploadedStages = await Stage.findAll({
      where: { companyId: req.user.id },
      limit: 3,
      order: [["created", "DESC"]],
      include: [
        {
          model: Application,
          as: "applications",
          attributes: ["id"],
        },
      ],
    });

    const lastApplications = await Application.findAll({
      limit: 4,
      order: [["created", "DESC"]],
      include: [
        {
          model: StudentProfile,
          as: "student",
          include: [
            { model: User, as: "student", attributes: ["id", "email"] },
            { model: Skill, as: "skills" },
          ],
        },
        {
          model: Stage,
          as: "stage",
          where: { companyId: req.user.id },
        },
      ],
    });

    return res.json({
      totalStages,
      totalStageActifs,
      totalStageInactifs,
      lastUploadedStages,
      totalApplications,
      lastApplications,
      totalApplicationsPending,
      totalApplicationsAccepted,
      totalApplicationsRejected,
    });
  } catch (error) {
    next(error);
  }
};
