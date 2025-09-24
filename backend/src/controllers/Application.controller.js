import { Op } from "sequelize";
import {
  Application,
  CompanyProfile,
  Stage,
  User,
} from "../config/sequelize.js";

// Postuler à une offre
export const applyToOffer = async (req, res, next) => {
  try {
    const { stageId } = req.params;
    const { coverLetter } = req.body;

    if (!coverLetter || !coverLetter.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Veuillez accompagner votre candidature d'une lettre de motivation",
      });
    }

    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Seuls les étudiants peuvent postuler à un stage",
      });
    }

    const studentId = req.user.id;

    // Vérifier que le stage existe
    const stage = await Stage.findByPk(stageId);
    if (!stage) {
      return res.status(404).json({
        success: false,
        message: "Stage introuvable",
      });
    }

    // Vérifier si l'étudiant a déjà postulé
    const existingApplication = await Application.findOne({
      where: { stageId, studentId },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "Vous avez déjà postulé à ce stage",
      });
    }

    // Créer la candidature
    const application = await Application.create({
      stageId,
      studentId,
      coverLetter: coverLetter.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Candidature envoyée avec succès",
      application,
    });
  } catch (error) {
    next(error);
  }
};

// Voir SES candidatures
export const getMyApplications = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Seuls les étudiants peuvent consulter leurs candidatures",
      });
    }

    const studentId = req.user.id;

    const applications = await Application.findAll({
      where: { studentId },
      include: [
        {
          model: Stage,
          as: "stage",
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
          ],
        },
      ],
    });

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vous n’avez aucune candidature",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Candidatures récupérées avec succès",
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApply = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Seuls les étudiants peuvent supprimer une candidature",
      });
    }
    const { applyId } = req.params;
    const apply = await Application.findOne({
      where: { [Op.and]: [{ id: applyId }, { studentId: req.user.id }] },
    });

    if (!apply) {
      return res.status(404).json({
        success: false,
        message: "Candidature introuvable",
      });
    }

    await apply.destroy();

    return res.status(200).json({
      success: true,
      message: "Candidature supprimée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// Voir les candidatures pour une offre de l’entreprise
export const getOfferApplications = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Seuls les entreprises peuvent consulter les candidatures",
      });
    }

    const { stageId } = req.params;

    // Vérifier que le stage appartient à l'entreprise connectée
    const stage = await Stage.findOne({
      where: {
        id: stageId,
        companyId: req.user.id,
      },
    });

    if (!stage) {
      return res.status(403).json({
        success: false,
        message: "Accès interdit à cette offre",
      });
    }

    const applications = await Application.findAll({
      where: { stageId },
      include: [
        {
          model: User,
          as: "student",
          attributes: ["id", "email", "role"],
        },
      ],
    });

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "Aucune candidature pour ce stage",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Candidatures récupérées avec succès",
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// Accepter / refuser une candidature
export const updateApplicationStatus = async (req, res, next) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message:
          "Seuls les entreprises peuvent modifier le statut d'une candidature",
      });
    }

    const { applicationId } = req.params;
    const { status } = req.body; // "accepted" | "rejected"

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Statut invalide, utilisez 'accepted' ou 'rejected'",
      });
    }

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: Stage,
          as: "stage",
        },
      ],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Candidature non trouvée",
      });
    }

    // Vérification que le stage appartient bien à l'entreprise connectée
    if (application.stage.companyId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Non autorisé à modifier cette candidature",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Statut de la candidature mis à jour avec succès",
      application,
    });
  } catch (error) {
    next(error);
  }
};
